"""Read-only checks of the generated public site. No network requests."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
import re

ROOT = Path(__file__).resolve().parents[1] / 'dist'
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())
errors = []

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path, self.stack, self.links, self.ids = path, [], [], []
        self.headings = 0
        self.viewport = self.lang = False
        self.redirect = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'html':
            self.lang = bool(attrs.get('lang'))
        if tag == 'h1':
            self.headings += 1
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'meta' and attrs.get('name') == 'viewport':
            self.viewport = True
        if tag == 'meta' and attrs.get('http-equiv') == 'refresh':
            self.redirect = True
            self.links.append(attrs['content'].split('url=', 1)[1])
        if tag in ('a', 'link', 'img', 'script'):
            self.links.append(attrs.get('href') or attrs.get('src') or '')
        if tag in ('form', 'textarea') or (tag == 'input' and not (
            attrs.get('type') == 'range' and attrs.get('id') == 'clarity-control'
            and self.path == Path('index.html')
        )):
            errors.append(f'{self.path}: enquiry field remains: {tag}')
        if tag not in VOID:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if self.stack and self.stack[-1] == tag:
            self.stack.pop()
        else:
            errors.append(f'{self.path}: mismatched closing tag: {tag}')

pages = {}
for path in ROOT.rglob('*.html'):
    page = Page(path.relative_to(ROOT))
    source = path.read_text()
    page.feed(source)
    pages[path] = page
    if page.stack or page.headings != 1 or not page.lang or not page.viewport:
        errors.append(f'{page.path}: HTML structure or essential metadata')
    if len(page.ids) != len(set(page.ids)):
        errors.append(f'{page.path}: duplicate IDs')
    if re.search(r'formspree|healthcare|london|gotaxes|councilreport', source, re.I):
        errors.append(f'{page.path}: obsolete content or named product reference')

references = 0
for path, page in pages.items():
    for reference in page.links:
        url = urlsplit(reference)
        if url.scheme or url.netloc:
            continue
        target = ROOT / unquote(url.path).lstrip('/') if url.path.startswith('/') else path.parent / unquote(url.path) if url.path else path
        if target.is_dir():
            target /= 'index.html'
        if not target.is_file():
            errors.append(f'{page.path}: missing target: {reference}')
        elif url.fragment and target in pages and url.fragment not in pages[target].ids:
            errors.append(f'{page.path}: missing anchor: {reference}')
        references += 1

for pattern in ('*.webp', '*.jpg', '*.jpeg', '*.png', '*.pdf'):
    if list(ROOT.rglob(pattern)):
        errors.append(f'Obsolete imagery or reports packaged: {pattern}')
if re.search(r'fetch\(|FormData|formspree', (ROOT / 'assets/site.js').read_text(), re.I):
    errors.append('Form delivery or a network request remains in JavaScript')

print(json.dumps({'pages': len(pages), 'legacy_redirects': sum(p.redirect for p in pages.values()), 'local_references': references, 'errors': errors}, indent=2))
raise SystemExit(bool(errors))
