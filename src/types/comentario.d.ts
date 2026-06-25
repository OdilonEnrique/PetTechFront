import type { Pessoa } from "./pessoa";

export type Comentario = {
  id: number;
  pessoaId: number;
  postId: number;
  texto: string;
  createdAt?: string;
  pessoa?: Pessoa;
};
