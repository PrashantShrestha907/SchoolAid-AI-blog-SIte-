// import Navbar from "./Components/Navbar"
import { BrowserRouter, Routes, Route, redirect, Navigate } from "react-router-dom";
import Homepage from "./Routes/Homepage";
import LoginPage from "./Routes/LoginPage";
import PostPage from "./Routes/PostPage";
import RegisterPage from "./Routes/RegisterPage";
import Write from "./Routes/Write";
import PostList from "./Routes/PostList"
import Aboutus from "./Routes/Aboutus";
import { useContext } from "react";
import { AuthContext } from "./Components/Context/AuthContext";
import Profile from "./Routes/Profile";


const App = () => {
   const {user}=useContext(AuthContext)
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Homepage />}/>
          <Route path={'/login'} element={<LoginPage/>}/>
          <Route path={'/post/:slug'} element={user?<PostPage/>:<Navigate to ="/register"/>}/>
          <Route path={'/register'} element={user?<Navigate to ="/"/>:<RegisterPage/>}/>
          <Route path={'/write'} element={user?<Write/>:<Navigate to ="/register"/>}/>
          <Route path={'/postlist'} element={user?<PostList/>:<Navigate to ="/register"/>}/>
          <Route path={'/aboutus'} element={<Aboutus/>}/>
          <Route path={'/profile'} element={<Profile/>}/>
          
        </Routes>
        

      </BrowserRouter>

    </div>

  )
}

export default App