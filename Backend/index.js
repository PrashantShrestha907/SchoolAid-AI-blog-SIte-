import express from "express"
import userRouter from "./routes/user.route.js"
import postRouter from "./routes/post.route.js"
import commentRouter from "./routes/comment.route.js"
import connectDb from "./lib/connectDB.js"
import Authentication from "./routes/auth.route.js"
import cors from "cors"
import cookieParser from 'cookie-parser';

const app = express()
app.use(express.json({ limit: "10mb" })); // ✅ increase to 10MB
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json())
app.use(cookieParser());
app.use("/user", userRouter)
app.use("/post",postRouter)
app.use("/comment", commentRouter)
app.use("/auth", Authentication)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use((error,req,res,next)=>{
  res.status(error.status||500)
  res.json({
    message: error.message || "Something went wrong",
    status: error.status,
    stack: error.stack
  })
})

app.listen(3000,()=>{
  connectDb()
  console.log("Server is running!")
})