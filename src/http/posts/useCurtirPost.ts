import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CurtirPostRequest = {
  id: number;
};

export function useCurtirPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: CurtirPostRequest) => {
      await API.patch(`/posts/${id}/curtir`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["list-posts"],
      });
    },
  });
}
