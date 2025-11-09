import { IKImage } from "imagekitio-react";
import { Link, useNavigate } from "react-router-dom";

import React, { useContext, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "./Context/AuthContext";

const PostFiles = ({ postData, postId }) => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)

  const handleCategory = (category) =>{
    navigate(`/postlist?category=${category}`)
  }
  const mutation = useMutation({
    mutationFn: async()=>{
      return axios.patch(`http://localhost:3000/post/visit/${postData._id}`,{
        userId: user._id
      })
    },
    onSuccess:()=>{
       navigate(`/post/${postData.slug}`)
    }
  })
  // console.log(postData)
  const handleRedirect = (postData)=>{
   mutation.mutate();
  }
  const handleAuthor = (user)=>{
    navigate(`/postlist?author=${user}`)

  }
  if (!postData) return null;
  const formattedDate = new Date(postData.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour:"numeric",
      minute:"numeric"
    }
  );


  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-6 mb-11 relative items-start">
        <IKImage
          urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
           {...(postData.img ? { src: postData.img } : { path: "/postImg.jpeg" })}
          // src="/postImg.jpeg"
          // src={postData.img||"./postImg.jpeg"}
          loading="lazy"
          lqip={{ active: true, quality: 20 }}
          className="object-cover w-80 h-[15rem] rounded-3xl"
        />

        <div className="flex flex-col gap-y-5 ">
          <Link to={`/post/${postData.slug}`}className="text-3xl font-bold">
            {postData.title}
          </Link>
          <p className="text-blue-500">
            Written by
            <span className="text-blue-800 mx-1 cursor-pointer" onClick={()=>handleAuthor(postData.user.username)}>{postData.user.username}</span> on{" "}
            <span className="text-blue-800 mx-1 cursor-pointer" onClick={()=>handleCategory(postData.category)}>{postData.category}</span>
            {formattedDate}
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: postData.desc}}
          />
          {/* <Link
            to={`/post/${postData.slug}`}
            className="text-blue-800 underline decoration-blue-900 hover:text-blue-950 px-5"
          >
            Read More
          </Link> */}
          <div className="flex justify-start gap-5">

          <div  className="text-blue-800 underline decoration-blue-900 hover:text-blue-950 px-0 cursor-pointer w-max" onClick={()=>handleRedirect()}>
            Read More
          </div>
          </div>
          <span className="text-blue-800 cursor-default">Views: {postData.visit}</span>
        </div>
      </div>
    </div>
  );
};

export default PostFiles;
