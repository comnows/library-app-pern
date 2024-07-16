import FormButton from "../general/form/FormButton";
import FormInput from "../general/form/FormInput";

function AddLendListForm() {
  return (
    <div className="flex gap-2 mx-6">
      <div className="flex-1">
        <FormInput placeholder="Member ID" />
      </div>
      <div className="flex-1">
        <FormInput placeholder="Book ID" />
      </div>
      <div className="flex-none w-[200px]">
        <FormButton name="Confirm" />
      </div>
    </div>
  );
}

export default AddLendListForm;
