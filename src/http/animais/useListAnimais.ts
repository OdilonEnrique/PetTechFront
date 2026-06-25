import { API } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

type FaixaEtaria = "FILHOTE" | "ADULTO" | "IDOSO";

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

export function useListAnimais() {
  async function handleListAnimais(): Promise<Animal[]> {
    const response = await API.get("/animais");
    return response.data;
  }

  const query = useQuery({
    queryFn: handleListAnimais,
    queryKey: ["list-animais"],
  });

  return { ...query };
}
