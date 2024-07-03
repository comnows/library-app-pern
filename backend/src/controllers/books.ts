import { Request, Response } from "express";
import { query } from "../db";

const getAllBooks = async (req: Request, res: Response) => {
  const results = await query("SELECT * FROM book");

  console.log(results);
  res.status(200).json({
    data: {},
  });
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
