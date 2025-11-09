// import Navbar from "./Components/Navbar"
import { BrowserRouter, Routes, Route, redirect, Navigate} from "react-router-dom";
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
import Form from "./Routes/Form";
import SetFeaturedBlog from "./Routes/SetFeaturedBlog";
import AdminPortal from "./Routes/AdminPortal";
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import EditProfile from "./Routes/EditProfile";

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
          <Route path={'/form'} element={<Form/>}/>
          <Route path={'/admin'} element={<AdminPortal/>}/>
          <Route path={'/editProfile'} element={<EditProfile/>}/>
          <Route path={'/setfeaturedblog'} element={<SetFeaturedBlog/>}/>
        </Routes>
        

      </BrowserRouter>

    </div>

  )
}

export default App