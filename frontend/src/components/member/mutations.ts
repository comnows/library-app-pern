import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMember } from "../../api";

export function useDeleteMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteMember(id),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["members"] });
      }
    },
  });
}
