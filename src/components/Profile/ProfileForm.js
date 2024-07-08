import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';
import { useContext, useState } from 'react';

const ProfileForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const authCtx = useContext(AuthContext);

  const PasswordHandler = (event) => {
    setNewPassword(event.target.value);
  };

  const PasswordChangeHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBaHPoDy3nXYkCe_klXav57TkerUa7TvJY', {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: newPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Password change failed!');
      }

      const data = await response.json();
      console.log(data); 
    } catch (error) {
      console.log(error.message); 
    }
  };

  return (
    <form className={classes.form} onSubmit={PasswordChangeHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' onChange={PasswordHandler} />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
