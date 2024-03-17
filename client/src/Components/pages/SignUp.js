import React, { useState } from 'react';
import '../../App.css';
import './SignUp.css';
import axios from 'axios'; // Import axios for making HTTP requests
import Cookies from 'js-cookie'; // Import js-cookie
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make HTTP POST request to the backend
      const response = await axios.post('http://localhost:3001/signup', {
        username,
        password,
        location
      });

      // Handle response from the backend
      console.log(response.data); // Response from the backend
      Cookies.set('token', response.data.token); // Save token in cookies
      console.log('Token saved in cookies:', response.data.token);
      // alert('Signup successful'); // Show success message
      navigate('/');
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed. Please try again.'); // Show error message
    }

    // Clear form fields after submission
    setUsername('');
    setPassword('');
    setLocation('');
  };

  return (
    <div className='login-container'>
    <h1>Sign Up</h1>
    <form onSubmit={handleSubmit} className='login-form'>
        <div className='form-group'>
            <label htmlFor='username'>Username:</label>
            <input
                type='text' 
                id='username'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
            />
        </div>
        <div className='form-group'>
            <label htmlFor='password'>Password:</label>
            <input
                type='password'
                id='password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
            />
        </div>
        <div className='form-group'>
            <label htmlFor='location'>Location:</label>
            <input
                type='text' 
                id='location'
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                required
            />
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
    </form>
</div>

  );
}

export default Signup;
