"use client";
 
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { homeContent, homeNavigation } from "@/data/home";
import "./Header.css";

import { assetPath } from "@/lib/basePath";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    setIsOpen(e.currentTarget.open);
  };

  return (
    <header className={`header-header ${isScrolled ? "is-scrolled" : ""}`}>
      <a href="#conteudo" className="header-skip-link">
        Ir para o conteúdo
      </a>
      <Container className="header-inner">
        <a
          href="#inicio"
          className="header-brand"
          aria-label="Brunetti Odontologia — início"
          onClick={() => setIsOpen(false)}
        >
          <span
            aria-hidden="true"
            className="header-logo-crop"
            style={{ maskImage: `url("${assetPath(homeContent.logo)}")` }}
          />
        </a>
        <nav aria-label="Navegação principal" className="header-desktop-nav">
          <ul className="header-links">
            {homeNavigation.map(({ label, href }) => (
              <li key={label}>
                <a href={href} onClick={handleLinkClick}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <WhatsAppCTA className="header-desktop-cta" />
        <details
          ref={detailsRef}
          className="header-mobile-menu"
          open={isOpen}
          onToggle={handleToggle}
        >
          <summary className="header-menu-toggle" aria-label="Alternar menu">
            <span className="header-open-label">Menu</span>
            <span className="header-close-label">Fechar</span>
            <span aria-hidden="true" className="header-menu-icon" />
          </summary>
          <nav aria-label="Navegação do menu" className="header-mobile-panel">
            <Container>
              <ul className="header-mobile-links">
                {homeNavigation.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} onClick={handleLinkClick}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              <div onClick={handleLinkClick}>
                <WhatsAppCTA className="header-mobile-cta" />
              </div>
            </Container>
          </nav>
        </details>
      </Container>
    </header>
  );
}
