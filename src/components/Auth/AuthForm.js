import { useState, useRef, useContext } from 'react';
import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState(false);

  const EmailInputRef = useRef();
  const PasswordInputRef = useRef();

  const AuthCtx = useContext(AuthContext)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const FormSubmitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = EmailInputRef.current.value;
    const enteredPassword = PasswordInputRef.current.value;
    setMessage(true);
    

    let Url;
    if (isLogin) {
      Url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBaHPoDy3nXYkCe_klXav57TkerUa7TvJY';
    } else {
      Url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBaHPoDy3nXYkCe_klXav57TkerUa7TvJY';
    }

    fetch(Url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setMessage(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication Failed';
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        AuthCtx.Login(data.idToken)
      })
      .catch((error) => {
        setMessage(false);
        alert(error.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={FormSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={EmailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={PasswordInputRef} required />
        </div>
        <div className={classes.actions}>
          {!message ? (
            <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>
          ) : (
            <p className={classes.para}>Sending Request...</p>
          )}
          <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
