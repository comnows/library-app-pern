import React from "react";

export type ChildrenType = {
  children: React.ReactNode;
};

export type LendListType = {
  id: number;
  book_name: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  due_date: Date;
  returned_date: Date | null;
}[];

export type LendInfoType = {
  memberId: string;
  bookId: number;
};

export type ButtonType = {
  name?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
