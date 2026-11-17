// No credentials or writes: check the shared FE/API origin, including CORS.
const origin=new URL(process.argv[2] ?? 'http://localhost:3090').origin
const checks:Array<{check:string;pass:boolean}>=[]
const page=await fetch(origin+'/pwa/login')
checks.push({check:'frontend',pass:page.status===200})
const manifest=await (await fetch(origin+'/manifest.webmanifest')).json() as {scope?:string;start_url?:string}
checks.push({check:'manifest',pass:manifest.scope==='/pwa/' && manifest.start_url==='/pwa/home'})
const invalid=await fetch(origin+'/api/v1/auth/login',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:'{}'})
checks.push({check:'api-origin-and-validation',pass:invalid.status===422 && invalid.headers.get('Cache-Control')==='no-store'})
const anonymous=await fetch(origin+'/api/v1/auth/state')
checks.push({check:'api-auth-guard',pass:anonymous.status===401})
console.log(JSON.stringify({origin,checks}))
if(checks.some(c=>!c.pass)) process.exitCode=1
