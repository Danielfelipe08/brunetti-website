// Copy provisória: substituir aqui após aprovação da Brunetti.
export const homeContent = {
  eyebrow: "BRUNETTI ODONTOLOGIA",
  headline: "Odontologia, arte e tecnologia em uma experiência singular.",
  supportingCopy:
    "Uma experiência odontológica construída em torno de precisão, tecnologia e atendimento personalizado.",
  primaryCta: "Falar com a Brunetti",
  secondaryCta: "Conhecer a clínica",
  // Pendente: link oficial do WhatsApp e destino institucional aprovado.
  whatsappHref: undefined as string | undefined,
  clinicHref: undefined as string | undefined,
  // Nomes dos arquivos reais disponíveis no repositório.
  logo: "/brand/logo-clinica.PNG",
  image: {
    src: "/images/hero/hero-teste-clinica.JPG",
    alt: "Escultura em destaque diante de painéis de madeira na Brunetti Odontologia.",
  },
};

// Sem rotas fictícias: preencher os destinos conforme as páginas forem criadas.
export const homeNavigation: { label: string; href?: string }[] = [
  { label: "A Clínica" },
  { label: "Tratamentos" },
  { label: "Tecnologia" },
  { label: "Na Mídia" },
  { label: "Contato" },
];
