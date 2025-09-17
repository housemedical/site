import { ExternalLink } from './ExternalLink';
export function DirectionsMap(){
  const address='Oxford Street, London W1';
  return(<section id="directions" className="section" aria-labelledby="directions-heading">
    <div className="container">
      <h2 id="directions-heading">Directions</h2>
      <div className="card" style={{overflow:'hidden'}}>
        <iframe title="Map of Oxford Street" width="100%" height="420" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Oxford%20Street%20London&output=embed"/>
      </div>
      <div style={{display:'flex',gap:12,marginTop:12,flexWrap:'wrap'}}>
        <ExternalLink href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}>Open in Google Maps</ExternalLink>
        <ExternalLink href={`https://maps.apple.com/?q=${encodeURIComponent(address)}`}>Open in Apple Maps</ExternalLink>
        <ExternalLink href="https://tfl.gov.uk/plan-a-journey/">Plan with TfL</ExternalLink>
      </div>
    </div>
  </section>);
}
