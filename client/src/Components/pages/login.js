import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; 
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });

      const { token } = response.data;
      console.log(token);
      // Store token in cookies
      Cookies.set('token', token);

      // Redirect user to home page or any other page upon successful login
      // You can use React Router's history object for navigation
      // history.push('/home'); // Example of redirecting to '/home'
      navigate('/');
      console.log('Login successful');
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please check your username and password.');
    }
  };

  return (
    <div class="login-container">
    <h1>Login</h1>
    <form onSubmit={handleLogin} class='login-form'>
        <div class='form-group'>
            <label for="username">Username:</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
        </div>
        <div class='form-group'>
            <label for="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        <button type="submit">Login</button>
    </form>
</div>

  );
}

export default Login;

