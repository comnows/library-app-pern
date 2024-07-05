import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { query } from "../db";

const getBookClassName = async (req: Request, res: Response) => {
  try {
    const results = await query("SELECT name FROM book_classes WHERE id = $1", [
      req.params.id,
    ]);

    res.status(StatusCodes.OK).json({
      data: {
        classes: results.rows,
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

export { getBookClassName };
