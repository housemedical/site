'use client';
import { useEffect, useState } from 'react';
export function CookieBanner(){
  const [visible,setVisible]=useState(false);
  useEffect(()=>{ const c=window.localStorage.getItem('cookie-consent'); if(!c) setVisible(true); },[]);
  if(!visible) return null;
  return(<div role="dialog" aria-live="polite" aria-label="Cookie consent" className="card" style={{position:'fixed',bottom:16,right:16,maxWidth:360,padding:16,background:'#fff',zIndex:100}}>
    <p>We use only essential cookies to operate this site. No analytics without your consent.</p>
    <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
      <button className="button button--ghost" onClick={()=>{localStorage.setItem('cookie-consent','decline');setVisible(false);}}>Decline</button>
      <button className="button" onClick={()=>{localStorage.setItem('cookie-consent','accept');setVisible(false);}}>Accept</button>
    </div>
  </div>);
}
