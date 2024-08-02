import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook } from "../../api";

export function useDeleteBookMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBook(id),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["books"] });
      }
    },
  });
}
