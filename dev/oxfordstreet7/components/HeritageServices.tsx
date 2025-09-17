export function HeritageServices(){
  const services=[
    {name:'Concierge',copy:'Wayfinding, reservations and accessibility support.'},
    {name:'Personal Shopping',copy:'Appointments with stylists across flagship stores.'},
    {name:'Gifting',copy:'Wrapped by hand with recycled materials.'},
    {name:'Events',copy:'Talks, tastings and late openings.'},
  ];
  return(<section className="section hairline" aria-labelledby="services"><div className="container">
    <h2 id="services">Services</h2>
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}}>
      {services.map(s=>(<div key={s.name} className="card" style={{padding:16}}><div className="kicker">Service</div><h3 style={{marginTop:8}}>{s.name}</h3><p>{s.copy}</p></div>))}
    </div>
  </div></section>);
}
