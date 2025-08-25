import express from "express"
import { createPost, deletePost, getPosts, getSinglePost, getUserPost, getvisitCounter, uploadAuth } from "../controllers/post.controller.js"
import {verifyToken} from "../lib/verifyToken.js"
const router = express.Router()

router.get("/upload-auth", uploadAuth)
router.get("/user/:userid",getUserPost)
router.get("/", getPosts )
router.get("/:slug", getSinglePost)
router.patch("/visit/:id", getvisitCounter)
router.post("/create",verifyToken,createPost)
router.delete('/delete/:id',verifyToken, deletePost)


export default router