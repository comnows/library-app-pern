import express from "express";
import {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/books";

const router = express.Router();

router.route("/").get(getAllBooks).post(createBook);
router.route("/:id").get(getBook).patch(updateBook).delete(deleteBook);

export default router;
