import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { query } from "../db";
import { QueryObjectType } from "../libs/types";

const getAllBooks = async (req: Request, res: Response) => {
  const { id, option } = req.query;
  const queryObject: QueryObjectType = { orderBy: "ASC", operator: ">" };

  if (option) {
    queryObject.orderBy = option === "prev" ? "DESC" : "ASC";
    queryObject.operator = option === "prev" ? "<" : ">";
  }

  const queryString = `WITH PageResult AS (
                      SELECT
                        book.id,
                        book.name,
                        book_classes.name AS class_name,
                        book.year,
                        book.writer,
                        book.publisher,
                        book.create_at
                      FROM book
                      JOIN book_classes ON book.classes = book_classes.id
                      WHERE book.id ${queryObject.operator} COALESCE($1, 0)
                      ORDER BY book.id ${queryObject.orderBy}
                      LIMIT 5
                      ),
                      CountNext AS (
                        SELECT COUNT(*) AS count
                        FROM book
                        WHERE book.id > (SELECT MIN(id) FROM PageResult)
                      )
                      SELECT
                        pr.id,
                        pr.name,
                        pr.class_name,
                        pr.year,
                        pr.writer,
                        pr.publisher,
                        pr.create_at,
                        cn.count
                      FROM PageResult pr
                      CROSS JOIN CountNext cn
                      ORDER BY pr.id`;
  try {
    const results = await query(queryString, [id]);

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
  const { name, classes, year, writer, publisher } = req.body;
  try {
    const results = await query(
      "INSERT INTO book(name, classes, year, writer, publisher) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, classes, year, writer, publisher],
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
  const { name, classes, year, writer, publisher } = req.body;
  try {
    const results = await query(
      "UPDATE book SET name = $1, classes = $2, year = $3, writer = $4, publisher = $5 WHERE id = $6 RETURNING *",
      [name, classes, year, writer, publisher, req.params.id],
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
