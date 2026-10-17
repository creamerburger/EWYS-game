import {chromium} from 'playwright-core';
import JSZip from 'jszip';
import {readFile} from 'node:fs/promises';

const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox']});
try{
  const page=await browser.newPage({viewport:{width:1440,height:900},acceptDownloads:true});
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('http://127.0.0.1:5173/');
  await page.getByRole('button',{name:/새 게임 시작/}).click();
  await page.getByRole('button',{name:/게임 시작!|Start Game!/}).click();
  await page.locator('.top-actions').getByRole('button',{name:/사회자/}).click();
  const [download]=await Promise.all([
    page.waitForEvent('download',{timeout:30000}),
    page.getByRole('button',{name:/오디오 포함 전체 백업/}).click()
  ]);
  const zip=await JSZip.loadAsync(await readFile(await download.path()));
  const expected=['game.json','questions.json',...Array.from({length:4},(_,i)=>[`assets/song-${i+1}-preview.mp3`,`assets/song-${i+1}-full.mp3`]).flat()];
  for(const name of expected)if(!zip.file(name))throw Error(`Missing ZIP entry: ${name}`);
  const game=JSON.parse(await zip.file('game.json').async('string')).game;
  if(game.questions.filter(q=>q.type==='audio').length!==4)throw Error('Expected four song questions');
  const backupPath=await download.path();
  await page.evaluate(()=>localStorage.clear());
  await page.reload();
  await page.locator('input[type="file"][accept*=".zip"]').setInputFiles({name:'backup.zip',mimeType:'application/zip',buffer:await readFile(backupPath)});
  await page.locator('.category-col').last().locator('.question-tile').first().waitFor();
  const restored=await page.evaluate(()=>JSON.parse(localStorage.getItem('bomb-quiz-v1')));
  if(!restored?.games?.[game.id])throw Error('ZIP import did not restore the game');
  if(errors.length)throw Error(errors.join('\n'));
  console.log('Full backup and restore passed: four preview and full tracks, game state, question bank.');
}finally{await browser.close()}
