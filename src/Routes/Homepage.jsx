import React, { useContext } from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import { IKImage } from 'imagekitio-react'
import PostFiles from '../Components/PostFiles'
import { AuthContext } from '../Components/Context/AuthContext'
import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'

const FetchPost = async (pageParam) => {
  const res = await axios.get("http://localhost:3000/post", {
    params: { page: pageParam },
  });
  return res.data;
};

const Homepage = () => {
  const {user} = useContext(AuthContext)
  const {token} = useContext(AuthContext)

   const {  
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status, } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: ({ pageParam = 1 }) => FetchPost(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  const newData = data?.pages?.flatMap((page) => page.posts) || [];

  if (status === "loading") return "Loading...";
  if (status === "error") return "Something Went Wrong!";

  return (
    <>
      <div className='px-4 md:px-8 lg:px-16 xl:px-32 z-1'>
        <Navbar />
        

        {/* Breadcrumb */}

        <div className='flex gap-8 py-10 '>
          <Link to="/">Home</Link>
          <Link to="/postlist" className='text-blue-800'>Blogs and articles</Link>
        </div>

        {/* title and golchakri */}

        <div className=' flex items-center justify-between'>
          <div className='flex flex-col gap-6'>
            <h1 className='text-3xl xl:text-5xl font-bold'>Your Destination For Creativity,<br></br>Knowledge, and Growth</h1>
            <span>Discover insights, tips, and trends to fuel your creativity and succes</span>
          </div>

          {/* Golchakri */}

          <div className="hidden md:block relative w-40 h-40 rounded-full mb-5">
            {/* SVG with padding to avoid clipping */}
            <svg viewBox="0 0 180 180" className="absolute top-[-10px] left-[-10px] w-[180px] h-[180px] pointer-events-none">
              <defs>
                <path
                  id="textCircle"
                  d="M 90, 90 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                />
              </defs>

              {/* Top-half text */}
              <text className="fill-blue-800 text-md font-medium tracking-wide">
                <textPath href="#textCircle" startOffset="0%">
                  Write your story
                </textPath>
              </text>

              {/* Bottom-half text */}
              <text className="fill-blue-800 text-md font-medium tracking-wide">
                <textPath href="#textCircle" startOffset="50%">
                  Share your idea
                </textPath>
              </text>
            </svg>

            {/* Centered Image */}
            <Link to="/write" className="absolute inset-0 flex items-center justify-center">
              <IKImage
                urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                path="/arrow.jpg"
                loading="lazy"
                lqip={{ active: true, quality: 20 }}
                className="object-cover w-20 h-20 rounded-full"
              />
            </Link>
          </div>


        </div>

        {/* Navbar-2 */}

        {/* <div className='hidden md:flex flex-wrap items-center justify-between w-[100%] gap-x-8 gap-y-4  mt-[2.5rem] bg-white rounded-3xl  px-6 py-2'>

        <span className='text-white py-1.5 px-4 bg-blue-800 rounded-3xl whitespace-nowrap'>All Posts</span>
        <Link to="" className='whitespace-nowrap'>Web Design</Link>
        <Link to="">Development</Link>
        <Link to="">Databases</Link>
        <Link to="" className='whitespace-nowrap'>Search Engines</Link>
        <Link to="">Marketing</Link>
        <span className='font-semibold'>|</span>
        <input type="text" className=" p-2 flex items-center rounded-3xl" placeholder='search a post...' />
      </div> */}

        <div className='hidden md:flex items-center justify-between bg-white mt-7 xl:rounded-3xl md:rounded-full'>
          {/* links */}
          <div className='flex items-center flex-wrap justify-start gap-x-12 gap-y-4 px-6 py-3 '>
            <span className='text-white py-1.5 px-4 bg-blue-800 rounded-3xl whitespace-nowrap'>All Posts</span>
            <Link to="postlist?category=Physics" className='whitespace-nowrap'>Physics</Link>
            <Link to="postlist?category=Chemistry" className='ml-2'>Chemistry</Link>
            <Link to="postlist?category=Math" className='ml-2'>Math</Link>
            <Link to="postlist?category=Biology" className='whitespace-nowrap ml-2'>Biology</Link>
            <Link to="postlist?category=Computer" className='ml-2'>Computer</Link>
          </div>
          <div>
            <span className='font-semibold px-4'>|</span>
          </div>
          {/* search bar */}
          <input type="text" className="px-4 py-2 mr-3 rounded-3xl focus:outline-none focus:bg-black focus:text-white" placeholder='search a post..' />
        </div>

        {/* Featured Posts */}

        <div className="flex flex-col md:flex-row items-start justify-start gap-10 ">


          {/* Featured Post Left */}

          <div className='flex flex-col gap-4 '>
            <Link to="">
              <IKImage
                urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                path="/featured1.jpeg"
                loading="lazy"
                lqip={{ active: true, quality: 20 }}
                className="object-cover w-50 h-[20rem] rounded-3xl mt-8"
              />
            </Link>
            <div className='flex items-center justify-start gap-3'>
              <span className='font-bold text-sm text-black'>01</span>
              <span className='font-medium text-sm text-blue-800'>Web Design</span>
              <span className='font-medium text-sm text-blue-500'>2 days ago</span>
            </div>
            <span className='text-2xl font-bold'>Mastering Web Design: Tips of Building Scalable Designs</span>
          </div>

          {/* Featured Post Right */}

          <div className='flex flex-col gap-3 h-[35rem]'>

            <div className='flex gap-4'>
              <Link to="" className='flex-[0_0_25%]'>
                <IKImage
                  urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                  path="/featured2.jpeg"
                  loading="lazy"
                  lqip={{ active: true, quality: 20 }}
                  className="object-cover w-[10rem] h-[9rem] rounded-3xl mt-8"
                />
              </Link>
              <div className='flex flex-col gap-y-6'>
                <div className='flex items-start justify-start gap-3 mt-10 '>
                  <span className='font-bold text-sm text-black'>02</span>
                  <span className='font-medium text-sm text-blue-800'>Database</span>
                  <span className='font-medium text-sm text-blue-500'>4 hours ago</span>
                </div>
                <span className='text-xl font-bold '>How to optimize Database Performance</span>
              </div>
            </div>

            <div className='flex gap-4'>
              <Link to="" className='flex-[0_0_25%]'>
                <IKImage
                  urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                  path="/featured3.jpeg"
                  loading="lazy"
                  lqip={{ active: true, quality: 20 }}
                  className="object-cover  w-[10rem] h-[9rem] rounded-3xl "
                />
              </Link>
              <div className='flex flex-col gap-y-6'>
                <div className='flex items-start justify-start gap-3  '>
                  <span className='font-bold text-sm text-black'>03</span>
                  <span className='font-medium text-sm text-blue-800'>Web Design</span>
                  <span className='font-medium text-sm text-blue-500'>1 hours ago</span>
                </div>
                <span className=' text-xl font-bold  '>Understanding the Psychology of Color in Web Design</span>
              </div>
            </div>

            <div className='flex gap-4'>
              <Link to="" className='flex-[0_0_25%]'>
                <IKImage
                  urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                  path="/featured4.jpeg"
                  loading="lazy"
                  lqip={{ active: true, quality: 20 }}
                  className="object-cover w-[10rem] h-[9rem] rounded-3xl "
                />
              </Link>
              <div className='flex flex-col gap-y-6'>
                <div className='flex items-start justify-start gap-3 '>
                  <span className='font-bold text-sm text-black'>04</span>
                  <span className='font-medium text-sm text-blue-800'>Marketing</span>
                  <span className='font-medium text-sm text-blue-500'>6 hours ago</span>
                </div>
                <span className='text-xl font-bold '>The Power of Personalization in Marketing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts */}
         <p className='text-xl font-medium text-blue-700 mb-8'>Recent Post</p>
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
            newData.map((post, idx) =>
              post && post._id ? (
                <PostFiles
                  key={post._id || idx}
                  postData={post}
                  postId={post._id || idx}
                />
              ) : (
                <div key={idx}>Loading</div>
              )
            )
          ) : (
            <div>Loading</div>
          )}
          </InfiniteScroll>
      

      </div>
    </>
  )
}

export default Homepage
