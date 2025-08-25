import React, { useContext, useState } from "react";
import Comments from "./Comments";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { AuthContext } from "./Context/AuthContext";

const AllComment = ({ postId }) => {
  const { user } = useContext(AuthContext);
  const [blank,setBlank] = useState("");
  const FetchComment = async (pageParam) => {
    const res = await axios.get(`http://localhost:3000/comment/${postId}`, {
      params: { page: pageParam },
    });
    return res.data;
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam = 1 }) => FetchComment(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (comment) => {
      return await axios.post(
        `http://localhost:3000/comment/write/${postId}`,
        comment
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setBlank("");
    },
    onError: (error) => {
      //  toast("Post added successfully", {
      //   progressClassName: "my-progress-bar",
      //   theme: "light",
      // });
      toast.error(error.response.data);
    },
  });

  const newData = data?.pages?.flatMap((page) => page.comment) || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      desc: formData.get("cmntdesc"),
      postId: postId,
      userId: user._id,
    };
    mutation.mutate(data);
  };
  if (status === "loading") return "Loading...";
  if (status === "error") return "Something Went Wrong!";
  return (
    <div className="h-[100%] mb-20">
      <h1 className="my-8 text-lg font-medium text-blue-900">Comments</h1>
      <div className="flex gap-6 items-center w-full justify-between">
        <form
          className="h-20 w-full rounded-3xl bg-[#E6E6FF] flex items-center justify-center gap-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            name="cmntdesc"
            type="text"
            className="my-4 focus:outline-none w-[95%] h-[100%] pl-4 rounded-3xl"
            placeholder="Write a comment"
            value ={blank}
            onChange={(e)=> setBlank(e.target.value)}
          />
          <button className="text-white font-semibold bg-blue-800 px-4 py-2 rounded-xl h-10">
            Send
          </button>
        </form>
      </div>
      <div className="mt-6 flex flex-col gap-8">
        <InfiniteScroll
          dataLength={newData.length} //This is important field to render the next data
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<h4>Loading More Comments...</h4>}
          endMessage={<div className="h-10"></div>}
        >
          {data ? (
            newData.map((comment, idx) =>
              comment && comment._id ? (
                <Comments
                  key={comment._id || idx}
                  commentData={comment}
                  commentId={comment._id || idx}
                />
              ) : (
                <div key={idx}>Loading...</div>
              )
            )
          ) : (
            <div></div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default AllComment;
