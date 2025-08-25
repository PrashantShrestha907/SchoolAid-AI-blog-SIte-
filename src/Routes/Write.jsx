import React, { useState, useMemo, useContext, useRef, useEffect } from "react";
import Navbar from "../Components/Navbar";

import EditorComponent from "../Components/EditorComponent";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../Components/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../Components/Upload";

const Write = () => {
  const [data, setData] = useState("");
  const [cover, setCover] = useState(null);

  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [editorValue, setEditorValue] = useState("");
  const insertImageRef = useRef(null);
  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  useEffect(() => {
    if (data && data.url) {
      if (insertImageRef.current) {
        insertImageRef.current(data.url);
      }
      setData("");
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      let tokenToUse = token;
      return await axios.post("http://localhost:3000/post/create", newPost, {
        headers: {
          Authorization: `Bearer ${tokenToUse}`,
        },
      });
    },
    onSuccess: (res) => {
      toast("Post added successfully", {
        progressClassName: "my-progress-bar",
        theme: "light",
      });
      navigate(`/post/${res.data.slug}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: editorValue,
      user: user._id,
      img: cover && cover.url ? cover.url : "",
    };
    mutation.mutate(data);
    setCover(null);
  };
  

  return (
    <>
      <div className="px-8 md:px-8 lg:px-16 xl:px-32 z-1">
        <Navbar />

        <p className="my-5">Create a New Post</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col">
            {cover ? (
              <div>
                <img
                  src={`${cover.url}`}
                  alt="your image"
                  className="h-52 w-80 object-cover rounded-3xl"
                />
              </div>
            ) : (
              <Upload setData={setCover}>
                <button
                  className="bg-white px-4 py-3 text-[#9EA0B4] rounded-2xl w-48 whitespace-nowrap shadow-lg"
                  name="img"
                  type="button"
                >
                  Add a cover Image
                </button>
              </Upload>
            )}

            <input
              className="text-4xl font-extrabold text-[#9EA0B4] my-6 bg-transparent outline-none"
              name="title"
              placeholder="My Awesome story"
            />
          </div>
          <div className="flex gap-4 my-5 items-center">
            <p className="text-sm my- ">Choose a category:</p>
            <select
              name="category"
              id=""
              className="rounded-2xl py-2 px-2 focus:outline-none"
            >
              <option value="General">General</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="math">Math</option>
              <option value="Biology">Biology</option>
              <option value="Computer">Computer</option>
            </select>
            <Upload setData={setData}>
              <button
                className="bg-emerald-600 px-2 py-2 text-white rounded-2xl  shadow-lg"
                type="button"
              >
                Image
              </button>
            </Upload>
          </div>
          <input
            type="text"
            className="w-full h-14 rounded-2xl px-5 shadow-lg"
            placeholder="A Short Description"
            name="desc"
          />
          <EditorComponent
            onChange={handleEditorChange}
            value={editorValue}
            insertImageRef={insertImageRef}
          />

          <button
            className="my-5 bg-blue-700 text-white font-medium py-1 px-2 rounded-xl"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Write;
