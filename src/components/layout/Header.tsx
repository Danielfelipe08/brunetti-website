import { Container } from "@/components/layout/Container";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { homeContent, homeNavigation } from "@/data/home";
import "./Header.css";

function NavigationItems() {
  return homeNavigation.map(({ label, href }) => (
    <li key={label}>
      <a
        href={href}
        role={href ? undefined : "link"}
        aria-disabled={href ? undefined : true}
        title={href ? undefined : "Em breve"}
      >
        {label}
      </a>
    </li>
  ));
}

export function Header() {
  return (
    <header className="header-header">
      <a href="#conteudo" className="header-skip-link">
        Ir para o conteúdo
      </a>
      <Container className="header-inner">
        <a
          href="#inicio"
          className="header-brand"
          aria-label="Brunetti Odontologia — início"
        >
          <span
            aria-hidden="true"
            className="header-logo-crop"
            style={{ maskImage: `url("${homeContent.logo}")` }}
          />
        </a>
        <nav aria-label="Navegação principal" className="header-desktop-nav">
          <ul className="header-links">
            <NavigationItems />
          </ul>
        </nav>
        <WhatsAppCTA className="header-desktop-cta" />
        <details className="header-mobile-menu">
          <summary className="header-menu-toggle">
            <span className="header-open-label">Menu</span>
            <span className="header-close-label">Fechar</span>
            <span aria-hidden="true" className="header-menu-icon" />
          </summary>
          <nav aria-label="Navegação mobile" className="header-mobile-panel">
            <Container>
              <ul className="header-mobile-links">
                <NavigationItems />
              </ul>
              <WhatsAppCTA className="header-mobile-cta" />
            </Container>
          </nav>
        </details>
      </Container>
    </header>
  );
}
