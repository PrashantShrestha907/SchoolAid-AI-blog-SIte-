import React from 'react'
import { IKImage } from 'imagekitio-react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const bgurl = `${import.meta.env.VITE_IK_URL_ENDPOINT}/background.jpg`;
  return (
    <div className='flex items-center justify-center w-full h-screen' style={{backgroundImage:`url(${bgurl})`}}>
      <div className="h-[40rem] w-[24rem] bg-[#FFFFFF] rounded-3xl overflow-hidden">
        {/* picture */}
        <IKImage urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} path="/Coverpage.jpg" loading="lazy"
          lqip={{ active: true, quality: 20 }} className='object-cover w-full h-[15rem] ' />
        {/* Credentials */}
        <div className='flex flex-col gap-5 px-12 mt-8'>
          <span className='text-2xl font-bold'> Register</span>
          <input className='w-full shadow-[0_0_0_0.5px_rgba(0,0,0,1)] h-[2rem] rounded-3xl px-3' placeholder='Username'/>
          <input className='w-full shadow-[0_0_0_0.5px_rgba(0,0,0,1)] h-[2rem] rounded-3xl px-3' placeholder='Email'/>
          <input className='w-full shadow-[0_0_0_0.5px_rgba(0,0,0,1)] h-[2rem] rounded-3xl px-3' placeholder='Password'/>
          <input className='w-full shadow-[0_0_0_0.5px_rgba(0,0,0,1)] h-[2rem] rounded-3xl px-3' placeholder='Password Again'/>
          <button className='h-11 w-24 ml-24 bg-blue-800 rounded-3xl text-white'>Sign In</button>
          <Link to="/login" className='flex items-center justify-center underline decoration-yellow-400'>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
