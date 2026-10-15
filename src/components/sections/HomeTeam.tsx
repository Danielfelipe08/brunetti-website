"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { teamContent } from "@/data/team";
import { assetPath } from "@/lib/basePath";
import "./HomeTeam.css";

// JOIA fan: x / rotation / y offset for the left, center and right card.
const FAN = [
  { x: -96, r: -9, y: 18 },
  { x: 0, r: 0, y: 0 },
  { x: 96, r: 9, y: 18 },
] as const;

function cardStyle(index: number, active: number | null, armed: boolean): CSSProperties | undefined {
  if (!armed) return undefined;
  const fan = FAN[index];
  const isActive = active === index;
  const isDimmed = active !== null && !isActive;
  return {
    transform: `translate(${fan.x}px, ${isActive ? -16 : fan.y}px) rotate(${isActive ? 0 : fan.r}deg) scale(${isActive ? 1.1 : isDimmed ? 0.92 : 1})`,
    zIndex: isActive ? 30 : index === 1 ? 12 : 10,
    filter: isActive ? "brightness(1.04)" : isDimmed ? "brightness(.55) saturate(.85)" : "brightness(1)",
    animationDelay: `${index * 0.12}s`,
  };
}

export function HomeTeam() {
  const sectionRef = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    // Unified at 860px: tablet never inherits the closed desktop fan.
    const motion = window.matchMedia("(min-width: 861px) and (prefers-reduced-motion: no-preference)");
    const reveals = [...section.querySelectorAll<HTMLElement>("[data-team-reveal]")];
    let revealObserver: IntersectionObserver | undefined;
    let deckObserver: IntersectionObserver | undefined;

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

    const setupDeck = () => {
      deckObserver?.disconnect();
      setArmed(motion.matches);
      setActive(null);
      if (!motion.matches) return;
      deckObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          deckObserver?.disconnect();
        }
      }, { rootMargin: "0px 0px -28% 0px" });
      deckObserver.observe(section);
    };

    observeReveals();
    setupDeck();
    window.addEventListener("resize", observeReveals);
    motion.addEventListener("change", setupDeck);
    return () => {
      revealObserver?.disconnect();
      deckObserver?.disconnect();
      window.removeEventListener("resize", observeReveals);
      motion.removeEventListener("change", setupDeck);
    };
  }, []);

  const reset = () => setActive(null);

  return (
    <section ref={sectionRef} id="artist" className="team-section" aria-labelledby="team-heading">
      <svg className="team-motif" viewBox="-60 -60 120 120" aria-hidden="true">
        <path d="M0,-54 C6,-17 17,-6 54,0 C17,6 6,17 0,54 C-6,17 -17,6 -54,0 C-17,-6 -6,-17 0,-54 Z" />
      </svg>
      <div className="team-layout">
        <header className="team-head">
          <p className="team-eyebrow" data-team-reveal>{teamContent.eyebrow}</p>
          <h2 id="team-heading" className="team-title" data-team-reveal>
            {teamContent.titleStart} <em>{teamContent.titleEmphasis}</em>.
          </h2>
          <p className="team-intro" data-team-reveal>{teamContent.intro}</p>
        </header>
        <div className="team-stage">
          <ul className="team-names" onMouseLeave={reset} onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) reset();
          }}>
            {teamContent.members.map((member, index) => (
              <li key={member.name}>
                <button
                  type="button"
                  className="team-name-btn"
                  data-active={active === index}
                  onClick={() => armed && setActive(active === index ? null : index)}
                  onMouseEnter={() => armed && setActive(index)}
                  onFocus={() => armed && setActive(index)}
                >
                  <span className="team-name-index">{String(index + 1).padStart(2, "0")}</span>
                  {member.name}
                  <em>{member.role}</em>
                </button>
              </li>
            ))}
          </ul>
          <div
            className="team-deck"
            data-armed={armed}
            data-entered={entered}
            role="list"
            aria-label="Equipe Brunetti"
            onMouseLeave={reset}
          >
            {teamContent.members.map((member, index) => (
              <article
                className="team-card"
                key={member.name}
                role="listitem"
                style={cardStyle(index, active, armed)}
                onClick={() => armed && setActive(active === index ? null : index)}
                onMouseEnter={() => armed && setActive(index)}
              >
                <Image
                  src={assetPath(member.image)}
                  alt={member.alt}
                  fill
                  sizes="(max-width: 560px) 92vw, (max-width: 860px) 31vw, 285px"
                  style={{ objectPosition: member.position }}
                />
                <span className="team-badge">
                  <svg viewBox="-60 -60 120 120" aria-hidden="true">
                    <path d="M0,-54 C6,-17 17,-6 54,0 C17,6 6,17 0,54 C-6,17 -17,6 -54,0 C-17,-6 -6,-17 0,-54 Z" />
                  </svg>
                  BRUNETTI
                </span>
                <div className="team-plate">
                  <b>{member.name}</b>
                  <span>{member.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
