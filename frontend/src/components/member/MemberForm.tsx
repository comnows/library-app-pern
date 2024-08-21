import DatePicker from "react-datepicker";
import { MemberInfoType } from "../../lib/types";
import FormInput from "../general/form/FormInput";
import { useMemberContext } from "../../hooks/UseMemberContext";

import "react-datepicker/dist/react-datepicker.css";
import { ChangeEvent } from "react";

type MemberFormProps = MemberInfoType & {
  formName: string;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function MemberForm({
  formName,
  personal_id = "",
  first_name = "",
  last_name = "",
  email = "",
  phone_number = "",
  gender = "",
  date_of_birth = new Date(),
  onSubmit,
}: MemberFormProps) {
  const { setMemberInfo, onInputChange, onDateChange } = useMemberContext();

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setMemberInfo((current) => ({
      ...current,
      gender: event.target.value,
    }));
  };

  return (
    <form className="flex flex-col gap-3">
      <legend className="text-lg font-semibold">{formName}</legend>
      <FormInput
        name="personal_id"
        type="text"
        placeholder="Personal ID"
        value={personal_id}
        onChange={onInputChange}
      />
      <FormInput
        name="first_name"
        type="text"
        placeholder="First name"
        value={first_name}
        onChange={onInputChange}
      />
      <FormInput
        name="last_name"
        type="text"
        placeholder="Last name"
        value={last_name}
        onChange={onInputChange}
      />
      <FormInput
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={onInputChange}
      />
      <FormInput
        name="phone_number"
        type="number"
        placeholder="Phone number"
        value={phone_number}
        onChange={onInputChange}
      />
      <select
        name="gender"
        id="gender"
        className="w-full border-2 rounded-xl outline-none outline-offset-2 px-2 py-2 focus:outline focus:outline-green-500"
        onChange={onSelectChange}
        value={gender}
      >
        <option value="">Select gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Agender">Agender</option>
        <option value="Bigender">Bigender</option>
        <option value="Genderfluid">Genderfluid</option>
        <option value="Genderqueer">Genderqueer</option>
        <option value="Polygender">Polygender</option>
        <option value="Non-binary">Non-binary</option>
        <option value="Others">Others</option>
      </select>
      <DatePicker
        className="w-full border-2 rounded-xl outline-none outline-offset-2 px-4 py-2 focus:outline focus:outline-green-500"
        selected={date_of_birth}
        onChange={(date) => {
          if (!date) return;

          onDateChange(date);
        }}
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

export default MemberForm;
