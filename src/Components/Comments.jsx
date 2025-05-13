import { IKImage } from 'imagekitio-react'
import React from 'react'

const Comments = () => {
  return (
    <div>
      <div className='w-full bg-white rounded-3xl'>
          <div className='flex gap-3 py-4 px-3 items-center'>
            <IKImage
          urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
          path="/userImg.jpeg"
          loading="lazy"
          lqip={{ active: true, quality: 20 }}
          className="object-cover w-10 h-10 rounded-full"
        />
        <p className='text-sm font-medium'>Prashant Shrestha</p>
        <p className='text-[#B5B5B5]'> 2 days ago</p>
          </div>
          <p className='text-sm px-5 py-5 text-justify'>
          This is a well-explained and insightful article! I really liked how you broke down the core React Hooks with clarity, especially for beginners. The examples were relatable and the flow made complex concepts easier to grasp. Looking forward to more deep dives like this!
        </p>
        </div>
      
    </div>
  )
}

export default Comments
