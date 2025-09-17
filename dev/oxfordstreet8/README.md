# OSDC — Heritage Luxe (Next.js → GitHub Pages)

**How this deploys**
- This repo uses **GitHub Actions** to build (`next export`) and publish to **GitHub Pages**.
- It auto-detects whether you are using a **custom domain** (via `public/CNAME`) or a **project page** (e.g. `https://username.github.io/<repo>`), and sets `basePath` accordingly.

**One-time setup**
1. Create a new GitHub repo and upload all files.
2. In **Settings → Pages → Build and deployment**, set **Source = GitHub Actions**.
3. Push to `main`. The workflow publishes the site automatically.

**Custom subdomain (optional)**
- Add `public/CNAME` with your subdomain (e.g. `demo.yourdomain.com`) and create the CNAME DNS record at your DNS host.
