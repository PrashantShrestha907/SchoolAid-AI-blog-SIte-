import postModel from "../models/post.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import ImageKit from "imagekit";

// get all post

export const getPosts = async (req, res) => {

  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 3
  const query = {};
  const category = req.query.category;
  const author = req.query.author;
  const searchQuery = req.query.search;
  const sortQuery = req.query.sort;
  
  if(category){
    query.category = category
  }
  if(author){
    const user = await User.findOne({username:author}).select("_id")
    if(!user){
      return res.status(404).send("No Post Found")
    }
    query.user = user._id
  }
  if(searchQuery){
    query.title ={$regex:searchQuery, $options:"i"}
  }

  let sortObj;

  if(sortQuery){
    switch (sortQuery) {
      case "Newest":
        sortObj = {createdAt: -1}
        break;
      case "Oldest":
        sortObj = {createdAt: 1}
        
        break;
      case "MostPopular":
        sortObj = {visit: -1}
        
        break;
      case "Trending":
        sortObj = {visit: -1}
        query.createdAt = {
          $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
        break;
      default:
        break;
    }
  }

  const posts = await Post.find(query).limit(limit).skip((page-1)*limit).populate("user", "username img").sort(sortObj?sortObj:{createdAt: -1});
  const totalPosts = await Post.countDocuments(query);
  const hasMore= page * limit < totalPosts;
  res.status(200).json({posts,hasMore});
};

//get single post

export const getSinglePost = async (req, res) => {
  const posts = await Post.findOne({ slug: req.params.slug }).populate("user","username img");
  res.status(200).json(posts);
};


//create a post

export const createPost = async (req, res) => {
  const userId = req.userId;
  let slug = req.body.title.replace(/ /g, "-").toLowerCase();
  let existingPost = await Post.findOne({ slug });
  let counter = 2;
  while (existingPost) {
    slug = `${slug}-${counter}`;
    existingPost = await Post.findOne({ slug });
    counter++;
  }
  const post = new Post({
    ...req.body,
    slug: slug,
    userId: userId,
  });
  const savedPost = await post.save();
  res.status(202).json(savedPost);
};

//delete a post

export const deletePost = async (req, res) => {
  const post = await Post.findById({ _id: req.params.id });
  const IsAdmin = req.body.d1;
  if (!post) {
    res.status(403).json("post not found");
  }
  if(!IsAdmin){
    if(post.user.toString()!== req.userId){
      return res.status(404).json("you can only delete your post")
    }
  }
  else{

    await post.deleteOne()
    res.status(200).send("Post Deleted!");
  }
};

//get user post

export const getUserPost = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 3
  const filter = { user: req.params.userid };
  const userPost= await Post.find({ user: req.params.userid }).limit(limit).skip((page-1)*limit).populate("user","username img");
  const totalPosts = await Post.countDocuments(filter);
  const hasMore= page * limit < totalPosts;
  if(userPost.length===0){
    return res.status(400).send("No Post Found")
  }
  return res.status(200).json({userPost,hasMore})
};

//upload Auth
const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

export const uploadAuth = async (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
};

// visit counter

export const getvisitCounter = async(req,res) =>{
  const postId = req.params.id
  const userId = req.body.userId;
  const post = await Post.findById(postId);
  if(!post.visitCounter.includes(userId)){
    post.visitCounter.push(userId)
    post.visit += 1;
    await post.save();
    return res.status(200).send("Visit incremented")
  }
  return res.send("same user cannot increase visit number")
}

