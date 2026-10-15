type TeamMember = {
  name: string;
  role: string;
  image: string;
  alt: string;
  position: string;
};

// Textos editoriais sujeitos à validação Brunetti.
//
// PENDENTE: ainda não existem retratos reais de Dr. Jonas, da gestão ou da equipe
// em public/brand/brunetti/team/. Enquanto isso, cada cartão usa uma fotografia
// real da Brunetti (ambiente ou trabalho de cerâmica) como substituta. O texto
// alternativo descreve a imagem exibida, nunca a pessoa. Trocar `image`, `alt` e
// `position` quando os retratos autorizados forem entregues.
export const teamContent = {
  eyebrow: "Nossa equipe",
  titleStart: "Conheça a",
  titleEmphasis: "equipe",
  intro: "Cuidado e excelência em cada detalhe.",
  members: [
    {
      name: "Dr. Jonas Brunetti",
      role: "Dentista-chefe",
      image: "/brand/brunetti/team/7L3A5497.jpg",
      alt: "Retrato do Dr. Jonas Brunetti na clínica Brunetti Odontologia.",
      position: "50% 15%",
    },
    {
      name: "Fabiane Rossi",
      role: "Gestora da clínica",
      image: "/brand/brunetti/team/7L3A5465.jpg",
      alt: "Retrato de Fabiane Rossi na clínica Brunetti Odontologia.",
      position: "50% 20%",
    },
    {
      name: "Brunetti",
      role: "Multidisciplinar",
      image: "/brand/brunetti/team/jonas-fabi-01.jpg",
      alt: "Dr. Jonas Brunetti e Fabiane Rossi na clínica Brunetti Odontologia.",
      position: "50% 25%",
    },
  ] satisfies TeamMember[],
};
