'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import shops from '@/data/shops.json';
import Image from 'next/image';
import Link from 'next/link';
import { externalProps } from '@/lib/utils';
type Shop = typeof shops[number];
const CATEGORIES = Array.from(new Set(shops.map(s => s.category)));
export function ShopDirectory(){
  const [q,setQ]=useState(''); const [cat,setCat]=useState<string|null>(null);
  const [active,setActive]=useState<Shop|null>(null); const dialogRef=useRef<HTMLDialogElement>(null);
  useEffect(()=>{ if(typeof window==='undefined')return; const p=new URLSearchParams(window.location.search); const c=p.get('category'); if(c) setCat(c); },[]);
  const filtered = useMemo(()=> shops.filter(s=>(!cat||s.category===cat)&&(q.trim().length===0||s.name.toLowerCase().includes(q.toLowerCase()))), [q,cat]);
  function openModal(s:Shop){ setActive(s); const d=dialogRef.current; if(!d)return; d.showModal(); document.body.style.overflow='hidden'; setTimeout(()=>d.querySelector<HTMLElement>('h3')?.focus(),0); }
  function closeModal(){ const d=dialogRef.current; if(!d)return; d.close(); document.body.style.overflow=''; setActive(null); }
  return (<section aria-labelledby="shops" className="section"><div className="container">
    <h2 id="shops">Shops Directory</h2>
    <div className="card" style={{padding:16}}>
      <form role="search" aria-label="Search shops" className="hairline" style={{display:'grid',gridTemplateColumns:'1fr auto',gap:12,paddingTop:12}} onSubmit={e=>e.preventDefault()}>
        <input aria-label="Search by name" placeholder="Search by name…" value={q} onChange={e=>setQ(e.target.value)}
          style={{padding:12,borderRadius:12,border:'1px solid rgba(17,19,22,0.12)'}}/>
        <select aria-label="Filter by category" value={cat??''} onChange={e=>setCat(e.target.value||null)}
          style={{padding:12,borderRadius:12,border:'1px solid rgba(17,19,22,0.12)'}}>
          <option value="">All categories</option>{CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
      </form>
      <ul aria-live="polite" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginTop:16,padding:0,listStyle:'none'}}>
        {filtered.map(s=>(<li key={s.id} className="card" style={{overflow:'hidden'}}>
          <button onClick={()=>openModal(s)} className="button button--ghost" style={{width:'100%',border:'none',borderRadius:0,padding:0}} aria-label={`Open details for ${s.name}`}>
            <Image src={s.image.replace('.avif','.png')} alt={`Photo of ${s.name}`} width={800} height={600}/>
          </button>
          <div style={{padding:16}}>
            <div className="kicker">{s.category}</div><h3 style={{marginTop:8}}>{s.name}</h3><p>{s.address}</p>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              <button className="button" onClick={()=>openModal(s)} aria-label={`Details for ${s.name}`}>Details</button>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`} {...externalProps()} className="button button--ghost">Open in Maps</a>
            </div>
          </div>
        </li>))}
      </ul>
    </div>
  </div>
  <dialog ref={dialogRef} aria-modal="true" role="dialog" onClose={closeModal} onCancel={(e)=>{e.preventDefault();closeModal();}} style={{border:'none',borderRadius:'var(--radius-2xl)',padding:0,width:'min(720px,96vw)'}}>
    {active && (<div><div style={{display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:0}}>
      <Image src={active.image.replace('.avif','.png')} alt={`Photo of ${active.name}`} width={800} height={600}/>
      <div style={{padding:16}}>
        <div className="kicker">Shop</div><h3 tabIndex={-1} style={{marginTop:8}}>{active.name}</h3><p>{active.description}</p>
        <p><strong>Address:</strong> {active.address}</p><p><strong>Hours:</strong> {active.hours}</p>
        <p><strong>Phone:</strong> <a href={`tel:${active.phone}`}>{active.phone}</a></p>
        <p><a href={active.website} {...externalProps()} className="button button--ghost">Website</a></p>
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(active.address)}`} {...externalProps()} className="button">Open in Google Maps</a>
          <a href={`https://maps.apple.com/?q=${encodeURIComponent(active.address)}`} {...externalProps()} className="button button--ghost">Open in Apple Maps</a>
        </div>
        <div style={{display:'flex',justifyContent:'flex-end',marginTop:16}}><button className="button" onClick={closeModal}>Close</button></div>
      </div>
    </div></div>)}
  </dialog>
  </section>);
}
