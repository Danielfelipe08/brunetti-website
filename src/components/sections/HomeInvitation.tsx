"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { invitationContent } from "@/data/invitation";
import { assetPath } from "@/lib/basePath";
import "./HomeInvitation.css";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const mix = (a: number[], b: number[], t: number) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

const ESPRESSO = [26, 23, 20];
const IVORY = [246, 241, 231];

export function HomeInvitation() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const pin = pinRef.current;
    if (!track || !pin) return;

    const media = window.matchMedia("(min-width: 861px) and (prefers-reduced-motion: no-preference)");
    const iris = pin.querySelector<HTMLElement>(".invitation-iris");
    const portrait = pin.querySelector<HTMLElement>(".invitation-portrait");
    const sub = pin.querySelector<HTMLElement>(".invitation-sub");
    const signature = pin.querySelector<SVGPathElement>(".invitation-signature path");

    let frame = 0;
    let current = 0;
    let target = 0;

    const render = (progress: number) => {
      // JOIA timeline (1.08 units): iris 0-.62, text colour .2-.46, signature draw .44-.72, fill .68-.84, spark .78-1.08.
      const time = progress * 1.08;
      if (iris) {
        const scale = 0.05 + (18 - 0.05) * easeInOut(clamp(time / 0.62));
        iris.style.transform = `translate(-50%, -50%) scale(${scale})`;
      }
      const [r, g, b] = mix(ESPRESSO, IVORY, clamp((time - 0.2) / 0.2));
      pin.style.color = `rgb(${r}, ${g}, ${b})`;
      if (sub) {
        const [sr, sg, sb] = mix(ESPRESSO, IVORY, clamp((time - 0.24) / 0.22));
        const alpha = 0.72 + 0.04 * clamp((time - 0.24) / 0.22);
        sub.style.color = `rgba(${sr}, ${sg}, ${sb}, ${alpha})`;
      }
      if (portrait) {
        portrait.style.transform = `scale(${1 + 0.06 * clamp(time / 0.65)})`;
      }
      if (signature) {
        signature.style.strokeDashoffset = String(1 - easeInOut(clamp((time - 0.44) / 0.28)));
        signature.style.fillOpacity = String(clamp((time - 0.68) / 0.16));
      }
    };

    let lastTime = 0;
    const tick = (now: number) => {
      const elapsed = lastTime ? Math.min(now - lastTime, 64) : 16;
      lastTime = now;
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

    const measure = () => clamp(-track.getBoundingClientRect().top / (window.innerHeight * 1.4));

    const update = () => {
      if (!media.matches) return;
      const next = measure();
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
        current = target = measure();
        render(current);
      } else {
        delete track.dataset.pinned;
        [pin, iris, portrait, sub, signature].forEach((el) => el?.removeAttribute("style"));
      }
    };

    configure();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", configure);
    media.addEventListener("change", configure);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", configure);
      media.removeEventListener("change", configure);
    };
  }, []);

  return (
    <section id="invitation" className="invitation-section" aria-labelledby="invitation-heading">
      <div ref={trackRef} className="invitation-track">
        <div ref={pinRef} className="invitation-pin">
          <span className="invitation-iris" aria-hidden="true" />
          <figure className="invitation-portrait" aria-hidden="true">
            <Image
              src={assetPath(invitationContent.portrait)}
              alt=""
              fill
              sizes="(max-width: 860px) 100vw, 42vw"
              style={{ objectFit: "cover", objectPosition: "55% center" }}
            />
          </figure>
          <div className="invitation-in">
            <div className="invitation-copy">
              <p className="invitation-eyebrow">{invitationContent.eyebrow}</p>
              <h2 id="invitation-heading" className="invitation-line">
                {invitationContent.titleStart}{" "}
                <span className="invitation-outline">{invitationContent.titleOutline}</span>
                <br />
                <em>{invitationContent.titleEmphasis}</em>.
              </h2>
            </div>
            <div className="invitation-action">
              <svg className="invitation-signature" viewBox="-60 -60 120 120" aria-hidden="true">
                <path
                  pathLength={1}
                  d="M0,-54 C6,-17 17,-6 54,0 C17,6 6,17 0,54 C-6,17 -17,6 -54,0 C-17,-6 -6,-17 0,-54 Z"
                />
              </svg>
              <p className="invitation-sub">{invitationContent.sub}</p>
              <WhatsAppCTA className="invitation-cta" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
