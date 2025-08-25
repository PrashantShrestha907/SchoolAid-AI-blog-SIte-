import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { IKImage } from "imagekitio-react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteIcon from "@mui/icons-material/Delete";
import Comments from "../Components/Comments";
import { AuthContext } from "../Components/Context/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AllComment from "../Components/AllComment";

const FetchSinglePost = async (slug) => {
  const res = await axios.get(`http://localhost:3000/post/${slug}`);
  return res.data;
};

const PostPage = () => {
  const { user, token } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const { slug } = useParams();
  const [clicked, setClicked] = useState(false);

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

  const mutation = useMutation({
    mutationFn: async (IsAdmincheck) => {
      return await axios.delete(
        `http://localhost:3000/post/delete/${data?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            d1: IsAdmincheck
          }
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

  const deletePost = () => {
    const d1 = user.IsAdmin
    mutation.mutate(d1);
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
  console.log(data)
  

  return (
    <div className="px-8 md:px-8 lg:px-16 xl:px-32">
      <Navbar />

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
          <p className="text-sm">{data.desc}</p>
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
        <div className=" flex flex-col flex-wrap gap-2 flex-[0_0_25%] mt-5 pr-16 h-max sticky top-8  ">
          <h1 className="font-bold">Author</h1>
          <div className="flex gap-5 items-center">
            <IKImage
              urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
              path={data.user.img}
              loading="lazy"
              lqip={{ active: true, quality: 20 }}
              className="object-cover w-10 h-10 rounded-full"
            />
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
          {(data?.user?._id === user?._id || user?.IsAdmin)  ? (<div className="flex gap-4 items-center">
            <div className="cursor-pointer" onClick={() => deletePost()}>
              <DeleteIcon className="text-red-500" />
            </div>
            <p className="text-red-500">Delete this post</p>
          </div>):null}
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
