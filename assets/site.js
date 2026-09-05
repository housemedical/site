/* Progressive enhancement. Navigation, report links and content also work without JavaScript. */
(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  const mobile = window.matchMedia('(max-width: 800px)');
  const setMenu = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('span').textContent = open ? 'Close' : 'Menu';
    nav.hidden = mobile.matches && !open;
  };
  if (menuButton && nav) {
    setMenu(false);
    menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
    mobile.addEventListener('change', () => setMenu(false));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        setMenu(false); menuButton.focus();
      }
    });
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.site-header')) setMenu(false);
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenu(false);
    });
  }
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
  const form = document.querySelector('#contact-form');
  if (form) {
    const roles = new Set(['Healthcare Consultant Associate', 'Sales & Partnerships Senior Consultant']);
    const role = new URLSearchParams(location.search).get('role');
    const message = form.querySelector('#message');
    if (roles.has(role) && !message.value) message.value = `I’m interested in the ${role} role.\n\n`;
    const submitButton = form.querySelector('button[type="submit"]');
    const submitLabel = form.querySelector('[data-submit-label]');
    const status = form.querySelector('#form-status');
    window.addEventListener('pageshow', () => {
      submitButton.disabled = false; submitLabel.textContent = 'Send enquiry';
    });
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.reportValidity() || submitButton.disabled) return;
      submitButton.disabled = true; submitLabel.textContent = 'Sending…'; status.textContent = '';
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);
      try {
        const response = await fetch(form.action, {
          method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }, signal: controller.signal
        });
        if (!response.ok) throw new Error('Submission was not accepted');
        form.reset();
        window.location.assign('/contact/thank-you.html');
      } catch {
        status.textContent = 'We couldn’t confirm your message was sent. Please try again, or email sales@housemedical.co.uk directly.';
        status.focus();
        submitButton.disabled = false; submitLabel.textContent = 'Send enquiry';
      } finally { clearTimeout(timeout); }
    });
  }
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.remove('is-pending'); observer.unobserve(entry.target); }
    }), { threshold: 0.05 });
    document.querySelectorAll('.section-heading, .intro-section h2, .perspective-copy, .expertise-panel').forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('reveal-ready', 'is-pending'); observer.observe(el);
      }
    });
    // Keep the document visible even if observer delivery is interrupted.
    setTimeout(() => document.querySelectorAll('.is-pending').forEach(el => el.classList.remove('is-pending')), 5000);
  }
})();
