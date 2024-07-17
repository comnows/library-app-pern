import { createContext, useState } from "react";
import { ChildrenType } from "../lib/types";
import { LendListType } from "../lib/types";

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
