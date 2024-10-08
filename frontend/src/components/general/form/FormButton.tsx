import { ButtonType } from "../../../lib/types";

function FormButton({ name, onClick }: ButtonType) {
  return (
    <button
      onClick={onClick}
      className="size-full bg-green-500 text-white font-semibold rounded-full hover:bg-green-500/90 active:bg-green-600/80"
    >
      {name}
    </button>
  );
}

export default FormButton;
