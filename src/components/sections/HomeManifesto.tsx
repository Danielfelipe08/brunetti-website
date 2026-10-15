"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { manifestoContent } from "@/data/manifesto";
import { assetPath } from "@/lib/basePath";
import "./HomeManifesto.css";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const easeOut = (value: number) => 1 - (1 - value) ** 4;

function signaturePath(progress: number) {
  // Open the circle into a shallow curve, keeping the contour continuous.
  const rx = 54 - 8 * progress;
  const ry = 54 - 29 * progress;
  const cy = -6 * progress;
  const start = -Math.PI / 2 - Math.PI / 2 * progress;
  const step = (-Math.PI * 2 + Math.PI * progress) / 4;
  const point = (angle: number) => [rx * Math.cos(angle), cy + ry * Math.sin(angle)];
  let path = `M${point(start).join(" ")}`;
  for (let index = 0; index < 4; index++) {
    const a = start + step * index;
    const b = a + step;
    const k = 4 / 3 * Math.tan(step / 4);
    const [x1, y1] = point(a);
    const [x2, y2] = point(b);
    path += ` C${x1 - k * rx * Math.sin(a)} ${y1 + k * ry * Math.cos(a)} ${x2 + k * rx * Math.sin(b)} ${y2 - k * ry * Math.cos(b)} ${x2} ${y2}`;
  }
  return path;
}

export function HomeManifesto() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const scene = sceneRef.current;
    if (!track || !scene) return;

    const media = window.matchMedia("(min-width: 861px) and (prefers-reduced-motion: no-preference)");
    const lines = [...scene.querySelectorAll<HTMLElement>(".manifesto-line-inner")];
    const photos = [...scene.querySelectorAll<HTMLElement>(".manifesto-photo")];
    const eyebrow = scene.querySelector<HTMLElement>(".manifesto-eyebrow")!;
    const sub = scene.querySelector<HTMLElement>(".manifesto-sub")!;
    const signature = scene.querySelector<SVGPathElement>(".manifesto-signature path")!;
    let frame = 0;
    let current = 0;
    let target = 0;
    let disposed = false;

    // JOIA timeline: two .5s line reveals, .12 stagger, then draw / morph.
    const render = (progress: number) => {
      const time = progress * 1.43;
      const phase = (start: number, duration: number) => clamp((time - start) / duration);
      const label = 1 - (1 - phase(0, .5)) ** 2;
      eyebrow.style.opacity = String(label);
      eyebrow.style.transform = `translateY(${20 * (1 - label)}px)`;
      lines.forEach((line, index) => {
        line.style.transform = `translateY(${115 * (1 - easeOut(phase(index * .12, .5)))}%)`;
      });
      photos.forEach((photo, index) => {
        const p = easeOut(phase(.2 + index * .14, .5));
        photo.style.opacity = String(p);
        photo.style.translate = `0 ${46 * (1 - p)}px`;
        photo.style.scale = String(.92 + .08 * p);
      });
      signature.style.strokeDasharray = "1";
      signature.style.strokeDashoffset = String((1 - phase(.5, .35)) ** 3);
      const morph = phase(.85, .35);
      const easedMorph = morph < .5 ? 4 * morph ** 3 : 1 - (-2 * morph + 2) ** 3 / 2;
      signature.setAttribute("d", signaturePath(easedMorph));
      const support = 1 - (1 - phase(.93, .5)) ** 2;
      sub.style.opacity = String(support);
      sub.style.transform = `translateY(${18 * (1 - support)}px)`;
    };
    let lastTime = 0;
    const tick = (time: number) => {
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      current += (target - current) * (1 - Math.exp(-elapsed / 140));
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
      const next = clamp(-track.getBoundingClientRect().top / (window.innerHeight * 1.2));
      if (Math.abs(next - target) < 0.0001 && frame) return;
      target = next;
      if (!frame) {
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const measure = () => {
      track.style.setProperty("--manifesto-height", `${scene.offsetHeight}px`);
      update();
    };
    const configure = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (media.matches) {
        track.dataset.pinned = "true";
        measure();
        current = target = clamp(-track.getBoundingClientRect().top / (window.innerHeight * 1.2));
        render(current);
      } else {
        delete track.dataset.pinned;
        [...lines, ...photos, eyebrow, sub].forEach((element) => element.removeAttribute("style"));
        signature.removeAttribute("style");
        signature.setAttribute("d", signaturePath(1));
      }
    };

    configure();
    const observer = new ResizeObserver(measure);
    observer.observe(scene);
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
    <div ref={trackRef} className="manifesto-track">
      <section ref={sceneRef} id="manifesto" className="manifesto-scene" aria-labelledby="manifesto-heading">
        <svg className="manifesto-motif" viewBox="-60 -60 120 120" aria-hidden="true">
          <path d="M0,-54 C6,-17 17,-6 54,0 C17,6 6,17 0,54 C-6,17 -17,6 -54,0 C-17,-6 -6,-17 0,-54 Z" />
        </svg>
        <div className="manifesto-grid">
          <p className="manifesto-eyebrow">{manifestoContent.eyebrow}</p>
          <span className="manifesto-folio" aria-hidden="true">02</span>
          <h2 id="manifesto-heading" className="manifesto-heading" aria-label={manifestoContent.headline}>
            <span className="manifesto-line" aria-hidden="true"><span className="manifesto-line-inner">Precisão <span className="manifesto-outline">digital</span>,</span></span>
            <span className="manifesto-line" aria-hidden="true"><span className="manifesto-line-inner">em <em>cada etapa</em>.</span></span>
          </h2>
          <svg className="manifesto-signature" viewBox="-60 -60 120 120" aria-hidden="true">
            <path d={signaturePath(1)} pathLength="1" />
          </svg>
          <p className="manifesto-sub">{manifestoContent.supportingCopy}</p>
          <div className="manifesto-gallery">
            {manifestoContent.images.map((image, index) => (
              <figure key={image.src} className={`manifesto-photo manifesto-photo--${index + 1}`}>
                <Image src={assetPath(image.src)} alt={image.alt} fill
                  sizes="(max-width: 860px) 38vw, 240px"
                  style={{ objectPosition: image.position }} />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
