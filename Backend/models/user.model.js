import { select } from "framer-motion/client";
import {Schema} from "mongoose"
import mongoose from "mongoose"

const userSchema = new Schema ({
  username:{
    type: String,
    required: true,
    unique: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  img:{
    type: String,
  },
  password:{
    type: String,
    required: true
  },
  savedPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }],
  IsAdmin:{
  type: Boolean,
  default: false,
  select: false
}
},

{timestamps: true }
);

export default mongoose.model("User",userSchema);