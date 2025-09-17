import { HeritageHero } from '@/components/HeritageHero';
import { ShopDirectory } from '@/components/ShopDirectory';
export const metadata = { title: 'Shops Directory' };
export default function DirectoryPage(){
  return(<>
    <HeritageHero title="Shops Directory" kicker="Find a store" />
    <ShopDirectory />
  </>);
}
