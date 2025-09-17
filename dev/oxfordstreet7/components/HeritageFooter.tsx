import Link from 'next/link';
export function HeritageFooter(){
  return(<footer className="site-footer" role="contentinfo"><div className="container">
    <div className="columns">
      <div><h4>About OSDC</h4><p>Oxford Street Development Corporation — stewarding the district’s heritage and future.</p></div>
      <div><h4>Visit</h4><ul><li><Link href="/visit">What’s on</Link></li><li><Link href="/directory">Shops directory</Link></li><li><Link href="/visit#directions">Directions</Link></li></ul></div>
      <div><h4>Governance</h4><ul><li><Link href="/governance">Modern.Gov</Link></li><li><Link href="/planning">Planning (Arcus)</Link></li><li><Link href="/accessibility-privacy">Accessibility & Privacy</Link></li></ul></div>
      <div><h4>Contact</h4><ul><li><Link href="/contact">General enquiries</Link></li><li><a href="mailto:info@example-osdc.gov.uk">info@example-osdc.gov.uk</a></li></ul></div>
    </div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:24,borderTop:'1px solid rgba(255,255,255,0.15)',paddingTop:12}}>
      <small>© {new Date().getFullYear()} Oxford Street Development Corporation</small>
      <small><Link href="/accessibility-privacy">Accessibility & Privacy</Link></small>
    </div>
  </div></footer>);
}
