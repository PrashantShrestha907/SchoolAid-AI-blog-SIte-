import express from "express"
import { getSavedPosts, getUser, savePost } from "../controllers/user.controller.js"
const router = express.Router()

router.get("/get", getUser);
router.get('/savedposts/:uid', getSavedPosts);
router.patch("/save/:pid",savePost);


export default router