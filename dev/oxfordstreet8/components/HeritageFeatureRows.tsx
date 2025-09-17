import Image from 'next/image';
export function HeritageFeatureRows(){
  const rows=[
    {title:'Winter windows',copy:'Heritage craft meets modern retail staging across the district.',img:'/images/winter-windows.png',alt:'Winter window display'},
    {title:'Dining & delights',copy:'From patisserie to plant-forward plates in our Food Hall.',img:'/images/shop-food.png',alt:'Dining in the district'}
  ];
  return(<section aria-label="Highlights" className="section"><div className="container" style={{display:'grid',gap:24}}>
    {rows.map((r,i)=>(<div key={r.title} className="card" style={{display:'grid',gridTemplateColumns:i%2?'1fr 1.2fr':'1.2fr 1fr',gap:16,overflow:'hidden'}}>
      <Image src={r.img} alt={r.alt} width={1000} height={700} loading="lazy" />
      <div style={{display:'flex',flexDirection:'column',justifyContent:'center',padding:24}}><h3>{r.title}</h3><p>{r.copy}</p></div>
    </div>))}
  </div></section>);
}
