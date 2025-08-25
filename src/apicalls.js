import { useMutation } from "@tanstack/react-query";
import { LoginFailure, LoginStart, LoginSuccess, LogOut } from "./Components/Context/AuthAction";
import { useContext } from "react";
import { AuthContext } from "./Components/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const uselogincall = () => {
  const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: async(userCredentials) => {
      return await axios.post("http://localhost:3000/auth/login", userCredentials);
    },
    onMutate: () => {
      dispatch(LoginStart());
  
    },
    onSuccess: (response) => {
      dispatch(LoginSuccess(response.data.user,response.data.Token));
      console.log(response.data.Token)
      localStorage.setItem("user",JSON.stringify(response.data.user));
      localStorage.setItem("accessToken",JSON.stringify(response.data.Token));
      navigate("/")
    },
    onError: (error) => {
      dispatch(LoginFailure(error.message || "Login failed"));
      console.log(error.message)
    },
  });
};

export const logOut = (dispatch,navigate)=>{
  dispatch({ type: "LOGOUT" })
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  navigate("/login")
}


 