/* =================================================================
   JOIA · Before & After page — signature motion
   1) featured before/after drag slider (auto-reveals on enter, then draggable)
   2) result gallery that scatters into a grid on enter
   Hero handled by page-intro.js; chrome/footer/etc by main.js.
   ================================================================= */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktop = matchMedia('(min-width: 861px)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  function initBA() {
    const stage = $('.ba__stage');
    if (!stage) return;
    const after = $('.ba__after', stage);
    const div = $('.ba__divider', stage);
    const handle = $('.ba__handle', stage);
    let autoTween = null;
    const render = (v) => {
      const p = Math.max(2, Math.min(98, v));
      after.style.clipPath = 'inset(0 0 0 ' + p + '%)';
      div.style.left = p + '%';
      if (handle) handle.style.left = p + '%';
    };
    const stopAuto = () => { if (autoTween) { autoTween.kill(); autoTween = null; } };
    const setFromX = (x) => { const r = stage.getBoundingClientRect(); render(((x - r.left) / r.width) * 100); };

    let dragging = false;
    stage.addEventListener('pointerdown', (e) => { dragging = true; stopAuto(); try { stage.setPointerCapture(e.pointerId); } catch (_) {} setFromX(e.clientX); });
    stage.addEventListener('pointermove', (e) => { if (dragging) setFromX(e.clientX); });
    addEventListener('pointerup', () => { dragging = false; });

    if (!reduce && window.gsap && window.ScrollTrigger) {
      const o = { p: 100 };
      render(100);
      ScrollTrigger.create({
        trigger: stage, start: 'top 78%', once: true,
        onEnter: () => { autoTween = gsap.to(o, { p: 46, duration: 1.5, ease: 'power2.inOut', onUpdate: () => render(o.p) }); }
      });
    } else {
      render(52);
    }
  }

  function initGallery() {
    const rg = $('.rg');
    const items = $$('.rg__item');
    if (!rg || !items.length) return;
    if (reduce || !window.gsap || !window.ScrollTrigger) return; // visible via CSS fallback

    rg.classList.add('is-armed');

    // tiles rise + fade in as they enter, in scroll order
    ScrollTrigger.batch(items, {
      start: 'top 90%',
      onEnter: (b) => gsap.to(b, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true })
    });

    // layered parallax depth — each tile's image drifts at a different rate
    if (desktop) {
      items.forEach((it, i) => {
        const media = it.querySelector('.rg__media');
        if (!media) return;
        const a = 6;
        gsap.fromTo(media, { yPercent: i % 2 ? a : -a }, {
          yPercent: i % 2 ? -a : a, ease: 'none',
          scrollTrigger: { trigger: it, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
        });
      });
    }
    ScrollTrigger.refresh();
  }

  function init() { initBA(); initGallery(); if (window.ScrollTrigger) ScrollTrigger.refresh(); }
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(init);
})();
