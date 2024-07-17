import React from "react";

export type ChildrenType = {
  children: React.ReactNode;
};

export type LendInfoType = {
  memberId: string;
  bookId: number;
};

export type ButtonType = {
  name?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
