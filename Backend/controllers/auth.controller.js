import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { img } from "framer-motion/client";
import jwt from 'jsonwebtoken';

const JWT=process.env.JWT_SECRET

//register a user

export const registerUser = async (req,res) => {
  const name = req.body.username;
  const repeatedname = await User.findOne({ username: name });
  if (repeatedname) {
    return res.send("this username has been already used");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedpassword,
        img: req.body.img
    });
    const saveduser = await user.save();
    const userWithAdmin = await User.findById(saveduser._id).select('+IsAdmin');
    return res.status(200).json(userWithAdmin);
  }
};

//login a user

export const loginUser = async(req,res)=>{
  const validusername= await User.findOne({username:req.body.username}).select('+IsAdmin')
  if(!validusername){
    return res.status(400).json("user not found")
  } else{
    const validuser = await bcrypt.compare(req.body.password,validusername.password)
    if (!validuser) {
    return res.status(401).send("Wrong password!");
  }
  const payload = {id: validusername._id, username: validusername.username}
  const Token = jwt.sign(payload,JWT,{
    expiresIn:"1h"
  })
  
  return res.status(200).json({ user: validusername, Token });
  }
}


