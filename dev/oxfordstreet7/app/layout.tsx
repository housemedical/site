import '@/styles/globals.css';
import { inter, cormorant } from './fonts';
import type { Metadata } from 'next';
import { HeritageHeader } from '@/components/HeritageHeader';
import { HeritageFooter } from '@/components/HeritageFooter';
import { CookieBanner } from '@/components/CookieBanner';
import { SkipLink } from '@/components/SkipLink';

export const metadata: Metadata = {
  metadataBase: new URL('https://your-username.github.io/osdc-heritage-luxe-pages'),
  title: { default: 'OSDC — Oxford Street Development Corporation', template: '%s • OSDC' },
  description: 'Official site for the Oxford Street Development Corporation (OSDC).',
  openGraph: {
    type: 'website',
    title: 'OSDC — Oxford Street Development Corporation',
    description: 'Official site for the Oxford Street Development Corporation (OSDC).',
    url: 'https://your-username.github.io/osdc-heritage-luxe-pages',
    siteName: 'OSDC',
    images: [{ url: '/images/hero.png', width: 1200, height: 630, alt: 'Oxford Street at dusk' }]
  },
  alternates: { canonical: '/' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <SkipLink />
        <HeritageHeader />
        <main id="main" style={{minHeight:'60vh'}}>{children}</main>
        <HeritageFooter />
        <CookieBanner />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'GovernmentOrganization',
            name: 'Oxford Street Development Corporation',
            url: 'https://your-username.github.io/osdc-heritage-luxe-pages'
          })}}
        />
      </body>
    </html>
  );
}
