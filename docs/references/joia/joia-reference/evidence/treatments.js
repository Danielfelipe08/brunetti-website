/* =================================================================
   JOIA · Treatments page — cinematic pinned panels (signature)
   Rides the shared engine (main.js): chrome, loader, Lenis,
   [data-reveal]/[data-split], sparks, footer, header.
   This file builds the pinned stage where a title card and the five
   treatments slide up one-by-one — full-bleed image, kinetic name,
   gold sweep, diamond mark drawing in.
   ================================================================= */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktop = matchMedia('(min-width: 861px)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const hasDraw = () => Boolean(window.DrawSVGPlugin);

  let armed = false;
  let introLines = [];
  let introMeta = [];

  // self-contained gold sweep — plays start-to-finish on arrival, NOT tied to scroll
  function playWipe(wipe) {
    if (!wipe || !window.gsap) return;
    gsap.killTweensOf(wipe);
    gsap.fromTo(wipe, { autoAlpha: 1, xPercent: -130 },
      { xPercent: 135, duration: 1.15, ease: 'power2.inOut', onComplete: () => gsap.set(wipe, { autoAlpha: 0 }) });
  }

  function armCine() {
    const cine = $('#cine');
    if (!cine) return;
    // mobile / reduced-motion / no-engine: leave the CSS stacked fallback (names visible)
    if (reduce || !desktop || !window.gsap || !window.ScrollTrigger) return;

    const stage = $('#cineStage', cine);
    const panels = $$('.cpanel', cine);
    if (!stage || panels.length < 2) return;

    armed = true;
    cine.classList.add('is-armed');

    const data = panels.map((p) => ({
      panel: p,
      img: $('.cpanel__media img', p),
      name: $('[data-cine-name]', p),
      meta: $$('.cpanel__idx, .cpanel__tag, .cpanel__copy, .cpanel__link, .cpanel__lead', p),
      mark: $('[data-cine-mark]', p),
      wipe: $('.cpanel__wipe', p),
      lines: []
    }));

    // split each name into masked lines
    data.forEach((d) => {
      if (d.name && window.SplitText) {
        gsap.set(d.name, { visibility: 'visible' });
        d.lines = new SplitText(d.name, { type: 'lines', mask: 'lines' }).lines;
      }
    });

    // initial states: panel 0 (title card) showing, rest stacked below
    data.forEach((d, i) => {
      gsap.set(d.panel, { yPercent: i === 0 ? 0 : 100, zIndex: i + 1 });
      if (d.img) gsap.set(d.img, { scale: i === 0 ? 1.05 : 1.25 });
      if (d.lines.length) gsap.set(d.lines, { yPercent: 120 });
      gsap.set(d.meta, { autoAlpha: 0, y: 22 });
      if (d.mark) { gsap.set(d.mark, { autoAlpha: 0 }); if (hasDraw()) gsap.set(d.mark, { drawSVG: '0%' }); }
      if (d.wipe) gsap.set(d.wipe, { autoAlpha: 0, xPercent: -130 });
    });

    introLines = data[0].lines;
    introMeta = data[0].meta;

    // the pinned cinematic sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cine, start: 'top top', end: () => '+=' + innerHeight * data.length,
        pin: true, scrub: 0.7, anticipatePin: 1, fastScrollEnd: true, invalidateOnRefresh: true
      }
    });

    for (let i = 1; i < data.length; i++) {
      const d = data[i];
      const L = 'p' + i;
      tl.to({}, { duration: 0.22 });            // a beat on the previous panel
      tl.addLabel(L);
      tl.to(d.panel, { yPercent: 0, duration: 1, ease: 'power2.inOut' }, L);
      if (d.img) tl.fromTo(d.img, { scale: 1.25 }, { scale: 1, duration: 1.3, ease: 'power2.out' }, L);
      if (d.wipe) tl.call(playWipe, [d.wipe], L + '+=0.12');   // self-plays on arrival, scroll-independent
      if (d.mark) {
        tl.to(d.mark, { autoAlpha: 1, duration: 0.1 }, L + '+=0.12');
        if (hasDraw()) tl.fromTo(d.mark, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, ease: 'none' }, L + '+=0.12');
        tl.to(d.mark, { autoAlpha: 0, duration: 0.32 }, L + '+=0.9');
      }
      if (d.lines.length) tl.to(d.lines, { yPercent: 0, stagger: 0.06, duration: 0.7, ease: 'power3.out' }, L + '+=0.3');
      tl.to(d.meta, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, L + '+=0.42');
    }
    tl.to({}, { duration: 0.35 });              // hold the last

    ScrollTrigger.refresh();
  }

  // title card reveal, synced to the loader lifting
  function introReveal() {
    if (!armed || !window.gsap) return;
    gsap.timeline()
      .to(introLines, { yPercent: 0, stagger: 0.1, duration: 0.95, ease: 'power3.out' }, 0)
      .to(introMeta, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' }, 0.3);
  }

  // arm as soon as fonts are settled (before the loader lifts -> no layout jump)
  Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), wait(2000)]).then(armCine);

  let started = false;
  const start = () => { if (started) return; started = true; introReveal(); };
  document.addEventListener('joia:ready', start, { once: true });
  addEventListener('load', () => setTimeout(start, 3600)); // safety net if the engine never boots
})();
