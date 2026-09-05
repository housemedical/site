"""Generate the static House Medical software studio website. No dependencies."""
from pathlib import Path
from html import escape
import json
ROOT = Path(__file__).resolve().parents[1]
EMAIL = 'sales@housemedical.co.uk'
ARROW = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.5"/></svg>'
RIGHT = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M12 5l7 7-7 7" stroke="currentColor" stroke-width="1.5"/></svg>'
MARK = '<span class="logotype">house<span>.</span></span><span class="brand-caption">Software<br>studio</span>'
PAGES = []
def link(href,label,cls='text-link'):
 return f'<a class="{cls}" href="{href}"><span>{label}</span>{ARROW}</a>'
def header(active):
 markup = f'''<a class="skip-link" href="#main">Skip to content</a><div class="scroll-progress" aria-hidden="true"></div>
<header class="site-header"><div class="wrap header-inner"><a class="brand" href="/" aria-label="House Medical software studio home">{MARK}</a><span class="header-note">Design meets engineering.</span><div class="header-actions"><a class="header-email" href="mailto:{EMAIL}">Let’s talk {ARROW}</a><button class="menu-open" data-open-menu type="button" aria-haspopup="dialog" aria-controls="site-menu" aria-keyshortcuts="Control+k Meta+k" hidden>Menu <span aria-hidden="true">+</span></button></div><nav class="inline-nav" aria-label="Main navigation"><a href="/services/">What we build</a><a href="/about/">Our approach</a><a href="/contact/">Contact</a><a href="/policies/">Policies</a><a href="/faq/">FAQs</a></nav></div></header>
<dialog class="menu-dialog" id="site-menu" aria-labelledby="menu-title"><div class="menu-dialog-inner"><div class="menu-top"><a class="brand" href="/" aria-label="House Medical home">{MARK}</a><button class="menu-close" data-close-menu type="button">Close <span aria-hidden="true">×</span></button></div><h2 class="sr-only" id="menu-title">Explore House Medical</h2><nav aria-label="Main navigation"><a href="/"><span>01</span><strong>The studio</strong>{ARROW}</a><a href="/services/"><span>02</span><strong>What we build</strong>{ARROW}</a><a href="/about/"><span>03</span><strong>How we think</strong>{ARROW}</a><a href="/contact/"><span>04</span><strong>Let’s talk</strong>{ARROW}</a></nav><div class="menu-bottom"><a href="mailto:{EMAIL}">{EMAIL}</a><div class="menu-secondary"><a href="/policies/">Policies</a><a href="/faq/">FAQs</a></div></div></div></dialog>'''
 target = '/' if active == 'home' else f'/{active}/'
 return markup.replace(f'<a href="{target}">', f'<a href="{target}" aria-current="page">') if active else markup
def footer(cta=True):
 return (f'''<section class="contact-cta"><div class="wrap"><p class="eyebrow">Good things start with a conversation.</p><a class="big-contact-link" href="mailto:{EMAIL}"><h2>What if<br><em>we built it?</em></h2><span class="contact-orbit">{ARROW}</span></a><div class="cta-bottom"><a class="text-link" href="mailto:{EMAIL}"><span>{EMAIL}</span>{ARROW}</a><button class="copy-email" data-copy-email="{EMAIL}" type="button" hidden>Copy email <span aria-hidden="true">+</span></button></div></div></section>''' if cta else '')+f'''<footer class="site-footer"><div class="wrap"><div class="footer-top"><p>Independent minds.<br>Useful software.</p><div><span class="footer-label">Explore</span><a href="/services/">What we build</a><a href="/about/">Our approach</a><a href="/faq/">FAQs</a><a href="/contact/">Contact</a></div><div><span class="footer-label">Our policies</span><a href="/policies/">All policies</a><a href="/policies/diversity-equity-inclusion/">Diversity &amp; inclusion</a><a href="/policies/environmental-policy/">Environment &amp; sustainability</a><a href="/policies/health-and-safety/">Health, safety &amp; wellbeing</a><a href="/policies/quality-management/">Quality management</a><a href="/policies/modern-slavery/">Modern slavery &amp; human rights</a><a href="/policies/data-protection-privacy/">Data protection &amp; privacy</a></div><div><span class="footer-label">The company</span><a href="/legal/">Company information</a><a href="mailto:{EMAIL}">{EMAIL}</a></div></div><a class="footer-word-link" href="/" aria-label="House Medical home"><div class="footer-word" aria-hidden="true">house<span>.</span></div></a><div class="footer-bottom"><p>© <span data-year>2026</span> House Medical Consultants Ltd</p><span>Made with intent.</span><a href="#top">Back to top ↑</a></div></div></footer><button class="motion-toggle" type="button" data-motion-toggle aria-label="Animated effects" aria-pressed="true" hidden><span class="motion-bars" aria-hidden="true"><i></i><i></i><i></i></span><span data-motion-label>Motion on</span></button><p class="copy-status" role="status" aria-live="polite"></p>'''
