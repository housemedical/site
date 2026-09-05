"""Package the public House Medical pages for the private Sites review.
The root HTML remains compatible with the existing GitHub Pages deployment.
"""
from pathlib import Path
import shutil
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'dist'
OUT.mkdir(exist_ok=True)
for name in ['index.html', '404.html', 'robots.txt', 'sitemap.xml', 'about', 'services', 'blog', 'careers', 'contact', 'faq', 'legal', 'policies', 'pdfs', 'assets']:
    src, dest = ROOT / name, OUT / name
    if src.is_dir():
        shutil.copytree(src, dest, dirs_exist_ok=True)
    else:
        shutil.copy2(src, dest)
print('Packaged the public site in dist/')
