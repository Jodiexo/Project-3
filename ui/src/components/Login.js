import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import CreateAccount from './components/CreateAccount';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  /*
  const navigateToCreateAccount = () => {
    navigate('/create-account');
  };
  */

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* this should point to login component to fetch context for a user */}
        <button type="submit">Login</button>
      </form>
      <button onClick={<CreateAccount />}>Create Account</button>
      {/* <button onClick={navigateToCreateAccount}>Create Account</button> */}
    </div>
  );
};

export default Login;
