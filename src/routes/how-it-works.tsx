import { createFileRoute } from '@tanstack/react-router';
import { Workflow, Comparison, FinalCTA } from '@/components/vocallis-sections';
export const Route = createFileRoute('/how-it-works')({
  head: () => ({ meta: [{title:'How Vocallis Works | Emergency Triage & Dispatch'},{name:'description',content:'From first-ring answering to emergency triage and on-call technician escalation. See the Vocallis restoration workflow.'},{property:'og:title',content:'How Vocallis Works | Emergency Triage & Dispatch'},{property:'og:description',content:'See how Vocallis turns emergency restoration calls into technician dispatches.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
  component: () => <main><div className="site-container content-page-header"><h1>Emergency dispatch, without the gaps.</h1></div><Workflow/><Comparison/><FinalCTA/></main>,
});