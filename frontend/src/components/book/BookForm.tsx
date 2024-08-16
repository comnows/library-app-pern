import FormInput from "../general/form/FormInput";
import { BookInfoFormType } from "../../lib/types";
import { ChangeEvent } from "react";
import { useBookContext } from "../../hooks/UseBookContext";

type BookFormProps = BookInfoFormType & {
  formName: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function BookForm({
  name = "",
  classes = "",
  year = "",
  writer = "",
  publisher = "",
  formName = "",
  onChange,
  onSubmit,
}: BookFormProps) {
  const { setBookInfo } = useBookContext();

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setBookInfo((current) => ({
      ...current,
      classes: event.target.value,
    }));
  };

  return (
    <form className="flex flex-col gap-3">
      <legend className="text-lg font-semibold">{formName}</legend>
      <FormInput
        name="name"
        type="text"
        placeholder="name"
        value={name}
        onChange={onChange}
      />
      <div className="flex gap-3">
        <div className="flex-1">
          <select
            name="classes"
            id="classes"
            className="w-full border-2 rounded-xl outline-none outline-offset-2 px-2 py-2 focus:outline focus:outline-green-500"
            onChange={onSelectChange}
            value={classes}
          >
            <option value="000">000</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
            <option value="800">800</option>
            <option value="900">900</option>
          </select>
        </div>
        <div className="flex-1">
          <FormInput
            name="year"
            type="number"
            placeholder="year"
            value={year}
            onChange={onChange}
          />
        </div>
      </div>
      <FormInput
        name="writer"
        type="text"
        placeholder="writer"
        value={writer}
        onChange={onChange}
      />
      <FormInput
        name="publisher"
        type="text"
        placeholder="publisher"
        value={publisher}
        onChange={onChange}
      />
      <button
        onClick={onSubmit}
        className="bg-green-500 hover:bg-green-500/90 active:bg-green-600/80 text-white rounded-full mt-4 px-4 py-2"
      >
        Confirm
      </button>
    </form>
  );
}

export default BookForm;
