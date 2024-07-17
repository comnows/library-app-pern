import { useState } from "react";
import FormButton from "../general/form/FormButton";
import FormInput from "../general/form/FormInput";
import { addLendList } from "../../api";
import { LendInfoType } from "../../lib/types";
import { useLendListContext } from "../../hooks/UseLendListContext";

function AddLendListForm() {
  const [lendInfo, setLendInfo] = useState<LendInfoType>({
    memberId: "",
    bookId: null!,
  });

  const { setLendLists } = useLendListContext();

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLendInfo((current: LendInfoType) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAddClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault;

    try {
      const response = await addLendList(lendInfo);

      setLendLists((current) => [...current, response.data.data.lists[0]]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-2 mx-6">
      <div className="flex-1">
        <FormInput
          name="memberId"
          placeholder="Member ID"
          value={lendInfo.memberId}
          onChange={onInputChange}
        />
      </div>
      <div className="flex-1">
        <FormInput
          name="bookId"
          type="number"
          placeholder="Book ID"
          value={lendInfo.bookId ? `${lendInfo.bookId}` : ""}
          onChange={onInputChange}
        />
      </div>
      <div className="flex-none w-[200px]">
        <FormButton name="Confirm" onClick={handleAddClick} />
      </div>
    </div>
  );
}

export default AddLendListForm;
