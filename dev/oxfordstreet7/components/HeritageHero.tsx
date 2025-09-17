import Image from 'next/image';
export function HeritageHero({ title, kicker, src='/images/hero.png', alt='Oxford Street at dusk', children }:
  { title: string; kicker?: string; src?: string; alt?: string; children?: React.ReactNode }) {
  return (
    <section aria-label="Hero" style={{background:'var(--ivory)',borderTop:'var(--hairline)',borderBottom:'var(--hairline)'}}>
      <div className="container section" style={{display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:24}}>
        <div className="card" style={{overflow:'hidden'}}>
          <Image src={src} alt={alt} width={1200} height={800} priority style={{height:'auto'}} />
        </div>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',gap:12}}>
          {kicker && <div className="kicker">{kicker}</div>}
          <h1>{title}</h1>
          {children && <div>{children}</div>}
        </div>
      </div>
    </section>
  );
}
