import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { query } from "../db";

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const results = await query("SELECT * FROM book");

    res.status(StatusCodes.OK).json({
      data: {
        books: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_GATEWAY).json({
      data: {
        error: "Something went wrong, please try again",
      },
    });
  }
};

const getBook = async (req: Request, res: Response) => {
  try {
    const results = await query("SELECT * FROM book WHERE id = $1", [
      req.params.id,
    ]);

    res.status(StatusCodes.OK).json({
      data: {
        books: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_GATEWAY).json({
      data: {
        error: "Something went wrong, please try again",
      },
    });
  }
};

const createBook = async (req: Request, res: Response) => {
  const { name, type } = req.body;
  try {
    const results = await query(
      "INSERT INTO book(name, type) VALUES($1, $2) RETURNING *",
      [name, type],
    );

    console.log(results);

    res.status(StatusCodes.CREATED).json({
      data: {
        books: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_GATEWAY).json({
      data: {
        error: "Something went wrong, please try again",
      },
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  const { name, type } = req.body;
  try {
    const results = await query(
      "UPDATE book SET name = $1, type = $2 WHERE id = $3 RETURNING *",
      [name, type, req.params.id],
    );

    res.status(StatusCodes.OK).json({
      data: {
        books: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_GATEWAY).json({
      data: {
        error: "Something went wrong, please try again",
      },
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    await query("DELETE FROM book WHERE id = $1", [req.params.id]);

    res.status(StatusCodes.OK).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_GATEWAY).json({
      data: {
        error: "Something went wrong, please try again",
      },
    });
  }
};

export { getAllBooks, getBook, createBook, updateBook, deleteBook };
