import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateAnimalRequest = {
  foto?: File | null;
  nome: string;
  especie: string;
  raca?: string | null;
  faixaEtaria: "FILHOTE" | "ADULTO" | "IDOSO";
  alimentacao: string;
  higiene: string;
  primeirosSocorros: string;
};

export function useCreateAnimal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAnimalRequest) => {
      const formData = new FormData();

      formData.append("nome", data.nome);
      formData.append("especie", data.especie);
      formData.append("faixaEtaria", data.faixaEtaria);
      formData.append("alimentacao", data.alimentacao);
      formData.append("higiene", data.higiene);
      formData.append("primeirosSocorros", data.primeirosSocorros);

      if (data.raca) {
        formData.append("raca", data.raca);
      }

      if (data.foto) {
        formData.append("foto", data.foto);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/animais`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar animal");
      }

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["list-animais"],
      });

      queryClient.invalidateQueries({
        queryKey: ["list-posts"],
      });
    },
  });
}
