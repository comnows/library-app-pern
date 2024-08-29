import { createContext, useState } from "react";
import { BookInfoFormType, ChildrenType } from "../lib/types";

type BookContextType = {
  bookInfo: BookInfoFormType;
  setBookInfo: React.Dispatch<React.SetStateAction<BookInfoFormType>>;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearInput: () => void;
};

const bookContxtState = {
  bookInfo: {
    name: "",
    classes: "",
    year: "",
    writer: "",
    publisher: "",
  },
  setBookInfo: () => ({
    name: "",
    classes: "",
    year: "",
    writer: "",
    publisher: "",
  }),
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  },
  clearInput: () => {},
};

export const BookContext = createContext<BookContextType>(bookContxtState);

function BookContextProvider({ children }: ChildrenType) {
  const [bookInfo, setBookInfo] = useState<BookInfoFormType>({
    name: "",
    classes: "000",
    year: "",
    writer: "",
    publisher: "",
  });

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setBookInfo((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const clearInput = () => {
    setBookInfo({
      name: "",
      classes: "000",
      year: "",
      writer: "",
      publisher: "",
    });
  };

  return (
    <BookContext.Provider
      value={{ bookInfo, setBookInfo, onInputChange, clearInput }}
    >
      {children}
    </BookContext.Provider>
  );
}

export default BookContextProvider;
