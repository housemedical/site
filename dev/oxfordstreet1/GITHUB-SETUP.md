# GitHub Deployment Guide for OSDC Website

## 🚀 Quick GitHub Pages Setup

### Step 1: Create New Repository

1. **Go to**: [github.com/new](https://github.com/new)
2. **Repository name**: `oxford-street-development-corp`
3. **Description**: `Oxford Street Development Corporation - Production-ready Heritage Luxe website with full accessibility and performance optimization`
4. **Public** ✅ (required for free GitHub Pages)
5. **Initialize with README** ❌ (we'll upload our own)
6. **Click "Create repository"**

### Step 2: Upload Website Files

**Method A: Drag & Drop (Recommended for beginners)**

1. **Click "uploading an existing file"** in your new repository
2. **Drag these files** from your computer:
   ```
   ✅ index.html
   ✅ visit.html  
   ✅ shops.html
   ✅ news.html
   ✅ about.html
   ✅ governance.html
   ✅ planning.html
   ✅ README.md
   ✅ DEPLOYMENT.md
   ✅ generate-placeholder-images.html
   ```

3. **Create folders and upload**:
   - **Create `css` folder** → Upload: `main.css`, `components.css`, `accessibility.css`
   - **Create `js` folder** → Upload: `main.js`, `shops.js`, `accessibility.js`, `performance.js`  
   - **Create `assets` folder** → Upload: `favicon.svg`, `osdc-logo.svg`, `osdc-logo-light.svg`
   - **Create `assets/shops` folder** → Ready for shop logos
   - **Create `assets/team` folder** → Ready for team photos

4. **Commit changes**: 
   - Commit message: `🎉 Initial deployment of Oxford Street Development Corporation website`
   - **Click "Commit changes"**

**Method B: Git Clone (For developers)**

```bash
# Clone your new repository
git clone https://github.com/YOUR-USERNAME/oxford-street-development-corp.git
cd oxford-street-development-corp

# Copy all OSDC files to this directory
# Then commit and push
git add .
git commit -m "🎉 Initial deployment of OSDC website"
git push origin main
```

### Step 3: Enable GitHub Pages

1. **Go to repository Settings** (tab at top)
2. **Scroll down to "Pages"** (left sidebar)
3. **Source**: "Deploy from a branch"
4. **Branch**: Select `main` (or `master`)
5. **Folder**: `/ (root)`
6. **Click "Save"**

**🎉 Your website will be live at:**
```
https://YOUR-USERNAME.github.io/oxford-street-development-corp/
```

*Note: It may take 5-10 minutes to deploy initially*

---

## 🌐 Custom Subdomain Setup (Optional but Professional)

If you own a domain (e.g., `yourdomain.com`) and want `osdc.yourdomain.com`:

### Step 1: Configure GitHub Pages Custom Domain

1. **In repository Settings → Pages**
2. **Custom domain**: Enter `osdc.yourdomain.com`
3. **Check "Enforce HTTPS"** ✅
4. **Save**

### Step 2: Configure Your Domain DNS

**Log into your domain provider** (GoDaddy, Namecheap, Cloudflare, etc.) and add:

```
Record Type: CNAME
Name: osdc
Value: YOUR-USERNAME.github.io
TTL: 3600 (or Auto)
```

**Examples for popular providers:**

**GoDaddy:**
- DNS Management → Add Record → CNAME
- Host: `osdc`
- Points to: `YOUR-USERNAME.github.io`

**Cloudflare:**
- DNS → Add record → CNAME
- Name: `osdc`
- Target: `YOUR-USERNAME.github.io`
- Proxy status: DNS only (grey cloud)

### Step 3: Wait for DNS Propagation (15 minutes - 24 hours)

**Test your setup:**
```bash
# Check if DNS is working
nslookup osdc.yourdomain.com
```

**🎉 Result**: `https://osdc.yourdomain.com` → Your professional OSDC website!

---

## 📁 File Structure After Upload

Your GitHub repository should look like this:

```
oxford-street-development-corp/
├── 📄 index.html                    # Homepage
├── 📄 visit.html                    # Visit Oxford Street  
├── 📄 shops.html                    # Shop Directory
├── 📄 news.html                     # News & Updates
├── 📄 about.html                    # About OSDC
├── 📄 governance.html               # Governance
├── 📄 planning.html                 # Planning Applications
├── 📄 README.md                     # Documentation
├── 📄 DEPLOYMENT.md                 # Deployment guide
├── 📄 generate-placeholder-images.html # Image generator tool
├── 📁 css/
│   ├── main.css                     # Heritage Luxe theme
│   ├── components.css               # Interactive components  
│   └── accessibility.css            # WCAG compliance
├── 📁 js/
│   ├── main.js                      # Core functionality
│   ├── shops.js                     # Shop directory
│   ├── accessibility.js             # Accessibility features
│   └── performance.js               # Performance optimization
└── 📁 assets/
    ├── favicon.svg                  # Site icon
    ├── osdc-logo.svg                # Main logo
    ├── osdc-logo-light.svg          # Footer logo
    ├── 📁 shops/                    # Shop logos folder
    └── 📁 team/                     # Team photos folder
```

---

## 🖼️ Adding Images (Important!)

The website works without images, but for best presentation:

### Option 1: Use Placeholder Generator
1. **Open**: `generate-placeholder-images.html` (included in your files)
2. **Generate and download** placeholder images
3. **Upload** to appropriate `assets/` folders in GitHub

### Option 2: Professional Images
1. **Download Oxford Street photos** from [Unsplash](https://unsplash.com/s/photos/oxford-street)
2. **Get official logos** from company websites (ensure usage rights)
3. **Optimize images** (compress, resize as needed)
4. **Upload** to GitHub repository `assets/` folder

---

## 🔧 Updating Your Website

**To make changes:**
1. **Edit files** directly in GitHub web interface, or
2. **Clone, edit locally, commit & push**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/oxford-street-development-corp.git
   # Make your changes
   git add .
   git commit -m "Update website content"  
   git push origin main
   ```

**Changes go live automatically** within 1-2 minutes!

---

## 🎯 Professional Demo URLs

**Option 1: GitHub Pages**
```
https://YOUR-USERNAME.github.io/oxford-street-development-corp/
```

**Option 2: Custom Subdomain** 
```
https://osdc.yourdomain.com
```

**Option 3: Custom Domain (if you want)**
```
https://oxfordstreetdc.com (if you buy this domain)
```

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Homepage loads correctly
- [ ] Navigation works (all 7 pages accessible)
- [ ] Shop directory search/filter functions
- [ ] Mobile responsive design works
- [ ] Accessibility panel functions
- [ ] All links work (no 404 errors)
- [ ] HTTPS is working (green padlock)

---

## 🎪 Show It Off!

Once deployed, you can share:

**Portfolio/Resume**: "Built production-ready, WCAG 2.2 AA accessible website with advanced JavaScript functionality"

**Demo Link**: Your GitHub Pages or custom subdomain URL

**GitHub Repo**: Shows your clean, professional code structure

**Features to Highlight**:
- ✨ Heritage Luxe design implementation  
- ♿ Full WCAG 2.2 AA accessibility compliance
- ⚡ Advanced performance optimization
- 📱 Mobile-first responsive design
- 🛠️ Complex interactive components (shop directory)
- 🎯 Production-ready code quality

---

## 🆘 Troubleshooting

**Site not loading?**
- Check GitHub Pages is enabled in Settings → Pages
- Wait 5-10 minutes for initial deployment
- Verify branch is set to `main` (not `master`)

**Custom domain not working?**
- Check DNS settings with your domain provider
- Wait up to 24 hours for DNS propagation
- Ensure HTTPS is enforced in GitHub Pages settings

**Images not showing?**
- Upload images to correct `assets/` subfolders
- Check file paths match exactly (case-sensitive)
- Use placeholder generator tool for quick setup

**Need help?** GitHub has excellent documentation at [docs.github.com/pages](https://docs.github.com/pages)

---

**🎉 You'll have a professional Oxford Street Development Corporation website live on GitHub Pages, perfect for demonstrations and portfolio showcasing!**