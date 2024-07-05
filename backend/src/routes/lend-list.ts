import express from "express";
import {
  getAllLendLists,
  getLendList,
  createLendList,
  updateLendListReturnDate,
  deleteLendList,
} from "../controllers/lend-list";

const router = express.Router();

router.route("/").get(getAllLendLists).post(createLendList);
router
  .route("/:id")
  .get(getLendList)
  .patch(updateLendListReturnDate)
  .delete(deleteLendList);

export default router;
