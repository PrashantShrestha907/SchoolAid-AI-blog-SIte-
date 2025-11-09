import express from "express"
import { editProfile, getAllUser, getSavedPosts, getUser, savePost } from "../controllers/user.controller.js"
import {verifyToken} from "../lib/verifyToken.js"
const router = express.Router()

router.get("/get", getUser);
router.get('/savedposts/:uid', getSavedPosts);
router.patch("/save/:pid",savePost);
router.get("/getAll", getAllUser)
router.put("/updateProfile/:id", editProfile)


export default router