import { createFileRoute } from '@tanstack/react-router';
import { Revenue, FinalCTA } from '@/components/vocallis-sections';
export const Route = createFileRoute('/results')({
  head: () => ({ meta: [{title:'Revenue Recovered | Vocallis Dashboard Preview'},{name:'description',content:'Preview how Vocallis tracks captured emergency calls, dispatch time, and estimated revenue saved. Illustrative dashboard data.'},{property:'og:title',content:'Revenue Recovered | Vocallis Dashboard Preview'},{property:'og:description',content:'See the value of every answered emergency call with the Vocallis dashboard preview.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
  component: () => <main><div className="site-container content-page-header"><h1>See the jobs you didn’t miss.</h1></div><Revenue/><FinalCTA/></main>,
});