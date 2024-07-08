import express from "express";
import {
  getAllLendLists,
  createLendList,
  getLendList,
  deleteLendList,
  getLendListByBookId,
  updateLendListReturnDate,
} from "../controllers/lend-list";

const router = express.Router();

router.route("/").get(getAllLendLists).post(createLendList);
router.route("/:id").get(getLendList).delete(deleteLendList);
router.route("/books/:id").get(getLendListByBookId);
router.route("/:id/returned-date").patch(updateLendListReturnDate);

export default router;
