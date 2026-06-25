import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreatePostRequest = {
  animalId: number;
  titulo: string;
  conteudo: string;
  foto?: File | null;
};

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePostRequest) => {
      const formData = new FormData();

      formData.append("animalId", String(data.animalId));
      formData.append("titulo", data.titulo);
      formData.append("conteudo", data.conteudo);

      if (data.foto) {
        formData.append("foto", data.foto);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao criar post");
      }

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["list-posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["list-animais"],
      });
    },
  });
}
