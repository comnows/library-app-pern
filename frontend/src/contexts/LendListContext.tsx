import { createContext, useState } from "react";
import { ChildrenType } from "../lib/types";

type LendListType = {
  id: number;
  book_name: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  due_date: Date;
  returned_date: Date | null;
}[];

type LendListContextType = {
  lendLists: LendListType;
  setLendLists: React.Dispatch<React.SetStateAction<LendListType>>;
};

export const LendListContext = createContext<LendListContextType>(null!);

function LendListContextProvider({ children }: ChildrenType) {
  const [lendLists, setLendLists] = useState<LendListType>([]);

  return (
    <LendListContext.Provider value={{ lendLists, setLendLists }}>
      {children}
    </LendListContext.Provider>
  );
}

export default LendListContextProvider;
