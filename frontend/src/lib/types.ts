import React from "react";

export type ChildrenType = {
  children: React.ReactNode;
};

export type FetchQueriesType = {
  id?: number;
  option?: "prev" | "next";
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
  classes?: number | null;
  year?: number | null;
  writer?: string;
  publisher?: string;
};

export type BookInfoFormType = Omit<BookInfoType, "classes" | "year"> & {
  classes?: string;
  year?: string;
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
