type InputProps = {
  placeholder: string;
};

function FormInput({ placeholder }: InputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full border-2 rounded-xl outline-none outline-offset-0 px-4 py-2 focus:outline focus:outline-green-500"
    />
  );
}

export default FormInput;
