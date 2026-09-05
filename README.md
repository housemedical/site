# House Medical software studio

A responsive, static website presenting House Medical’s software work across business, finance and public services. The existing GitHub Pages architecture and domain configuration are retained.

## Editing and building

- Edit shared layouts and page content in `scripts/build-pages.py`, then run `python scripts/build-pages.py` to regenerate the root HTML.
- Shared styling and navigation are in `assets/site.css` and `assets/site.js`.
- Contact is by email only. There is no enquiry form, form submission service or client-side data collection.
- Self-hosted Manrope and system Georgia provide the typography. No photography is used. Font credits are in `assets/CREDITS.md` and `assets/OFL.txt`.
- The product references inform the positioning but are not named on the website.
- Former healthcare pages redirect to relevant studio pages. Previous versions are recoverable through Git history. Unrelated development projects remain unchanged.

## Private review

Run `python scripts/package-site.py` to generate `dist/`, excluding original photographs, old PDF reports, the GitHub Pages CNAME, source scripts and unrelated development projects. `.openai/hosting.json` retains the same private review site identity.

## Validation

Run `python scripts/check-site.py` after packaging and `node --check assets/site.js`. These inspect HTML structure, headings, metadata, local links, anchors, redirects and the absence of enquiry forms, obsolete photography and named product references. Navigation is checked separately with a mocked document. Browser-based visual testing has not been performed.
