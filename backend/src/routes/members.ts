import express from "express";
import {
  getAllMemebers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
} from "../controllers/members";

const router = express.Router();

router.route("/").get(getAllMemebers).post(createMember);
router.route("/:id").get(getMember).patch(updateMember).delete(deleteMember);

export default router;
