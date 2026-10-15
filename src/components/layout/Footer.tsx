import Image from "next/image";
import { assetPath } from "@/lib/basePath";
import "./Footer.css";

// Dados de contato e localização institucionais da clínica.
const footerData = {
  building: "Edifício Onze — Lago Sul",
  addressLine: "SHIS QI 11, Bloco K, Sala 06",
  cityState: "Brasília — DF",
  cep: "CEP 71625-590",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Edif%C3%ADcio+Onze+SHIS+QI+11+Bloco+K+Sala+06+Bras%C3%ADlia+DF+71625-590",
  embedMapUrl:
    "https://maps.google.com/maps?q=Edif%C3%ADcio+Onze,+SHIS+QI+11,+Bloco+K,+Sala+06,+Bras%C3%ADlia+-+DF,+71625-590&t=&z=16&ie=UTF8&iwloc=&output=embed",
  schedulingLabel: "Agendamentos",
  schedulingPhone: "(61) 99676-5914",
  schedulingUrl:
    "https://wa.me/5561996765914?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20na%20Brunetti%20Odontologia.",
  instagramHandle: "@brunettiodontologia",
  instagramUrl: "https://www.instagram.com/brunettiodontologia",
  email: "contato@brunettiodontologia.com.br",
  rtLegal: "Responsável Técnico: Dr. Jonas Brunetti",
};

export function Footer() {
  const currentYear = 2026;

  return (
    <footer id="contato" className="footer-root" role="contentinfo" aria-label="Rodapé institucional">
      <div className="footer-container">
        {/* Top brand & closing phrase */}
        <div className="footer-top">
          <div className="footer-brand-wrap">
            <div className="footer-logo-crop" aria-label="Brunetti Odontologia">
              <Image
                src={assetPath("/brand/brunetti/logos/logo-footer.jpg")}
                alt="Brunetti Odontologia"
                width={400}
                height={120}
                className="footer-logo-img"
              />
            </div>
            <p className="footer-tagline">
              Odontologia como <em>forma de arte</em>.
            </p>
          </div>

          <svg className="footer-spark" viewBox="-60 -60 120 120" aria-hidden="true">
            <path d="M0,-54 C6,-17 17,-6 54,0 C17,6 6,17 0,54 C-6,17 -17,6 -54,0 C-17,-6 -6,-17 0,-54 Z" />
          </svg>
        </div>

        {/* Content columns + Map embed */}
        <div className="footer-grid">
          {/* Column 1: Localização & Maps */}
          <div className="footer-col">
            <span className="footer-label">Localização</span>
            <p className="footer-text footer-address">
              <strong>{footerData.building}</strong>
              <br />
              {footerData.addressLine}
              <br />
              {footerData.cityState}
              <br />
              {footerData.cep}
            </p>
            <a
              href={footerData.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link footer-maps-link"
              aria-label="Ver localização no Google Maps"
            >
              Ver no Google Maps
              <span className="footer-arrow" aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Column 2: Conversa & Redes */}
          <div className="footer-col">
            <span className="footer-label">Conversa & Redes</span>
            <ul className="footer-links-list">
              <li className="footer-contact-item">
                <span className="footer-contact-caption">{footerData.schedulingLabel}</span>
                <a
                  href={footerData.schedulingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  aria-label={`Agendamentos via WhatsApp: ${footerData.schedulingPhone}`}
                >
                  {footerData.schedulingPhone}
                  <span className="footer-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a
                  href={footerData.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Instagram ({footerData.instagramHandle})
                  <span className="footer-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${footerData.email}`}
                  className="footer-link"
                  aria-label={`Enviar e-mail para ${footerData.email}`}
                >
                  {footerData.email}
                  <span className="footer-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Mapa real integrado */}
          <div className="footer-col footer-col-map">
            <span className="footer-label">Local no mapa</span>
            <a
              href={footerData.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-map-card"
              aria-label="Abrir mapa no Google Maps: Edifício Onze, Lago Sul, Brasília"
            >
              <iframe
                title="Mapa de localização — Brunetti Odontologia"
                src={footerData.embedMapUrl}
                className="footer-map-iframe"
                loading="lazy"
                aria-hidden="true"
                tabIndex={-1}
              />
              <div className="footer-map-badge" aria-hidden="true">
                <svg className="footer-map-badge-pin" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>Abrir no Google Maps ↗</span>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom divider and legal info */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Brunetti Odontologia. Todos os direitos reservados.
          </p>
          <p className="footer-legal">
            {footerData.rtLegal}
          </p>
        </div>
      </div>
    </footer>
  );
}
