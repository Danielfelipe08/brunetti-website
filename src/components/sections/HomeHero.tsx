import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { TextLink } from "@/components/ui/TextLink";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { homeContent } from "@/data/home";
import "./HomeHero.css";

export function HomeHero() {
  return (
    <section id="inicio" aria-labelledby="hero-heading" className="hero-hero">
      <div className="hero-media">
        <Image
          src={homeContent.image.src}
          alt={homeContent.image.alt}
          fill
          sizes="100vw"
          preload
          className="hero-image"
        />
      </div>
      <Container className="hero-content">
        <div className="hero-copy">
          <p className={`text-eyebrow hero-eyebrow`}>{homeContent.eyebrow}</p>
          <h1 id="hero-heading" className={`text-h1 hero-headline`}>
            {homeContent.headline}
          </h1>
          <p className={`text-body hero-supporting-copy`}>
            {homeContent.supportingCopy}
          </p>
          <div className="hero-actions">
            <WhatsAppCTA className="hero-primary-cta" />
            <TextLink href={homeContent.clinicHref} className="hero-secondary-cta">
              {homeContent.secondaryCta}
            </TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
