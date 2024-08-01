import { useState } from "react";
import FormButton from "../general/form/FormButton";
import FormInput from "../general/form/FormInput";
import { addLendList, fetchLendListByBookId } from "../../api";
import { LendInfoType, LendListType } from "../../lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUpdateReturnDateMutation } from "./mutations";

function AddLendListForm() {
  const [lendInfo, setLendInfo] = useState<LendInfoType>({
    memberId: "",
    bookId: null!,
  });

  const queryClient = useQueryClient();

  const { refetch } = useQuery({
    queryKey: ["lend", lendInfo.bookId],
    queryFn: () => fetchLendListByBookId(lendInfo.bookId),
    enabled: false,
  });

  const updateReturnDateMutation = useUpdateReturnDateMutation();

  const addLendListMutation = useMutation({
    mutationFn: (info: LendInfoType) => addLendList(info),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["lendLists"] });
      }
    },
  });

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

    const { data } = await refetch();
    const fetchListData: LendListType = data?.data.data.lists;
    console.log(fetchListData);

    if (fetchListData.length > 0) {
      if (lendInfo.memberId === "") {
        updateReturnDateMutation.mutate(fetchListData[0].id);
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

    addLendListMutation.mutate(lendInfo);
    clearInput();
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
