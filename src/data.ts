import source from './source.json';
export type Bi={ko:string;en:string};
export type Question={id:string;category:Bi;number:number;points:number;type:'text'|'audio'|'sing';question:Bi;answer:Bi;acceptedAnswers:{ko:string[];en:string[]};choices:Bi[];correctChoiceIndex:number;hint:Bi;explanation:Bi;reference:Bi;audioId?:string;audioUrl?:string;audioFullUrl?:string;previewSeconds?:number;audioStart?:number;audioEnd?:number;timeLimit?:number};
export const categories:Bi[]=[{ko:'성경 인물',en:'Bible Characters'},{ko:'성경 사건',en:'Bible Events'},{ko:'예수님과 복음서',en:'Jesus and the Gospels'},{ko:'성경의 숫자',en:'Bible Numbers'},{ko:'성경 도전',en:'Bible Challenge'}];
const ko=[
['예수님의 어머니는 누구인가요?','마리아','마리아|마르다|에스더|룻'],
['골리앗을 물리친 사람은 누구인가요?','다윗','삼손|다윗|사울|요나단'],
['예수님을 보려고 돌무화과나무에 올라간 사람은 누구인가요?','삭개오','니고데모|바디매오|삭개오|나사로'],
['지진이 일어나기 전, 감옥에서 바울과 함께 찬송하고 기도한 사람은 누구인가요?','실라','실라|바나바|디모데|마가'],
['드로아에서 바울의 긴 설교 중 창문에서 떨어진 청년의 이름은 무엇인가요?','유두고','두기고|에바브라|오네시모|유두고'],
['홍수 전에 노아가 만든 것은 무엇인가요?','방주','제단|탑|방주|성전'],
['이스라엘 백성이 이집트를 떠난 뒤 건넌 바다는 어디인가요?','홍해','홍해|사해|갈릴리 바다|지중해'],
['일곱째 날, 이스라엘 백성은 여리고 성을 몇 번 돌았나요?','일곱 번','세 번|다섯 번|일곱 번|열두 번'],
['엘리야가 바알의 예언자들과 대결한 산은 어디인가요?','갈멜산','시내산|모리아산|감람산|갈멜산'],
['아간이 금지된 물건을 가져간 뒤 이스라엘이 패배한 성읍은 어디인가요?','아이 성','여리고|아이 성|기브온|라기스'],
['예수님이 태어나신 마을은 어디인가요?','베들레헴','나사렛|예루살렘|베들레헴|가버나움'],
['예수님은 가나의 혼인 잔치에서 물을 무엇으로 바꾸셨나요?','포도주','포도주|기름|꿀|우유'],
['오천 명을 먹일 때 사용된 물고기는 몇 마리였나요?','두 마리','세 마리|다섯 마리|일곱 마리|두 마리'],
['예수님의 변화산 사건에 나타난 구약 인물 두 명은 누구인가요?','모세와 엘리야','모세와 엘리야|아브라함과 이삭|다윗과 솔로몬|에녹과 노아'],
['예수님의 십자가를 지도록 요청받은 시몬은 어느 지역 출신인가요?','구레네','베다니|여리고|가이사랴|구레네'],
['예수님께 고침받은 열 명의 나병 환자 중 돌아와 감사한 사람은 몇 명인가요?','한 명','한 명|두 명|다섯 명|열 명'],
['예수님은 광야에서 며칠 동안 금식하셨나요?','사십 일','사십 일|칠 일|십이 일|삼십 일'],
['예수님은 부활 후 승천하시기 전 며칠 동안 사도들에게 나타나셨나요?','사십 일','삼 일|칠 일|오십 일|사십 일'],
['하나님이 군대의 수를 줄이신 뒤 기드온에게 남은 사람은 몇 명인가요?','삼백 명','백 명|삼백 명|칠백 명|삼천 명'],
['요한복음 21장에서 그물에 잡힌 큰 물고기는 몇 마리였나요?','153마리','120마리|144마리|153마리|200마리'],
['성경의 첫 번째 책은 무엇인가요?','창세기','출애굽기|창세기|마태복음|시편'],
['성경의 마지막 책은 무엇인가요?','요한계시록','유다서|말라기|요한계시록|로마서'],
['바울이 빌레몬에게 다시 받아 달라고 부탁한 사람은 누구인가요?','오네시모','디모데|두기고|에바브라|오네시모'],
['모세가 죽은 뒤 이스라엘을 이끈 사람은 누구인가요?','여호수아','여호수아|갈렙|아론|기드온'],
['엘리사의 뼈에 닿아 다시 살아난 사람은 누구인가요?','이름이 기록되지 않은 죽은 사람','나아만|수넴 여인의 아들|이름이 기록되지 않은 죽은 사람|게하시']
];
const refs:Record<string,string>={'Luke':'누가복음','1 Samuel':'사무엘상','Acts':'사도행전','Genesis':'창세기','Exodus':'출애굽기','Joshua':'여호수아','1 Kings':'열왕기상','John':'요한복음','Matthew':'마태복음','Mark':'마가복음','Judges':'사사기','Philemon':'빌레몬서','2 Kings':'열왕기하','Bible book order':'성경 책 순서'};
function koRef(en:string){for(const [a,b] of Object.entries(refs))if(en.startsWith(a))return en.replace(a,b);return en}
export const defaultQuestions:Question[]=source.questions.map((q,i)=>{const [question,answer,choices]=ko[i];const ci=Math.floor(i/5);return {id:q.id,category:categories[ci],number:q.number,points:q.points,type:'text',question:{ko:question,en:q.question},answer:{ko:answer,en:q.answer},acceptedAnswers:{ko:[answer],en:q.acceptedAnswers||[q.answer]},choices:choices.split('|').map((v,j)=>({ko:v,en:q.choices[j]})),correctChoiceIndex:q.correctChoiceIndex,hint:{ko:'성경 구절을 떠올려 보세요!',en:'Think of the Bible passage!'},explanation:{ko:'성경 구절을 함께 확인해 보세요.',en:'Check the Bible passage together.'},reference:{ko:koRef(q.reference),en:q.reference}}});
const songCategory:Bi={ko:'찬양 맞히기',en:'Name the Worship Song'};
const songInfo=[
 {id:'n0FBb6hnwTo',ko:'하나님의 선하심',en:'Goodness of God',artist:'Jenn Johnson · Bethel Music',aliasesKo:['Goodness of God','굿니스 오브 갓'],aliasesEn:['Goodness Of God']},
 {id:'XtwIT8JjddM',ko:'송축해 내 영혼',en:'10,000 Reasons (Bless the Lord)',artist:'Matt Redman',aliasesKo:['만 가지 이유','10000 Reasons'],aliasesEn:['10,000 Reasons','Bless the Lord']},
 {id:'u-1fwZtKJSM',ko:'살아계신 소망',en:'Living Hope',artist:'Phil Wickham',aliasesKo:['리빙 호프','Living Hope'],aliasesEn:['Living Hope']},
 {id:'JSHRThrP1O0',ko:'영원하신 하나님',en:'Everlasting God',artist:'Chris Tomlin',aliasesKo:['에버래스팅 갓','Everlasting God'],aliasesEn:['Everlasting God']}
];
export const songQuestions:Question[]=songInfo.map((s,i)=>({id:`song-${i+1}`,category:songCategory,number:i+1,points:[200,250,200,200][i],type:'audio',question:{ko:'이 찬양의 제목은 무엇인가요? 먼저 짧은 전주를 들어 보세요.',en:'What is the title of this worship song? Listen to the short intro first.'},answer:{ko:s.ko,en:s.en},acceptedAnswers:{ko:[s.ko,...s.aliasesKo],en:[s.en,...s.aliasesEn]},choices:[],correctChoiceIndex:0,hint:{ko:'제목이 떠오르지 않으면 한 소절 부르기 찬스를 쓰세요.',en:'If you cannot remember the title, use the sing-a-line chance.'},explanation:{ko:`${s.artist}의 찬양입니다.`,en:`This recording is by ${s.artist}.`},reference:{ko:`음원 출처: https://www.youtube.com/watch?v=${s.id}`,en:`Audio source: https://www.youtube.com/watch?v=${s.id}`},audioUrl:`./assets/song-${i+1}-preview.mp3`,audioFullUrl:`./assets/song-${i+1}-full.mp3`,previewSeconds:[8,1,17,3][i],timeLimit:30}));
defaultQuestions.push(...songQuestions);
export function migrateQuestions(input:any):Question[]{const arr=Array.isArray(input)?input:input?.questions;if(!Array.isArray(arr))throw Error('문제 목록이 없습니다. / No question list found.');return arr.map((q:any,i:number)=>{const fallback=defaultQuestions.find(d=>d.id===q.id);const bi=(v:any,f?:Bi):Bi=>typeof v==='string'?{ko:f?.ko||'',en:v}:{ko:String(v?.ko||''),en:String(v?.en||'')};return {id:String(q.id||crypto.randomUUID()),category:bi(q.category,fallback?.category),number:Number(q.number||i+1),points:Number(q.points||100),type:q.type==='audio'||q.type==='sing'?q.type:'text',question:bi(q.question,fallback?.question),answer:bi(q.answer,fallback?.answer),acceptedAnswers:{ko:q.acceptedAnswers?.ko||fallback?.acceptedAnswers.ko||[],en:Array.isArray(q.acceptedAnswers)?q.acceptedAnswers:q.acceptedAnswers?.en||fallback?.acceptedAnswers.en||[]},choices:(q.choices||[]).map((c:any,j:number)=>bi(c,fallback?.choices[j])),correctChoiceIndex:Number(q.correctChoiceIndex||0),hint:bi(q.hint,fallback?.hint),explanation:bi(q.explanation,fallback?.explanation),reference:bi(q.reference,fallback?.reference),audioId:q.audioId,audioUrl:q.audioUrl,audioFullUrl:q.audioFullUrl,previewSeconds:q.previewSeconds,audioStart:q.audioStart,audioEnd:q.audioEnd,timeLimit:q.timeLimit} as Question})}
export function missingTranslations(q:Question){return ![q.category,q.question,q.answer,q.hint,q.explanation,q.reference,...q.choices].every(v=>v.ko.trim()&&v.en.trim())}

