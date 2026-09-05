# House Medical software studio

A responsive, static website presenting House Medical’s software work across business, finance and public services. The existing GitHub Pages architecture and domain configuration are retained.

## Editing and building

- Edit shared layouts and page assembly in `scripts/build-pages.py`. Main-page content is in `templates/`; policy and FAQ content is in `content/policies.json` and `content/faqs.json`. Run `python scripts/build-pages.py` to regenerate the root HTML.
- Base styles are in `assets/site.css`; interactive design is in `assets/experience.css`; long-form content, policies, FAQs and print layouts are in `assets/content.css`. Behaviour is in `assets/site.js`.
- Contact is by email only. There is no enquiry form, form submission service or client-side data collection.
- Self-hosted Manrope and system Georgia provide the typography. No photography is used. Font credits are in `assets/CREDITS.md` and `assets/OFL.txt`.
- The product references inform the positioning but are not named on the website.
- Former healthcare pages redirect to relevant studio pages. Previous versions are recoverable through Git history. Unrelated development projects remain unchanged.

## Private review

Run `python scripts/package-site.py` to generate `dist/`, excluding original photographs, old PDF reports, the GitHub Pages CNAME, source scripts and unrelated development projects. `.openai/hosting.json` retains the same private review site identity.

GitHub Pages serves the public website from `main`. The Sites project is a separate owner-only view of the same source. Keep the two source trees aligned when publishing an update.

## Content and policies

The site has 14 content pages and three legacy redirects. All six original policy URLs are full pages again, with a policy directory, section navigation, cross-links and a print option. The FAQ is also a full page.

The original policies were recovered from commit `7cdd6d6` and adapted to the software-studio context. The environmental policy preserves the original 2030 net-zero ambition and distinguishes it from verified results. The modern-slavery page is a standing policy, not a fabricated signed annual statement. No customer metrics, certifications, delivery guarantees or performance scores have been invented.

Policy edition dates identify the website text, not a board approval. Policy content should be kept aligned with the business's actual practices. Source notes are in `content/SOURCES.md`.

Shared metadata includes canonical URLs, Open Graph text and Organization/WebSite/WebPage JSON-LD. The sitemap includes all active content pages. No social-preview image or extra third-party dependency has been added.

## Interactive design

- The hero's procedural Canvas field folds a scattered signal into an ordered surface. Its native range control works with touch and arrow keys. Fine pointers gently displace nearby points.
- The studio's sticky instrument assembles through four scroll-driven stages on desktop and mobile. Scrolling remains native and all text stays in the document.
- A full-screen native dialog provides the main menu, keyboard focus containment, Escape to close and focus restoration. Ctrl/Cmd+K toggles it outside editable controls. Inline navigation remains available without JavaScript.
- Software concept panels have gentle pointer tilt and interface transitions. They illustrate the approach and do not claim to show shipped products.
- Capability accordions use native `details`; email links remain normal links, with progressive clipboard support and honest failure feedback.
- The motion control stores only an on/off preference on the current device. Device reduced-motion settings take precedence. Animation pauses when off-screen, the document is hidden, or the menu is open. Canvas resolution is capped and drawing is limited to approximately 30fps.
- There is no scroll hijacking, custom cursor, audio, external animation library, analytics or enquiry form.

## Validation

Run `python scripts/check-site.py` after packaging, `node --check assets/site.js` and `node --test scripts/test-experience.cjs`. These inspect structure, metadata, structured-data syntax, references, policy restoration, the sitemap, excluded content, particle geometry and interaction lifecycle with a mocked environment. Browser-based visual testing has not been performed.