def write(path,title,desc,body,active='',cta=True,extra=''):
 url='/' if path=='index.html' else '/'+path.removesuffix('index.html')
 schema = {
  '@context': 'https://schema.org',
  '@graph': [
   {'@type': 'Organization', '@id': 'https://housemedical.co.uk/#organization',
    'name': 'House Medical', 'legalName': 'House Medical Consultants Ltd',
    'url': 'https://housemedical.co.uk/', 'email': EMAIL,
    'identifier': {'@type': 'PropertyValue', 'propertyID': 'UK company number', 'value': '12540692'}},
   {'@type': 'WebSite', '@id': 'https://housemedical.co.uk/#website',
    'url': 'https://housemedical.co.uk/', 'name': 'House Medical',
    'publisher': {'@id': 'https://housemedical.co.uk/#organization'}, 'inLanguage': 'en-GB'},
   {'@type': 'WebPage', 'url': 'https://housemedical.co.uk'+url, 'name': title+' | House Medical',
    'description': desc, 'isPartOf': {'@id': 'https://housemedical.co.uk/#website'}, 'inLanguage': 'en-GB'}
  ]
 }
 structured = json.dumps(schema, ensure_ascii=False).replace('<', '\\u003c')
 page=f'''<!doctype html>
<html lang="en-GB" id="top">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{escape(title)} | House Medical</title><meta name="description" content="{escape(desc,quote=True)}">
<meta name="theme-color" content="{'#080b0a' if path == 'index.html' else '#f2f3ed'}"><link rel="canonical" href="https://housemedical.co.uk{url}">
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
<link rel="preload" as="font" type="font/ttf" href="/assets/manrope-regular.ttf" crossorigin>
<link rel="preload" as="font" type="font/ttf" href="/assets/manrope-bold.ttf" crossorigin>
<link rel="stylesheet" href="/assets/site.css"><link rel="stylesheet" href="/assets/experience.css"><link rel="stylesheet" href="/assets/content.css"><script src="/assets/site.js" defer></script>
<meta property="og:type" content="website"><meta property="og:site_name" content="House Medical">
<meta property="og:title" content="{escape(title+' | House Medical', quote=True)}"><meta property="og:description" content="{escape(desc, quote=True)}">
<meta property="og:url" content="https://housemedical.co.uk{url}"><meta property="og:locale" content="en_GB">
<script type="application/ld+json">{structured}</script>
{extra}
<noscript><style>.home .site-header{{position:relative;background:var(--dark)}}.experience-hero{{min-height:0}}.hero-content{{padding-top:65px;padding-bottom:80px}}.hero-rail{{position:relative}}.hero-field,.story-instrument{{display:none}}.inline-nav{{display:flex!important;flex-wrap:wrap;gap:20px}}.header-note{{display:none}}@media(max-width:760px){{.site-header{{height:auto}}.header-inner{{flex-wrap:wrap;padding-block:20px}}.inline-nav{{width:100%;padding-top:15px}}}}</style></noscript>
</head><body class="{'home' if path == 'index.html' else 'inner-page'}">
{header(active or ('home' if path == 'index.html' else ''))}
<main id="main">{body}</main>
{footer(cta)}
</body></html>'''
 p=ROOT/path;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(page);PAGES.append(path)
def intro(kicker, title, desc):
 return f'<section class="wrap page-intro"><p class="eyebrow">{kicker}</p><h1>{title}</h1><p class="page-lede">{desc}</p></section>'

def template(name):
 return (ROOT/'templates'/name).read_text().replace('{{ARROW}}', ARROW).replace('{{RIGHT}}', RIGHT)

