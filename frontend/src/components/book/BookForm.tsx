import FormInput from "../general/form/FormInput";
import { BookInfoFormType } from "../../lib/types";

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
          <FormInput
            name="classes"
            type="number"
            placeholder="class"
            value={classes}
            onChange={onChange}
          />
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
