
import React, { useRef } from 'react'
import { IKImage } from 'imagekitio-react';
import { Link } from 'react-router-dom';
// import { logincall } from '../apicalls';
import { uselogincall } from '../apicalls';

const LoginPage = () => {
  const bgurl = `${import.meta.env.VITE_IK_URL_ENDPOINT}/background.jpg`;
  const username = useRef();
  const password = useRef();
  const loginMutation = uselogincall();
  const Submitted = (e)=>{
    e.preventDefault();
      loginMutation.mutate({
      username: username.current.value,
      password: password.current.value,
    });
  }

  return (
    <>
    <div className='relative z-10 flex items-center justify-center  w-full h-screen ' style={{backgroundImage:`url(${bgurl})`}}>
      <div className="h-[35rem] w-[24rem] bg-[#FFFFFF] rounded-3xl overflow-hidden">
        {/* picture */}
        <IKImage urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} path="/Coverpage.jpg" loading="lazy"
          lqip={{ active: true, quality: 20 }} className='object-cover w-full h-[15rem] ' />
        {/* Credentials */}
        
          <form onSubmit={(e)=>Submitted(e)} className='flex flex-col gap-5 px-12 mt-8' >
          <span className='text-2xl font-bold'> Login</span>
          <input className='w-full shadow-[0_0_0_0.5px_rgba(0,0,0,1)] h-[2rem] rounded-3xl px-3' placeholder='Username' ref={username}/>
          <input className='w-full shadow-[0_0_0_0.5px_rgba(0,0,0,1)] h-[2rem] rounded-3xl px-3' placeholder='Password' type="password" ref={password}/>
          <button className='h-11 w-24 ml-24 bg-blue-800 rounded-3xl text-white' type='submit'>Login</button>
          <Link to="/register" className='flex items-center justify-center underline decoration-yellow-400'>Register</Link>
          </form>
       

      </div>

    </div>
    </>
  )
}

export default LoginPage
