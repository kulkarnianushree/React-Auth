import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';
import React, { useContext } from 'react';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const loggedIn = authCtx.isLoggedIn;

  const LogoutButtonHandler = () => {
    authCtx.Logout();
    navigate('/auth'); 
  };

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!loggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {loggedIn && (
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}
          {loggedIn && (
            <li>
              <button onClick={LogoutButtonHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
