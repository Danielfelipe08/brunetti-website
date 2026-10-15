/* =================================================================
   JOIA · Contact page — iris-reveal media + smile→mark morph
   Hero by page-intro.js; chrome/modal/footer by main.js.
   ================================================================= */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s);

  function init() {
    const fig = $('.contact__media');
    const img = fig ? $('img', fig) : null;
    if (fig && img && !reduce && window.gsap && window.ScrollTrigger) {
      gsap.set(img, { clipPath: 'circle(0% at 50% 50%)' });
      ScrollTrigger.create({
        trigger: fig, start: 'top 82%', once: true,
        onEnter: () => gsap.to(img, { clipPath: 'circle(150% at 50% 50%)', duration: 1.25, ease: 'power2.inOut' })
      });
    }

    const morph = $('[data-contact-morph]');
    if (morph && !reduce && window.gsap && window.MorphSVGPlugin) {
      const SMILE = 'M-46,-6 C-22,28 22,28 46,-6';
      const MARK = 'M0,-54 C6,-17 17,-6 54,0 C17,6 6,17 0,54 C-6,17 -17,6 -54,0 C-17,-6 -6,-17 0,-54 Z';
      morph.setAttribute('d', SMILE);
      gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut', duration: 1.5 } })
        .to({}, { duration: 1.4 })
        .to(morph, { morphSVG: MARK })
        .to({}, { duration: 1.2 })
        .to(morph, { morphSVG: SMILE })
        .to({}, { duration: 1.2 });
    }
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }

  (document.fonts ? document.fonts.ready : Promise.resolve()).then(init);
})();
