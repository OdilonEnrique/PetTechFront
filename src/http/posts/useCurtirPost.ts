import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type CurtirPostPayload = {
  id: string | number;
};

export function useCurtirPost() {
  async function handleCurtirPost(data: CurtirPostPayload) {
    const response = await API.patch(`/posts/${data.id}/curtir`);
    return response.data;
  }

  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: handleCurtirPost,
    mutationKey: ["curtir-post"],
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["list-posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-post", String(variables.id)],
      });

      toast.success("Post curtido com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao curtir post.");
    },
  });

  return { ...mutate };
}
