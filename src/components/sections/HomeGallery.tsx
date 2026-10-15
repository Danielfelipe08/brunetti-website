"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { galleryContent } from "@/data/gallery";
import { assetPath } from "@/lib/basePath";
import "./HomeGallery.css";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function HomeGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const pin = pinRef.current;
    if (!section || !track || !pin) return;

    const media = window.matchMedia("(min-width: 861px) and (prefers-reduced-motion: no-preference)");
    const bg = pin.querySelector<HTMLElement>(".gallery-bg");
    const mark = pin.querySelector<HTMLElement>(".gallery-mark");
    const figures = [...pin.querySelectorAll<HTMLElement>(".gallery-figure")];
    const reveals = [...section.querySelectorAll<HTMLElement>("[data-gallery-reveal]")];

    let frame = 0;
    let current = 0;
    let target = 0;
    let disposed = false;
    let revealObserver: IntersectionObserver | undefined;

    const observeReveals = () => {
      revealObserver?.disconnect();
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "true";
            revealObserver?.unobserve(entry.target);
          }
        });
      }, { rootMargin: `0px 0px -${window.innerHeight * 0.14}px 0px` });

      reveals.forEach((element) => {
        if (element.dataset.revealed) return;
        if (element.getBoundingClientRect().top < window.innerHeight * 0.86) {
          element.dataset.revealed = "true";
        } else {
          element.dataset.ready = "true";
          revealObserver?.observe(element);
        }
      });
    };

    const render = (progress: number) => {
      if (!bg) return;
      // JOIA timeline: 1.06 duration units (iris open -> room 1 -> crossfade -> room 2 -> crossfade -> room 3)
      const time = progress * 1.06;

      // 1. Iris opening: 0 to 0.26 (circle 3% -> 150%)
      const irisPhase = clamp(time / 0.26);
      const irisEase = irisPhase < 0.5
        ? 2 * irisPhase * irisPhase
        : -1 + (4 - 2 * irisPhase) * irisPhase;
      const irisRadius = 3 + (150 - 3) * irisEase;
      bg.style.clipPath = `circle(${irisRadius}% at 50% 50%)`;

      // 2. Mark rotation, scale and fade out
      if (mark) {
        const markPhase = clamp(time / 0.32);
        const markRotation = markPhase * 160;
        const markScale = 1 + markPhase * 0.12;
        const markAlpha = 1 - clamp((time - 0.30) / 0.10);
        mark.style.transform = `rotate(${markRotation}deg) scale(${markScale})`;
        mark.style.opacity = String(markAlpha);
      }

      // 3. Crossfades between 3 rooms (each held clearly)
      // Room 0 -> Room 1 crossfade starts at 0.36, duration 0.10
      const fade1 = clamp((time - 0.36) / 0.10);
      // Room 1 -> Room 2 crossfade starts at 0.68, duration 0.10
      const fade2 = clamp((time - 0.68) / 0.10);

      if (figures[0]) figures[0].style.opacity = String(1 - fade1);
      if (figures[1]) figures[1].style.opacity = String(fade1 * (1 - fade2));
      if (figures[2]) figures[2].style.opacity = String(fade2);
    };

    let lastTime = 0;
    const tick = (time: number) => {
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      current += (target - current) * (1 - Math.exp(-elapsed / 150));
      render(current);
      if (Math.abs(target - current) > 0.0005) {
        frame = requestAnimationFrame(tick);
      } else {
        current = target;
        render(current);
        frame = 0;
      }
    };

    const update = () => {
      if (!media.matches) return;
      // Scroll distance is 2.5 viewports matching JOIA tokens.json distance_viewport_heights: 2.5
      const next = clamp(-track.getBoundingClientRect().top / (window.innerHeight * 2.5));
      if (Math.abs(next - target) < 0.0001 && frame) return;
      target = next;
      if (!frame) {
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    const configure = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (media.matches) {
        track.dataset.pinned = "true";
        pin.dataset.armed = "true";
        current = target = clamp(-track.getBoundingClientRect().top / (window.innerHeight * 2.5));
        render(current);
      } else {
        delete track.dataset.pinned;
        pin.dataset.armed = "false";
        if (bg) bg.removeAttribute("style");
        if (mark) mark.removeAttribute("style");
        figures.forEach((element) => element.removeAttribute("style"));
      }
    };

    observeReveals();
    configure();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", configure);
    media.addEventListener("change", configure);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      revealObserver?.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", configure);
      media.removeEventListener("change", configure);
      if (disposed && bg) {
        bg.removeAttribute("style");
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="gallery-section" aria-labelledby="gallery-heading">
      <div className="gallery-head-wrap">
        <header className="gallery-head">
          <p className="gallery-eyebrow" data-gallery-reveal>{galleryContent.eyebrow}</p>
          <h2 id="gallery-heading" className="gallery-title" data-gallery-reveal>
            {galleryContent.titleStart} <em>{galleryContent.titleEmphasis}</em>.
          </h2>
        </header>
      </div>
      <div ref={trackRef} className="gallery-track">
        <div ref={pinRef} className="gallery-pin" id="galleryPin">
          <div className="gallery-bg" id="galleryBg">
            {galleryContent.spaces.map((space) => (
              <figure className="gallery-figure" key={space.title}>
                <Image
                  src={assetPath(space.image)}
                  alt={space.alt}
                  fill
                  sizes="(max-width: 860px) 100vw, 100vw"
                  style={{ objectPosition: space.position }}
                />
                <figcaption className="gallery-figcaption">{space.title}</figcaption>
              </figure>
            ))}
          </div>
          <svg className="gallery-mark" viewBox="-70 -70 140 140" aria-hidden="true">
            <path d="M0,-54 C6,-17 17,-6 54,0 C17,6 6,17 0,54 C-6,17 -17,6 -54,0 C-17,-6 -6,-17 0,-54 Z" />
          </svg>
        </div>
      </div>
    </section>
  );
}
