"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { momentsContent } from "@/data/moments";
import { assetPath } from "@/lib/basePath";
import "./HomeMoments.css";

export function HomeMoments() {
  const sectionRef = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reveals = [...section.querySelectorAll<HTMLElement>("[data-moments-reveal]")];
    let revealObserver: IntersectionObserver;
    const observeReveals = () => {
      revealObserver?.disconnect();
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "true";
            revealObserver.unobserve(entry.target);
          }
        });
      }, { rootMargin: `0px 0px -${window.innerHeight * .14}px 0px` });
      reveals.forEach((element) => {
        if (!element.dataset.revealed) {
          if (element.getBoundingClientRect().top < window.innerHeight * .86) {
            element.dataset.revealed = "true";
          } else {
            element.dataset.ready = "true";
            revealObserver.observe(element);
          }
        }
      });
    };
    const visibility = new IntersectionObserver(([entry]) => {
      section.dataset.visible = String(entry.isIntersecting);
    });
    visibility.observe(section);
    observeReveals();
    window.addEventListener("resize", observeReveals);
    return () => {
      visibility.disconnect();
      revealObserver.disconnect();
      window.removeEventListener("resize", observeReveals);
    };
  }, []);

  return (
    <section ref={sectionRef} id="moments" className="moments-section" aria-labelledby="moments-heading" data-paused={paused}>
      <svg className="moments-motif" viewBox="-60 -60 120 120" aria-hidden="true">
        <path d="M0,-54 C6,-17 17,-6 54,0 C17,6 6,17 0,54 C-6,17 -17,6 -54,0 C-17,-6 -6,-17 0,-54 Z" />
      </svg>
      <header className="moments-head">
        <p className="moments-eyebrow" data-moments-reveal>{momentsContent.eyebrow}</p>
        <h2 id="moments-heading" className="moments-title" data-moments-reveal>O cuidado em cada <em>detalhe</em>.</h2>
      </header>
      <div className="moments-wall" aria-label="Ambientes e detalhes reais da Brunetti">
        {momentsContent.rows.map((row, rowIndex) => (
          <div className="moments-marquee" key={rowIndex}>
            <div className={`moments-track${rowIndex === 1 ? " moments-track--reverse" : ""}`}>
              {[...row, ...row].map((photo, index) => (
                <figure className="moments-frame" key={`${photo.src}-${index}`} aria-hidden={index >= row.length ? true : undefined}>
                  <Image src={assetPath(photo.src)} alt={index >= row.length ? "" : photo.alt} fill
                    sizes="(max-width: 860px) 60vw, (min-width: 1479px) 340px, (max-width: 1000px) 230px, 23vw"
                    style={{ objectPosition: photo.position ?? "center" }} />
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="moments-foot">
        <p>{momentsContent.footer}</p>
        <button type="button" className="moments-pause" aria-pressed={paused} onClick={() => setPaused(!paused)}>
          {paused ? "Retomar movimento" : "Pausar movimento"}
        </button>
      </div>
    </section>
  );
}
