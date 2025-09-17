'use client';
import Link from 'next/link';
import { useState } from 'react';

export function HeritageHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header" role="banner">
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 0'}}>
        <nav aria-label="Top bar" className="kicker" style={{display:'flex',gap:16}}>
          <Link href="/about" className="hover:underline">Departments</Link>
          <Link href="/planning" className="hover:underline">Services</Link>
          <Link href="/news" className="hover:underline">News</Link>
          <Link href="/visit" className="hover:underline">Visiting</Link>
        </nav>
        <div style={{textAlign:'center'}}>
          <Link href="/" className="kicker" aria-label="OSDC home" style={{fontFamily:'var(--font-serif)',fontSize:18,letterSpacing:'.08em'}}>OSDC</Link>
        </div>
        <button aria-expanded={open} aria-controls="mega" onClick={()=>setOpen(v=>!v)} className="button button--ghost">Menu</button>
      </div>
      <div id="mega" hidden={!open} className="hairline" role="navigation" aria-label="Primary navigation">
        <div className="container" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24,padding:'16px 0'}}>
          <div><h4>Visit</h4><ul><li><Link href="/visit">What’s on</Link></li><li><Link href="/directory">Shops directory</Link></li><li><Link href="/visit#directions">Directions & Maps</Link></li></ul></div>
          <div><h4>About & Governance</h4><ul><li><Link href="/about">About OSDC</Link></li><li><Link href="/governance">Governance</Link></li><li><Link href="/planning">Planning</Link></li></ul></div>
          <div><h4>Policies</h4><ul><li><Link href="/accessibility-privacy">Accessibility & Privacy</Link></li><li><Link href="/contact">Contact & Newsletter</Link></li></ul></div>
        </div>
      </div>
    </header>
  );
}
