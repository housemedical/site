import { ExternalLink } from '@/components/ExternalLink';
export const metadata = { title: 'Planning' };
export default function PlanningPage(){
  return(<section className="section"><div className="container">
    <h1>Planning</h1>
    <p>Search planning applications and track progress via Arcus.</p>
    <ul>
      <li><ExternalLink href="https://planning.example.gov.uk/arcus/search">Search planning applications</ExternalLink></li>
      <li><ExternalLink href="https://planning.example.gov.uk/arcus/map">Interactive planning map</ExternalLink></li>
    </ul>
    <div className="card" style={{padding:16}}>
      <div className="kicker">Connector stub</div>
      <p>When API credentials are available, connect an Arcus endpoint here to surface application data.</p>
    </div>
  </div></section>);
}
