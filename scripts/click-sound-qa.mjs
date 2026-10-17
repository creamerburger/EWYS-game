import {chromium} from 'playwright-core';

const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
try{
  const page=await browser.newPage();
  await page.addInitScript(()=>{
    window.__sfxStarts=0;
    const original=OscillatorNode.prototype.start;
    OscillatorNode.prototype.start=function(...args){window.__sfxStarts++;return original.apply(this,args)};
  });
  await page.goto('http://127.0.0.1:5173/');
  await page.getByRole('button',{name:/게임 방법/}).first().click();
  await page.getByRole('button',{name:/다음/}).click();
  const count=await page.evaluate(()=>window.__sfxStarts);
  if(count<2)throw Error(`Expected button pop on both clicks, got ${count} oscillator starts`);
  console.log('Button pop passed on menu and tutorial buttons.');
}finally{await browser.close()}
