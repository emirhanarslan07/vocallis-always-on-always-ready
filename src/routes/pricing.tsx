import { createFileRoute } from '@tanstack/react-router';
import { Pricing, FinalCTA } from '@/components/vocallis-sections';
export const Route = createFileRoute('/pricing')({
  head: () => ({ meta: [{title:'Vocallis Pricing | Pilot, Starter & Pro Dispatch'},{name:'description',content:'Compare the $149 14-day Pilot, $299 Starter and $499 24/7 Pro Dispatch plans for restoration companies.'},{property:'og:title',content:'Vocallis Pricing | Pilot, Starter & Pro Dispatch'},{property:'og:description',content:'Emergency dispatch plans starting with a $149 14-day pilot.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
  component: () => <main><Pricing/><FinalCTA/></main>,
});