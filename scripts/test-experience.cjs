/* Focused interaction checks without a browser or network. */
const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const {fieldPoint} = require('../assets/site.js');
const source = fs.readFileSync(path.join(__dirname, '../assets/site.js'), 'utf8');

function environment({reduce = false, canvasAvailable = true, clipboardFails = false} = {}) {
  const events = () => ({listeners: {}, addEventListener(name, fn) { (this.listeners[name] ||= []).push(fn); },
    emit(name, event = {}) { return Promise.all((this.listeners[name] || []).map(fn => fn(event))); }});
  const element = () => ({...events(), hidden: true, isConnected: true, attributes: {}, dataset: {},
    classList: {values: new Set(), add(x) {this.values.add(x);}, remove(x) {this.values.delete(x);}, toggle(x, on) {on ? this.add(x) : this.remove(x);}},
    style: {setProperty(k, v) {this[k] = v;}, removeProperty(k) {delete this[k];}},
    setAttribute(k, v) {this.attributes[k] = v;}, focus() {this.focused = true;}, closest() {return null;},
    querySelector() {return null;}, querySelectorAll() {return [];},
    getBoundingClientRect() {return {width: 800, height: 600, left: 0, top: 0};}});
  const root = element(); root.scrollHeight = 5000;
  const body = element(), menu = element(), open = element(), close = element(), toggle = element(), label = element();
  const canvas = element(), slider = element(), stage = element(), controls = element(), progress = element();
  const instrument = element(), count = element(), word = element(), copy = element(), status = element();
  const reduced = {...events(), matches: reduce};
  const fine = {...events(), matches: true};
  let arcs = 0, frameID = 0, copied = '';
  const frames = new Map();
  canvas.getContext = () => canvasAvailable ? {
    clearRect() {}, setTransform() {}, beginPath() {}, fill() {},
    arc(x, y, r) { assert.ok(Number.isFinite(x) && Number.isFinite(y) && r > 0); arcs++; }
  } : null;
  slider.value = '72';
  menu.open = false;
  menu.showModal = () => {menu.open = true;};
  menu.close = () => {menu.open = false; menu.emit('close');};
  menu.querySelector = () => close;
  toggle.querySelector = () => label;
  instrument.querySelector = selector => selector === '[data-phase-count]' ? count : word;
  const chapters = [0, 1, 2, 3].map(index => ({getBoundingClientRect: () => ({top: 800 + index * 600 - win.scrollY})}));
  copy.dataset.copyEmail = 'sales@housemedical.co.uk';
  const bySelector = {'[data-motion-toggle]': toggle, '#site-menu': menu, '[data-open-menu]': open,
    '#signal-field': canvas, '#clarity-control': slider, '[data-field-stage]': stage,
    '[data-field-controls]': controls, '.scroll-progress': progress, '[data-story-stage]': instrument, '.copy-status': status};
  const doc = {...events(), documentElement: root, body, activeElement: open, hidden: false,
    querySelector: selector => bySelector[selector] || null,
    querySelectorAll: selector => selector === '.story-chapter' ? chapters : selector === '[data-copy-email]' ? [copy] : []};
  const win = {...events(), innerHeight: 800, scrollY: 0, devicePixelRatio: 3, isSecureContext: true,
    matchMedia: query => query.includes('reduced-motion') ? reduced : fine};
  let intersection;
  class IntersectionObserver { constructor(fn) {intersection = fn;} observe() {} }
  class ResizeObserver { constructor(fn) {this.fn = fn;} observe() {} }
  win.IntersectionObserver = IntersectionObserver; win.ResizeObserver = ResizeObserver;
  const requestAnimationFrame = fn => {frames.set(++frameID, fn); return frameID;};
  const cancelAnimationFrame = id => frames.delete(id);
  vm.runInNewContext(source, {window: win, document: doc, IntersectionObserver, ResizeObserver,
    requestAnimationFrame, cancelAnimationFrame, setTimeout: () => 1, clearTimeout() {},
    localStorage: {getItem() {throw Error('denied');}, setItem() {throw Error('denied');}},
    navigator: {clipboard: {async writeText(text) {if (clipboardFails) throw Error('denied'); copied = text;}}}});
  return {win, doc, menu, open, close, toggle, label, slider, canvas, controls, frames, root, reduced,
    copy, status, count, word, instrument, progress, arcs: () => arcs, copied: () => copied,
    visible(value) {intersection([{isIntersecting: value}]);},
    tick(stamp) {const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn(stamp));}};
}

test('particle geometry remains finite across endpoints, time and the surface grid', () => {
  for (const clarity of [0, .5, 1]) for (const time of [0, 1.6, 1000]) {
    for (let i = 0; i < 400; i++) {
      const p = fieldPoint((i % 20) / 19, Math.floor(i / 20) / 19, i, clarity, time);
      for (const coordinate of Object.values(p)) assert.ok(Number.isFinite(coordinate) && Math.abs(coordinate) < 3);
      assert.ok(3.3 + p.z > 1, 'projection never approaches division by zero');
    }
  }
  assert.notDeepEqual(fieldPoint(.4, .8, 16, 0, 0), fieldPoint(.4, .8, 16, 1, 0));
});

test('motion pauses for visibility, menu and preference, and returns focus', async () => {
  const e = environment();
  assert.equal(e.canvas.width, 1200, 'device pixel ratio capped at 1.5');
  assert.equal(e.frames.size, 1);
  e.tick(40); assert.ok(e.arcs() > 2000);
  e.visible(false); assert.equal(e.frames.size, 0);
  e.visible(true); assert.equal(e.frames.size, 1);
  await e.open.emit('click'); assert.equal(e.menu.open, true); assert.equal(e.frames.size, 0);
  await e.close.emit('click'); assert.equal(e.open.focused, true); assert.equal(e.frames.size, 1);
  e.doc.hidden = true; await e.doc.emit('visibilitychange'); assert.equal(e.frames.size, 0);
  e.doc.hidden = false; await e.doc.emit('visibilitychange'); assert.equal(e.frames.size, 1);
  await e.toggle.emit('click'); assert.equal(e.frames.size, 0); assert.equal(e.label.textContent, 'Motion off');
  const before = e.arcs(); e.slider.value = '100'; await e.slider.emit('input');
  assert.ok(e.arcs() > before, 'paused field responds to manual slider input');
  assert.equal(e.slider.attributes['aria-valuetext'], '100 percent clarity');
  assert.equal(e.frames.size, 0);
});

test('reduced motion and missing Canvas preserve other controls', async () => {
  const reduced = environment({reduce: true});
  assert.equal(reduced.frames.size, 0); assert.equal(reduced.toggle.disabled, true);
  assert.equal(reduced.controls.hidden, false);
  const e = environment({canvasAvailable: false});
  assert.equal(e.controls.hidden, true);
  await e.open.emit('click'); assert.equal(e.menu.open, true);
  await e.doc.emit('keydown', {metaKey: true, key: 'k', target: {closest: () => null}, preventDefault() {}});
  assert.equal(e.menu.open, false);
  e.win.scrollY = 2200; await e.win.emit('scroll'); e.tick(40);
  assert.equal(e.instrument.dataset.phase, '3'); assert.equal(e.word.textContent, 'Refine');
  await e.copy.emit('click'); assert.equal(e.copied(), 'sales@housemedical.co.uk');
  assert.equal(e.status.textContent, 'Email address copied.');
});

test('clipboard failure shows an actionable message', async () => {
  const e = environment({clipboardFails: true});
  await e.copy.emit('click');
  assert.match(e.status.textContent, /Couldn’t copy/);
  assert.equal(e.copied(), '');
});
