import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { query } from "../db";
import { QueryObjectType } from "../libs/types";

const getAllLendLists = async (req: Request, res: Response) => {
  const { id, option } = req.query;
  const queryObject: QueryObjectType = { orderBy: "ASC", operator: ">" };

  if (option) {
    queryObject.orderBy = option === "prev" ? "DESC" : "ASC";
    queryObject.operator = option === "prev" ? "<" : ">";
  }

  const queryString = `WITH PageResult AS (
                        SELECT 
                          lend_list.id, 
                          book.name AS book_name, 
                          member.first_name, 
                          member.last_name, 
                          lend_list.created_at, 
                          lend_list.due_date, 
                          lend_list.returned_date
                        FROM lend_list 
                        JOIN book ON lend_list.book_id = book.id 
                        JOIN member ON lend_list.member_id = member.id 
                        WHERE lend_list.id ${queryObject.operator} COALESCE($1, 0) 
                        ORDER BY lend_list.id ${queryObject.orderBy} 
                        LIMIT 5
                        ),
                        CountNext AS (
                          SELECT COUNT(*) AS count
                          FROM lend_list
                          WHERE lend_list.id >= (SELECT MIN(id) FROM PageResult)
                        )
                        SELECT
                          pr.id,
                          pr.book_name,
                          pr.first_name,
                          pr.last_name,
                          pr.created_at,
                          pr.due_date,
                          pr.returned_date,
                          cn.count
                      FROM PageResult pr
                      CROSS JOIN CountNext cn
                      ORDER BY pr.id`;

  try {
    const results = await query(queryString, [id]);

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

const getLendListByBookId = async (req: Request, res: Response) => {
  try {
    const results = await query(
      "SELECT * FROM lend_list WHERE book_id = $1 AND returned_date IS NULL",
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

const createLendList = async (req: Request, res: Response) => {
  const { bookId, memberId } = req.body;
  try {
    const results = await query(
      "WITH new_lend AS (INSERT INTO lend_list(book_id, member_id) VALUES($1, $2) RETURNING *) SELECT new_lend.id, book.name AS book_name, member.first_name, member.last_name, new_lend.created_at, new_lend.due_date, new_lend.returned_date FROM new_lend JOIN book ON new_lend.book_id = book.id JOIN member ON new_lend.member_id = member.id",
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
      "UPDATE lend_list SET returned_date = CURRENT_DATE WHERE id = $1 RETURNING *",
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
  getLendListByBookId,
  createLendList,
  updateLendListReturnDate,
  deleteLendList,
};
