import React, { createContext, useState } from "react";

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  Login: (token) => {},
  Logout: () => {}
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('Token')
  const [Tokens, setTokens] = useState(initialToken);

  const loginHandler = (token) => {
    setTokens(token);
    localStorage.setItem('Token', Tokens)
  };

  const logoutHandler = () => {
    setTokens(null);
    localStorage.removeItem('Token')
  };

  const contextValue = {
    token: Tokens,
    isLoggedIn: !!Tokens,
    Login: loginHandler,
    Logout: logoutHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
