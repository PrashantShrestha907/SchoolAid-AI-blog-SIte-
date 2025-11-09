import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import PostFiles from "../Components/PostFiles";
import { AuthContext } from "../Components/Context/AuthContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, token } = useContext(AuthContext);
  const userId = user._id;
  const router = useNavigate()

  if (!user) {
    return <div>Loading user...</div>;
  }

const FetchPost = async (pageParam) => {
 
  if (!userId) {
    console.warn("No userId found — skipping post fetch.");
    return { posts: [], hasMore: false };
  }

  try {
    const res = await axios.get(`http://localhost:3000/post/user/${userId}`, {
      params: { page: pageParam, limit: 3 },
    });

    if (!res.data || res.data.posts?.length === 0) {
      return { posts: [], hasMore: false };
    }


    return res.data;
  } catch (error) {
    console.error(
      "Error fetching posts:",
      error.response?.data || error.message
    );

    // 🧠 5. Prevent throwing error to react-query (avoid retries/spam logs)
    return { posts: [], hasMore: false };
  }
};


  const FetchSavedPosts = async (pageParam) => {
    const res = await axios.get(
      `http://localhost:3000/user/savedposts/${userId}`,
      {
        params: { page: pageParam },
      }
    );
    return res.data;
  };
  const {
    data: savedPostsData,
    error: savedPostsError,
    fetchNextPage: fetchNextSavedPosts,
    hasNextPage: hasNextSavedPosts,
    isFetching: isFetchingSavedPosts,
    isFetchingNextPage: isFetchingNextSavedPosts,
    status: savedPostsStatus,
  } = useInfiniteQuery({
    queryKey: ["savedposts"],
    queryFn: ({ pageParam = 1 }) => FetchSavedPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  const savedData = savedPostsData?.pages?.flatMap((page) => page.posts);
  const savedDataLength = savedData?.length;
const savedLoader = savedDataLength === 0
  ? <h4>You have not saved any post</h4>
  : <h4>Loading for more posts</h4>;

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: ({ pageParam = 1 }) => FetchPost(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
    enabled: !!user?._id,
  });

  const newData = data?.pages?.flatMap((page) => page.userPost) || [];

  if (status === "loading") return "Loading...";
  if (status === "error") return "Something Went Wrong!";

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 z-1 mt-3">
      <Navbar />
      <button className="text-lg mt-6 py-3 px-2 bg-blue-800 text-white rounded-2xl hover:text-[#FFDB70] font-medium" onClick={()=>{router(`/editProfile`)}}>
        Edit Profile{" "}
      </button>
      <div className="flex gap-2">
        <div className="flex flex-col gap-5">
          <h1 className="mt-7 text-xl text-blue-800">My posts</h1>
          <InfiniteScroll
            dataLength={newData.length} //This is important field to render the next data
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<h4>Loading More Posts...</h4>}
            endMessage={
              <p>
                <b>All Posts Loaded!</b>
              </p>
            }
          >
            {data ? (
              newData.map((post, idx) =>
                post && post._id ? (
                  <PostFiles
                    key={post._id || idx}
                    postData={post}
                    postId={post._id || idx}
                  />
                ) : (
                  <div key={idx}></div>
                )
              )
            ) : (
              <div>Loading</div>
            )}
          </InfiniteScroll>
        </div>
        <div className=" flex flex-col ml-24 ">
          <div className="flex flex-col gap-5">
            <h1 className="mt-7 text-xl text-blue-800">Saved Post </h1>
            <InfiniteScroll
              dataLength={newData.length} //This is important field to render the next data
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={savedLoader}
              endMessage={
                <p>
                 
                </p>
              }
            >
              {savedPostsData ? (
                savedData.map((post, idx) =>
                  post && post._id ? (
                    <PostFiles
                      key={post._id || idx}
                      postData={post}
                      postId={post._id || idx}
                    />
                  ) : (
                    <div key={idx}></div>
                  )
                )
              ) : (
                <div>Loading</div>
              )}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
