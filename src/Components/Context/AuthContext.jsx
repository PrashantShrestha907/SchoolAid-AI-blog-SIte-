import { createContext,  useReducer } from "react";
import {AuthReducer} from "./AuthReducer"

const INITIAL_STATE={
  user:JSON.parse(localStorage.getItem("user"))||null,
  isFetching:false,
  error:false,
  token: JSON.parse(localStorage.getItem("accessToken") )|| null,
 
};

export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({children})=>{
  const[state,dispatch] = useReducer(AuthReducer,INITIAL_STATE);
  return(
    <AuthContext.Provider value={{
      user:state.user,
      isFetching: state.isFetching,
      error: state.error,
      token:state.token,
      dispatch,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
