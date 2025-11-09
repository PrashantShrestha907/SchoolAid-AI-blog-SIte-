import Post from "../models/post.model.js";
import User from "../models/user.model.js";

//get all user 

export const getAllUser = async (req, res ) =>{

  const user = await User.find().select("-password");
  if (!user){
    return res.status(404).send("No users")
  }
  return res.status(200).send(user)
}


//get a user

export const getUser = async (req, res) => {

  const userId = req.query.userId;
  const username = req.query.username;
  const user = await User.findOne({ username: username });
  if (user) {
    return res.status(200).json(user);
  }
  res.status(404).send("User not found ");
};

export const editProfile = async (req,res)=>{
  
try {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
console.log(updatedUser)
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

export const getSavedPosts = async(req,res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 3
  const userId = req.params.uid;
  const user = await User.findById(userId);
    if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const savedpost = user.savedPosts;
  const posts = await Post.find({ _id: { $in: savedpost } }).limit(limit).skip((page-1)*limit).populate("user","username img")
  const totalPosts = user.savedPosts.length
  const hasMore= page * limit < totalPosts;
    res.status(200).json({posts,hasMore});
};

export const savePost = async (req, res) => {
  const userId = req.body.userId;
  const user = await User.findById(userId);
  const postId = req.params.pid;
  if (user.savedPosts.includes(postId)) {
   user.savedPosts = user.savedPosts.filter(id => id.toString()!== postId)
   console.log(user.savedPosts)
  } else{

    user.savedPosts.push(postId)
    console.log("oho")
  }
   await user.save();
  return res.status(200).json(user);
};
