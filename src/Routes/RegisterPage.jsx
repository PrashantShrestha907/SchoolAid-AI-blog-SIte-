import { IKImage } from 'imagekitio-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  
  const bgurl = `${import.meta.env.VITE_IK_URL_ENDPOINT}/background.jpg`;

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const passwordAgain = formData.get('passwordAgain');
    
    const newErrors = {};
    
    if (!username || username.trim() === '') {
      newErrors.username = 'Username is required';
    }
    
    if (!email || email.trim() === '') {
      newErrors.email = 'Email is required';
    }
    
    if (!password || password.trim() === '') {
      newErrors.password = 'Password is required';
    }
    
    if (!passwordAgain || passwordAgain.trim() === '') {
      newErrors.passwordAgain = 'Please confirm your password';
    }
    
    if (password && passwordAgain && password !== passwordAgain) {
      newErrors.passwordAgain = 'Passwords do not match';
    }
    
    if (!imageFile) {
      newErrors.image = 'Profile image is required';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Form is valid, proceed with submission
      console.log('Form submitted successfully');
      // Add your submission logic here
    }
  };

  return (
    <div className='flex items-center justify-center w-full h-screen' style={{backgroundImage:`url(${bgurl})`}}>
      <div className="h-auto w-[24rem] bg-[#FFFFFF] rounded-3xl overflow-hidden">
        {/* picture */}
       <IKImage urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} path="/Coverpage.jpg" loading="lazy"
          lqip={{ active: true, quality: 20 }} className='object-cover w-full h-[15rem] ' />
        {/* Credentials */}
        <form className='flex flex-col gap-5 px-12 mt-8' onSubmit={handleSubmit}>
          <span className='text-2xl font-bold'>Register</span>
          
          <div>
            <input 
              className='w-full shadow-[0_0_0_0.5px_rgba(0,0,0,1)] h-[2rem] rounded-3xl px-3' 
              name='username' 
              placeholder='Username'
            />
            {errors.username && <span className='text-red-600 text-sm ml-3'>{errors.username}</span>}
          </div>
          
          <div>
            <input 
              className='w-full shadow-[0_0_0_0.5px_rgba(0,0,0,1)] h-[2rem] rounded-3xl px-3' 
              name='email' 
              placeholder='Email'
            />
            {errors.email && <span className='text-red-600 text-sm ml-3'>{errors.email}</span>}
          </div>
          
          <div>
            <input 
              className='w-full shadow-[0_0_0_0.5px_rgba(0,0,0,1)] h-[2rem] rounded-3xl px-3' 
              name='password'
              type='password'
              placeholder='Password'
            />
            {errors.password && <span className='text-red-600 text-sm ml-3'>{errors.password}</span>}
          </div>
          
          <div>
            <input 
              className='w-full shadow-[0_0_0_0.5px_rgba(0,0,0,1)] h-[2rem] rounded-3xl px-3' 
              name='passwordAgain' 
              type='password'
              placeholder='Password Again'
            />
            {errors.passwordAgain && <span className='text-red-600 text-sm ml-3'>{errors.passwordAgain}</span>}
          </div>
          
          <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {errors.image && <span className='text-red-600 text-sm ml-3'>{errors.image}</span>}
          </div>
          
          <button className='h-11 w-24 ml-24 bg-blue-800 rounded-3xl text-white'>Sign In</button>
          <Link to="/login" className='flex items-center justify-center mb-4 underline decoration-yellow-400'>Login</Link>
        </form>
      </div>
    </div>
  );
}