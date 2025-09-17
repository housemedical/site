import Link from 'next/link';
const DEPARTMENTS=[
  {name:'Fashion',href:'/directory?category=Fashion'},
  {name:'Beauty',href:'/directory?category=Beauty'},
  {name:'Home',href:'/directory?category=Home'},
  {name:'Food Hall',href:'/directory?category=Food Hall'},
  {name:'Gifts',href:'/directory?category=Gifts'},
  {name:'Kids',href:'/directory?category=Kids'},
];
export function HeritageDepartments(){
  return(<section aria-labelledby="departments" className="section"><div className="container">
    <h2 id="departments">Departments</h2>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:16,marginTop:16}}>
      {DEPARTMENTS.map(d=>(<Link key={d.name} href={d.href} className="card" style={{padding:16}}>
        <div className="kicker">Explore</div><h3 style={{marginTop:8}}>{d.name}</h3><span className="button button--ghost" aria-hidden="true">Browse</span>
      </Link>))}
    </div>
  </div></section>);
}
