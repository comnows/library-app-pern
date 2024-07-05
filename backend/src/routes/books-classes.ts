import express from "express";
import { getBookClassName } from "../controllers/books-classes";

const router = express.Router();

router.route("/:id").get(getBookClassName);

export default router;
