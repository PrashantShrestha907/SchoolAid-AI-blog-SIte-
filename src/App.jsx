// import Navbar from "./Components/Navbar"
import { BrowserRouter, Routes, Route, redirect, Navigate } from "react-router-dom";
import Homepage from "./Routes/Homepage";
import LoginPage from "./Routes/LoginPage";
import PostPage from "./Routes/PostPage";
import RegisterPage from "./Routes/RegisterPage";
import Write from "./Routes/Write";


const App = () => {
  return (

    <div>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Homepage />}/>
          <Route path={'/login'} element={<LoginPage/>}/>
          <Route path={'/post'} element={<PostPage/>}/>
          <Route path={'/register'} element={<RegisterPage/>}/>
          <Route path={'/write'} element={<Write/>}/>
        </Routes>
        

      </BrowserRouter>

    </div>

  )
}

export default App