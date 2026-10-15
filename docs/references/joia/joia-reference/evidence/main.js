/* =================================================================
   JOIA - Cinematic engine (GSAP + Lenis), v3 hardened redesign
   ================================================================= */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktop = matchMedia('(min-width: 861px)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const wait = (ms) => new Promise((res) => setTimeout(res, ms));

  const JOIA_SPARK = 'M0,-54 C6,-17 17,-6 54,0 C17,6 6,17 0,54 C-6,17 -17,6 -54,0 C-17,-6 -6,-17 0,-54 Z';
  const JOIA_SOFT = 'M0,-54 C30,-54 54,-30 54,0 C54,30 30,54 0,54 C-30,54 -54,30 -54,0 C-54,-30 -30,-54 0,-54 Z';
  const JOIA_SMILE = 'M-46,-6 C-22,28 22,28 46,-6';

  const forceReveal = () => {
    $$('[data-split]').forEach((el) => {
      el.style.visibility = 'visible';
    });
    $$('[data-reveal]').forEach((el) => {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
      el.style.transform = 'none';
    });
    $$('[data-reveal-line]').forEach((el) => {
      el.style.transform = 'scaleX(1)';
    });
    $$('.spark path').forEach((path) => {
      path.style.strokeDasharray = 'none';
      path.style.strokeDashoffset = '0';
    });
    $$('[data-loader]').forEach((el) => {
      el.style.opacity = '0';
      el.style.visibility = 'hidden';
      el.style.display = 'none';
    });
  };

  try {
    if (!window.gsap || !window.ScrollTrigger || !window.SplitText || !window.ScrollToPlugin) {
      throw new Error('GSAP dependencies did not load.');
    }

    const optionalPlugins = [window.MorphSVGPlugin, window.DrawSVGPlugin, window.Flip].filter(Boolean);
    gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin, ...optionalPlugins);
    const hasMorph = Boolean(window.MorphSVGPlugin);
    const hasDraw = Boolean(window.DrawSVGPlugin);
    const hasFlip = Boolean(window.Flip);
    const hasClipPath = CSS.supports('clip-path', 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)');
    document.documentElement.classList.toggle('no-clip', !hasClipPath);
    window.JOIA_PLUGIN_FALLBACKS = { morph: !hasMorph, draw: !hasDraw, flip: !hasFlip, clipPath: !hasClipPath };
    ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });

    /* ---- smooth scroll ---- */
    let lenis = null;
    if (!reduce && desktop && window.Lenis) {
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    let closeMenu = () => {};
    const goTo = (sel) => {
      const target = $(sel);
      if (!target) return;
      closeMenu();
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.3 });
      } else {
        target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      }
    };

    /* ---- nav, concierge, modal ---- */
    function initChrome() {
      $$('[data-scroll-to]').forEach((el) => {
        el.addEventListener('click', (e) => {
          const sel = el.dataset.scrollTo;
          if (sel && $(sel)) {
            // target lives on this page -> smooth-scroll to it
            e.preventDefault();
            goTo(sel);
          }
          // otherwise let the href navigate (cross-page nav for internal pages)
        });
      });

      // header gets a solid background once scrolled off the top
      const headerEl = $('.siteheader');
      if (headerEl) {
        const onHeaderScroll = () => headerEl.classList.toggle('scrolled', (window.scrollY || document.documentElement.scrollTop || 0) > 80);
        addEventListener('scroll', onHeaderScroll, { passive: true });
        if (lenis) lenis.on('scroll', onHeaderScroll);
        onHeaderScroll();
      }

      const con = $('[data-concierge]');
      const conBtn = $('[data-concierge-toggle]');
      if (con && conBtn) {
        conBtn.addEventListener('click', () => {
          const open = con.classList.toggle('is-open');
          conBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
      }

      const modal = $('[data-modal]');
      const card = $('.modal__card', modal || document);
      if (!modal || !card) return;
      card.setAttribute('tabindex', '-1');

      let opener = null;
      const focusableSelector = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
      ].join(',');

      const getFocusable = () => $$(focusableSelector, card).filter((el) => {
        const style = getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden' && el.getClientRects().length > 0;
      });

      const open = (event) => {
        opener = event?.currentTarget || document.activeElement;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        if (lenis) lenis.stop();
        if (con) con.classList.remove('is-open');
        requestAnimationFrame(() => {
          const focusables = getFocusable();
          (focusables[0] || card).focus();
        });
      };

      const close = () => {
        if (!modal.classList.contains('is-open')) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        if (lenis) lenis.start();
        if (opener && document.contains(opener)) opener.focus();
        opener = null;
      };

      $$('[data-modal-open]').forEach((button) => button.addEventListener('click', open));
      $$('[data-modal-close]', modal).forEach((button) => button.addEventListener('click', close));
      modal.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        const focusables = getFocusable();
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      });
      addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
      });

      const steps = $$('.modal__step', modal);
      let index = 0;
      $$('[data-step-next]', modal).forEach((button) => {
        button.addEventListener('click', () => {
          if (index >= steps.length - 1) return;
          steps[index].classList.remove('is-active');
          steps[++index].classList.add('is-active');
          requestAnimationFrame(() => {
            const focusables = getFocusable();
            (focusables[0] || card).focus();
          });
        });
      });
      $$('.chip', modal).forEach((chip) => {
        chip.addEventListener('click', () => chip.classList.toggle('is-on'));
      });

      // full-screen corner-burst menu (header C)
      const menu = $('[data-menu]');
      const menuBtn = $('[data-menu-open]');
      if (menu && menuBtn) {
        const openMenu = () => {
          menu.classList.add('is-open');
          menu.setAttribute('aria-hidden', 'false');
          menuBtn.setAttribute('aria-expanded', 'true');
          if (lenis) lenis.stop();
        };
        closeMenu = () => {
          if (!menu.classList.contains('is-open')) return;
          menu.classList.remove('is-open');
          menu.setAttribute('aria-hidden', 'true');
          menuBtn.setAttribute('aria-expanded', 'false');
          if (lenis && !modal.classList.contains('is-open')) lenis.start();
        };
        menuBtn.addEventListener('click', openMenu);
        $$('[data-menu-close]', menu).forEach((b) => b.addEventListener('click', () => closeMenu()));
        $$('[data-menu-link]', menu).forEach((l) => l.addEventListener('click', () => closeMenu()));
        addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('is-open')) closeMenu(); });
      }
    }

    /* ---- helpers ---- */
    const splitLines = (el) => {
      if (!el) return [];
      gsap.set(el, { visibility: 'visible' });
      return new SplitText(el, { type: 'lines', mask: 'lines' }).lines;
    };

    const setPath = (path, d) => {
      if (path) path.setAttribute('d', d);
    };

    const drawPath = (path, vars = {}) => {
      if (!path) return gsap.timeline();
      if (hasDraw) {
        return gsap.fromTo(path, { drawSVG: '0%' }, { drawSVG: '100%', ...vars });
      }
      const length = path.getTotalLength ? path.getTotalLength() : 480;
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      return gsap.to(path, { strokeDashoffset: 0, ...vars });
    };

    const morphPath = (path, d, vars = {}) => {
      if (!path) return gsap.timeline();
      if (hasMorph) {
        return gsap.to(path, { morphSVG: d, ...vars });
      }
      return gsap.to(path, {
        rotate: vars.rotate ?? 45,
        scale: vars.scale ?? 1.08,
        transformOrigin: '50% 50%',
        ...vars
      });
    };

    const revealVisibleBackstop = () => {
      $$('[data-reveal]').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < innerHeight * 0.98 && rect.bottom > 0) {
          gsap.set(el, { autoAlpha: 1, y: 0 });
        }
      });
    };

    const refreshAndBackstop = () => {
      ScrollTrigger.refresh();
      requestAnimationFrame(revealVisibleBackstop);
    };

    function initSparkStates() {
      $$('[data-hero-spark],[data-manifesto-signature],[data-team-spark]').forEach((path) => setPath(path, JOIA_SOFT));
      $$('[data-spark-path],[data-invitation-spark]').forEach((path) => setPath(path, JOIA_SPARK));
      $$('.spark--smile').forEach((spark) => {
        gsap.set(spark, { autoAlpha: 0, scale: 0, rotate: -18, transformOrigin: '50% 50%' });
      });
    }

    function smileTwinkles() {
      $$('.spark--smile').forEach((spark) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: spark.closest('.scene') || spark,
            start: 'top 72%',
            once: true
          }
        })
          .to(spark, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.75, ease: 'back.out(2)' })
          .to(spark, { y: -4, scale: 1.18, duration: 1.15, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      });
    }

    /* ---- loader ---- */
    function loader() {
      return new Promise((res) => {
        const el = $('[data-loader]');
        if (reduce || !el) {
          if (el) el.style.display = 'none';
          res();
          return;
        }

        const num = $('.loader__num', el);
        const counter = { v: 0 };
        let complete = false;
        const done = () => {
          if (complete) return;
          complete = true;
          gsap.to(el, {
            autoAlpha: 0,
            duration: 0.7,
            ease: 'power2.inOut',
            onComplete: () => {
              el.style.display = 'none';
              res();
            }
          });
        };

        gsap.timeline()
          .from('.loader__mark', { y: 14, autoAlpha: 0, duration: 0.8, ease: 'power3.out' })
          .to(counter, {
            v: 100,
            duration: 1.5,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (num) num.textContent = String(Math.round(counter.v)).padStart(3, '0');
            }
          }, 0)
          .add(done, '+=0.15');

        setTimeout(done, 3000);
      });
    }

    /* ============ SCENES ============ */
    function build() {
      initSparkStates();
      if (reduce) {
        forceReveal();
        return;
      }

      gsap.to('[data-progress]', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
      });

      $$('.theme-dark').forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: (self) => document.body.classList.toggle('is-dark', self.isActive)
        });
      });

      const facet = $('[data-facet]');
      if (facet) {
        gsap.timeline({
          scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1 }
        })
          .fromTo(facet, { autoAlpha: 0, scale: .45, xPercent: -22, yPercent: -18 }, { autoAlpha: .45, scale: .92, xPercent: 8, yPercent: 0, ease: 'sine.inOut' })
          .to(facet, { autoAlpha: .25, scale: 1.25, xPercent: -12, rotate: 28, ease: 'sine.inOut' })
          .to(facet, { autoAlpha: .38, scale: .8, xPercent: 26, yPercent: 6, ease: 'sine.inOut' })
          .to(facet, { autoAlpha: .48, scale: 1, xPercent: 0, yPercent: 0, rotate: 0, ease: 'sine.inOut' });
      }

      $$('.spark--motif').forEach((motif, index) => {
        gsap.to(motif, {
          rotate: index % 2 ? -28 : 28,
          ease: 'none',
          scrollTrigger: {
            trigger: motif.closest('.scene') || document.body,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6
          }
        });
      });

      smileTwinkles();

      // ---- footer: smile that blooms into the JOIA mark ----
      const footer = $('.footer');
      if (footer) {
        const fmark = $('[data-footer-mark]', footer);
        const fline = $('[data-footer-line]', footer);
        const F_SMILE = 'M30,55 C120,95 160,100 200,100 C240,100 280,95 370,55';
        const F_SPARK = 'M200,8 C207,48 219,60 262,67 C219,74 207,86 200,126 C193,86 181,74 138,67 C181,60 193,48 200,8 Z';
        gsap.timeline({ scrollTrigger: { trigger: footer, start: 'top 92%' } })
          .from(fmark, { scale: 0, autoAlpha: 0, duration: 0.45, ease: 'back.out(1.7)', transformOrigin: '50% 50%' })
          .from('.footer__title', { y: 22, autoAlpha: 0, duration: 0.5, ease: 'power3.out' }, '-=0.16')
          .from('.footer__smile', { autoAlpha: 0, scale: 0.92, duration: 0.5, ease: 'power2.out', transformOrigin: '50% 50%' }, '-=0.24')
          .from('.footer__contact, .footer__legal', { y: 12, autoAlpha: 0, stagger: 0.08, duration: 0.4, ease: 'power2.out' }, '-=0.24');
        if (hasMorph && fline) {
          // bloom (smile -> JOIA mark -> smile) — starts as the footer enters view, no long dead holds
          const bloom = gsap.timeline({ repeat: -1, paused: true, defaults: { ease: 'power2.inOut', duration: 1.5 } })
            .to({}, { duration: 0.4 })
            .to(fline, { morphSVG: F_SPARK })
            .to({}, { duration: 0.8 })
            .to(fline, { morphSVG: F_SMILE })
            .to({}, { duration: 0.9 });
          ScrollTrigger.create({ trigger: footer, start: 'top 92%', once: true, onEnter: () => bloom.play() });
        }
      }

      // header diamond: continuous spin + periodic glint (minimal)
      const hdia = $('.siteheader__diad');
      if (hdia) {
        gsap.set(hdia, { transformOrigin: '50% 50%' });
        gsap.to(hdia, { rotation: 360, duration: 6, ease: 'none', repeat: -1 });
        gsap.timeline({ repeat: -1, repeatDelay: 2 })
          .fromTo(hdia, { filter: 'drop-shadow(0 0 2px rgba(200,163,91,.3))' }, { filter: 'drop-shadow(0 0 13px rgba(255,247,210,1))', duration: 0.25, ease: 'power2.out' })
          .to(hdia, { filter: 'drop-shadow(0 0 2px rgba(200,163,91,.3))', duration: 0.9, ease: 'power2.in' });
      }

      const mm = gsap.matchMedia();

      mm.add('(min-width: 861px)', () => {
        const hero = $('#hero');
        if (hero) {
          const heroLines = splitLines($('.hero__promise', hero));
          const heroMask = $('[data-hero-mask]', hero);
          const heroImg = $('[data-kenburns]', hero);
          // Closed start state, opened ON LOAD by heroIntro() so the hero is never blank-until-scroll.
          if (heroMask && hasClipPath) gsap.set(heroMask, { '--r': '9vmin', '--a': '1.2vmin' });
          gsap.set(heroLines, { yPercent: 125 });
          gsap.set('.hero__eyebrow, .hero__cue', { autoAlpha: 0, y: 18 });
          window.__heroReveal = () => {
            const tl = gsap.timeline();
            if (heroMask && hasClipPath) {
              tl.to(heroMask, { '--r': '118vmax', '--a': '70vmax', duration: 1.5, ease: 'power2.inOut' }, 0)
                .fromTo(heroImg, { scale: 1.12 }, { scale: 1, duration: 1.6, ease: 'power2.out' }, 0);
            } else if (heroMask) {
              tl.fromTo(heroMask, { autoAlpha: 0.24, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 1.1, ease: 'power2.out' }, 0);
            }
            tl.to(heroLines, { yPercent: 0, stagger: 0.1, duration: 0.95, ease: 'power3.out' }, 0.45)
              .to('.hero__eyebrow, .hero__cue', { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' }, 0.65);
            return tl;
          };
          // No pin — the hero fades/parallaxes away as it scrolls past, so the next section comes up right away.
          gsap.timeline({
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.8 }
          })
            .to(heroImg, { yPercent: 10, ease: 'none' }, 0)
            .to('.hero__grid', { yPercent: -4, autoAlpha: 0, ease: 'power1.in' }, 0);
        }

        const man = $('#manifesto');
        if (man) {
          const lines = splitLines($('.manifesto__line', man));
          const sig = $('[data-manifesto-signature]', man);
          gsap.timeline({
            scrollTrigger: {
              trigger: man,
              start: 'top top',
              end: () => '+=' + innerHeight * 1.2,
              pin: true,
              scrub: 1.2,
              anticipatePin: 1, fastScrollEnd: true,
              invalidateOnRefresh: true
            }
          })
            .from('.manifesto .eyebrow', { autoAlpha: 0, y: 20 })
            .from(lines, { yPercent: 115, stagger: 0.12, ease: 'power3.out' }, '<')
            .add(drawPath(sig, { duration: 0.35, ease: 'power2.out' }), '>-0.12')
            .add(morphPath(sig, JOIA_SMILE, { duration: 0.35, ease: 'power2.inOut', rotate: 0, scale: 1 }), '>')
            .from('.manifesto__sub', { autoAlpha: 0, y: 18 }, '<0.08')
            .from('.manifesto__photo', { autoAlpha: 0, y: 46, scale: 0.92, stagger: 0.14, ease: 'power3.out' }, 0.2);
        }

        const mk = $('#makeover');
        if (mk) {
          const afterWrap = $('.makeover__after-wrap', mk);
          const wipe = $('.makeover__wipe', mk);
          const glint = $('.makeover__glint', mk);
          gsap.timeline({
            scrollTrigger: {
              trigger: mk,
              start: 'top top',
              end: () => '+=' + innerHeight * 1.6,
              pin: true,
              scrub: 0.5,
              anticipatePin: 1, fastScrollEnd: true,
              invalidateOnRefresh: true
            }
          })
            .from('.makeover__portrait', { autoAlpha: 0.72, yPercent: 8, scale: 0.96, duration: 0.28, ease: 'power2.out' }, 0)
            .to(afterWrap, { clipPath: 'inset(0 0% 0 0)', duration: 0.72, ease: 'none' }, 0.12)
            .to(wipe, { x: () => Math.max(0, $('.makeover__portrait', mk).clientWidth - 2), duration: 0.72, ease: 'none' }, 0.12)
            .from('.makeover__cap', { autoAlpha: 0, y: 24, duration: 0.22, ease: 'power2.out' }, 0.34)
            .to(glint, { autoAlpha: 1, scale: 1.25, rotate: 45, duration: 0.12, ease: 'power2.out' }, 0.82)
            .to(glint, { scale: 0.72, autoAlpha: 0.75, duration: 0.12, ease: 'power1.inOut' }, 0.94);
        }

        // #moments is now a self-running CSS smile-wall marquee (no pin) — heading reveals via [data-reveal].

        const wk = $('#work');
        if (wk) {
          // editorial wipe rows (no pin). CSS handles the motion; JS just arms + toggles .in on enter.
          const rows = $$('.work__row', wk);
          if (rows.length && !reduce && 'IntersectionObserver' in window) {
            wk.classList.add('work--anim');
            const io = new IntersectionObserver((entries) => {
              entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
            }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
            rows.forEach((r) => io.observe(r));
          }
        }

        const team = $('#artist');
        if (team) {
          // team = deck-fan + name-spotlight. Cards fan from a stack on enter; hovering a name (or card) lifts it, dims the rest.
          const deck = $('#teamDeck', team);
          const cards = deck ? $$('.tcard', deck) : [];
          const names = $$('.team__name-btn', team);
          if (deck && cards.length && !reduce) {
            deck.classList.add('is-armed');
            const FAN = [{ x: -96, r: -9, y: 18 }, { x: 0, r: 0, y: 0 }, { x: 96, r: 9, y: 18 }];
            cards.forEach((c, i) => gsap.set(c, { x: FAN[i].x, y: FAN[i].y, rotate: FAN[i].r, scale: 1, zIndex: i === 1 ? 12 : 10 }));
            ScrollTrigger.create({
              trigger: team, start: 'top 72%', once: true,
              onEnter: () => gsap.from(cards, { x: 0, y: 52, rotate: 0, scale: 0.9, autoAlpha: 0, duration: 1, ease: 'power3.out', stagger: 0.12 })
            });
            const setActive = (idx) => {
              cards.forEach((c, i) => gsap.to(c, {
                x: FAN[i].x, y: i === idx ? -16 : FAN[i].y, rotate: i === idx ? 0 : FAN[i].r,
                scale: i === idx ? 1.1 : 0.92, zIndex: i === idx ? 30 : 10,
                filter: i === idx ? 'brightness(1.04)' : 'brightness(0.55) saturate(0.85)',
                duration: 0.5, ease: 'power3.out', overwrite: 'auto'
              }));
              names.forEach((n, i) => n.classList.toggle('on', i === idx));
            };
            const reset = () => {
              cards.forEach((c, i) => gsap.to(c, { x: FAN[i].x, y: FAN[i].y, rotate: FAN[i].r, scale: 1, filter: 'brightness(1)', zIndex: i === 1 ? 12 : 10, duration: 0.5, ease: 'power3.out', overwrite: 'auto' }));
              names.forEach((n) => n.classList.remove('on'));
            };
            names.forEach((n, i) => { n.addEventListener('mouseenter', () => setActive(i)); n.addEventListener('focus', () => setActive(i)); });
            cards.forEach((c, i) => c.addEventListener('mouseenter', () => setActive(i)));
            const list = $('#teamNames', team);
            if (list) list.addEventListener('mouseleave', reset);
            deck.addEventListener('mouseleave', reset);
          }
        }

        const gallery = $('#gallery');
        if (gallery) {
          const galleryPin = gallery.querySelector('#galleryPin');
          const galleryBg = gallery.querySelector('#galleryBg');
          const galleryFigs = galleryBg ? Array.from(galleryBg.querySelectorAll('figure')) : [];
          const galleryMark = gallery.querySelector('[data-gallery-mark]');
          if (galleryPin && galleryBg && galleryFigs.length && !reduce) {
            galleryPin.classList.add('is-armed');
            const gTl = gsap.timeline({
              scrollTrigger: {
                trigger: galleryPin, start: 'top top', end: () => '+=' + innerHeight * 2.5,
                pin: galleryPin, scrub: 0.6, anticipatePin: 1, fastScrollEnd: true, invalidateOnRefresh: true
              }
            });
            // iris opens quickly onto room 1, then each room gets an equal, clearly-held beat
            gTl.fromTo(galleryBg, { clipPath: 'circle(3% at 50% 50%)' }, { clipPath: 'circle(150% at 50% 50%)', ease: 'power2.inOut', duration: 0.26 }, 0);
            if (hasDraw && galleryMark) gTl.fromTo(galleryMark, { drawSVG: '0%' }, { drawSVG: '100%', ease: 'none', duration: 0.26 }, 0);
            if (galleryMark) gTl.to(galleryMark, { rotation: 160, scale: 1.12, transformOrigin: '50% 50%', ease: 'none', duration: 0.32 }, 0);
            if (hasMorph && galleryMark) gTl.to(galleryMark, { morphSVG: JOIA_SOFT, ease: 'none', duration: 0.13 }, 0.05).to(galleryMark, { morphSVG: JOIA_SPARK, ease: 'none', duration: 0.13 }, 0.2);
            if (galleryMark) gTl.to(galleryMark, { autoAlpha: 0, duration: 0.1 }, 0.3);
            // cross-fade through the three rooms, each held a clear beat
            gTl.to(galleryFigs[0], { autoAlpha: 0, duration: 0.1 }, 0.36).to(galleryFigs[1], { autoAlpha: 1, duration: 0.1 }, 0.36);
            if (galleryFigs[2]) gTl.to(galleryFigs[1], { autoAlpha: 0, duration: 0.1 }, 0.68).to(galleryFigs[2], { autoAlpha: 1, duration: 0.1 }, 0.68);
            gTl.to({}, { duration: 0.28 });
          }
        }

        const invitation = $('#invitation');
        if (invitation) {
          const sig = $('[data-invitation-spark]', invitation);
          gsap.timeline({
            scrollTrigger: {
              trigger: invitation,
              start: 'top top',
              end: () => '+=' + innerHeight * 1.4,
              pin: true,
              scrub: 1,
              anticipatePin: 1, fastScrollEnd: true,
              invalidateOnRefresh: true
            }
          })
            .to('[data-invitation-iris]', { scale: 18, duration: 0.62, ease: 'power2.inOut' }, 0)
            .to('.invitation', { color: 'var(--ivory)', duration: 0.2, ease: 'none' }, 0.2)
            .to('.invitation__sub', { color: 'rgba(246,241,231,.76)', duration: 0.22, ease: 'none' }, 0.24)
            .to('.invitation__alt', { color: 'var(--gold-soft)', duration: 0.22, ease: 'none' }, 0.24)
            .to('.invitation__portrait', { opacity: 0.15, scale: 1.06, duration: 0.65, ease: 'none' }, 0)
            .add(drawPath(sig, { duration: 0.28, ease: 'power2.out' }), 0.44)
            .to(sig, { fill: 'var(--gold)', duration: 0.16, ease: 'power1.out' }, 0.68)
            .add(morphPath(sig, JOIA_SPARK, { duration: 0.3, ease: 'power2.inOut', rotate: 0, scale: 1 }), 0.78);
        }
      });

      mm.add('(max-width: 860px)', () => {
        const man = $('#manifesto');
        if (man) {
          gsap.set($('.manifesto__line', man), { visibility: 'visible' });
          gsap.from($('.manifesto__line', man), {
            autoAlpha: 0,
            y: 24,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: man, start: 'top 76%' }
          });
          const sig = $('[data-manifesto-signature]', man);
          gsap.timeline({ scrollTrigger: { trigger: man, start: 'top 72%', once: true } })
            .add(drawPath(sig, { duration: 0.8, ease: 'power2.out' }))
            .add(morphPath(sig, JOIA_SMILE, { duration: 0.45, ease: 'power2.inOut', rotate: 0, scale: 1 }), '>');
        }
      });

      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 86%',
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1, overwrite: true }),
        onEnterBack: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', overwrite: true })
      });

      $$('[data-split]').forEach((el) => {
        if (el.closest('#manifesto') || el.closest('.hero')) return;
        const lines = splitLines(el);
        gsap.from(lines, {
          yPercent: 115,
          stagger: 0.12,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        });
      });

      $$('[data-parallax]').forEach((el) => {
        const factor = parseFloat(el.dataset.parallax);
        gsap.fromTo(el, { yPercent: -factor * 40 }, {
          yPercent: factor * 40,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('.scene') || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6
          }
        });
      });

      $$('[data-split]').forEach((el) => gsap.set(el, { visibility: 'visible' }));
    }

    function initCtaHover() {
      const cta = $('[data-cta-spark]');
      const sig = $('[data-invitation-spark]');
      if (!cta || !sig) return;
      cta.addEventListener('mouseenter', () => {
        if (hasFlip) {
          const state = Flip.getState(cta);
          cta.classList.add('is-flipped');
          Flip.from(state, { duration: 0.35, ease: 'power2.out' });
        } else {
          gsap.to(cta, { scale: 1.025, duration: 0.35, ease: 'power2.out' });
        }
        morphPath(sig, JOIA_SOFT, { duration: 0.45, ease: 'power2.inOut', rotate: 0, scale: 1 });
      });
      cta.addEventListener('mouseleave', () => {
        if (hasFlip) {
          const state = Flip.getState(cta);
          cta.classList.remove('is-flipped');
          Flip.from(state, { duration: 0.35, ease: 'power2.out' });
        } else {
          gsap.to(cta, { scale: 1, duration: 0.35, ease: 'power2.out' });
        }
        morphPath(sig, JOIA_SPARK, { duration: 0.45, ease: 'power2.inOut', rotate: 0, scale: 1 });
      });
    }

    /* ---- hero intro (after loader) ---- */
    function heroIntro() {
      const promise = $('.hero__promise');
      if (!promise) return;
      gsap.set(promise, { visibility: 'visible' });
      if (reduce) return;
      const heroSpark = $('[data-hero-spark]');
      const tl = gsap.timeline();
      if (window.__heroReveal) tl.add(window.__heroReveal(), 0);
      tl.add(morphPath(heroSpark, JOIA_SPARK, { duration: 0.62, ease: 'power2.inOut', rotate: 0, scale: 1 }), 0.5);
    }

    /* ---- boot ---- */
    async function boot() {
      try {
        await Promise.race([document.fonts?.ready || Promise.resolve(), wait(2000)]);
        initChrome();
        initCtaHover();
        build();
        refreshAndBackstop();
        await loader();
        document.dispatchEvent(new Event('joia:ready'));
        heroIntro();
        refreshAndBackstop();
        setTimeout(revealVisibleBackstop, 600);
      } catch (error) {
        console.error('JOIA boot failed:', error);
        forceReveal();
      }
    }

    boot();
  } catch (error) {
    console.error('JOIA failed to initialize:', error);
    forceReveal();
  }
})();
