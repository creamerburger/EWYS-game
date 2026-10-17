let ctx:AudioContext|null=null;
let tickHigh=false;

export function playSound(kind:'click'|'tick'|'timeup'|'correct'|'wrong'|'box'|'bomb'|'win',enabled:boolean,urgent=false){
  if(!enabled)return;
  try{
    ctx ||= new AudioContext();
    if(ctx.state==='suspended')void ctx.resume();
    const now=ctx.currentTime;
    if(kind==='click'){
      const oscillator=ctx.createOscillator();
      const gain=ctx.createGain();
      oscillator.type='sine';
      oscillator.frequency.setValueAtTime(680,now);
      oscillator.frequency.exponentialRampToValueAtTime(980,now+.055);
      gain.gain.setValueAtTime(.0001,now);
      gain.gain.exponentialRampToValueAtTime(.075,now+.012);
      gain.gain.exponentialRampToValueAtTime(.0001,now+.095);
      oscillator.connect(gain).connect(ctx.destination);
      oscillator.start(now);
      oscillator.stop(now+.1);
      return;
    }
    if(kind==='tick'){
      tickHigh=!tickHigh;
      const oscillator=ctx.createOscillator();
      const gain=ctx.createGain();
      oscillator.type='square';
      oscillator.frequency.setValueAtTime(tickHigh?1160:820,now);
      gain.gain.setValueAtTime(.0001,now);
      gain.gain.exponentialRampToValueAtTime(urgent?.065:.032,now+.003);
      gain.gain.exponentialRampToValueAtTime(.0001,now+.055);
      oscillator.connect(gain).connect(ctx.destination);
      oscillator.start(now);
      oscillator.stop(now+.06);
      return;
    }
    const notes={timeup:[650,520,390],correct:[523,659,784,1046],wrong:[260,190],box:[330,392,440,520],bomb:[180,120,80],win:[523,659,784,1046,1318]}[kind];
    notes.forEach((hz,i)=>{
      const oscillator=ctx!.createOscillator();
      const gain=ctx!.createGain();
      oscillator.type=kind==='bomb'?'sawtooth':'triangle';
      oscillator.frequency.setValueAtTime(hz,now+i*.11);
      gain.gain.setValueAtTime(.0001,now+i*.11);
      gain.gain.exponentialRampToValueAtTime(.08,now+i*.11+.02);
      gain.gain.exponentialRampToValueAtTime(.0001,now+i*.11+.22);
      oscillator.connect(gain).connect(ctx!.destination);
      oscillator.start(now+i*.11);
      oscillator.stop(now+i*.11+.23);
    });
  }catch{}
}
