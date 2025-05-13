import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import { IKImage } from 'imagekitio-react'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import Comments from '../Components/Comments';
const PostPage = () => {
  const [clicked,setClicked] = useState(false)
  return (

    <div className='px-8 md:px-8 lg:px-16 xl:px-32'>
      <Navbar />
      

      {/* TOP */}

      <div className='flex items-start gap-8 mt-10'>
        <div className='flex flex-col gap-5 lg:flex-[0_0_60%]'>
          <h1 className='text-4xl font-bold'>Understanding Basics About Essential Hooks in React</h1>
          <p className='text-blue-500'>Written by <span className='text-blue-800'>Prashant Shrestha</span> on <span className='text-blue-800'>Development</span> 2 days ago</p>
          <p className='text-sm'>React Hooks are special functions that let you “hook into” React features from functional components. The most commonly used hooks include useState, which allows you to add state to a component, and useEffect, which lets you perform side effects such as data fetching or subscribing to events. These hooks simplify component logic and promote code reuse without relying.</p>
        </div>
        <IKImage
          urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
          path="/postImg.jpeg"
          loading="lazy"
          lqip={{ active: true, quality: 20 }}
          className="hidden lg:block lg:object-cover w-80 h-[18.5rem] rounded-3xl flex-[0_0_40%] "
        />
      </div>

      {/* BOTTOM */}

      <div className='flex flex-col lg:flex-row items-start gap-10 mt-8'>
        <div className='lg:flex-[0_0_75%]'>
        <p style={{ whiteSpace: 'pre-wrap' }} className='text-justify'>
          {`Understanding Essential Hooks in React: A Comprehensive Guide

React has become one of the most powerful tools in a modern web developer's toolkit. Among its most impactful features is the introduction of Hooks in React 16.8. Hooks revolutionized how we manage state and side effects in React components, enabling function components to do things that were previously only possible with class components.This comprehensive guide walks through the essential React hooks you need to understand to write cleaner, more efficient, and more scalable code.

Before React introduced hooks, class components were the primary way to manage state, lifecycle methods, and side effects in React applications. However, class components had some limitations that made them cumbersome for certain use cases, especially when components became complex. React Hooks were introduced to allow developers to use state and other React features without writing a class component. Essentially, hooks allow us to “hook into” React's features from a functional component.`}
        </p>

          <IKImage
          urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
          path="/postImg.jpeg"
          loading="lazy"
          lqip={{ active: true, quality: 20 }}
          className="object-cover w-full h-[18.5rem] rounded-3xl  my-10 "
        />
            <p style={{ whiteSpace: 'pre-wrap' }} className='text-justify'>
          {`Understanding Essential Hooks in React: A Comprehensive Guide

React has become one of the most powerful tools in a modern web developer's toolkit. Among its most impactful features is the introduction of Hooks in React 16.8. Hooks revolutionized how we manage state and side effects in React components, enabling function components to do things that were previously only possible with class components.This comprehensive guide walks through the essential React hooks you need to understand to write cleaner, more efficient, and more scalable code.

Before React introduced hooks, class components were the primary way to manage state, lifecycle methods, and side effects in React applications. However, class components had some limitations that made them cumbersome for certain use cases, especially when components became complex. React Hooks were introduced to allow developers to use state and other React features without writing a class component. Essentially, hooks allow us to “hook into” React's features from a functional component.

React has become one of the most powerful tools in a modern web developer's toolkit. Among its most impactful features is the introduction of Hooks in React 16.8. Hooks revolutionized how we manage state and side effects in React components, enabling function components to do things that were previously only possible with class components.This comprehensive guide walks through the essential React hooks you need to understand to write cleaner, more efficient, and more scalable code.

Before React introduced hooks, class components were the primary way to manage state, lifecycle methods, and side effects in React applications. However, class components had some limitations that made them cumbersome for certain use cases, especially when components became complex. React Hooks were introduced to allow developers to use state and other React features without writing a class component. Essentially, hooks allow us to “hook into” React's features from a functional component.

React has become one of the most powerful tools in a modern web developer's toolkit. Among its most impactful features is the introduction of Hooks in React 16.8. Hooks revolutionized how we manage state and side effects in React components, enabling function components to do things that were previously only possible with class components.This comprehensive guide walks through the essential React hooks you need to understand to write cleaner, more efficient, and more scalable code.

Before React introduced hooks, class components were the primary way to manage state, lifecycle methods, and side effects in React applications. However, class components had some limitations that made them cumbersome for certain use cases, especially when components became complex. React Hooks were introduced to allow developers to use state and other React features without writing a class component. Essentially, hooks allow us to “hook into” React's features from a functional component.

React has become one of the most powerful tools in a modern web developer's toolkit. Among its most impactful features is the introduction of Hooks in React 16.8. Hooks revolutionized how we manage state and side effects in React components, enabling function components to do things that were previously only possible with class components.This comprehensive guide walks through the essential React hooks you need to understand to write cleaner, more efficient, and more scalable code.

Before React introduced hooks, class components were the primary way to manage state, lifecycle methods, and side effects in React applications. However, class components had some limitations that made them cumbersome for certain use cases, especially when components became complex. React Hooks were introduced to allow developers to use state and other React features without writing a class component. Essentially, hooks allow us to “hook into” React's features from a functional component.
`}
        </p>
        <h1 className='my-8 text-lg font-medium text-blue-900'>Comments</h1>
      <div className='flex gap-6 items-center w-full justify-between'>
        <div className='h-20 w-full rounded-3xl bg-white'>
          <input type="text" className='mx-3 my-4 focus:outline-none w-[95%] ' placeholder='Write a comment' />
        </div>
        <button className='text-white font-semibold bg-blue-800 px-4 py-2 rounded-xl '>Send</button>
      </div>
      <div className='mt-6 flex flex-col gap-8'>
        {/* Comments */}
        <Comments/>
        <Comments/>
        <Comments/>
        <Comments/>
        <Comments/>
      
      </div>


      </div>
      <div className=' flex flex-col flex-wrap gap-2 flex-[0_0_25%] mt-5 pr-16 h-max sticky top-8  '>
  <h1 className='font-bold'>Author</h1>
  <div className='flex gap-8 items-center'>
      <IKImage
          urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
          path="/userImg.jpeg"
          loading="lazy"
          lqip={{ active: true, quality: 20 }}
          className="object-cover w-10 h-10 rounded-full"
        />
        <p className='text-blue-800 text-sm'>Prashant Shrestha</p>
  </div>
  <p className='text-sm text-blue-500'>
    Ambitious programmer paving a way in web development via self learning.
  </p>
  <div className='flex gap-3 mt-4'>
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
  <h1 className='font-bold my-4'>Action</h1>
  <div className='flex gap-4 items-center'>
    <div onClick={()=>setClicked(prev=>!prev)} className='cursor-pointer'>
      {clicked?<BookmarkIcon/>:<BookmarkBorderIcon/>}
    </div>
    <p className='text-sm'>Save this post</p>
  </div>
   <div className='flex gap-4 items-center'>
    <div  className='cursor-pointer'>
      <DeleteIcon className='text-red-500'/>
    </div>
    <p className='text-red-500'>Delete this post</p>
  </div>
  <h1 className='font-semibold mt-4'>Categories</h1>
  <p className='underline decoration-black font-normal cursor-pointer text-[15px]'>All</p>
  <p className='underline decoration-black font-normal cursor-pointer text-[15px]'>Web Design</p>
  <p className='underline decoration-black font-normal cursor-pointer text-[15px]'>Development</p>
  <p className='underline decoration-black font-normal cursor-pointer text-[15px]'>Database</p>
  <p className='underline decoration-black font-normal cursor-pointer text-[15px]'>Search Engine</p>
  <p className='underline decoration-black font-normal cursor-pointer text-[15px]'>Marketing</p>

  <h1 className='font-semibold mt-4'>Search</h1>

  <input type="text" placeholder='search a post...' className=' py-2 rounded-3xl px-4 focus:outline-none bg-[#d8d8fa] focus:bg-white'/>


</div>

      </div>
      

    </div>


  )
}

export default PostPage
