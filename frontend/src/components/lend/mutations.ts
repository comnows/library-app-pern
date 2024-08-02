import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLendList, updateLendListReturnDate } from "../../api";

export function useUpdateReturnDateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => updateLendListReturnDate(id),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["lendLists"] });
      }
    },
  });
}

export function useDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteLendList(id),

    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["lendLists"] });
      }
    },
  });
}
