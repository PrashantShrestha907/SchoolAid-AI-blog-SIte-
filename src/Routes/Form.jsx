import React from 'react'

const Form = () => {
  return (
    <form className=' flex flex-col rounded-lg gap-10 border-[2px] border-black bg-white items-center justify-center w-[30%] h-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <input type="text" placeholder='Enter your name' className='bg-[#c1bebe] px-4 py-1' />
      <input type="number" placeholder='Enter your phone number' className='bg-[#c1bebe] px-4 py-1'/>
      <input type="date" placeholder='Enter date' className='bg-[#c1bebe] px-4 py-1'/>
       <input type="text" placeholder='Enter your name' className='bg-[#c1bebe] px-4 py-1'/>
       <input type="password" name="Enter your password" id="" className='bg-[#c1bebe] px-4 py-1'/>
        <input type="password" name="Enter your password again" id="" className='bg-[#c1bebe] px-4 py-1'/>
    </form>
  )
}

export default Form
