"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { makeoverContent } from "@/data/makeover";
import { assetPath } from "@/lib/basePath";
import "./HomeMakeover.css";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function HomeMakeover() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const caseStudy = makeoverContent.case;

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const media = window.matchMedia("(min-width: 861px) and (prefers-reduced-motion: no-preference)");
    const portrait = section.querySelector<HTMLElement>(".makeover-portrait")!;
    const after = section.querySelector<HTMLElement>(".makeover-after")!;
    const wipe = section.querySelector<HTMLElement>(".makeover-wipe")!;
    const caption = section.querySelector<HTMLElement>(".makeover-caption")!;
    const glint = section.querySelector<HTMLElement>(".makeover-glint")!;
    let frame = 0;
    let current = 0;
    let target = 0;
    let disposed = false;

    const render = (progress: number) => {
      // JOIA's 1.06-unit timeline: entrance, wipe, caption, then glint.
      const time = progress * 1.06;
      const phase = (start: number, duration: number) => clamp((time - start) / duration);
      const entrance = 1 - (1 - phase(0, .28)) ** 3;
      portrait.style.opacity = String(.72 + .28 * entrance);
      portrait.style.transform = `translateY(${8 * (1 - entrance)}%) scale(${.96 + .04 * entrance})`;
      const reveal = phase(.12, .72);
      after.style.clipPath = `inset(0 ${(1 - reveal) * 100}% 0 0)`;
      wipe.style.left = `${reveal * 100}%`;
      const text = 1 - (1 - phase(.34, .22)) ** 3;
      caption.style.opacity = String(text);
      caption.style.transform = `translateY(${24 * (1 - text)}px)`;
      const shine = 1 - (1 - phase(.82, .12)) ** 3;
      const settle = 1 - (1 - phase(.94, .12)) ** 3;
      glint.style.opacity = String(shine * (1 - .25 * settle));
      glint.style.transform = `scale(${.4 + .85 * shine - .53 * settle}) rotate(${45 * shine}deg)`;
    };
    let lastTime = 0;
    const tick = (time: number) => {
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      current += (target - current) * (1 - Math.exp(-elapsed / 130));
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
      const next = clamp(-track.getBoundingClientRect().top / (window.innerHeight * 1.6));
      if (Math.abs(next - target) < 0.0001 && frame) return;
      target = next;
      if (!frame) {
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const measure = () => {
      track.style.setProperty("--makeover-height", `${section.offsetHeight}px`);
      update();
    };
    const configure = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (media.matches) {
        track.dataset.pinned = "true";
        measure();
        current = target = clamp(-track.getBoundingClientRect().top / (window.innerHeight * 1.6));
        render(current);
      } else {
        delete track.dataset.pinned;
        [portrait, after, wipe, caption, glint].forEach((element) => element.removeAttribute("style"));
      }
    };

    configure();
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    media.addEventListener("change", configure);
    void document.fonts.ready.then(() => { if (!disposed) measure(); });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", configure);
    };
  }, []);

  return (
    <div ref={trackRef} className="makeover-track">
      <section ref={sectionRef} id="makeover" className="makeover-scene" aria-labelledby="makeover-heading">
        <div className="makeover-grid">
          <p className="makeover-label">{makeoverContent.label}</p>
          <span className="makeover-index" aria-hidden="true">Depois</span>
          <div className="makeover-portrait" role="group" aria-label="Comparação antes e depois">
            <div className="makeover-before">
              {caseStudy ? (
                <Image src={assetPath(caseStudy.before.src)} alt={caseStudy.before.alt} fill sizes="(max-width: 860px) 32vw, 80vw" />
              ) : (
                <p className="makeover-placeholder"><span>Antes</span>Imagem pendente</p>
              )}
            </div>
            <div className="makeover-after">
              {caseStudy ? (
                <Image src={assetPath(caseStudy.after.src)} alt={caseStudy.after.alt} fill sizes="(max-width: 860px) 100vw, 80vw" />
              ) : (
                <p className="makeover-placeholder"><span>Depois</span>Imagem pendente</p>
              )}
            </div>
            <span className="makeover-wipe" aria-hidden="true"><i /></span>
            <span className="makeover-glint" aria-hidden="true" />
          </div>
          <div className="makeover-caption">
            <p className="makeover-eyebrow">{makeoverContent.eyebrow}</p>
            <h2 className="makeover-title" id="makeover-heading">Veja a <em>diferença</em>.</h2>
            <p className="makeover-disclaimer">
              {caseStudy?.caption ?? "Imagens de antes e depois pendentes de seleção e validação pela Brunetti."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
