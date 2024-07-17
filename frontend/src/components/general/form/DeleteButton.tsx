import { FaRegTrashCan } from "react-icons/fa6";
import { ButtonType } from "../../../lib/types";

function DeleteButton({ onClick }: ButtonType) {
  return (
    <button
      onClick={onClick}
      className="group bg-white hover:bg-red-600 border border-red-600 rounded p-1 ml-2"
    >
      <FaRegTrashCan className="text-red-600 group-hover:text-white text-xl" />
    </button>
  );
}

export default DeleteButton;
