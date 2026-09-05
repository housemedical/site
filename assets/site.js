(() => {
  'use strict';
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const noise = seed => { const n = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return n - Math.floor(n); };
  // A deterministic point cloud folds into a continuous surface. No external assets.
  function fieldPoint(u, v, index, clarity, time) {
    const mix = clamp(clarity, 0, 1);
    const fold = u * Math.PI * 1.8 + time * .22;
    const ribbonX = (u - .5) * 2.9;
    const ribbonY = (v - .5) * 1.5 * Math.cos(fold) + Math.sin(u * 5.5 + time * .3) * .22;
    const ribbonZ = (v - .5) * 1.5 * Math.sin(fold);
    const x = (noise(index + 1) - .5) * 3.3 * (1 - mix) + ribbonX * mix;
    const y = (noise(index + 4001) - .5) * 2.6 * (1 - mix) + ribbonY * mix;
    const z = (noise(index + 8001) - .5) * 1.7 * (1 - mix) + ribbonZ * mix;
    const turn = -.4 + Math.sin(time * .13) * .07;
    const rx = x * Math.cos(turn) + z * Math.sin(turn);
    const rz = -x * Math.sin(turn) + z * Math.cos(turn);
    const tilt = -.49;
    return {x: rx * Math.cos(tilt) - y * Math.sin(tilt), y: rx * Math.sin(tilt) + y * Math.cos(tilt), z: rz};
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = {clamp, fieldPoint};
  if (typeof document === 'undefined') return;
  document.querySelectorAll('[data-year]').forEach(node => { node.textContent = String(new Date().getFullYear()); });
  document.querySelectorAll('[data-print-page]').forEach(button => {
    if (typeof window.print !== 'function') return;
    button.hidden = false;
    button.addEventListener('click', () => window.print());
  });
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const motionButton = document.querySelector('[data-motion-toggle]');
  let requestedMotion = true;
  try { requestedMotion = localStorage.getItem('house-motion') !== 'off'; } catch (_) { /* Storage is optional. */ }
  let motion = requestedMotion && !reduced.matches;
  let syncField = () => {};
  function applyMotion() {
    motion = requestedMotion && !reduced.matches;
    root.classList.toggle('motion-off', !motion);
    if (motionButton) {
      motionButton.hidden = false;
      motionButton.disabled = reduced.matches;
      motionButton.setAttribute('aria-pressed', String(motion));
      motionButton.setAttribute('aria-label', reduced.matches ? 'Animations off: device reduced-motion setting' : 'Animated effects');
      motionButton.querySelector('[data-motion-label]').textContent = motion ? 'Motion on' : 'Motion off';
    }
    document.querySelectorAll('[data-tilt]').forEach(panel => {
      panel.style.removeProperty('--tilt-x'); panel.style.removeProperty('--tilt-y');
    });
    syncField();
  }
  if (motionButton) motionButton.addEventListener('click', () => {
    requestedMotion = !requestedMotion;
    try { localStorage.setItem('house-motion', requestedMotion ? 'on' : 'off'); } catch (_) { /* Device preference only. */ }
    applyMotion();
  });
  reduced.addEventListener('change', applyMotion);
  applyMotion();

  // Native dialog supplies focus containment, Escape and inert background content.
  const menu = document.querySelector('#site-menu');
  const menuOpen = document.querySelector('[data-open-menu]');
  if (menu && menuOpen && typeof menu.showModal === 'function') {
    root.classList.add('has-menu');
    menuOpen.hidden = false;
    let returnFocus = menuOpen;
    const openMenu = () => {
      if (menu.open) return;
      returnFocus = document.activeElement;
      menu.showModal();
      document.body.classList.add('menu-is-open');
      menu.querySelector('[data-close-menu]').focus();
      syncField();
    };
    menuOpen.addEventListener('click', openMenu);
    menu.querySelector('[data-close-menu]').addEventListener('click', () => menu.close());
    menu.addEventListener('close', () => {
      document.body.classList.remove('menu-is-open');
      if (returnFocus && returnFocus.isConnected) returnFocus.focus({preventScroll: true});
      syncField();
    });
    menu.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => menu.close()));
    document.addEventListener('keydown', event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k' && !event.altKey &&
          !event.target.closest('input, textarea, select, [contenteditable="true"]')) {
        event.preventDefault();
        if (menu.open) menu.close(); else openMenu();
      }
    });
  }

  const canvas = document.querySelector('#signal-field');
  const slider = document.querySelector('#clarity-control');
  const stage = document.querySelector('[data-field-stage]');
  if (canvas && slider && stage) {
    const ctx = canvas.getContext('2d', {alpha: true});
    if (ctx) {
      document.querySelector('[data-field-controls]').hidden = false;
      let width = 1, height = 1, time = 1.6, clarity = Number(slider.value) / 100;
      let targetClarity = clarity, raf = 0, previous = 0, visible = true, pointer = null;
      function draw() {
        ctx.clearRect(0, 0, width, height);
        const columns = width < 600 ? 52 : 76;
        const rows = width < 600 ? 20 : 28;
        const scale = Math.min(width * .39, height * .68);
        ctx.globalCompositeOperation = 'lighter';
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < columns; col++) {
            const point = fieldPoint(col / (columns - 1), row / (rows - 1), row * columns + col, clarity, time);
            const depth = 2.8 / (3.3 + point.z);
            let x = width * .52 + point.x * scale * depth;
            let y = height * .48 + point.y * scale * depth;
            if (pointer && motion) {
              const dx = x - pointer.x, dy = y - pointer.y;
              const distance = Math.hypot(dx, dy);
              const force = Math.max(0, 1 - distance / 140) * 15;
              x += dx / Math.max(distance, 1) * force;
              y += dy / Math.max(distance, 1) * force;
            }
            const alpha = clamp(.32 + depth * .37 + Math.sin(col * .11 + time * .35) * .14, .15, .88);
            ctx.fillStyle = `rgba(${185 + Math.round(row / rows * 45)},255,${100 + Math.round(col / columns * 35)},${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, Math.max(.45, depth * (row % 7 === 0 ? 1.25 : .85)), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      const canAnimate = () => motion && visible && !document.hidden && !(menu && menu.open);
      function frame(stamp) {
        raf = 0;
        if (!canAnimate()) { previous = 0; return; }
        if (!previous || stamp - previous >= 32) {
          const delta = previous ? Math.min((stamp - previous) / 1000, .06) : 0;
          time += delta;
          clarity += (targetClarity - clarity) * .13;
          draw();
          previous = stamp;
        }
        raf = requestAnimationFrame(frame);
      }
      syncField = () => {
        if (canAnimate()) {
          if (!raf) raf = requestAnimationFrame(frame);
        } else {
          cancelAnimationFrame(raf); raf = 0; previous = 0;
          clarity = targetClarity;
          if (visible && !document.hidden) draw();
        }
      };
      function resize() {
        const rect = stage.getBoundingClientRect();
        width = Math.max(1, rect.width); height = Math.max(1, rect.height);
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        draw(); syncField();
      }
      slider.addEventListener('input', () => {
        targetClarity = clamp(Number(slider.value) / 100, 0, 1);
        slider.setAttribute('aria-valuetext', `${Math.round(targetClarity * 100)} percent clarity`);
        if (!canAnimate()) { clarity = targetClarity; draw(); }
        syncField();
      });
      slider.setAttribute('aria-valuetext', `${slider.value} percent clarity`);
      stage.addEventListener('pointermove', event => {
        if (!motion || !finePointer.matches) return;
        const rect = stage.getBoundingClientRect();
        pointer = {x: event.clientX - rect.left, y: event.clientY - rect.top};
      }, {passive: true});
      stage.addEventListener('pointerleave', () => { pointer = null; });
      if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting; syncField();
      }, {threshold: 0}).observe(stage);
      if ('ResizeObserver' in window) new ResizeObserver(resize).observe(stage);
      else window.addEventListener('resize', resize, {passive: true});
      document.addEventListener('visibilitychange', syncField);
      window.addEventListener('pagehide', () => { cancelAnimationFrame(raf); raf = 0; });
      window.addEventListener('pageshow', syncField);
      resize();
    }
  }

  // One scheduled scroll read drives the progress rail and the studio's four states.
  const progress = document.querySelector('.scroll-progress');
  const chapters = [...document.querySelectorAll('.story-chapter')];
  const instrument = document.querySelector('[data-story-stage]');
  const words = ['Understand', 'Simplify', 'Build', 'Refine'];
  let scrollQueued = false, activePhase = -1;
  function updateScroll() {
    scrollQueued = false;
    const max = root.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? clamp(window.scrollY / max, 0, 1) : 0})`;
    if (!instrument || !chapters.length) return;
    let phase = 0;
    chapters.forEach((chapter, index) => {
      if (chapter.getBoundingClientRect().top < window.innerHeight * .6) phase = index;
    });
    if (phase === activePhase) return;
    activePhase = phase;
    instrument.dataset.phase = String(phase);
    instrument.style.setProperty('--phase-progress', `${(phase + 1) * 25}%`);
    instrument.querySelector('[data-phase-count]').textContent = `0${phase + 1} / 04`;
    instrument.querySelector('[data-phase-word]').textContent = words[phase];
  }
  function queueScroll() {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); }
  }
  window.addEventListener('scroll', queueScroll, {passive: true});
  window.addEventListener('resize', queueScroll, {passive: true});
  window.addEventListener('pageshow', queueScroll);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(queueScroll);
  updateScroll();

  document.querySelectorAll('[data-tilt]').forEach(panel => {
    panel.addEventListener('pointermove', event => {
      if (!motion || !finePointer.matches) return;
      const rect = panel.getBoundingClientRect();
      panel.style.setProperty('--tilt-x', `${-(event.clientY - rect.top - rect.height / 2) / rect.height * 3}deg`);
      panel.style.setProperty('--tilt-y', `${(event.clientX - rect.left - rect.width / 2) / rect.width * 3}deg`);
    }, {passive: true});
    panel.addEventListener('pointerleave', () => {
      panel.style.removeProperty('--tilt-x'); panel.style.removeProperty('--tilt-y');
    });
    panel.addEventListener('blur', () => {
      panel.style.removeProperty('--tilt-x'); panel.style.removeProperty('--tilt-y');
    });
  });

  const status = document.querySelector('.copy-status');
  let statusTimeout;
  document.querySelectorAll('[data-copy-email]').forEach(button => {
    if (!navigator.clipboard || !window.isSecureContext || !status) return;
    button.hidden = false;
    button.addEventListener('click', async () => {
      clearTimeout(statusTimeout);
      try {
        await navigator.clipboard.writeText(button.dataset.copyEmail);
        status.textContent = 'Email address copied.';
      } catch (_) {
        status.textContent = 'Couldn’t copy. Select the email address or open it in your email app.';
      }
      statusTimeout = setTimeout(() => { status.textContent = ''; }, 6000);
    });
  });
})();
