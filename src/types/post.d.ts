import type { Animal } from "./animal";
import type { Comentario } from "./comentario";

export type Post = {
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
