export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
        token:null
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        isFetching: false,
        error: false,
        token: action.payload.Token
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload.error,
        token:null
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
        token:null
      };
      case "UPDATE_USER":
        localStorage.setItem("user", JSON.stringify(action.payload));
        return{
          ...state,
          user: action.payload
        }
    default:
      return state;
  }
};