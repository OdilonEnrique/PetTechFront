import { API } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import type { Comentario } from "../comentarios/useListComentarioByPost";
import type { Animal } from "../animais/useListAnimais";

type Post = {
  id: number;
  animalId: number;
  titulo: string;
  conteudo: string;
  fotoUrl?: string | null;
  likes: number;
  createdAt?: string;
  animal?: Animal;
  comentarios?: Comentario[];
};

export function useListPosts() {
  async function handleListPosts(): Promise<Post[]> {
    const response = await API.get("/posts");
    return response.data;
  }

  const query = useQuery({
    queryFn: handleListPosts,
    queryKey: ["list-posts"],
  });

  return { ...query };
}
