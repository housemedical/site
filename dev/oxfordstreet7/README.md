# OSDC — Heritage Luxe (GitHub Pages static export)

This is a GitHub Pages–ready static export of the OSDC demo (Next.js 14).

## Run locally
```bash
npm i
npm run dev
# build static
npm run export
# output in ./out
```

## Deploy to GitHub Pages
1. Edit **public/CNAME** and set your subdomain (e.g. `demo.yourdomain.com`). Or delete the file if not using a custom domain yet.
2. Commit & push to a new GitHub repo (branch: `main`).
3. The workflow in `.github/workflows/pages.yml` will build and publish the `out/` folder.

### DNS for custom subdomain
Create a CNAME at your DNS provider:
- **Host**: `demo`
- **Target**: `<your-username>.github.io`

Then go to **Repo → Settings → Pages** and confirm the custom domain + HTTPS.

---
© Oxford Street Development Corporation
