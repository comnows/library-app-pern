import { FaRegTrashCan } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLendList } from "../../../api";

type DeleteButtonProps = {
  id: number;
};

function DeleteButton({ id }: DeleteButtonProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => deleteLendList(id),

    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["lendLists"] });
      }
    },
  });

  const handleDelete = (id: number) => mutation.mutate(id);

  return (
    <button
      onClick={() => handleDelete(id)}
      className="group bg-white hover:bg-red-600 border border-red-600 rounded p-1"
    >
      <FaRegTrashCan className="text-red-600 group-hover:text-white text-xl" />
    </button>
  );
}

export default DeleteButton;
