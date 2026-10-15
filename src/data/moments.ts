const clinicPhoto = (number: number) =>
  `/brand/brunetti/clinic/WhatsApp Image 2026-10-11 at 18.48.52 (${number}).jpeg`;

// WebPs derived from the embedded photographs in the original Brunetti RAWs:
// detalhe: fotos brunetti/9FBA5C53-B231-419C-8C72-80522AACA624.ARW
// pincel: fotos brunetti/6F0782A8-FA3A-44BD-8D3A-CFD68EF4DE4B.ARW
const craft = {
  src: "/brand/brunetti/treatments/chairside-refinamento.jpg",
  alt: "Mãos trabalhando uma peça de cerâmica odontológica com uma pinça.",
};

type MomentPhoto = { src: string; alt: string; position?: string };

export const momentsContent: { eyebrow: string; footer: string; rows: MomentPhoto[][] } = {
  eyebrow: "A experiência Brunetti",
  footer: "Arte, cuidado e atenção aos detalhes",
  rows: [
    [
      craft,
      { src: clinicPhoto(42), alt: "Lounge da Brunetti com sofás e mesas de apoio." },
      { src: clinicPhoto(6), alt: "Mesa e objetos de design em ambiente revestido de madeira." },
      { src: clinicPhoto(18), alt: "Árvore e mobiliário junto aos painéis de madeira da clínica." },
      { src: clinicPhoto(11), alt: "Escultura em destaque diante de painéis de madeira." },
    ],
    [
      { src: "/brand/brunetti/clinic/moments-ceramica-pincel.webp", alt: "Mãos aplicando detalhes com pincel em uma peça de cerâmica odontológica.", position: "50% 62%" },
      { src: clinicPhoto(22), alt: "Mesa, notebook e obra de arte em um ambiente da Brunetti." },
      { src: clinicPhoto(21), alt: "Cadeiras e bancada junto à janela da clínica." },
      { src: clinicPhoto(43), alt: "Sofá e obras de arte na recepção da Brunetti." },
      craft,
    ],
  ],
};
