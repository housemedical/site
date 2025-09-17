import { ExternalLink } from '@/components/ExternalLink';
export const metadata = { title: 'Governance' };
export default function GovernancePage(){
  return(<section className="section"><div className="container">
    <h1>Governance</h1>
    <p>Access agendas, minutes and decisions via our Modern.Gov portal.</p>
    <p><ExternalLink href="https://democracy.example.gov.uk/modern.gov/">Open Modern.Gov</ExternalLink></p>
    <div className="card" style={{padding:16}} aria-live="polite" aria-busy="true">
      <div className="kicker">Latest decisions (feed)</div>
      <p>This is a placeholder for the Modern.Gov decisions feed. When an endpoint is provided, wire the client here.</p>
    </div>
  </div></section>);
}
