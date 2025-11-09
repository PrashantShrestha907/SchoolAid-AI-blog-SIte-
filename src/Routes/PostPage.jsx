import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { IKImage } from "imagekitio-react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../Components/Context/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { data, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AllComment from "../Components/AllComment";
import CancelIcon from '@mui/icons-material/Cancel';

const FetchSinglePost = async (slug) => {
  const res = await axios.get(`http://localhost:3000/post/${slug}`);
  // console.log(res.data)
  return res.data;
};

const PostPage = () => {
  const { user, token } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const { slug } = useParams();
  const [clicked, setClicked] = useState(false);
  const [summary50, setSummary50] = useState(true)
  const [summary20, setSummary20] = useState(false)
  const [text50, setText50] = useState()
  const [text20, setText20] = useState()
  const [cross,setCross] = useState(true)

  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => FetchSinglePost(slug),
  });

  useEffect(() => {
    if (user?.savedPosts && data?._id) {
      const found = user.savedPosts.find(
        (id) => id?.toString() === data._id.toString()
      );
      setClicked(!!found);
    }
  }, [user?.savedPosts, data?._id]);
  // console.log(data);
  // console.log(token);

  const mutation = useMutation({
    mutationFn: async (IsAdmincheck) => {
      console.log("function fired");
      return await axios.delete(
        `http://localhost:3000/post/delete/${data?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            d1: IsAdmincheck,
          },
        }
      );
    },
    onSuccess: () => {
      console.log("deleted");
      toast("Post deleted successfully", {
        progressClassName: "my-progress-bar-red",
        theme: "light",
      });
      navigate(`/postlist`);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  // Extract the filename from the image URL
  const [image, contentWithoutImage] = React.useMemo(() => {
    if (!data || !data.content) return [null, data?.content || ""];

    const imgTagRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
    const match = data.content.match(imgTagRegex);
    if (match) {
      const fullUrl = match[1];
      const imageFile = fullUrl.split("/").pop();
      const newContent = data.content.replace(imgTagRegex, "");
      return [imageFile, newContent];
    }
    return [null, data.content];
  }, [data]);
  const test = user?.IsAdmin;

  const deletePost = () => {
    const d1 = user?.IsAdmin;
    mutation.mutate(d1);
  };
  const summarizedText = async (content) => {
    console.log("fired");
    console.log(content);
    const res = await fetch("http://127.0.0.1:8000/send-text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: content }),
    });

    const data = await res.json();
    const summary50 = data.summary_50_percent;
    const summary20 = data.summary_20_percent;
    setText50(summary50)
    setText20(summary20)
    // setResponse(data.response);
  };

  const mutation1 = useMutation({
    mutationFn: async () => {
      return await axios.patch(`http://localhost:3000/user/save/${data?._id}`, {
        userId: user._id,
      });
    },
    onSuccess: (response) => {
      console.log("saved");
      setClicked((prev) => !prev);
      dispatch({ type: "UPDATE_USER", payload: response.data });
    },
  });

  if (isPending) return "loading..";
  if (error) return "something went wrong " + error.message;
  if (!data) return "post not found";

  const savePost = () => {
    mutation1.mutate(data);
  };

  const formattedDate = new Date(data.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  // console.log(data)

  return (
    <div className="px-8 md:px-8 lg:px-16 xl:px-32">
      <Navbar />

      <div className={cross ? "hidden" : "block"}>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="bg-white h-[70vh] w-[70vw] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 rounded flex flex-col p-8">
          <div className="ml-auto cursor-pointer" onClick={()=>setCross(true)}><CancelIcon/></div>
        <div className="flex justify-center items-center w-full gap-6">
          <div>
            
            {summary50 ?(<button
            className="my-5 bg-yellow-600 scale-95 text-white border-2 border-gray-500 font-medium py-1 px-2 rounded-xl"
            type="button"
            onClick={()=>{setSummary50(true); setSummary20(false)}}
          
           
          >
            50% summarize
          </button>):(<button
            className="my-5 bg-yellow-500 text-white border-2 font-medium py-1 px-2 rounded-xl"
            type="button"
            onClick={()=>{setSummary50(true); setSummary20(false)}}
           
          >
            50% summarize
          </button>)}

          </div>
        
          <div >
            
           {summary20 ?(<button
            className="my-5 bg-yellow-600 scale-95 text-white border-2 border-gray-500 font-medium py-1 px-2 rounded-xl"
            type="button"
            onClick={()=>{setSummary50(false); setSummary20(true)}}
           
          >
            20% summarize
          </button>):(<button
            className="my-5 bg-yellow-500 text-white border-2 font-medium py-1 px-2 rounded-xl"
            type="button"
            onClick={()=>{setSummary50(false); setSummary20(true)}}
           
          >
            20% summarize
          </button>)}

          </div>


        </div>
          <div className="overflow-y-scroll flex flex-wrap break-words border-2 border-blue-800 rounded-xl p-5 ">{summary50?text50:text20}</div>
        
        </div>
      </div>

      {/* TOP */}

      <div className="flex items-start gap-8 mt-10">
        <div className="flex flex-col gap-5 lg:flex-[0_0_60%]">
          <h1 className="text-4xl font-bold">{data.title}</h1>
          <p className="text-blue-500">
            Written by{" "}
            <span className="text-blue-800">{data.user.username}</span> on{" "}
            <span className="text-blue-800">{data.category}</span>{" "}
            {formattedDate}
          </p>
          <div className="flex gap-2  items-center">
            <p className="text-blue-800">Description:</p>
            <p className="text-sm">{data.desc}</p>
          </div>
        </div>
        <IKImage
          urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
          // path="/postImg.jpeg"
          {...(data.img ? { src: data.img } : { path: "/postImg.jpeg" })}
          loading="lazy"
          lqip={{ active: true, quality: 20 }}
          className="hidden lg:block lg:object-cover w-80 h-[18.5rem] rounded-3xl flex-[0_0_40%] "
        />
      </div>

      {/* BOTTOM */}

      <div className="flex flex-col lg:flex-row items-start gap-10 mt-8">
        <div className="lg:flex-[0_0_75%]">
          {" "}
          <div style={{ whiteSpace: "pre-wrap" }} className="text-justify">
            <div dangerouslySetInnerHTML={{ __html: contentWithoutImage }} />
          </div>
          {/* Render the extracted image using IKImage */}
          {image && (
            <IKImage
              urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
              path={image}
              loading="lazy"
              lqip={{ active: true, quality: 20 }}
              className="object-cover w-full h-[18.5rem] rounded-3xl my-10"
            />
          )}
          <AllComment postId={data._id} />
        </div>
        <div className=" flex flex-col flex-wrap gap-2 flex-[0_0_25%] mt-5 pr-16 h-max sticky top-8  z-20">
          <h1 className="font-bold">Author</h1>
          <div className="flex gap-5 items-center">
            {/* <IKImage
              urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
              path={data.user.img||"Noavatar.jpg"}
              loading="lazy"
              lqip={{ active: true, quality: 20 }}
              className="object-cover w-10 h-10 rounded-full"
            /> */}
            <img src={data?.user?.img||"/Noavatar.jpg"} className="object-cover w-10 h-10 rounded-full" alt="" />
            <p className="text-blue-800 text-sm">{data.user.username}</p>
          </div>
          <p className="text-sm text-blue-500 mt-2">
            Ambitious programmer paving a way in web development via self
            learning.
          </p>
          <div className="flex gap-3 mt-4">
            <IKImage
              urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
              path="/facebook.svg"
              loading="lazy"
              lqip={{ active: true, quality: 20 }}
              className="object-cover w-6 h-6 "
            />
            <IKImage
              urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
              path="/instagram.svg"
              loading="lazy"
              lqip={{ active: true, quality: 20 }}
              className="object-cover w-6 h-6 "
            />
          </div>
          <h1 className="font-bold my-4">Action</h1>
          <div className="flex gap-4 items-center">
            <div onClick={(e) => savePost(e)} className="cursor-pointer">
              {clicked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </div>
            <p className="text-sm">
              {clicked ? "Unsave this post" : "Save this post"}
            </p>
          </div>{" "}
          {data?.user?._id === user?._id || user?.IsAdmin ? (
            <div className="flex gap-4 items-center">
              <div className="cursor-pointer" onClick={() => deletePost()}>
                <DeleteIcon className="text-red-500" />
              </div>
              <p className="text-red-500">Delete this post</p>
            </div>
          ) : null}
          <div
            className="flex gap-4 items-center cursor-pointer"
            onClick={() => {summarizedText(data?.content); setCross(false);  window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            <div className="cursor-pointer">
              <AutoFixHighIcon className="text-yellow-400" />
            </div>
            <p className="text-black">Summarize It!!</p>
          </div>
          <h1 className="font-semibold mt-4">Categories</h1>
          <p className="underline decoration-black font-normal cursor-pointer text-[15px]">
            All
          </p>
          <p className="underline decoration-black font-normal cursor-pointer text-[15px]">
            Web Design
          </p>
          <p className="underline decoration-black font-normal cursor-pointer text-[15px]">
            Development
          </p>
          <p className="underline decoration-black font-normal cursor-pointer text-[15px]">
            Database
          </p>
          <p className="underline decoration-black font-normal cursor-pointer text-[15px]">
            Search Engine
          </p>
          <p className="underline decoration-black font-normal cursor-pointer text-[15px]">
            Marketing
          </p>
          <h1 className="font-semibold mt-4">Search</h1>
          <input
            type="text"
            placeholder="search a post..."
            className=" py-2 rounded-3xl px-4 focus:outline-none bg-[#d8d8fa] focus:bg-white mb-8"
          />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
