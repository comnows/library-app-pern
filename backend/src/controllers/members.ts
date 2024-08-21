import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { query } from "../db";
import { QueryObjectType } from "../libs/types";

const getAllMemebers = async (req: Request, res: Response) => {
  const { id, option } = req.query;
  const queryObject: QueryObjectType = { orderBy: "ASC", operator: ">" };

  if (option) {
    queryObject.orderBy = option === "prev" ? "DESC" : "ASC";
    queryObject.operator = option === "prev" ? "<" : ">";
  }

  const queryString = `WITH PageResult AS (
    SELECT
      member.id,
      member.personal_id,
      member.first_name,
      member.last_name,
      member.email,
      member.phone_number,
      member.gender,
      member.date_of_birth,
      member.created_at
    FROM member
    WHERE member.id ${queryObject.operator} COALESCE($1, 0)
    ORDER BY member.id ${queryObject.orderBy}
    LIMIT 15
    ),
    CountNext AS (
      SELECT COUNT(*) AS count
      FROM member
      WHERE member.id >= (SELECT MIN(id) FROM PageResult)
    )
    SELECT
      pr.id,
      pr.personal_id,
      pr.first_name,
      pr.last_name,
      pr.email,
      pr.phone_number,
      pr.gender,
      pr.date_of_birth,
      pr.created_at,
      cn.count
    FROM PageResult pr
    CROSS JOIN CountNext cn
    ORDER BY pr.id`;

  try {
    const results = await query(queryString, [id]);

    res.status(StatusCodes.OK).json({
      data: {
        members: results.rows,
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

const getMember = async (req: Request, res: Response) => {
  try {
    const results = await query("SELECT * FROM member WHERE id = $1", [
      req.params.id,
    ]);

    res.status(StatusCodes.OK).json({
      data: {
        members: results.rows,
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

const createMember = async (req: Request, res: Response) => {
  const {
    personal_id,
    first_name,
    last_name,
    email,
    phone_number,
    gender,
    date_of_birth,
  } = req.body;
  try {
    const results = await query(
      "INSERT INTO member(personal_id, first_name, last_name, email, phone_number, gender, date_of_birth) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        personal_id,
        first_name,
        last_name,
        email,
        phone_number,
        gender,
        date_of_birth,
      ],
    );

    console.log(results);

    res.status(StatusCodes.CREATED).json({
      data: {
        members: results.rows,
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

const updateMember = async (req: Request, res: Response) => {
  const { id, firstname, lastname, email, phone, gender, dateOfBirth } =
    req.body;
  try {
    const results = await query(
      "UPDATE member SET id = $1, first_name = $2, last_name = $3, email = $4, phone_number = $5, gender = $6, date_of_birth = $7 WHERE id = $8 RETURNING *",
      [
        id,
        firstname,
        lastname,
        email,
        phone,
        gender,
        dateOfBirth,
        req.params.id,
      ],
    );

    res.status(StatusCodes.OK).json({
      data: {
        members: results.rows,
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

const deleteMember = async (req: Request, res: Response) => {
  try {
    await query("DELETE FROM member WHERE id = $1", [req.params.id]);

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

export { getAllMemebers, getMember, createMember, updateMember, deleteMember };
