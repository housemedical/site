import news from '@/data/news.json';
import Link from 'next/link';
export const metadata = { title: 'News & Updates' };
export default function NewsIndex(){
  const items=[...news].sort((a,b)=>(a.date<b.date?1:-1));
  return(<section className="section"><div className="container">
    <h1>News & Updates</h1>
    <ul style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,listStyle:'none',padding:0}}>
      {items.map(n=>(<li key={n.slug} className="card" style={{padding:16}}>
        <div className="kicker">{n.category}</div>
        <h3><Link href={`/news/${n.slug}`}>{n.title}</Link></h3>
        <p>{n.excerpt}</p>
        <time dateTime={n.date} className="kicker">{new Date(n.date).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</time>
      </li>))}
    </ul>
  </div></section>);
}
