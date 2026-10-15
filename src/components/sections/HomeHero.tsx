"use client";

import { useEffect, useRef } from "react";
import { homeContent } from "@/data/home";
import { assetPath } from "@/lib/basePath";
import "./HomeHero.css";

export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const motion = window.matchMedia("(min-width: 861px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let previousTime = 0;
    let progress = 0;

    const paint = (time: number) => {
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16;
      previousTime = time;
      const target = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / hero.offsetHeight));
      // Equivalent to the reference's .8s scrub, without intercepting native scroll.
      progress += (target - progress) * (1 - Math.exp(-elapsed / 160));
      hero.style.setProperty("--hero-image-y", `${progress * 10}%`);
      hero.style.setProperty("--hero-copy-y", `${progress * -4}%`);
      hero.style.setProperty("--hero-copy-opacity", `${1 - progress * progress}`);
      frame = Math.abs(target - progress) > 0.0001 ? requestAnimationFrame(paint) : 0;
    };
    const update = () => {
      if (motion.matches && !frame) {
        previousTime = 0;
        frame = requestAnimationFrame(paint);
      }
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      progress = 0;
      hero.style.removeProperty("--hero-image-y");
      hero.style.removeProperty("--hero-copy-y");
      hero.style.removeProperty("--hero-copy-opacity");
      update();
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    motion.addEventListener("change", reset);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      motion.removeEventListener("change", reset);
    };
  }, []);

  return (
    <section ref={heroRef} id="inicio" aria-labelledby="hero-heading" className="hero-hero">
      <div className="hero-media">
        <div className="hero-image-motion">
          <video
            src={assetPath("/brand/brunetti/clinic/hero-brunetti.mp4")}
            poster={assetPath(homeContent.image.src)}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="metadata"
            aria-hidden="true"
            className="hero-image"
          />
        </div>
      </div>
      <div className="hero-motif" aria-hidden="true" />
      <div className="hero-grid">
        <span className="hero-folio" aria-hidden="true">01</span>
        <div className="hero-copy">
          <p className="hero-eyebrow">{homeContent.eyebrow}</p>
          <h1 id="hero-heading" className="hero-headline" aria-label={homeContent.headline}>
            {homeContent.headlineLines.map((line, index) => (
              <span className="hero-line" key={line.text} aria-hidden="true">
                <span className="hero-line-inner">
                  {index === 2 ? <><em>{line.text}</em>.</> : line.text}
                </span>
              </span>
            ))}
          </h1>
          <span className="hero-cue">{homeContent.cue}</span>
        </div>
      </div>
      <a
        href="#manifesto"
        className="hero-scroll-cue"
        aria-label="Rolar para a apresentação da clínica"
      >
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
