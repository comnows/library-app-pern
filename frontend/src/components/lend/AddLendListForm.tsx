import { useState } from "react";
import FormButton from "../general/form/FormButton";
import FormInput from "../general/form/FormInput";
import { addLendList, fetchLendListByBookId } from "../../api";
import { LendInfoType, LendListType } from "../../lib/types";
import { useLendListContext } from "../../hooks/UseLendListContext";

function AddLendListForm() {
  const [lendInfo, setLendInfo] = useState<LendInfoType>({
    memberId: "",
    bookId: null!,
  });

  const { setLendLists, updateLendList } = useLendListContext();

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLendInfo((current: LendInfoType) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAddClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (!lendInfo.bookId) {
      alert("Please enter book id or/and member id");
      return;
    }

    const fetchBookResponse = await fetchLendListByBookId(lendInfo.bookId);
    const fetchListData: LendListType = fetchBookResponse.data.data.lists;

    if (fetchListData.length > 0) {
      if (lendInfo.memberId === "") {
        updateLendList(fetchListData[0].id);
        clearInput();
        return;
      } else {
        alert("This book was lent, remove member id to return the book");
        return;
      }
    } else {
      if (lendInfo.memberId === "") {
        alert(
          "This book doesn't have borrower yet, please enter member id to lend the book",
        );
        return;
      }
    }

    try {
      const response = await addLendList(lendInfo);

      setLendLists((current) => [...current, response.data.data.lists[0]]);
      clearInput();
    } catch (error) {
      console.error(error);
    }
  };

  const clearInput = () => {
    setLendInfo({
      memberId: "",
      bookId: null!,
    });
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
