# OSDC — Heritage Luxe (Next.js 14)

Production-ready public site for the Oxford Street Development Corporation (OSDC) with a **Heritage Luxe** aesthetic.

## Tech
- Next.js 14 (App Router) + React 18
- TypeScript
- Next/Image with AVIF/WebP output
- JSON content stubs for News & Shops

## Install
```bash
pnpm i   # or npm i / yarn
pnpm dev # http://localhost:3000
pnpm build && pnpm start
```

## Structure
```
/app                     # App Router pages
/components              # Reusable, accessible UI
/data                    # JSON stubs for news & directory
/public/images           # Placeholder assets (CC)
/styles/globals.css      # Tokens & base styles
```

## Content updates
- **News**: edit `data/news.json` (slug, title, date, excerpt, body, image).
- **Shops**: edit `data/shops.json` (name, category, address, hours, etc.).
- Images: drop replacements into `/public/images/` and update JSON if filenames change.

## Integrations (stubs)
- **Modern.Gov**: Governance page contains a “Latest decisions” feed placeholder. When you have an endpoint, create a server component that fetches from it and renders cards.
- **Arcus Planning**: Planning page signposts to Arcus; replace placeholders with real links or a server action that queries an Arcus API.

## Accessibility (WCAG 2.2 AA)
- Skip link, logical landmarks and headings.
- `:focus-visible` rings with high contrast (gold on ivory).
- Keyboardable carousel and dialog modal; tab order maintained.
- Reduced motion respected via media query.
- Touch targets ≥ 44px, semantic HTML and ARIA where appropriate.

Run aXe/WAVE in the browser — core journeys should pass. If any issue arises, adjust in `components/` or `styles/globals.css`.

## Performance
- LCP image uses `priority` on the home hero.
- Images load through Next/Image (AVIF/WebP). All non-critical below-the-fold images use `loading="lazy"`.
- Minimal JS in components; server-rendered pages by default.
- Aim for Lighthouse: Performance ≥ 90, Accessibility ≥ 95.

## SEO
- `metadata` exports for titles/meta and Open Graph.
- Organization JSON‑LD in `app/layout.tsx`.
- Article JSON‑LD on news detail pages.

## GDPR & data residency
- Cookie banner appears only when consent not recorded; no analytics enabled by default.
- Newsletter uses a double opt‑in placeholder.
- Hosting: recommend deploying on Vercel with a UK/EU region (edge and object storage in EU/UK where available). Check contractual data residency requirements for OSDC before enabling analytics or third‑party scripts.

## Deploy (Vercel)
1. Create a new Vercel project, import this repo.
2. Set framework to Next.js, enable Build Output API.
3. Set Production/Preview regions to EU/UK (if available).
4. Deploy. After DNS cutover, update `metadataBase` in `app/layout.tsx`.

---
© Oxford Street Development Corporation
