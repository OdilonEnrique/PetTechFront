import { API } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export type Pessoa = {
  id: string;
  nome: string;
  avatarUrl?: string | null;
};

export function useListPessoas() {
  async function handleListPessoas(): Promise<Pessoa[]> {
    const response = await API.get("/pessoas");
    return response.data;
  }

  const query = useQuery({
    queryFn: handleListPessoas,
    queryKey: ["list-pessoas"],
  });

  return { ...query };
}
