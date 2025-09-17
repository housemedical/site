import { HeritageHero } from '@/components/HeritageHero';
import { DirectionsMap } from '@/components/DirectionsMap';
export const metadata = { title: 'Visit' };
export default function VisitPage(){
  return(<>
    <HeritageHero title="Visit the district" kicker="What’s on">
      <ul><li>Seasonal window displays</li><li>Late openings on Thursdays</li><li>Talks, tastings and family workshops</li></ul>
    </HeritageHero>
    <DirectionsMap />
  </>);
}
