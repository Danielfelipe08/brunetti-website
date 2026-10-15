export type MakeoverCase = {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  caption: string;
};

export const makeoverContent: {
  label: string;
  eyebrow: string;
  case: MakeoverCase | null;
} = {
  label: "Antes / Depois",
  eyebrow: "Resultados",
  // Pendente: selecionar um par real do mesmo caso e validar sua apresentação.
  // Usar apenas arquivos em public/brand/brunetti/.
  case: null,
};
