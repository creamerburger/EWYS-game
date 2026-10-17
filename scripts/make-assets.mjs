import {writeFileSync} from 'node:fs';
const dir=new URL('../public/assets/',import.meta.url);
const shell=(body,view='0 0 256 256')=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${view}"><defs><linearGradient id="gold" x2=".2" y2="1"><stop stop-color="#fff5aa"/><stop offset=".45" stop-color="#ffc94f"/><stop offset="1" stop-color="#b66b25"/></linearGradient><linearGradient id="purple" x2="1" y2="1"><stop stop-color="#a065d5"/><stop offset="1" stop-color="#351877"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>${body}</svg>`;
const star='<path fill="#ffe783" filter="url(#glow)" d="M128 10l7 21 22 4-17 14 2 22-14-12-15 12 3-22-17-14 22-4z"/>';
const card=(symbol,color='#ffdc68')=>shell(`${star}<rect x="38" y="65" width="180" height="165" rx="18" fill="url(#purple)" stroke="url(#gold)" stroke-width="12"/><rect x="53" y="80" width="150" height="135" rx="11" fill="none" stroke="#f8e6aa" stroke-width="3" opacity=".65"/><text x="128" y="179" text-anchor="middle" font-size="99" font-family="Arial,sans-serif" font-weight="bold" fill="${color}" filter="url(#glow)">${symbol}</text>`);
const items={
 'bomb.svg':shell(`${star}<path d="M128 58c-50 0-85 35-85 85 0 49 37 88 85 88s85-39 85-88c0-50-35-85-85-85z" fill="#211d38" stroke="url(#gold)" stroke-width="7"/><path d="M129 57c-2-23 8-35 26-38" fill="none" stroke="#eabc64" stroke-width="11" stroke-linecap="round"/><path d="M156 15l9-10 4 14 15 2-11 10 3 15-13-7-12 8 2-15-11-8z" fill="#ffca5a"/><ellipse cx="97" cy="112" rx="29" ry="17" fill="#ffffff55" transform="rotate(-30 97 112)"/>`),
 'explosion.svg':shell(`<g filter="url(#glow)"><path fill="#ff7338" stroke="#fff7a0" stroke-width="9" d="M130 5l21 55 41-27-8 55 58 6-44 33 45 34-62 8 7 57-43-31-17 54-21-56-44 30 7-58-57-7 42-31L9 91l60-7-8-56 43 32z"/><circle cx="128" cy="128" r="53" fill="#fff088"/></g>`),
 'coins-gems.svg':shell(`${star}<ellipse cx="89" cy="177" rx="50" ry="29" fill="url(#gold)" stroke="#fff6bd" stroke-width="5"/><ellipse cx="154" cy="182" rx="51" ry="29" fill="url(#gold)" stroke="#fff6bd" stroke-width="5"/><ellipse cx="120" cy="149" rx="52" ry="29" fill="url(#gold)" stroke="#fff6bd" stroke-width="5"/><path d="M175 72l34 28-19 52-46-4-14-48z" fill="#35d5ef" stroke="#c5faff" stroke-width="6"/><path d="M175 72v78M130 100l79 0" stroke="#d6fcff" stroke-width="3"/>`),
 'swap-card.svg':card('↔'),
 'steal-card.svg':card('◆','#7ceaf0'),
 'double-card.svg':card('×2'),
 'blank-card.svg':card('?','#e6d8ff'),
 'celebration.svg':shell(`<rect width="256" height="256" fill="url(#purple)"/>${star}<path d="M15 222L82 15M232 234L180 5" stroke="#ffe083" stroke-width="15" opacity=".4"/><g fill="#ffd770"><circle cx="36" cy="50" r="6"/><circle cx="199" cy="56" r="9"/><circle cx="70" cy="198" r="7"/><circle cx="217" cy="192" r="5"/></g>`)
};
for(const [name,svg] of Object.entries(items))writeFileSync(new URL(name,dir),svg,'utf8');
