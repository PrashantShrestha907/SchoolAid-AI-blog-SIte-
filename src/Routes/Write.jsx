import React, { useState, useMemo } from 'react'
import Navbar from '../Components/Navbar'
import ReactQuill from 'react-quill-new'
import "react-quill-new/dist/quill.snow.css";

const Write = () => {
  const [value, setValue] = useState('');

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'font': [] }],  // Font family
        [{ 'size': ['small', false, 'large', 'huge'] }],  // Font size
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
      ]
    }
  }), []); // Empty dependency array since modules config is static

  return (
    <>
      <div className='px-8 md:px-8 lg:px-16 xl:px-32 z-1'>
        <Navbar />

        <p className='my-5'>Create a New Post</p>
        <button className='bg-white px-4 py-3 text-[#9EA0B4] rounded-2xl whitespace-nowrap shadow-lg'>Add a cover Image</button>
        <p className='text-4xl font-extrabold text-[#9EA0B4] my-6'>My Awesome Story</p>
        <div className='flex gap-4 my-5 items-center'>
          <p className='text-sm my- '>Choose a category:</p>
          <select name="school" id="" className='rounded-2xl py-2 px-2 focus:outline-none'>
            <option value="General">General</option>
            <option value="Web Design">Web Design</option>
            <option value="Development">Development</option>
            <option value="Databases">Databases</option>
            <option value="Search Engines">Search Engines</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        <input type="text" className='w-full h-14 rounded-2xl px-5 shadow-lg' placeholder='A Short Description' />

        <ReactQuill
          className="bg-white rounded-2xl mt-5 h-[20rem] overflow-hidden"
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
        />


        <button className='my-5 bg-blue-700 text-white font-medium py-1 px-2 rounded-xl'>Send</button>
      </div>
    </>
  )
}

export default Write
