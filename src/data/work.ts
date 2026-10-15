type WorkTreatment = {
  name: string;
  description: string;
  image: string;
  alt: string;
  position: string;
  href?: string;
};

export const workTreatments: WorkTreatment[] = [
  {
    name: "Lentes de contato de porcelana",
    description: "Precisão e sensibilidade em cada detalhe. Cerâmica no centro do cuidado estético.",
    image: "/brand/brunetti/clinic/moments-ceramica-pincel.webp",
    alt: "Mãos trabalhando com pincel em uma peça de cerâmica odontológica na Brunetti.",
    position: "50% 62%",
    href: "https://api.whatsapp.com/send?phone=5561996238444&text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20Lentes%20de%20contato%20de%20porcelana%20na%20Brunetti.",
  },
  {
    name: "Implantes dentários",
    description: "Planejamento individual e atenção a cada etapa do cuidado.",
    image: "/brand/brunetti/clinic/WhatsApp Image 2026-10-11 at 18.48.52 (29).jpeg",
    alt: "Consultório da Brunetti com cadeira odontológica, bancada e iluminação natural.",
    position: "center",
    href: "https://api.whatsapp.com/send?phone=5561996238444&text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20Implantes%20dent%C3%A1rios%20na%20Brunetti.",
  },
  {
    name: "Clareamento + Air Flow",
    description: "Procedimentos distintos: clareamento para estética dental e profilaxia de alta precisão com Air Flow.",
    image: "/brand/brunetti/clinic/WhatsApp Image 2026-10-11 at 18.48.52 (30).jpeg",
    alt: "Cadeira odontológica em consultório da Brunetti com pedra e painéis de madeira.",
    position: "center",
    href: "https://api.whatsapp.com/send?phone=5561996238444&text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20Clareamento%20e%20Air%20Flow%20na%20Brunetti.",
  },
];
