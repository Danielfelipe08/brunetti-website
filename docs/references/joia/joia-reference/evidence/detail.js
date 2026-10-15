/* =================================================================
   JOIA · Treatment detail pages — process line + step activation
   Draws the gold rail down the numbered process as you scroll, and
   lights up each step's node as it enters. Steps fade in via main.js
   [data-reveal]; FAQ is native <details>; chrome by main.js.
   ================================================================= */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  function initProc() {
    const steps = $('.proc__steps');
    const line = $('[data-proc-line]');
    if (!steps) return;

    // reduced-motion / no-engine: show the finished line, no scrub
    if (reduce || !window.gsap || !window.ScrollTrigger) {
      if (line && window.gsap && window.DrawSVGPlugin) gsap.set(line, { drawSVG: '100%' });
      $$('.pstep').forEach((p) => p.classList.add('lit'));
      return;
    }

    // gold rail draws as you scroll through the steps
    if (line) {
      const trig = { trigger: steps, start: 'top 78%', end: 'bottom 70%', scrub: 0.6 };
      if (window.DrawSVGPlugin) {
        gsap.fromTo(line, { drawSVG: '0%' }, { drawSVG: '100%', ease: 'none', scrollTrigger: trig });
      } else {
        gsap.set(line, { transformOrigin: 'top' });
        gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: trig });
      }
    }

    // light each step's node as it arrives
    const psteps = $$('.pstep');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('lit'); io.unobserve(e.target); } });
      }, { threshold: 0.45, rootMargin: '0px 0px -10% 0px' });
      psteps.forEach((p) => io.observe(p));
    } else {
      psteps.forEach((p) => p.classList.add('lit'));
    }

    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }

  (document.fonts ? document.fonts.ready : Promise.resolve()).then(initProc);
})();
