export type GallerySpace = {
  title: string;
  image: string;
  alt: string;
  position: string;
};

// Textos editoriais e seleção de ambientes sujeitos à validação Brunetti.
// Utiliza exclusivamente fotografias reais de alta resolução da clínica em public/brand/brunetti/clinic/.
export const galleryContent = {
  eyebrow: "O espaço",
  titleStart: "Por dentro da nossa",
  titleEmphasis: "clínica",
  spaces: [
    {
      title: "Suíte clínica",
      image: "/brand/brunetti/clinic/WhatsApp Image 2026-10-11 at 18.48.52 (29).jpeg",
      alt: "Consultório da Brunetti com cadeira odontológica, bancada de pedra e ampla janela de iluminação natural.",
      position: "center 42%",
    },
    {
      title: "Lounge de consulta",
      image: "/brand/brunetti/clinic/WhatsApp Image 2026-10-11 at 18.48.52 (22).jpeg",
      alt: "Sala de atendimento e acolhimento da Brunetti com mesa de design, marcenaria nobre e obra de arte contemporânea.",
      position: "center 45%",
    },
    {
      title: "Recepção e lounge",
      image: "/brand/brunetti/clinic/WhatsApp Image 2026-10-11 at 18.48.52 (19).jpeg",
      alt: "Recepção da Brunetti com painel iluminado, marcenaria em madeira e sofás em ambiente de hotelaria de luxo.",
      position: "center 55%",
    },
  ] satisfies GallerySpace[],
};
