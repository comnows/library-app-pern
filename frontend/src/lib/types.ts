import React from "react";

export type ChildrenType = {
  children: React.ReactNode;
};

export type FetchQueriesType = {
  id?: number;
  option?: "prev" | "next";
};

export type EditFormProps = {
  id: number;
  onClose: () => void;
};

export type BookType = {
  id: number;
  name: string;
  class_name: string;
  year: number;
  writer: string;
  publisher: string;
  create_at: Date;
  count?: number;
}[];

export type BookInfoType = {
  name?: string;
  classes?: string;
  year?: number | null;
  writer?: string;
  publisher?: string;
};

export type BookInfoFormType = Omit<BookInfoType, "year"> & {
  year?: string;
};

export type MemberType = {
  id: number;
  personal_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  gender: string;
  date_of_birth: Date;
  created_at: Date;
  count?: number;
}[];

export type MemberInfoType = {
  personal_id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  gender?: string;
  date_of_birth?: Date;
};

export type LendListType = {
  id: number;
  book_name: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  due_date: Date;
  returned_date: Date | null;
  count?: number;
}[];

export type LendInfoType = {
  memberId: string;
  bookId: number;
};

export type ButtonType = {
  name?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
