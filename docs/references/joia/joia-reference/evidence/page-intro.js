/* =================================================================
   JOIA · shared internal-page hero intro
   Reveals a [data-phero-title] (line-rise) + .phero__eyebrow/.phero__lead
   when the engine fires `joia:ready` (loader lifted). Safe everywhere.
   ================================================================= */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s);

  function reveal() {
    const title = $('[data-phero-title]');
    if (!title) return;
    if (reduce || !window.gsap || !window.SplitText) {
      title.style.visibility = 'visible';
      if (window.gsap) gsap.set('.phero__eyebrow, .phero__lead', { autoAlpha: 1, y: 0 });
      return;
    }
    gsap.set(title, { visibility: 'visible' });
    const lines = new SplitText(title, { type: 'lines', mask: 'lines' }).lines;
    gsap.set(lines, { yPercent: 122 });
    gsap.set('.phero__eyebrow, .phero__lead', { autoAlpha: 0, y: 18 });
    gsap.timeline()
      .to(lines, { yPercent: 0, stagger: 0.1, duration: 0.95, ease: 'power3.out' }, 0)
      .to('.phero__eyebrow, .phero__lead', { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out' }, 0.3);
  }

  let started = false;
  const start = () => { if (started) return; started = true; reveal(); };
  document.addEventListener('joia:ready', start, { once: true });
  addEventListener('load', () => setTimeout(start, 3600));
})();
