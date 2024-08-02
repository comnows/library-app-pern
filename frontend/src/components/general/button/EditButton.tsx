import { FaEdit } from "react-icons/fa";
import { ButtonType } from "../../../lib/types";

function EditButton({ onClick }: ButtonType) {
  return (
    <button
      onClick={onClick}
      className="group bg-white hover:bg-yellow-500 border border-yellow-500 rounded p-1"
    >
      <FaEdit className="text-yellow-500 group-hover:text-white text-xl" />
    </button>
  );
}

export default EditButton;
