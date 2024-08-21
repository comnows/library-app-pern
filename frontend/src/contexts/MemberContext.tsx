import { createContext, useState } from "react";
import { ChildrenType, MemberInfoType } from "../lib/types";

type MemberContextType = {
  memberInfo: MemberInfoType;
  setMemberInfo: React.Dispatch<React.SetStateAction<MemberInfoType>>;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (date: Date) => void;
  clearInput: () => void;
};

const memberContextState = {
  memberInfo: {
    personal_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    gender: "",
    date_of_birth: new Date(),
  },
  setMemberInfo: () => ({
    personal_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    gender: "",
    date_of_birth: new Date(),
  }),
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  },
  onDateChange: (date: Date) => {
    console.log(date);
  },
  clearInput: () => {},
};

export const MemberContext =
  createContext<MemberContextType>(memberContextState);

function MemberContextProvider({ children }: ChildrenType) {
  const [memberInfo, setMemberInfo] = useState<MemberInfoType>({
    personal_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    gender: "",
    date_of_birth: new Date(),
  });

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setMemberInfo((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const onDateChange = (date: Date) => {
    setMemberInfo((current) => ({
      ...current,
      date_of_birth: date,
    }));
  };

  const clearInput = () => {
    setMemberInfo({
      personal_id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      gender: "",
      date_of_birth: new Date(),
    });
  };

  return (
    <MemberContext.Provider
      value={{
        memberInfo,
        setMemberInfo,
        onInputChange,
        onDateChange,
        clearInput,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
}

export default MemberContextProvider;
