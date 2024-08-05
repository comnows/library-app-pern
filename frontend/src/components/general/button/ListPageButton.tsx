import { ButtonType } from "../../../lib/types";

function ListPageButton({ name, onClick }: ButtonType) {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 hover:bg-green-500/90 active:bg-green-600/80 text-white rounded px-2 py-1"
    >
      {name}
    </button>
  );
}

export default ListPageButton;
