const { chromium } = require('C:/Program Files/WindowsApps/OpenAI.CodexPrimaryRuntime.v26-1112-737-0_26.1112.737.0_x64__3k8sg7r9htsxt/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage({viewport:{width:794,height:1123}});
 await page.goto('file:///D:/TalentOS/tmp/translation/docx_preview.html');
 await page.evaluate(()=>document.fonts.ready);
 await page.pdf({path:'D:/TalentOS/tmp/translation/docx_preview.pdf',format:'A4',printBackground:true,preferCSSPageSize:true});
 console.log('Rendered DOCX content to PDF preview');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
