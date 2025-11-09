
import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { AuthContext } from '../Components/Context/AuthContext'


const AdminPortal = () => {
  const [users,setUser] = useState([])
  const [admin,setAdmin] = useState(false)
  const {user} = useContext(AuthContext)
  if(user.IsAdmin){
     const fetchAddUser = async()=>{
      const response = await axios.get("http://localhost:3000/user/getAll")
      setUser(response.data)
    }
    fetchAddUser();
  } else 
  {
    return ( <div className='w-full h-[100vh] flex justify-center items-center'>
      <p className='text-red-700 text-2xl font-bold'>Only Admin is Allowed</p>
    </div>)
  }


  return (
    <div className='px-8 md:px-8 lg:px-16 xl:px-32 z-1'>
      <Navbar/>
      <div className='flex gap-8 py-10'>

     <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Saved Posts
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.username}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {user.savedPosts.length}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
      
    </div>
  )
}

export default AdminPortal
