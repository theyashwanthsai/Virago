import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import { Button } from './Button';
import './Navbar.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [click, setClick] = useState(false);
  const [buttonText, setButtonText] = useState('signup'); 
  const [lbuttonText, setLButtonText] = useState('login');// Default button text
  const closeMobileMenu = () => setClick(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Check if token exists in cookies
    const token = Cookies.get('token');
    if (token) {
      setButtonText('Signout');
      setLButtonText('Loggedin'); // If token exists, set button text to SIGN OUT
    } else {
      setButtonText('Signup');
      setLButtonText('login'); // If token doesn't exist, set button text to SIGN UP
    }
  }, []);

  const handleButtonClick = () => {
    // Handle button click based on authentication status
    const token = Cookies.get('token');
  
    if (token) {
      // If user is authenticated (token exists), sign out logic
      Cookies.remove('token'); // Remove token from cookies
      setButtonText('Signup'); // Change button text to SIGN UP after signing out
      setLButtonText('Login'); // Change login button text to LOGIN after signing out
      // Perform any other sign-out actions if needed
    } else {
      // If user is not authenticated (token doesn't exist), handle sign-up logic
      // Redirect to sign-up page or show sign-up modal, etc.
      navigate('/sign-up');
    }
  };

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Virago
          </Link>
          <div className='menu-icon' onClick={() => setClick(!click)}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/hotnews'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                News
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/schemes'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Schemes
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/posts'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Community
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/chat'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                FinBot
              </Link>
            </li>
            
            <li className='nav-item'>
              <Link
                to='/login'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                {lbuttonText}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/sign-up'
                className='nav-links'
                onClick={() => {
                  handleButtonClick(); // Call the handleButtonClick function to handle signout
                  closeMobileMenu(); // Close the mobile menu after signout
                }}
              >
                {buttonText}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
