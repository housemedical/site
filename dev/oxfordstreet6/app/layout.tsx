import './globals.css';
import '@/styles/globals.css';
import { inter, cormorant } from './fonts';
import type { Metadata } from 'next';
import { HeritageHeader } from '@/components/HeritageHeader';
import { HeritageFooter } from '@/components/HeritageFooter';
import { CookieBanner } from '@/components/CookieBanner';
import { SkipLink } from '@/components/SkipLink';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.example-osdc.gov.uk'),
  title: {
    default: 'OSDC — Oxford Street Development Corporation',
    template: '%s • OSDC'
  },
  description: 'Official site for the Oxford Street Development Corporation (OSDC): news, visiting, shops directory, planning and governance.',
  openGraph: {
    type: 'website',
    title: 'OSDC — Oxford Street Development Corporation',
    description: 'Official site for the Oxford Street Development Corporation (OSDC).',
    url: 'https://www.example-osdc.gov.uk',
    siteName: 'OSDC',
    images: [{ url: '/images/hero.png', width: 1200, height: 630, alt: 'Oxford Street at dusk' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OSDC — Oxford Street Development Corporation',
    description: 'Official site for the Oxford Street Development Corporation (OSDC).'
  },
  alternates: { canonical: '/' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <SkipLink />
        <HeritageHeader />
        <main id="main" className="min-h-[60vh]">{children}</main>
        <HeritageFooter />
        <CookieBanner />
        <script
          type="application/ld+json"
          // Organization JSON-LD
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'GovernmentOrganization',
            name: 'Oxford Street Development Corporation',
            url: 'https://www.example-osdc.gov.uk',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'London',
              addressRegion: 'London',
              addressCountry: 'UK'
            }
          })}}
        />
      </body>
    </html>
  );
}
