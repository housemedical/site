import news from '@/data/news.json';
import Image from 'next/image';
import type { Metadata } from 'next';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return news.map(n => ({ slug: n.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const item = news.find(n => n.slug === params.slug);
  if (!item) return { title: 'News' };
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: { images: [{ url: item.image.replace('.avif', '.png') }] },
    alternates: { canonical: `/news/${item.slug}` }
  };
}

export default function NewsArticle({ params }: Props) {
  const item = news.find(n => n.slug === params.slug);
  if (!item) return <p className="container section">Not found.</p>;
  return (
    <article className="section" itemScope itemType="https://schema.org/NewsArticle">
      <div className="container">
        <div className="kicker">{item.category}</div>
        <h1 itemProp="headline">{item.title}</h1>
        <div className="card" style={{overflow:'hidden', marginBlock:12}}>
          <Image src={item.image.replace('.avif', '.png')} alt="" width={1200} height={800} />
        </div>
        <p itemProp="description">{item.excerpt}</p>
        <div dangerouslySetInnerHTML={{ __html: item.body }} />
        <p><time dateTime={item.date}>{new Date(item.date).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' })}</time> · <span itemProp="author">{item.author}</span></p>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context':'https://schema.org','@type':'NewsArticle',headline:item.title,datePublished:item.date,author:{'@type':'Organization',name:'OSDC'}
        })}}/>
      </div>
    </article>
  );
}
