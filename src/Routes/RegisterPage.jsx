import React from 'react'
import { IKImage } from 'imagekitio-react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const bgurl = `${import.meta.env.VITE_IK_URL_ENDPOINT}/background.jpg`;
  const navigate = useNavigate()
  const mutation= useMutation({
    mutationFn: async(registerData)=>{
      return await axios.post(`http://localhost:3000/auth/register`,
        registerData)
    },
    onSuccess:()=>{
      toast("Registered Sucessfully",{
        progressClassName:"my-progress-bar-green"
      })
      navigate("/login");
    }
  })
  const handleSubmit = (e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password")
    }
    mutation.mutate(data)
  }
  return (
    <div className='flex items-center justify-center w-full h-screen' style={{backgroundImage:`url(${bgurl})`}}>
      <div className="h-[40rem] w-[24rem] bg-[#FFFFFF] rounded-3xl overflow-hidden">
        {/* picture */}
        <IKImage urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} path="/Coverpage.jpg" loading="lazy"
          lqip={{ active: true, quality: 20 }} className='object-cover w-full h-[15rem] ' />
        {/* Credentials */}
        <form className='flex flex-col gap-5 px-12 mt-8' onSubmit={(e)=>handleSubmit(e)}>
          <span className='text-2xl font-bold'> Register</span>
          <input className='w-full shadow-[0_0_0_0.5px_rgba(0,0,0,1)] h-[2rem] rounded-3xl px-3' name='username' placeholder='Username'/>
          <input className='w-full shadow-[0_0_0_0.5px_rgba(0,0,0,1)] h-[2rem] rounded-3xl px-3' name='email' placeholder='Email'/>
          <input className='w-full shadow-[0_0_0_0.5px_rgba(0,0,0,1)] h-[2rem] rounded-3xl px-3' placeholder='Password'/>
          <input className='w-full shadow-[0_0_0_0.5px_rgba(0,0,0,1)] h-[2rem] rounded-3xl px-3' name='password' placeholder='Password Again'/>
          <button className='h-11 w-24 ml-24 bg-blue-800 rounded-3xl text-white'>Sign In</button>
          <Link to="/login" className='flex items-center justify-center underline decoration-yellow-400'>Login</Link>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
