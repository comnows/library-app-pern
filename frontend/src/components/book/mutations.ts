import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook, updateBook } from "../../api";
import { BookInfoType } from "../../lib/types";

export function useUpdateBookMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, newData }: { id: number; newData: BookInfoType }) =>
      updateBook(id, newData),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["books"] });
      }
    },
  });
}

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
