/* =================================================================
   JOIA · Team page — bio reveals
   The deck-fan + name spotlight is handled by main.js (it arms any
   #artist block). This file only reveals the alternating bios.
   ================================================================= */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktop = matchMedia('(min-width: 861px)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  function initBios() {
    const bios = $('.bios');
    const items = $$('.bio');
    if (!bios || !items.length) return;
    if (reduce || !desktop || !('IntersectionObserver' in window)) return; // visible via CSS fallback
    bios.classList.add('is-armed');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
    items.forEach((b) => io.observe(b));
  }

  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
    initBios();
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });
})();
