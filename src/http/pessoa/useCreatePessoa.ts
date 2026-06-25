import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type CreatePessoaPayload = {
  nome: string;
  avatarUrl?: string | null;
};

export function useCreatePessoa() {
  async function handleCreatePessoa(data: CreatePessoaPayload) {
    const response = await API.post("/pessoas", data);
    return response.data;
  }

  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: handleCreatePessoa,
    mutationKey: ["create-pessoa"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["list-pessoas"],
      });

      toast.success("Pessoa cadastrada com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao cadastrar pessoa.");
    },
  });

  return { ...mutate };
}
