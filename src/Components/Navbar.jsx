import React, { useEffect, useState } from 'react'
import { IKImage } from 'imagekitio-react';
import Image from './Image';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';


const Navbar = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    
    const handleResize = () => {
      if (open==true) {  
        document.body.style.overflow = 'hidden'; 
      } else {
        document.body.style.overflow = '';  
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [open]); 

  return (
    <>
      <div className=' w-full flex mt-2 items-center justify-between' >

        {/* Logo */}

        <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
          <Image src="logo.png" alt="schoolaidlogo" w={32} h={32} />
          <span>SchoolAid</span>
        </Link>

        {/* Mobile-Menu*/}

        <div className="md:hidden text-4xl font-bold">
          <div className="cursor-pointer " onClick={() => setOpen((prev) => !prev)}>
            {open ? "X" : "≡"}
          </div>
        </div>

        {/* Desktop_Menu */}

        <div className="hidden md:flex gap-8 xl:gap-12 font-medium items-center">
          <Link to="/" className='hover:text-gray-500'>Home</Link>
          <a href="" className='hover:text-gray-500'>Trending</a>
          <a href="" className='hover:text-gray-500'>Most Popular</a>
          <a href="" className='hover:text-gray-500'>About</a>
          <Link to="/login">
            <button className='hover:text-gray-500 border-none bg-blue-800 py-2 px-4 rounded-3xl text-white'>
              Login
            </button>
          </Link>
        </div>

        {/* Mobile-List */}

      </div>

      <div className={open ? 'flex flex-col gap-7 items-center justify-center bg-[#E6E6FF] h-[100vh] w-full absolute  right-0 transition-all duration-300 ease-in-out md:hidden' : 'flex flex-col gap-7 items-center justify-center h-[calc(100vh-6rem)] w-full absolute  right-[-100%] transition-all duration-1000 ease-in-out z-10 md:hidden'}>
        <Link to="/" className='hover:text-gray-500'>Home</Link>
        <a href="" className='hover:text-gray-500'>Trending</a>
        <a href="" className='hover:text-gray-500'>Most Popular</a>
        <a href="" className='hover:text-gray-500'>About</a>
       
          <Link to="/login">
            <button className='hover:text-gray-500 border-none bg-blue-800 py-2 px-4 rounded-3xl text-white'>
              Login
            </button>
          </Link>
    
      </div>
    </>
  )
}

export default Navbar
