type InputProps = {
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function FormInput({ name, type, placeholder, value, onChange }: InputProps) {
  return (
    <input
      type={type ? type : "text"}
      name={name}
      placeholder={placeholder}
      value={value ? value : ""}
      onChange={onChange}
      className="w-full border-2 rounded-xl outline-none outline-offset-2 px-4 py-2 focus:outline focus:outline-green-500"
    />
  );
}

export default FormInput;
