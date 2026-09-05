# House Medical

A responsive, static website for House Medical. The existing GitHub Pages architecture and domain configuration are retained: public pages live at the repository root and can be served without a framework, package installation or build step.

## Editing

- Each public route has its own `index.html`.
- Shared presentation and progressive enhancements are in `assets/site.css` and `assets/site.js`.
- Contact enquiries use the existing Formspree endpoint. Native form submission remains available without JavaScript; enhanced submission handles errors and only redirects after an accepted response.
- Existing policy wording, career requirements and reports have been retained. Reports link to the actual underscore-based filenames.
- Original imagery and legacy styling remain available for existing development pages. The `dev/` projects are outside the redesign scope.
- Third-party image and font credits are recorded in `assets/CREDITS.md` and `assets/OFL.txt`. Photos are illustrative, not representations of House Medical staff or premises.

## Private review packaging

Run `python scripts/package-site.py` to copy the public site into `dist/`. The optional `.openai/hosting.json` identifies the private review site. `dist/` is generated and ignored by Git. The review package excludes the GitHub Pages `CNAME`, source tools and unrelated `dev/` projects.

## Validation

The redesign was checked for HTML tag structure, a single main heading on each page, local links and fragment targets, asset existence, JavaScript syntax, unchanged policy text, and contact/menu behaviour using mocked responses. No contact messages were sent. Browser-based visual and end-to-end testing have not been performed.
