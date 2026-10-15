// Copy provisória: substituir aqui após aprovação da Brunetti.
export const homeContent = {
  eyebrow: "BRUNETTI ODONTOLOGIA",
  headline: "Odontologia como forma de arte.",
  headlineLines: [{ text: "Odontologia" }, { text: "como forma" }, { text: "de arte" }],
  cue: "Atendimento personalizado",
  supportingCopy:
    "Uma experiência odontológica construída em torno de precisão, tecnologia e atendimento personalizado.",
  primaryCta: "Falar com a Brunetti",
  secondaryCta: "Conhecer a clínica",
  // Link oficial do WhatsApp ativo com o número para testes.
  whatsappHref:
    "https://api.whatsapp.com/send?phone=5561996238444&text=Ol%C3%A1!%20Gostaria%20de%20conversar%20com%20a%20equipe%20da%20Brunetti%20Odontologia.",
  clinicHref: "#gallery",
  // Nomes dos arquivos reais disponíveis no repositório.
  logo: "/brand/brunetti/logos/logo-footer.jpg",
  image: {
    src: "/brand/brunetti/clinic/WhatsApp Image 2026-10-11 at 18.48.52 (41).jpeg",
    alt: "Passagem entre painéis de madeira para o lounge da Brunetti, com vegetação e mobiliário de design.",
  },
};

// Navegação institucional funcional conectada às seções da Home.
export const homeNavigation: { label: string; href: string }[] = [
  { label: "A Clínica", href: "#gallery" },
  { label: "Antes & Depois", href: "#makeover" },
  { label: "Tratamentos", href: "#work" },
  { label: "Equipe", href: "#artist" },
  { label: "Tecnologia", href: "#manifesto" },
  { label: "Contato", href: "#invitation" },
];
