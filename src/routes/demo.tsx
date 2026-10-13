import { createFileRoute } from '@tanstack/react-router';
import { DemoPage, FinalCTA } from '@/components/vocallis-sections';
export const Route = createFileRoute('/demo')({
  head: () => ({ meta: [{title:'Hear Vocallis | Interactive Emergency Call Demo'},{name:'description',content:'Listen to a scripted emergency restoration call simulation: water flow, severity, safety, location and technician dispatch.'},{property:'og:title',content:'Hear Vocallis | Interactive Emergency Call Demo'},{property:'og:description',content:'Hear how an emergency basement flood call is answered, triaged and dispatched.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
  component: () => <><DemoPage/><FinalCTA/></>,
});