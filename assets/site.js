/* Navigation is progressively enhanced; all content and email links work without JavaScript. */
(() => {
  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  if (button && nav) {
    const mobile = window.matchMedia('(max-width: 760px)');
    const setMenu = (open, returnFocus = false) => {
      button.setAttribute('aria-expanded', String(open));
      button.querySelector('span').textContent = open ? 'Close' : 'Menu';
      nav.hidden = mobile.matches && !open;
      if (returnFocus) button.focus();
    };
    setMenu(false);
    button.addEventListener('click', () => setMenu(button.getAttribute('aria-expanded') !== 'true'));
    mobile.addEventListener('change', () => setMenu(false));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') setMenu(false, true);
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.site-header')) setMenu(false);
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) setMenu(false);
    });
  }
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });
})();
