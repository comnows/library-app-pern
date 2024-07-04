import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { query } from "../db";

const getAllMemebers = async (req: Request, res: Response) => {
  try {
    const results = await query("SELECT * FROM member");

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
  const { firstname, lastname, gender, age } = req.body;
  try {
    const results = await query(
      "INSERT INTO member(first_name, last_name, gender, age) VALUES($1, $2, $3, $4) RETURNING *",
      [firstname, lastname, gender, age],
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
  const { firstname, lastname, gender, age } = req.body;
  try {
    const results = await query(
      "UPDATE member SET first_name = $1, last_name = $2, gender = $3, age = $4 WHERE id = $5 RETURNING *",
      [firstname, lastname, gender, age, req.params.id],
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
