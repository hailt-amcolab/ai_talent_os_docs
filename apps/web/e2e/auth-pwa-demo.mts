// Node-only, explicit opt-in. Never bundle secrets or save traces/QR/storageState.
import { chromium, expect, type Page } from '@playwright/test'
import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { parseEnv } from 'node:util'
import { randomUUID, randomBytes, createHmac } from 'node:crypto'
if(process.env.RUN_SUPABASE_DEMO_E2E!=='1') throw new Error('Explicit demo E2E opt-in required')
const env=parseEnv(readFileSync(new URL('../../api/.env',import.meta.url),'utf8'))
if(env.ENABLE_AUTH_DEMO!=='true' || env.DEMO_AUTO_CONFIRM_EMAIL!=='true' || env.NODE_ENV==='production') throw new Error('Isolated auto-confirm demo only')
const base=process.env.DEMO_BASE_URL ?? 'http://localhost:3090', password=`Test${randomBytes(18).toString('hex')}1!`
const emailA=`tech.e2e.a.${randomUUID()}@example.com`,emailB=`tech.e2e.b.${randomUUID()}@example.com`
const admin=createClient(env.SUPABASE_URL!,env.SUPABASE_SECRET_KEY!,{auth:{persistSession:false,autoRefreshToken:false}})
const results:Array<{id:string;status:string}>=[], ids:string[]=[]
const pass=(id:string,status='PASS')=>{results.push({id,status});console.log(`${status} ${id}`)}
const evidence=new URL('./results/',import.meta.url);mkdirSync(evidence,{recursive:true})
function totp(secret:string) {
 const bits=[...secret.replace(/=+$/,'')].map(c=>'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'.indexOf(c).toString(2).padStart(5,'0')).join(''),key=Buffer.from((bits.match(/.{8}/g)??[]).map(b=>parseInt(b,2))),counter=Buffer.alloc(8)
 counter.writeBigUInt64BE(BigInt(Math.floor(Date.now()/30000)));const h=createHmac('sha1',key).update(counter).digest();return String((h.readUInt32BE(h[19]!&15)&0x7fffffff)%1000000).padStart(6,'0')
}
async function signup(page:Page,email:string) {
 await page.goto(base+'/pwa/register');await page.locator('#email').fill(email);await page.locator('#password').fill(password);await page.locator('#confirmation').fill(password);await page.getByRole('button',{name:'Create account',exact:true}).click();await page.waitForURL('**/pwa/home',{timeout:20000});await expect(page.locator('#receiver-code')).toBeVisible();const id=(await page.locator('#receiver-code').textContent())!;ids.push(id);return id
}
const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXECUTABLE})
try {
 const ca=await browser.newContext({permissions:['notifications']}),cb=await browser.newContext({permissions:['notifications']}),cb2=await browser.newContext()
 const a=await ca.newPage(),b=await cb.newPage(),b2=await cb2.newPage()
 await a.goto(base+'/pwa/login');await a.screenshot({path:new URL('login.png',evidence).pathname})
 const idA=await signup(a,emailA),idB=await signup(b,emailB)
 expect(idA!==idB).toBe(true);pass('TECH-E2E-01-self-register-no-approval')
 await b2.goto(base+'/pwa/login');await b2.locator('#email').fill(emailB);await b2.locator('#password').fill(password);await b2.getByRole('button',{name:'Log in',exact:true}).click();await b2.waitForURL('**/pwa/home');await expect(b2.locator('#receiver-code')).toHaveText(idB);pass('TECH-E2E-02-same-account-second-browser')
 // Native Push depends on the browser build and external FCM, never fake its PASS.
 let native=false
 try {
   const persisted=b.waitForResponse(r=>new URL(r.url()).pathname==='/api/v1/me/push-subscriptions' && r.request().method()==='POST',{timeout:10000})
   await b.getByRole('button',{name:'Allow notifications',exact:true}).click()
   native=(await persisted).status()===200
 } catch {native=false}
 if(native) {
   await b.close();await a.locator('#recipient').fill(idB)
   const sent=a.waitForResponse(r=>new URL(r.url()).pathname==='/api/v1/dev/push-test');await a.getByRole('button',{name:'Send notification',exact:true}).click();const response=await sent,delivery=await response.json();expect(response.status()).toBe(200);expect(delivery.accepted).toBeGreaterThan(0)
   pass('TECH-E2E-03-real-provider-cross-account-accepted')
   const receiver=await cb.newPage();await receiver.goto(base+'/pwa/home')
   await expect.poll(()=>receiver.evaluate(async()=> (await (await navigator.serviceWorker.ready).getNotifications()).length),{timeout:20000}).toBeGreaterThan(0)
   pass('TECH-E2E-04-real-browser-received-with-page-closed')
 } else pass('TECH-E2E-03-04-native-push-browser-unavailable','NOT_RUN')
 await a.bringToFront()
 await a.getByRole('link',{name:'Register authenticator app',exact:true}).click()
 const enrollment=a.waitForResponse(r=>new URL(r.url()).pathname==='/api/v1/auth/mfa/enroll')
 await a.getByRole('button',{name:'Register authenticator app',exact:true}).click()
 const secret=(await (await enrollment).json()).secret as string
 await expect(a.getByAltText('QR code for registering the authenticator app')).toBeVisible({timeout:20000})
 if(Date.now()%30000>27000) await a.waitForTimeout(3500)
 await a.locator('#code').fill(totp(secret));await a.getByRole('button',{name:'Verify',exact:true}).click();await a.waitForURL('**/pwa/home');await expect(a.getByText('aal2',{exact:false})).toBeVisible();pass('TECH-E2E-05-real-totp')
 await a.evaluate(()=>navigator.serviceWorker.ready);await ca.setOffline(true);await a.reload();await expect(a.getByRole('heading',{name:'You are offline'})).toBeVisible();pass('TECH-E2E-06-offline-generic')
 await ca.setOffline(false);await a.goto(base+'/pwa/home');await a.getByRole('button',{name:'Log out',exact:true}).click();await a.waitForURL('**/pwa/login');await a.locator('#email').fill(emailA);await a.locator('#password').fill(password);await a.getByRole('button',{name:'Log in',exact:true}).click();await a.waitForURL('**/pwa/mfa');pass('TECH-E2E-07-next-login-totp-required')
} catch(e) {
 process.exitCode=1;results.push({id:'execution',status:'FAIL'});console.error(e instanceof Error ? e.stack?.split('\n').filter(l=>l.trim().startsWith('at ')).join('\n') : 'E2E failed')
} finally {
 await browser.close()
 // Only users just created by this run, no domain/audit records involved.
 for(const id of ids) {const result=await admin.auth.admin.deleteUser(id);if(result.error) {process.exitCode=1;pass('fixture-cleanup','FAIL')}}
 writeFileSync(new URL('browser-results.json',evidence),JSON.stringify({recordedAt:new Date().toISOString(),scope:'technology only',provider:'real Supabase Auth',results,physicalDevicePush:'NOT_RUN'},null,2)+'\n')
}
