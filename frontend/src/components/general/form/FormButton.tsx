type ButtonProps = {
  name: string;
};

function FormButton({ name }: ButtonProps) {
  return (
    <button className="size-full bg-green-500 text-white font-semibold rounded-full hover:bg-green-500/90 active:bg-green-600/80">
      {name}
    </button>
  );
}

export default FormButton;
