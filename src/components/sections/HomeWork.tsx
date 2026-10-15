"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { workTreatments } from "@/data/work";
import { assetPath } from "@/lib/basePath";
import "./HomeWork.css";

export function HomeWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const motion = window.matchMedia("(min-width: 861px) and (prefers-reduced-motion: no-preference)");
    let rowsObserver: IntersectionObserver | undefined;
    let headingObserver: IntersectionObserver | undefined;
    const setup = () => {
      rowsObserver?.disconnect();
      headingObserver?.disconnect();
      section.dataset.animated = String(motion.matches);
      if (!motion.matches) return;
      rowsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.entered = "true";
            rowsObserver?.unobserve(entry.target);
          }
        });
      }, { threshold: .18, rootMargin: "0px 0px -6% 0px" });
      section.querySelectorAll(".work-row").forEach((row) => rowsObserver?.observe(row));
      headingObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.entered = "true";
            headingObserver?.unobserve(entry.target);
          }
        });
      }, { rootMargin: `0px 0px -${window.innerHeight * .14}px 0px` });
      section.querySelectorAll(".work-head > *").forEach((element) => headingObserver?.observe(element));
    };
    setup();
    motion.addEventListener("change", setup);
    return () => {
      rowsObserver?.disconnect();
      headingObserver?.disconnect();
      motion.removeEventListener("change", setup);
    };
  }, []);

  return (
    <section id="work" ref={sectionRef} className="work-section" aria-labelledby="work-heading">
      <svg className="work-motif" viewBox="-60 -60 120 120" aria-hidden="true">
        <path d="M0,-54 C6,-17 17,-6 54,0 C17,6 6,17 0,54 C-6,17 -17,6 -54,0 C-17,-6 -6,-17 0,-54 Z" />
      </svg>
      <div className="work-wrap">
        <header className="work-head">
          <p className="work-eyebrow">Tratamentos</p>
          <h2 id="work-heading" className="work-title">A arte de cuidar do seu <em>sorriso</em>.</h2>
          <p className="work-caption">Precisão · Tecnologia · Cuidado</p>
        </header>
        <div className="work-rows">
          {workTreatments.map((treatment, index) => (
            <article className="work-row" key={treatment.name} aria-labelledby={`work-treatment-${index}`}>
              <figure className="work-media">
                <Image src={assetPath(treatment.image)} alt={treatment.alt} fill sizes="(max-width: 860px) 92vw, (min-width: 1680px) 760px, 44vw" style={{ objectPosition: treatment.position }} />
              </figure>
              <div className="work-body">
                <p className="work-index">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="work-row-title" id={`work-treatment-${index}`}>{treatment.name}</h3>
                <p className="work-copy">{treatment.description}</p>
                <a
                  className="work-link"
                  href={treatment.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Conhecer ${treatment.name} pelo WhatsApp`}
                >
                  Conhecer tratamento <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
