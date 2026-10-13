import { useEffect, useState } from 'react';
import { Phone, Play, RotateCcw, Volume2, VolumeX, Check, ArrowUpRight, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';

const lines = [
  { who: 'Vocallis', text: 'You’ve reached the emergency restoration line. I’m here to help. Is water still flowing?', label: 'Assessing water flow' },
  { who: 'Homeowner', text: 'A pipe burst in our basement. We shut off the water, but the floor is flooded.', label: 'Water source identified' },
  { who: 'Vocallis', text: 'Is this clean water or sewage? Is power off in the affected area? Please stay clear of the water.', label: 'Checking severity & safety' },
  { who: 'Homeowner', text: 'Clean water. The power is off. We’re at 124 Oak Street. My callback is 202-555-0148.', label: 'Location & callback captured' },
  { who: 'Vocallis', text: 'Thank you. I’m alerting the on-call technician with your emergency details.', label: 'Dispatching on-call technician' },
];

export function CallSimulator() {
  const [step, setStep] = useState(-1);
  const [muted, setMuted] = useState(false);
  const [speechAvailable, setSpeechAvailable] = useState(false);
  const playing = step >= 0 && step < lines.length;
  const done = step === lines.length;
  useEffect(() => { setSpeechAvailable('speechSynthesis' in window); return () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); }; }, []);
  useEffect(() => {
    if (!playing) return;
    const line = lines[step];
    let timer: ReturnType<typeof setTimeout>;
    let canceled = false;
    function next() { if (!canceled) setStep(value => value + 1); }
    if (speechAvailable && !muted && line) {
      const utterance = new SpeechSynthesisUtterance(line.text);
      utterance.rate = 1.06; utterance.pitch = line.who === 'Vocallis' ? 1.1 : 0.85;
      utterance.onend = () => { clearTimeout(timer); timer = setTimeout(next, 700); };
      utterance.onerror = () => { clearTimeout(timer); timer = setTimeout(next, 2800); };
      window.speechSynthesis.speak(utterance);
      timer = setTimeout(next, 16000);
    } else { timer = setTimeout(next, 3500); }
    return () => { canceled = true; clearTimeout(timer); if (speechAvailable) window.speechSynthesis.cancel(); };
  }, [step, muted, speechAvailable, playing]);
  const reset = () => { if (speechAvailable) window.speechSynthesis.cancel(); setStep(-1); };
  return <div className="call-widget">
    <div className="flex items-center justify-between border-b border-border pb-5"><span className="flex items-center gap-2 text-xs font-semibold"><span className="status-dot"/> EMERGENCY DISPATCH DEMO</span><span className="rounded border border-border px-2 py-1 text-[10px] text-muted-foreground">SIMULATION</span></div>
    <div className="mt-6 flex items-center gap-3"><div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary"><Phone className="size-5"/></div><div><p className="text-sm font-semibold">Basement flooding</p><p className="mt-1 text-xs text-muted-foreground">Inbound emergency · 2:14 AM</p></div><span className="ml-auto text-xs text-primary">{done ? 'Dispatched' : playing ? 'Connected' : 'Ready to answer'}</span></div>
    <div className={`waveform ${playing ? 'is-playing' : ''}`} aria-hidden="true">{Array.from({length: 55}, (_, i) => <span key={i} className={`wave-bar wave-${i % 9}`}/>)}</div>
    <div className="demo-transcript" aria-live="polite">{step < 0 ? <><span className="text-[10px] font-semibold uppercase text-primary">VOCALLIS · AI DISPATCHER</span><p>“Emergency restoration. We’re here to help. Tell me what’s happening.”</p></> : done ? <><span className="text-[10px] font-semibold uppercase text-primary">DISPATCH COMPLETE</span><p>Emergency details captured.<br/>On-call technician alerted.</p></> : <><span className="text-[10px] font-semibold uppercase text-primary">{lines[step]?.who} · {lines[step]?.who === 'Vocallis' ? 'AI DISPATCHER' : 'CALLER'}</span><p>“{lines[step]?.text}”</p></>}</div>
    <div className="mt-5 flex gap-2"><Button className="h-12 flex-1" onClick={() => playing ? reset() : setStep(0)}>{playing ? <Radio/> : done ? <RotateCcw/> : <Play className="fill-current"/>}{playing ? 'End demo call' : done ? 'Replay emergency call' : 'Listen to a live-style call'}</Button><Button variant="outline" size="icon" className="size-12" aria-label={muted ? 'Unmute demo' : 'Mute demo'} title={muted ? 'Unmute demo' : 'Mute demo'} onClick={() => setMuted(!muted)}>{muted ? <VolumeX/> : <Volume2/>}</Button></div>
    <div className="mt-5 flex items-center justify-between text-[11px] text-muted-foreground"><span className="flex items-center gap-1.5"><Check className="size-3 text-primary"/>{done ? 'Technician alert simulated' : playing ? lines[step]?.label : 'Real scenario. No missed opportunity.'}</span><ArrowUpRight className="size-3"/></div>
  </div>;
}