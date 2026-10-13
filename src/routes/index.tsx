import { createFileRoute } from "@tanstack/react-router";
import { Hero, PhoneService, HomeCallDemo, Comparison, Workflow, Revenue, Pricing, FinalCTA } from '@/components/vocallis-sections';
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: 'Vocallis | Never Lose a Midnight Flood Call Again' },
    { name: 'description', content: '24/7 AI emergency dispatch for water damage restoration companies. Capture calls, triage emergencies, and alert your on-call team.' },
    { property: 'og:title', content: 'Vocallis | Never Lose a Midnight Flood Call Again' },
    { property: 'og:description', content: 'Your next restoration job won’t wait until morning. Vocallis answers, triages, and dispatches 24/7.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});
function Index() {
  return <main><Hero/><PhoneService/><Comparison/><Workflow/><HomeCallDemo/><Revenue/><Pricing/><FinalCTA/></main>;
}
