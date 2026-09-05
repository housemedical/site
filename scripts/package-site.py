"""Package the static site, excluding retired content and unrelated projects."""
from pathlib import Path
import shutil
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'dist'
# dist is generated output; start clean so removed assets cannot survive a rebuild.
if OUT.exists():
    assert OUT.name == 'dist' and OUT.parent == ROOT and not OUT.is_symlink()
    shutil.rmtree(OUT)
OUT.mkdir()
for name in ['index.html','404.html','robots.txt','sitemap.xml','about','services','blog','careers','contact','faq','legal','policies','assets']:
    src, dest = ROOT/name, OUT/name
    if src.is_dir():
        shutil.copytree(src, dest)
    else:
        shutil.copy2(src, dest)
print('Packaged software studio pages, redirects and assets in dist/')
