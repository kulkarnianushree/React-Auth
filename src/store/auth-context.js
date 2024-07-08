import React, { createContext, useState } from "react";

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  Login: (token) => {},
  Logout: () => {}
});

export const AuthContextProvider = (props) => {
  const [Tokens, setTokens] = useState(null);

  const loginHandler = (token) => {
    setTokens(token);
  };

  const logoutHandler = () => {
    setTokens(null);
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
