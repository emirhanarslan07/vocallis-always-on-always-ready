import { createContext, useContext, useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, AudioLines, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PilotDialog } from './pilot-dialog';

type Plan = 'Pilot' | 'Starter' | '24/7 Pro Dispatch';
const PilotContext = createContext<(plan?: Plan) => void>(() => {});
export const usePilot = () => useContext(PilotContext);
export function VocallisLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState<Plan>('Pilot');
  const [menu, setMenu] = useState(false);
  const start = (selected: Plan = 'Pilot') => { setPlan(selected); setOpen(true); setMenu(false); };
  return <PilotContext.Provider value={start}>
    <header className="site-header"><div className="site-container flex h-20 items-center justify-between gap-6"><Link to="/" className="brand"><AudioLines className="size-7 text-primary"/>vocallis<span className="brand-period">.</span></Link><nav className="hidden items-center gap-8 md:flex"><Link to="/how-it-works" activeProps={{className:'text-primary'}}>How it works</Link><Link to="/results" activeProps={{className:'text-primary'}}>Revenue recovered</Link><Link to="/pricing" activeProps={{className:'text-primary'}}>Pricing</Link></nav><div className="flex items-center gap-5"><Link to="/demo" className="hidden items-center gap-2 text-sm lg:flex"><span className="status-dot"/>Hear it in action</Link><Button onClick={() => start()} className="header-pilot h-11 px-4">Apply for pilot <ArrowRight/></Button><Button variant="ghost" size="icon" className="md:hidden" aria-label={menu ? 'Close menu' : 'Open menu'} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</Button></div></div>{menu && <nav className="mobile-nav"><Link to="/how-it-works" onClick={() => setMenu(false)}>How it works</Link><Link to="/results" onClick={() => setMenu(false)}>Revenue recovered</Link><Link to="/pricing" onClick={() => setMenu(false)}>Pricing</Link><Link to="/demo" onClick={() => setMenu(false)}>Hear it in action</Link><Button onClick={() => start()}>Apply for the 14-Day Pilot <ArrowRight/></Button></nav>}</header>
    {children}
    <footer className="site-container flex flex-wrap items-center justify-between gap-6 border-t border-border py-8"><Link to="/" className="brand text-xl"><AudioLines className="size-5 text-primary"/>vocallis.</Link><p className="text-xs text-muted-foreground">Built for the people who show up when disaster strikes.</p><span className="text-xs text-muted-foreground">© 2026 Vocallis</span></footer>
    <PilotDialog open={open} onOpenChange={setOpen} plan={plan}/>
  </PilotContext.Provider>;
}