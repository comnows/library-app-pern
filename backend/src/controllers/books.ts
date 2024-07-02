import { Request, Response } from "express";

const getAllBooks = (req: Request, res: Response) => {
  console.log(req, res);
  res.send("get all books");
};
const getBook = (req: Request, res: Response) => {
  console.log(req, res);
  res.send("get book");
};
const createBook = (req: Request, res: Response) => {
  console.log(req, res);
  res.send("create books");
};
const updateBook = (req: Request, res: Response) => {
  console.log(req, res);
  res.send("update books");
};
const deleteBook = (req: Request, res: Response) => {
  console.log(req, res);
  res.send("delete books");
};

export { getAllBooks, getBook, createBook, updateBook, deleteBook };
