import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type CreateComentarioPayload = {
  pessoaId: string | number;
  postId: string | number;
  texto: string;
};

export function useCreateComentario() {
  async function handleCreateComentario(data: CreateComentarioPayload) {
    const response = await API.post("/comentarios", data);
    return response.data;
  }

  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: handleCreateComentario,
    mutationKey: ["create-comentario"],
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["list-comentarios-by-post", String(variables.postId)],
      });

      queryClient.invalidateQueries({
        queryKey: ["list-posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-post", String(variables.postId)],
      });

      toast.success("Comentário criado com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao criar comentário.");
    },
  });

  return { ...mutate };
}
