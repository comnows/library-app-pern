import { LuFileClock } from "react-icons/lu";
import { useUpdateReturnDateMutation } from "../../lend/mutations";

type UpdateButtonProps = {
  id: number;
};

function UpdateButton({ id }: UpdateButtonProps) {
  const updateReturnDateMutation = useUpdateReturnDateMutation();

  const handleUpdate = (id: number) => {
    updateReturnDateMutation.mutate(id);
  };

  return (
    <button
      onClick={() => handleUpdate(id)}
      className="group bg-white hover:bg-green-500 border border-green-500 rounded p-1 mr-2"
    >
      <LuFileClock className="text-green-500 group-hover:text-white text-xl" />
    </button>
  );
}

export default UpdateButton;
