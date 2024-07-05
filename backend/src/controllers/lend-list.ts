import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { query } from "../db";

const getAllLendLists = async (req: Request, res: Response) => {
  try {
    const results = await query("SELECT * FROM lend_list");

    res.status(StatusCodes.OK).json({
      data: {
        lists: results.rows,
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

const getLendList = async (req: Request, res: Response) => {
  try {
    const results = await query("SELECT * FROM lend_list WHERE id = $1", [
      req.params.id,
    ]);

    res.status(StatusCodes.OK).json({
      data: {
        lists: results.rows,
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

const createLendList = async (req: Request, res: Response) => {
  const { bookId, memberId } = req.body;
  try {
    const results = await query(
      "INSERT INTO lend_list(book_id, member_id) VALUES($1, $2) RETURNING *",
      [bookId, memberId],
    );

    console.log(results);

    res.status(StatusCodes.CREATED).json({
      data: {
        lists: results.rows,
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

const updateLendListReturnDate = async (req: Request, res: Response) => {
  try {
    const results = await query(
      "UPDATE lend_list SET return_date = CURRENT_DATE WHERE id = $1 RETURNING *",
      [req.params.id],
    );

    res.status(StatusCodes.OK).json({
      data: {
        lists: results.rows,
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

const deleteLendList = async (req: Request, res: Response) => {
  try {
    await query("DELETE FROM lend_list WHERE id = $1", [req.params.id]);

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

export {
  getAllLendLists,
  getLendList,
  createLendList,
  updateLendListReturnDate,
  deleteLendList,
};
