import { HeritageHero } from '@/components/HeritageHero';
import { HeritageDepartments } from '@/components/HeritageDepartments';
import { HeritageFeatureRows } from '@/components/HeritageFeatureRows';
import { HeritageServices } from '@/components/HeritageServices';
import { NewsCarousel } from '@/components/NewsCarousel';

export default function Page(){
  return (<>
    <HeritageHero title="Heritage Luxe on Oxford Street" kicker="Seasonal highlights">
      <p>Welcome to OSDC — your guide to visiting, news and planning across the district.</p>
    </HeritageHero>
    <HeritageDepartments />
    <HeritageFeatureRows />
    <HeritageServices />
    <NewsCarousel />
  </>);
}
