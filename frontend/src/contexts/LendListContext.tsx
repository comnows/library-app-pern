import { createContext, useState } from "react";
import { ChildrenType } from "../lib/types";
import { LendListType } from "../lib/types";
import { updateLendListReturnDate } from "../api";

type LendListContextType = {
  lendLists: LendListType;
  setLendLists: React.Dispatch<React.SetStateAction<LendListType>>;
  updateLendList: (id: number) => void;
};

export const LendListContext = createContext<LendListContextType>(null!);

function LendListContextProvider({ children }: ChildrenType) {
  const [lendLists, setLendLists] = useState<LendListType>([]);

  const updateLendList = async (id: number) => {
    try {
      const response = await updateLendListReturnDate(id);

      const updatedLendLists: LendListType = lendLists.map((lend) =>
        lend.id === id
          ? {
              ...lend,
              returned_date: response.data.data.lists[0].returned_date,
            }
          : lend,
      );

      setLendLists(updatedLendLists);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LendListContext.Provider
      value={{ lendLists, setLendLists, updateLendList }}
    >
      {children}
    </LendListContext.Provider>
  );
}

export default LendListContextProvider;
