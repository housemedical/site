'use client';
import Link from 'next/link';
import news from '@/data/news.json';
import { useRef, useState, useEffect } from 'react';

export function NewsCarousel(){
  const containerRef=useRef<HTMLDivElement>(null);
  const [index,setIndex]=useState(0);
  const items=[...news].sort((a,b)=>(a.date<b.date?1:-1)).slice(0,5);
  function focusItem(i:number){
    const node=containerRef.current?.querySelector<HTMLAnchorElement>(`[data-idx="${i}"]`);
    node?.focus();
  }
  function go(dir:-1|1){ setIndex((index+dir+items.length)%items.length); }
  useEffect(()=>{focusItem(index)},[index]);
  return(<section aria-labelledby="latest-news" className="section"><div className="container">
    <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between'}}>
      <h2 id="latest-news">News & Updates</h2><div aria-live="polite" className="kicker">Item {index+1} of {items.length}</div>
    </div>
    <div className="card" style={{padding:16}}>
      <div ref={containerRef} role="listbox" aria-label="Latest news" style={{display:'grid',gridTemplateColumns:'1fr',gap:12}}>
        {items.map((n,i)=>(
          <Link key={n.slug} href={`/news/${n.slug}`} role="option" aria-selected={i===index} tabIndex={i===index?0:-1} data-idx={i}
            className="card" style={{padding:16,borderWidth:i===index?2:1,borderColor:i===index?'var(--gold)':'rgba(17,19,22,0.06)'}}
            onKeyDown={(e)=>{if(e.key==='ArrowRight')go(1);if(e.key==='ArrowLeft')go(-1);}}
          >
            <div className="kicker">{n.category}</div>
            <h3 style={{margin:'8px 0'}}>{n.title}</h3>
            <p>{n.excerpt}</p>
            <time dateTime={n.date} className="kicker">{new Date(n.date).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</time>
          </Link>
        ))}
      </div>
      <div style={{display:'flex',gap:8,marginTop:12}}>
        <button className="button button--ghost" onClick={()=>go(-1)} aria-label="Previous news">‹</button>
        <button className="button" onClick={()=>go(1)} aria-label="Next news">›</button>
        <Link href="/news" className="button button--ghost" aria-label="View all news">View all</Link>
      </div>
    </div>
  </div></section>);
}
