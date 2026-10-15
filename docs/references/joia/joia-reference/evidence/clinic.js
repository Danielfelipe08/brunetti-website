/* =================================================================
   JOIA · The Clinic page — pinned horizontal room walk-through
   The section pins and the room track pans sideways as you scroll.
   Hero by page-intro.js; chrome/footer by main.js.
   ================================================================= */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktop = matchMedia('(min-width: 861px)').matches;
  const $ = (s, c = document) => c.querySelector(s);

  function initRooms() {
    const section = $('#rooms');
    const track = $('#roomsTrack');
    if (!section || !track) return;
    if (reduce || !desktop || !window.gsap || !window.ScrollTrigger) return; // vertical stack fallback (CSS)

    const amount = () => Math.max(0, track.scrollWidth - innerWidth);
    gsap.to(track, {
      x: () => -amount(),
      ease: 'none',
      scrollTrigger: {
        trigger: section, start: 'top top', end: () => '+=' + amount(),
        pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true
      }
    });
    ScrollTrigger.refresh();
  }

  (document.fonts ? document.fonts.ready : Promise.resolve()).then(initRooms);
})();