POLICIES = json.loads((ROOT/'content/policies.json').read_text())
FAQS = json.loads((ROOT/'content/faqs.json').read_text())
EDITION = '2026-09-05'
EDITION_LABEL = '5 September 2026'
POLICY_RESOURCES = {
 'diversity-equity-inclusion': [('Discrimination and the law — Acas', 'https://www.acas.org.uk/discrimination-and-the-law')],
 'health-and-safety': [('Managing home workers’ health and safety — HSE', 'https://www.hse.gov.uk/home-working/employer/index.htm'),
                       ('Display screen equipment — HSE', 'https://www.hse.gov.uk/msd/dse/')],
 'modern-slavery': [('Annual modern slavery statements — GOV.UK', 'https://www.gov.uk/guidance/publish-an-annual-modern-slavery-statement')],
 'data-protection-privacy': [('Your information rights — ICO', 'https://ico.org.uk/for-the-public/'),
                             ('GitHub privacy statement', 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement')]
}

def policy_directory():
 cards = []
 for index, policy in enumerate(POLICIES, 1):
  cards.append(f'''<a class="policy-card" href="/policies/{policy['slug']}/">
   <div class="policy-card-top"><span class="eyebrow">{index:02d} / {policy['category']}</span>{ARROW}</div>
   <h2>{escape(policy['title'])}</h2><p>{escape(policy['summary'])}</p><span class="policy-card-link">Read the policy {RIGHT}</span>
  </a>''')
 return intro('Our policies', 'Principles matter.<br><em>So does putting them to work.</em>',
  'The commitments behind House Medical: how we treat people, approach quality, handle information and consider our wider impact.') + f'''
 <section class="wrap policy-overview"><div class="policy-overview-intro"><p>Six policies. One place to find them.</p><span>Website edition <time datetime="{EDITION}">{EDITION_LABEL}</time></span></div>
 <div class="policy-directory">{''.join(cards)}</div></section>
 <section class="wrap editorial-section"><div class="editorial-heading"><p class="eyebrow">Using these policies</p><h2>Clear commitments.<br><em>Useful context.</em></h2></div><div class="editorial-copy"><p>These pages set out our corporate policies and approach as a software studio. Each policy has section links so you can go directly to the information you need, and a print option for reference.</p><p>Specific products, contracts or working arrangements may have additional requirements. The website edition date identifies this published text and does not imply a separate certification or statutory approval.</p><p>Questions or concerns can be sent to the studio. Include the relevant policy and enough context to help us understand the matter.</p>{link('mailto:'+EMAIL+'?subject=Policy%20question','Ask about a policy')}{link('/legal/','Company information')}</div></section>'''

def policy_page(policy):
 parts = policy['title'].split(' & ', 1)
 heading = escape(parts[0]) + ('<br><em>&amp; '+escape(parts[1])+'</em>' if len(parts) == 2 else '')
 sections = ''.join(f'<section class="policy-section" id="{section["id"]}"><h2>{escape(section["title"])}</h2>{section["body"]}</section>' for section in policy['sections'])
 contents = ''.join(f'<li><a href="#{section["id"]}"><span>{index:02d}</span>{escape(section["title"])}</a></li>' for index, section in enumerate(policy['sections'], 1))
 resources = POLICY_RESOURCES.get(policy['slug'], [])
 further = ('<section class="policy-resources"><h2>Further information</h2><ul>' +
            ''.join(f'<li><a href="{url}">{escape(title)} {ARROW}</a></li>' for title, url in resources) + '</ul></section>') if resources else ''
 others = [p for p in POLICIES if p['slug'] != policy['slug']]
 related = ''.join(f'<a href="/policies/{p["slug"]}/">{escape(p["title"])} {RIGHT}</a>' for p in others)
 return f'''<section class="wrap policy-hero">
 <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">The studio</a><span aria-hidden="true">/</span><a href="/policies/">Policies</a><span aria-hidden="true">/</span><span aria-current="page">{escape(policy['title'])}</span></nav>
 <p class="eyebrow">{policy['category']} / Our commitments</p><h1>{heading}</h1><p class="page-lede">{escape(policy['lead'])}</p>
 <div class="policy-meta"><span>Website edition <time datetime="{EDITION}">{EDITION_LABEL}</time></span><span>House Medical Consultants Ltd</span><button class="print-policy" type="button" data-print-page hidden>Print policy {ARROW}</button></div></section>
 <div class="wrap policy-layout"><aside class="policy-contents"><p class="eyebrow">On this page</p><nav aria-label="Policy sections"><ol>{contents}</ol></nav><a class="policy-back" href="/policies/">All six policies {RIGHT}</a></aside>
 <article class="policy-document" aria-label="{escape(policy['title'], quote=True)} policy">{sections}
 <section class="policy-contact"><p class="eyebrow">Questions or concerns?</p><h2>Talk to the studio.</h2><p>Tell us which policy your message relates to and what you would like us to consider. Share only the information needed to understand the matter.</p>{link('mailto:'+EMAIL+'?subject=Policy%20question',EMAIL)}</section>{further}</article></div>
 <section class="wrap policy-related"><p class="eyebrow">Explore our other policies</p><div>{related}</div></section>'''

def faq_page():
 groups = list(dict.fromkeys(item['group'] for item in FAQS))
 jump = ''.join(f'<a href="#faq-{index}">{escape(group)} {RIGHT}</a>' for index, group in enumerate(groups, 1))
 sections = []
 for index, group in enumerate(groups, 1):
  answers = ''.join(f'''<details id="{item['id']}"><summary>{escape(item['question'])}<span aria-hidden="true">+</span></summary><div class="faq-answer">{item['answer']}</div></details>''' for item in FAQS if item['group'] == group)
  sections.append(f'<section class="faq-group" id="faq-{index}"><div class="faq-group-heading"><span class="eyebrow">0{index}</span><h2>{escape(group)}</h2></div><div class="faq-list">{answers}</div></section>')
 return intro('Frequently asked questions', 'Good questions.<br><em>Clear answers.</em>',
  'More about the software we build, what makes a useful starting conversation and how this website works.') + f'''
 <nav class="wrap page-jump" aria-label="FAQ topics">{jump}</nav><div class="wrap faq-groups">{''.join(sections)}</div>
 <section class="wrap related-band"><div><p class="eyebrow">Something else on your mind?</p><h2>Ask us<br><em>about it.</em></h2></div><div><p>If your question is not covered here, send the studio a short message with the context. For an issue with a particular product, include its name and use its own support route where one is provided.</p>{link('/contact/','Get in touch')}</div></section>'''

write('index.html', 'Complexity into clarity',
 'Thoughtful design and careful engineering. House Medical builds useful software for business, public services and everyday life.', template('home.html'))
write('services/index.html', 'Web applications, automation & connected services',
 'Explore House Medical’s software capabilities: guided web applications, purposeful automation and connected services for business and public-service tasks.',
 template('services.html'), active='services')
write('about/index.html', 'Our approach to useful software',
 'How House Medical approaches software: understand the task, simplify the journey, build with care and refine the details that matter.',
 template('about.html'), active='about')
write('contact/index.html', 'Talk to the software studio',
 'Contact House Medical about a software idea, product question, website feedback or policy matter. A guide to a useful first conversation.',
 template('contact.html'), active='contact', cta=False)
write('legal/index.html', 'Company information',
 'Company number, registered office and contact details for House Medical Consultants Ltd, with links to the studio’s policies and privacy notice.',
 template('legal.html'), cta=False)
write('faq/index.html', 'Frequently asked questions',
 'Answers about House Medical’s software work, automation, product ideas, quality, website accessibility and privacy.',
 faq_page(), active='faq')
write('policies/index.html', 'Our policies',
 'House Medical’s policies on diversity and inclusion, environment, health and safety, quality, modern slavery and privacy.',
 policy_directory(), active='policies', cta=False)
for policy in POLICIES:
 write(f'policies/{policy["slug"]}/index.html', policy['title'], policy['summary'], policy_page(policy), cta=False)
write('404.html', 'Page not found', 'The page could not be found.',
 intro('404 / Page not found', 'A small detour.<br><em>Let’s head back.</em>',
       'The page may have moved, or the address may be incomplete.') +
 '<div class="wrap not-found-actions">'+link('/','Back to the studio','button-link')+link('/policies/','Find a policy')+link('/faq/','Read the FAQs')+'</div>',
 cta=False, extra='<meta name="robots" content="noindex">')

# Keep incoming links useful; policy and FAQ URLs now contain full content.
redirects = {'blog/index.html':'/#work', 'careers/index.html':'/contact/', 'contact/thank-you.html':'/contact/'}
for path, target in redirects.items():
 p=ROOT/path
 p.parent.mkdir(parents=True,exist_ok=True)
 p.write_text(f'<!doctype html>\n<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>House Medical</title><meta name="robots" content="noindex"><link rel="canonical" href="https://housemedical.co.uk{target}"><meta http-equiv="refresh" content="0;url={target}"></head><body><main><h1>This page has moved.</h1><p><a href="{target}">Continue to House Medical</a></p></main></body></html>\n')
(ROOT/'assets/favicon.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#d9fb6c"/><text x="13" y="48" fill="#18211c" font-family="Arial,sans-serif" font-size="53" font-weight="700">h</text><circle cx="50" cy="47" r="4" fill="#18211c"/></svg>\n')
(ROOT/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join('<url><loc>https://housemedical.co.uk'+('/' if p=='index.html' else '/'+p.removesuffix('index.html'))+'</loc><lastmod>'+EDITION+'</lastmod></url>' for p in PAGES if p!='404.html')+'</urlset>\n')
(ROOT/'robots.txt').write_text('User-agent: *\nAllow: /\nDisallow: /dev/\nSitemap: https://housemedical.co.uk/sitemap.xml\n')
print(f'Built {len(PAGES)} content pages and {len(redirects)} legacy redirects.')
