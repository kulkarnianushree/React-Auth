import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  Login: (token) => {},
  Logout: () => {}
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('Token');
  const [token, setToken] = useState(initialToken);

  useEffect(() => {
    if (token) {
      const timer = setTimeout(() => {
        logoutHandler();
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [token]);

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('Token');
  };

  const loginHandler = (newToken) => {
    setToken(newToken);
    localStorage.setItem('Token', newToken);
  };

  const contextValue = {
    token: token,
    isLoggedIn: !!token,
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
