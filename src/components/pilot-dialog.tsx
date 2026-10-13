import { useState, type FormEvent } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { pilotSchema } from '@/lib/pilot-schema';
import { submitPilot } from '@/lib/pilot.functions';

export function PilotDialog({ open, onOpenChange, plan }: { open: boolean; onOpenChange: (open: boolean) => void; plan: 'Pilot' | 'Starter' | '24/7 Pro Dispatch' }) {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const submit = useServerFn(submitPilot);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = pilotSchema.safeParse({ name: form.get('name'), email: form.get('email'), company: form.get('company'), phone: form.get('phone'), plan });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? 'Check your details.'); return; }
    setPending(true); setError('');
    try { await submit({ data: parsed.data }); setSuccess(true); }
    catch { setError('We couldn’t save your request. Please try again.'); }
    finally { setPending(false); }
  }
  return <Dialog open={open} onOpenChange={(value) => { onOpenChange(value); if (!value) setSuccess(false); }}><DialogContent className="border-border bg-card sm:max-w-md">
    <DialogTitle className="text-2xl">{success ? 'You’re on the list.' : 'Protect your next midnight call.'}</DialogTitle>
    <DialogDescription>{success ? 'Your pilot request has been received.' : `Request your ${plan === 'Pilot' ? '14-day emergency pilot' : plan + ' plan'}.`}</DialogDescription>
    {success ? <div className="py-5"><CheckCircle2 className="mb-4 size-10 text-primary"/><p className="text-sm text-muted-foreground">We have your details and selected plan. Your request does not start billing.</p><Button className="mt-6 w-full" onClick={() => onOpenChange(false)}>Back to Vocallis</Button></div> : <form onSubmit={handleSubmit} className="space-y-4">
      {[['name','Full name','Alex Johnson','text'],['company','Restoration company','Your company','text'],['email','Work email','alex@company.com','email'],['phone','Phone number','(555) 000-0000','tel']].map(([name,label,placeholder,type]) => <label key={name} className="block text-sm font-medium">{label}<input name={name} type={type} placeholder={placeholder} required maxLength={name === 'email' ? 255 : 150} className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-foreground outline-none focus:ring-2 focus:ring-primary"/></label>)}
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <Button disabled={pending} type="submit" className="h-12 w-full">{pending ? <Loader2 className="animate-spin"/> : <ArrowRight/>}{pending ? 'Sending request…' : 'Request emergency pilot'}</Button>
      <p className="text-center text-xs text-muted-foreground">Selected plan: {plan} · No payment collected here.</p>
    </form>}
  </DialogContent></Dialog>;
}