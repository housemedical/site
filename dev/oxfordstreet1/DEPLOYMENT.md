# Oxford Street Development Corporation - Deployment Guide

## 🚀 Subdomain Deployment Instructions

This guide will help you deploy the OSDC website to a subdomain while keeping your main site intact.

### Prerequisites
- Access to your web hosting control panel (cPanel, Plesk, or similar)
- FTP/SFTP access or file manager access
- A domain you already own (e.g., `yourdomain.com`)

---

## 📁 File Structure for Upload

Upload all these files to your subdomain directory:

```
/public_html/osdc/  (or /httpdocs/osdc/ depending on your host)
├── index.html
├── visit.html
├── shops.html
├── news.html
├── about.html
├── governance.html
├── planning.html
├── README.md
├── DEPLOYMENT.md
├── css/
│   ├── main.css
│   ├── components.css
│   └── accessibility.css
├── js/
│   ├── main.js
│   ├── shops.js
│   ├── accessibility.js
│   └── performance.js
└── assets/
    ├── favicon.svg
    ├── osdc-logo.svg
    ├── osdc-logo-light.svg
    └── (add your images here)
```

---

## 🌐 Method 1: Using cPanel (Most Common)

### Step 1: Create Subdomain
1. **Login to cPanel** for your domain
2. **Find "Subdomains"** in the Domains section
3. **Create new subdomain**:
   - Subdomain: `osdc` 
   - Domain: `yourdomain.com`
   - Document Root: `public_html/osdc` (auto-filled)
4. **Click "Create"**

### Step 2: Upload Files
1. **Open File Manager** in cPanel
2. **Navigate** to `public_html/osdc/` directory
3. **Upload** all website files:
   - Select "Upload" button
   - Choose all files/folders from your computer
   - Extract if uploaded as ZIP

### Step 3: Set Permissions
Most files should have 644 permissions (readable by all, writable by owner):
```bash
Files: 644 (rw-r--r--)
Folders: 755 (rwxr-xr-x)
```

---

## 🌐 Method 2: Using FTP/SFTP

### Step 1: Create Subdomain (via hosting control panel)
Follow Step 1 from Method 1 above.

### Step 2: FTP Upload
1. **Connect via FTP client** (FileZilla, WinSCP, etc.):
   - Host: `ftp.yourdomain.com` or `yourdomain.com`
   - Username: Your cPanel username
   - Password: Your cPanel password
   - Port: 21 (FTP) or 22 (SFTP)

2. **Navigate** to `/public_html/osdc/` directory

3. **Upload** all files and folders:
   - Drag and drop from local computer
   - Maintain folder structure

---

## 🌐 Method 3: Using Git (Advanced)

If your host supports Git:

### Step 1: Create Subdomain
Follow Step 1 from Method 1.

### Step 2: Clone Repository
```bash
cd /public_html/osdc/
git clone [your-repository-url] .
```

### Step 3: Set up Auto-Deploy (optional)
Create a webhook for automatic updates when you push changes.

---

## 📷 Adding Images

### Required Images
You'll need to add these images to make the site look complete:

1. **Download/Create Images**:
   - **Oxford Street photos** (Unsplash.com has great options)
   - **Company logos** (ensure you have usage rights)
   - **Team photos** (professional headshots)

2. **Optimize Images**:
   - **Compress** for web (80-85% JPEG quality)
   - **Resize** to specified dimensions (see assets/.gitkeep)
   - **Convert** to WebP when possible for better performance

3. **Upload to Correct Directories**:
   ```
   /assets/
   ├── hero-desktop.jpg (1200x600px)
   ├── hero-mobile.jpg (800x400px)
   ├── shops/
   │   ├── selfridges-logo.jpg
   │   └── (other shop logos)
   └── team/
       ├── ceo.jpg
       └── (other team photos)
   ```

### Image Sources (Free)
- **Unsplash.com**: High-quality Oxford Street photos
- **Pixabay.com**: Free commercial-use images
- **Pexels.com**: Professional photos
- **Company websites**: Official logos (check usage rights)

---

## ⚙️ Server Configuration

### Recommended .htaccess (Apache)
Create `/public_html/osdc/.htaccess`:

```apache
# Enable GZIP compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>

# Force HTTPS (if SSL certificate is installed)
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### For Nginx (if applicable)
Add to server block:
```nginx
# GZIP compression
gzip on;
gzip_types text/plain text/css application/javascript application/json;

# Caching
location ~* \.(css|js|png|jpg|jpeg|gif|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Security headers
add_header X-Content-Type-Options "nosniff";
add_header X-Frame-Options "SAMEORIGIN";
add_header X-XSS-Protection "1; mode=block";
```

---

## 🔗 DNS and SSL

### DNS Setup
Your subdomain should automatically resolve once created through your hosting provider. If using external DNS:

```
Type: A Record
Name: osdc
Value: [Your server IP address]
TTL: 3600
```

### SSL Certificate
1. **Automatic**: Most hosts provide free SSL (Let's Encrypt)
2. **Manual**: Request SSL certificate through hosting provider
3. **Verification**: Ensure `https://osdc.yourdomain.com` works

---

## 🧪 Testing After Deployment

### 1. Basic Functionality
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Shop directory search/filter functions
- [ ] Mobile responsive design
- [ ] Images display properly

### 2. Performance Testing
- [ ] Run Google PageSpeed Insights
- [ ] Test on GTmetrix.com
- [ ] Check Core Web Vitals

### 3. Accessibility Testing
- [ ] Test keyboard navigation
- [ ] Use accessibility panel features
- [ ] Run browser accessibility audit

### 4. Cross-Browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Edge

---

## 🚨 Troubleshooting Common Issues

### Images Not Loading
```
Problem: 404 errors for images
Solution: 
1. Check file paths are correct
2. Verify image files uploaded to /assets/ folder
3. Check file permissions (644 for files, 755 for folders)
4. Ensure filenames match exactly (case-sensitive on Linux)
```

### CSS/JS Not Loading
```
Problem: Styling/functionality missing
Solution:
1. Check all CSS/JS files uploaded to correct folders
2. Verify .htaccess doesn't block static files
3. Check browser console for error messages
4. Clear browser cache
```

### Mobile Issues
```
Problem: Site doesn't work on mobile
Solution:
1. Verify viewport meta tag is present
2. Test responsive design breakpoints
3. Check touch target sizes (44px minimum)
```

### Performance Issues
```
Problem: Site loads slowly
Solution:
1. Optimize images (compress, resize, use WebP)
2. Enable GZIP compression
3. Set up browser caching
4. Consider CDN for assets
```

---

## 📞 Final Steps

1. **Test thoroughly** on desktop and mobile
2. **Add Google Analytics** (optional)
3. **Submit to search engines** (optional)
4. **Set up monitoring** (uptime, performance)
5. **Create backups** (automated if possible)

### Your Site Will Be Available At:
**`https://osdc.yourdomain.com`**

### Example URLs:
- Homepage: `https://osdc.yourdomain.com`
- Shop Directory: `https://osdc.yourdomain.com/shops.html`
- About: `https://osdc.yourdomain.com/about.html`

---

## 🎉 Success!

Once deployed, you'll have a professional Oxford Street Development Corporation website running on your subdomain, completely separate from your main site. The subdomain acts as an independent website while sharing the same hosting account.

**Need help?** Most hosting providers offer 24/7 support for deployment assistance.