# House Medical software studio

A responsive, static website presenting House Medical’s software work across business, finance and public services. The existing GitHub Pages architecture and domain configuration are retained.

## Editing and building

- Edit shared layouts and inner-page content in `scripts/build-pages.py`, and the homepage in `templates/home.html`. Run `python scripts/build-pages.py` to regenerate the root HTML.
- Base styles are in `assets/site.css`; the interactive design and responsive overrides are in `assets/experience.css`. Behaviour is in `assets/site.js`.
- Contact is by email only. There is no enquiry form, form submission service or client-side data collection.
- Self-hosted Manrope and system Georgia provide the typography. No photography is used. Font credits are in `assets/CREDITS.md` and `assets/OFL.txt`.
- The product references inform the positioning but are not named on the website.
- Former healthcare pages redirect to relevant studio pages. Previous versions are recoverable through Git history. Unrelated development projects remain unchanged.

## Private review

Run `python scripts/package-site.py` to generate `dist/`, excluding original photographs, old PDF reports, the GitHub Pages CNAME, source scripts and unrelated development projects. `.openai/hosting.json` retains the same private review site identity.

This design is under review on `design/interactive-studio`. Do not merge it to `main` or deploy it until approved. GitHub Pages serves the public website from `main`.

## Interactive design

- The hero's procedural Canvas field folds a scattered signal into an ordered surface. Its native range control works with touch and arrow keys. Fine pointers gently displace nearby points.
- The studio's sticky instrument assembles through four scroll-driven stages on desktop and mobile. Scrolling remains native and all text stays in the document.
- A full-screen native dialog provides the main menu, keyboard focus containment, Escape to close and focus restoration. Ctrl/Cmd+K toggles it outside editable controls. Inline navigation remains available without JavaScript.
- Software concept panels have gentle pointer tilt and interface transitions. They illustrate the approach and do not claim to show shipped products.
- Capability accordions use native `details`; email links remain normal links, with progressive clipboard support and honest failure feedback.
- The motion control stores only an on/off preference on the current device. Device reduced-motion settings take precedence. Animation pauses when off-screen, the document is hidden, or the menu is open. Canvas resolution is capped and drawing is limited to approximately 30fps.
- There is no scroll hijacking, custom cursor, audio, external animation library, analytics or enquiry form.

## Validation

Run `python scripts/check-site.py` after packaging, `node --check assets/site.js` and `node --test scripts/test-experience.cjs`. These inspect structure, metadata, references, redirects, excluded content, particle geometry and interaction lifecycle with a mocked environment. Browser-based visual testing has not been performed.
