import {chromium} from 'playwright-core';

const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
try{
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  await page.addInitScript(()=>{
    window.__ticks=0;
    const original=OscillatorNode.prototype.start;
    OscillatorNode.prototype.start=function(...args){if(this.type==='square')window.__ticks++;return original.apply(this,args)};
  });
  await page.goto('http://127.0.0.1:5173/');
  await page.getByRole('button',{name:/새 게임 시작/}).click();
  await page.getByRole('button',{name:/게임 시작!/}).click();
  const song=page.locator('.category-col').last().locator('.question-tile').first();
  await song.click();
  if(!(await page.locator('.timer').innerText()).includes('30s'))throw Error('Song timer did not start at 30 seconds');
  await page.waitForTimeout(2200);
  if(await page.evaluate(()=>window.__ticks)<2)throw Error('Timer did not produce a tick each second');
  await page.getByRole('button',{name:/문제판으로/}).click();
  const returned=page.locator('.category-col').last().locator('.question-tile').first();
  if(await returned.isDisabled())throw Error('Returning to board consumed the question');
  await page.locator('.category-col').last().locator('.question-tile').nth(1).click();
  if(!(await page.locator('.points-badge').innerText()).includes('250'))throw Error('Could not choose another question after returning');
  await page.getByRole('button',{name:/오답 \/ 다음 팀/}).click();
  await page.locator('.board').waitFor();
  if(await page.locator('.category-col').last().locator('.question-tile').nth(1).isDisabled())throw Error('Wrong answer consumed the question');
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('bomb-quiz-v1')));
  const game=saved.games[saved.lastId];
  if(game.currentTeam!==1||game.used.length!==0||game.teams.some(team=>team.score!==0))throw Error('Wrong answer did not pass the turn with an untouched question and zero points');
  console.log('Timer, board return, and wrong-answer flow passed.');
}finally{await browser.close()}
