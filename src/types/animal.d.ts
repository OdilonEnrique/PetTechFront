export type FaixaEtaria = "FILHOTE" | "ADULTO" | "IDOSO";

export type Animal = {
  id: number;
  fotoUrl?: string | null;
  nome: string;
  especie: string;
  raca?: string | null;
  faixaEtaria: FaixaEtaria;
  alimentacao: string;
  higiene: string;
  primeirosSocorros: string;
};
