import { IKImage } from 'imagekitio-react'
import { Link } from 'react-router-dom';

import React, { useEffect } from 'react'



const PostFiles = () => {

  
  return (
    <div>


      <div className='flex flex-col lg:flex-row gap-5 mb-11 relative'>

        <IKImage
          urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
          path="/postImg.jpeg"
          loading="lazy"
          lqip={{ active: true, quality: 20 }}
          className="object-cover w-80 h-[15rem] rounded-3xl "
        />

        <div className='flex flex-col gap-y-5 '>
          <Link to="/post" className='text-3xl font-bold'>Understanding Basics About Essential Hooks in React</Link>
          <p className='text-blue-500'>Written by <span className='text-blue-800'>Prashant Shrestha</span> on <span className='text-blue-800'>Development</span> 2 days ago</p>
          <p>React Hooks are special functions that let you “hook into” React features from functional components. The most commonly used hooks include useState, which allows you to add state to a component, and useEffect, which lets you perform side effects such as data fetching or subscribing to events. These hooks simplify component logic and promote code reuse without relying...<Link to="" className='text-blue-800 underline decoration-blue-900 hover:text-blue-950 px-5'>Read More</Link></p>
          
        </div>


      </div>

    </div>


  )
}

export default PostFiles
