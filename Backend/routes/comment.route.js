import express from "express"
import { deleteComment, getPostComment, writePostComment } from "../controllers/comment.controller.js"
import { verifyToken } from "../lib/verifyToken.js"
const router = express.Router()

router.get("/:postId", getPostComment)
router.post("/write/:postId", writePostComment)
router.delete("/delete/:id",verifyToken,deleteComment)

export default router