import type { Animal, FaixaEtaria } from "@/types/animal";
import type { Post } from "@/types/post";

export function getImageUrl(value?: string | null) {
  if (!value) return undefined;

  if (value.startsWith("http")) {
    return value;
  }

  const baseUrl = import.meta.env.VITE_API_URL;

  return `${baseUrl}/${value}`;
}

export function formatFaixaEtaria(faixa?: FaixaEtaria) {
  const labels: Record<FaixaEtaria, string> = {
    FILHOTE: "Filhote",
    ADULTO: "Adulto",
    IDOSO: "Idoso",
  };

  return faixa ? labels[faixa] : "Pet";
}

export function getTagClass(faixa?: FaixaEtaria) {
  if (faixa === "FILHOTE") return "tag-filhote";
  if (faixa === "ADULTO") return "tag-adulto";
  if (faixa === "IDOSO") return "tag-idoso";

  return "";
}

export function getAnimalImage(animal?: Animal) {
  return getImageUrl(animal?.fotoUrl);
}

export function getPostImage(post?: Post) {
  return getImageUrl(post?.fotoUrl);
}
