import {chromium} from 'playwright-core';

const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox']});
try{
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  await page.goto('http://127.0.0.1:5173/');
  await page.getByRole('button',{name:/새 게임 시작/}).click();
  await page.getByRole('button',{name:/게임 시작!/}).click();
  await page.locator('.category-col').last().locator('.question-tile').first().click();
  if(await page.locator('.credits-panel').count())throw Error('Music credits appeared during the question');
  if(await page.getByText('Goodness of God',{exact:true}).count())throw Error('Song title appeared before answer reveal');
  await page.locator('.top-actions').getByRole('button',{name:/사회자/}).click();
  page.once('dialog',dialog=>dialog.accept());
  await page.getByRole('button',{name:/게임 종료/}).click();
  await page.locator('.drawer-head button').click();
  const credits=page.locator('.credits-panel');
  await credits.waitFor();
  if(await credits.locator('li').first().isVisible())throw Error('Credits were open before the host requested them');
  await credits.locator('summary').click();
  if(!(await credits.getByText('Goodness of God',{exact:true}).isVisible()))throw Error('Music credits did not open after the game');
  if(!(await credits.locator('a[href="https://www.youtube.com/watch?v=n0FBb6hnwTo"]').count()))throw Error('Original video link is missing');
  console.log('Credits passed: hidden during play, collapsed after the game, original sources available when opened.');
}finally{await browser.close()}
