import React, { useState, useEffect, useContext } from 'react';
import { User, Mail, UserCircle, Camera, Loader, Plus } from 'lucide-react';
import { AuthContext } from '../Components/Context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditProfile() {
  const {user} = useContext(AuthContext)
   const [preview, setPreview] = useState(user?.img || ""); // default image
   const navigate = useNavigate()
   console.log(user)
   const [formValues, setFormValues] = useState({
  username: user.username || "",
  email: user.email || "",
  img: preview || "",
});

const handleChange = (e) => {
  setFormValues({
    ...formValues,
    [e.target.name]: e.target.value,
  });
};

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const mutation = useMutation({
    mutationFn: async (data)=>{
      return await axios.put(`http://localhost:3000/user/updateProfile/${user._id}`, data)
    },
    onSuccess: (res) => {
        toast("Update successfull", {
          progressClassName: "my-progress-bar",
          theme: "light",
        });
     
        navigate(`/login`);
      },
      onError: (err) => {
        console.log(err);
        console.log(err.message);
      },
  })

  const handleSubmit = (e)=>{
    e.preventDefault()
   
    const data = {
      username: formValues.username,
      email: formValues.email,
      img: preview
    }
    mutation.mutate(data)

  }

 return(
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-gray-600 mt-2">Update your profile information</p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-blue-100">
          {/* Form Section - CHANGE: Moved form tag to wrap profile picture and all fields */}
          <form className="space-y-6" onSubmit={(e)=>handleSubmit(e)}>
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-24 h-24 mb-4">
                <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-300">
                  {/* <User className="w-16 h-16 text-blue-500" /> */}
                  <img src={preview}  className="object-cover w-max h-full rounded-full flex-[0_0_40%] " alt="" />
                </div>
                {/* CHANGE: Changed button to label with hidden file input */}
                <label
                  htmlFor="profilePicture"
                  className="absolute bottom-1 right-1 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </label>
                <input id="profilePicture" name="img" type="file" accept="image/*" className="hidden" onChange={handleFileChange}/>
              </div>
              <p className="text-sm text-gray-600">Click the icon to change your picture</p>
            </div>

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500" />
                  Username
                </div>
              </label>
              <input
                id="username"
                name='username'
                type="text"
                placeholder="Enter your username"
                onChange={handleChange}
                defaultValue={formValues.username}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  Email Address
                </div>
              </label>
              <input
                id="email"
                name='email'
                type="email"
                placeholder="Enter your email"
                  onChange={handleChange}
                defaultValue={formValues.email}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 mt-8"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Footer */}
       
      </div>
    </div>
 );
}