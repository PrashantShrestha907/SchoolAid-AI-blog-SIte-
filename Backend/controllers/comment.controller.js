import Comment from "../models/comment.model.js"


export const getPostComment = async (req,res)=>{
  const pid = req.params.postId;
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 3
  const comment = await Comment.find({post:pid}).limit(limit).skip((page-1)*limit).populate("user", "username img").populate("post", "slug").sort({createdAt:-1});
  const totalComments = await Comment.countDocuments({ post: pid });
  const hasMore= page * limit < totalComments;
  return res.status(200).json({comment,hasMore})
}

export const writePostComment = async(req,res)=>{
  const comment = new Comment({
    user: req.body.userId,
    post: req.params.postId,
    desc: req.body.desc
  })
  const savedcomment = await comment.save()
  return res.status(200).json(savedcomment)

}

export const deleteComment = async(req,res)=>{
  const comment = await Comment.findById({_id:req.params.id}); 
  if(comment.user._id.toString()!== req.userId){
    return res.status(500).send("you can only delete your post")
  }
  await comment.deleteOne()
  res.status(200).send("comment deleted!")
}