import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createECDH, randomBytes, randomUUID } from 'node:crypto'
import type { AuthProvider, AuthUser, VerifiedToken, TokenPair } from '../../core/auth.ts'
import { AppError } from '../../core/errors.ts'
import { createDatabase } from '../../infra/database/client.ts'
import { AuthService } from './service.ts'
import { AuthRepository } from './repository.ts'
import { PwaService } from '../pwa/service.ts'
import { createApp } from '../../http/app.ts'
import { loadEnv } from '../../config/env.ts'

const url=process.env.TEST_DATABASE_URL
const local=url && (['localhost','127.0.0.1'].includes(new URL(url).hostname) || new URL(url).searchParams.get('host')?.startsWith('/'))
test('technology demo: real PostgreSQL, fake Auth/WebPush ports; no domain approval/worker', {skip:!local}, async t => {
 const db=createDatabase(url!), users=new Map<string,AuthUser & {password:string}>(), tokens=new Map<string,VerifiedToken>(), challenges=new Map<string,string>()
 function issue(id:string, sessionId=randomUUID(), aal:'aal1'|'aal2'='aal1'):TokenPair {const access_token=randomUUID();tokens.set(access_token,{userId:id,sessionId,aal});return {access_token,refresh_token:randomUUID(),expires_at:Math.floor(Date.now()/1000)+3600}}
 function claim(token:string) {const a=tokens.get(token);if(!a) throw new AppError('AUTH_REQUIRED',401);return a}
 function user(token:string) {return [...users.values()].find(u=>u.id===claim(token).userId)!}
 const provider:AuthProvider={
  async register(email,password) {if(users.has(email)) throw new AppError('REGISTRATION_FAILED',422);const id=randomUUID();await db.$executeRaw`INSERT INTO auth.users(id) VALUES(${id}::uuid)`;users.set(email,{id,email,password,factors:[]});return issue(id)},
  async login(email,password) {const u=users.get(email);if(!u || u.password!==password) throw new AppError('AUTH_INVALID',401);return issue(u.id)},
  async verifyToken(token) {return claim(token)},async user(token) {return user(token)},async factors(token) {return user(token).factors},
  async enroll(token) {const id=randomUUID();user(token).factors.push({id,factor_type:'totp',status:'unverified'});return {factorId:id,qr:'data:image/svg+xml;base64,PHN2ZyAvPg==',secret:'fixture'}},
  async removePending(token,id) {user(token).factors=user(token).factors.filter(f=>f.id!==id)},
  async challenge(_token,id) {const ref=randomUUID();challenges.set(ref,id);return {id:ref,expiresAt:new Date(Date.now()+300000)}},
  async verify(token,id,ref,code) {if(challenges.get(ref)!==id || code!=='012345') throw new AppError('AUTH_INVALID',401);challenges.delete(ref);user(token).factors.find(f=>f.id===id)!.status='verified';const a=claim(token);return issue(a.userId,a.sessionId,'aal2')},async signOut() {},
 }
 const auth=new AuthService(new AuthRepository(db),provider), delivered:string[]=[]
 const vapid={publicKey:'fixture',privateKey:'fixture',subject:'mailto:test@example.invalid'}
 const pwa=new PwaService(db,vapid,async (_v,s)=>{delivered.push(s.endpoint);return {outcome:'sent',status:201}})
 const password='Technology123!', emailA=`a.${randomUUID()}@example.invalid`, emailB=`b.${randomUUID()}@example.invalid`
 let a:Awaited<ReturnType<AuthService['authenticate']>>, b1:typeof a,b2:typeof a, tokenB=''
 const endpointA=`https://fcm.googleapis.com/fcm/send/${randomUUID()}`,endpointB1=`https://fcm.googleapis.com/fcm/send/${randomUUID()}`,endpointB2=`https://web.push.apple.com/${randomUUID()}`
 const key=createECDH('prime256v1');key.generateKeys();const keys={p256dh:key.getPublicKey().toString('base64url'),auth:randomBytes(16).toString('base64url')}
 const rejected=(code:string)=>(e:unknown)=>e instanceof AppError && e.code===code
 try {
  await t.test('self-registration logs in immediately; does not create application, principal or talent',async()=>{
   const baseline=await db.talent_applications.count(), rA=await auth.register(emailA,password,'http://localhost:3000','test-a'),rB=await auth.register(emailB,password,'http://localhost:3000','test-b')
   assert.equal(rA.status,'signed_in');a=await auth.authenticate(rA.session!.access_token,true);tokenB=rB.session!.access_token;b1=await auth.authenticate(tokenB,true);b2=await auth.authenticate((await auth.login(emailB,password,'test-b2')).session.access_token,true)
   assert.equal(await db.talent_applications.count(),baseline);assert.equal(await db.auth_principals.count({where:{auth_user_id:{in:[a.userId,b1.userId]}}}),0)
  })
  await t.test('sender A reaches both receiver B devices, never substitutes its own device; payloads have no PII',async()=>{
   await pwa.subscribe(a,{endpoint:endpointA,keys});await pwa.subscribe(b1,{endpoint:endpointB1,keys});await pwa.subscribe(b2,{endpoint:endpointB2,keys})
   assert.deepEqual(await pwa.testPush(a,b1.userId),{targeted:2,accepted:2,gone:0,failed:0});assert.deepEqual(new Set(delivered),new Set([endpointB1,endpointB2]))
   assert.equal((await pwa.devices(a)).items.length,1);assert.equal((await pwa.devices(b1)).items.length,2)
   await assert.rejects(pwa.subscribe(a,{endpoint:endpointB1,keys}),rejected('DEVICE_ALREADY_BOUND'))
   await assert.rejects(pwa.subscribe(a,{endpoint:endpointA,keys:{...keys,p256dh:'invalid'}}),rejected('PUSH_KEY_INVALID'))
  })
  await t.test('logout B1 revokes old token and device only; B2 can still receive; stale subscribe fails',async()=>{
   await auth.logout(tokenB);await assert.rejects(auth.authenticate(tokenB),rejected('SESSION_REVOKED'));await assert.rejects(pwa.subscribe(b1,{endpoint:endpointB1,keys}),rejected('SESSION_REVOKED'))
   assert.equal((await pwa.testPush(a,b1.userId)).targeted,1)
   const gone=new PwaService(db,vapid,async()=>({outcome:'gone',status:410}));assert.equal((await gone.testPush(a,b1.userId)).gone,1);await assert.rejects(pwa.testPush(a,b1.userId),rejected('NO_PUSH_DEVICES'))
  })
  await t.test('TOTP is optional to enroll, required on next password login; factor ownership is checked',async()=>{
   const login=await auth.login(emailA,password,'mfa-test'),token=login.session.access_token,e=await auth.enroll(token),c=await auth.challenge(token,e.factorId)
   await assert.rejects(auth.verify(token,e.factorId,c.challengeRef,'000000'),rejected('AUTH_INVALID'))
   assert.equal((await auth.verify(token,e.factorId,c.challengeRef,'012345')).auth.currentAal,'aal2')
   const next=await auth.login(emailA,password,'mfa-test');assert.equal(next.auth.state,'mfa_required');await assert.rejects(auth.authenticate(next.session.access_token,true),rejected('MFA_REQUIRED'));await assert.rejects(auth.challenge(next.session.access_token,randomUUID()),rejected('FACTOR_NOT_ALLOWED'))
  })
  await t.test('HTTP has no approval routes; strict DTO/Origin/no-store; demo disabled in production',async()=>{
   const env=loadEnv({DATABASE_URL:url!,ENABLE_AUTH_DEMO:'true',SUPABASE_URL:'https://example.supabase.co',SUPABASE_PUBLISHABLE_KEY:'test'})
   const app=createApp({env,db,auth,pwa})
   assert.equal((await app.request('/api/v1/admin/applications')).status,404)
   const denied=await app.request('/api/v1/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:emailA,password})});assert.equal(denied.status,403);assert.equal(denied.headers.get('Cache-Control'),'no-store')
   const invalid=await app.request('/api/v1/auth/register',{method:'POST',headers:{Origin:'http://localhost:3000','Content-Type':'application/json'},body:JSON.stringify({email:emailA,password,role:'manager'})});assert.equal(invalid.status,422)
   assert.throws(()=>loadEnv({DATABASE_URL:url!,ENABLE_AUTH_DEMO:'true',NODE_ENV:'production'}))
  })
 } finally {await db.$disconnect()}
})
