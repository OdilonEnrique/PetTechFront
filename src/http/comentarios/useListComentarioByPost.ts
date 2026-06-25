import { API } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export type Comentario = {
  id: string | number;
  pessoaId: string | number;
  postId: string | number;
  texto: string;
  createdAt?: string;
  updatedAt?: string;
  pessoa?: {
    id: string | number;
    nome: string;
    avatarUrl?: string | null;
  };
};

type UseListComentariosByPostParams = {
  postId?: string | number;
};

export function useListComentariosByPost({
  postId,
}: UseListComentariosByPostParams) {
  async function handleListComentariosByPost(): Promise<Comentario[]> {
    const response = await API.get(`/comentarios/post/${postId}`);
    return response.data;
  }

  const query = useQuery({
    queryFn: handleListComentariosByPost,
    queryKey: ["list-comentarios-by-post", String(postId)],
    enabled: !!postId,
  });

  return { ...query };
}
