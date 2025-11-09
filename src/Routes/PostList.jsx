import React from "react";
import Navbar from "../Components/Navbar";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PostFiles from "../Components/PostFiles";
import { useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const FetchPost = async (pageParam, searchParams) => {
  const searchParamsobj = Object.fromEntries(searchParams.entries())
  console.log(searchParamsobj)
  const res = await axios.get("http://localhost:3000/post", {
    params: { page: pageParam, ...searchParamsobj },
  });
  return res.data;
};

const PostList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(true);
  const [clicked, setClicked] = useState("")
  const navigate = useNavigate();
  const handleSearchClick = (type) =>{
    setClicked(type)
    navigate(`/postlist?sort=${type}`)
  }
  const handleSearch =(e)=>{
     e.preventDefault()
      navigate(`/postlist?search=${e.target.search.value}`)
  }

  const {  
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status, } = useInfiniteQuery({
    queryKey: ["projects", searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => FetchPost(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  const newData = data?.pages?.flatMap((page) => page.posts) || [];
  console.log(newData)

  if (status === "loading") return "Loading...";
  if (status === "error") return "Something Went Wrong!";

  return (
    <div className="px-8 md:px-8 lg:px-16 xl:px-32 z-1">
      <Navbar />
      <h1 className="text-2xl my-6">General Blog</h1>
      <button
        className="block md:hidden px-2 py-2 mb-8 text-white bg-blue-800 rounded-xl"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? "Close" : "Filter or Search"}
      </button>

      <div className={open ? "md:hidden flex flex-col gap-2 sticky top-0 z-10" : "hidden"}>
        <p className="my-2 text-xl  text-blue-600">Search</p>
        <input
          type="text"
          className="mb-4 px-3 py-2 bg-white rounded-2xl w-[70%]"
          placeholder="search a post..."
          onSubmit={(e)=>handleSearch(e)}
        />
        <p className="mb-3 text-lg  text-blue-600">Filter</p>
        <div className="flex flex-col gap-2">
          <label>
            <input type="checkbox" /> Newest
          </label>

          <label>
            <input type="checkbox" /> Most Popular
          </label>
          <label>
            <input type="checkbox" /> Trending
          </label>

          <label>
            <input type="checkbox" /> Oldest
          </label>
        </div>

        <p className="mt-6 mb-4  text-blue-600">Categories</p>
        <div className="flex flex-col gap-2">
          <Link to="" className="underline hover:text-blue-500">
            All
          </Link>
          <Link to="" className="underline hover:text-blue-500">
            Web Design
          </Link>
          <Link to="" className="underline hover:text-blue-500">
            Development
          </Link>
          <Link to="" className="underline hover:text-blue-500">
            Database
          </Link>
          <Link to="" className="underline hover:text-blue-500">
            Search Engine
          </Link>
          <Link to="" className="underline hover:text-blue-500 mb-10">
            Marketing
          </Link>
        </div>
      </div>

      <div className="flex gap-16">
        <div className="flex flex-col md:flex-[0_0_70%] flex-[0_0_100%] ">
          <InfiniteScroll
            dataLength={newData.length} //This is important field to render the next data
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<h4>Loading More Posts...</h4>}
            endMessage={
              <p>
                <b>All Posts Loaded!
                </b>
              </p>
            }
            
          
          >
            {data ? (
              newData.map((post, idx) => (
                <PostFiles
                  key={post._id || idx}
                  postData={post}
                  postId={post._id || idx}
                />
              ))
            ) : (
              <div>Loading</div>
            )}
          </InfiniteScroll>
        </div>

        <div className="hidden md:flex flex-col gap-2 flex-[0_0_30%] sticky top-8 self-start">
          <p className="my-2 text-xl  text-blue-600">Search</p>
          <form action="" onSubmit={(e)=>handleSearch(e)}>
          <input
            type="text"
            className="mb-4 px-3 py-2 bg-white rounded-2xl w-[70%]"
            name="search"
            placeholder="search a post..."
          />
          </form>
          <p className="mb-3 text-lg  text-blue-600">Filter</p>
          <div className="flex items-center gap-2">
            <button className={`h-[0.61rem] w-[0.61rem] ${clicked === "Newest"? 'bg-[#e40599]':'bg-white'} shadow-[0_0_0_1px_black] rounded-sm`} onClick={()=>handleSearchClick("Newest")}>
            </button>
            <p>Newest</p>

          </div>
           <div className="flex items-center gap-2">
            <button className={`h-[0.61rem] w-[0.61rem] ${clicked === "MostPopular"? 'bg-[#e40599]':'bg-white'} shadow-[0_0_0_1px_black] rounded-sm`} onClick={()=>handleSearchClick("MostPopular")}>
            </button>
            <p>Most Popular</p>

          </div>
           <div className="flex items-center gap-2">
            <button className={`h-[0.61rem] w-[0.61rem] ${clicked === "Trending"? 'bg-[#e40599]':'bg-white'} shadow-[0_0_0_1px_black] rounded-sm`} onClick={()=>handleSearchClick("Trending")}>
            </button>
            <p>Trending</p>

          </div>
          <div className="flex items-center gap-2">
            <button className={`h-[0.61rem] w-[0.61rem] ${clicked === "Oldest"? 'bg-[#e40599]':'bg-white'} shadow-[0_0_0_1px_black] rounded-sm`} onClick={()=>handleSearchClick("Oldest")}>
            </button>
            <p>Oldest</p>

          </div>
          <p className="mt-6 mb-4  text-blue-600">Categories</p>
          <Link to="" className="underline hover:text-blue-500">
            All
          </Link>
          <Link to="?category=Physics" className="underline hover:text-blue-500">
            Physics
          </Link>
          <Link to="?category=Chemistry" className="underline hover:text-blue-500">
            Chemistry
          </Link>
          <Link to="?category=Math" className="underline hover:text-blue-500">
            Math
          </Link>
          <Link to="?category=Biology" className="underline hover:text-blue-500">
            Biology
          </Link>
          <Link to="?category=Computer" className="underline hover:text-blue-500">
            Computer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostList;
