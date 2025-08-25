export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user, Token) => ({
  type: "LOGIN_SUCCESS",
  payload: { user, Token},
});

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE", // Fixed typo: LOGIN_FALIURE -> LOGIN_FAILURE
  payload: error,
});

export const LogOut = () => ({
  type: "LOGOUT",
});