import { LuFileClock } from "react-icons/lu";
import { ButtonType } from "../../../lib/types";

function UpdateButton({ onClick }: ButtonType) {
  return (
    <button
      onClick={onClick}
      className="group bg-white hover:bg-green-500 border border-green-500 rounded p-1"
    >
      <LuFileClock className="text-green-500 group-hover:text-white text-xl" />
    </button>
  );
}

export default UpdateButton;
