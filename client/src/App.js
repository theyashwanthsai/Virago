import React from 'react';
import Navbar from './Components/Navbar';
import './App.css';
import Home from './Components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './Components/pages/Services.js';
import Products from './Components/pages/Products';
import SignUp from './Components/pages/SignUp';
import Login from './Components/pages/login.js';
import Chat from './Components/pages/chat.js'
import CreatePost from './Components/pages/CreatePosts.js'
import '@fortawesome/fontawesome-free/css/all.css';
import HeroSection from './Components/HeroSection';
import Schemes from './Components/pages/Schemes';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route> 
          <Route path="/hotnews" element={<Services />}></Route> 
          <Route path='/posts' element={<Products />}> </Route>
          <Route path='/sign-up' element={<SignUp/>}> </Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/chat' element={<Chat/>}></Route>
          <Route path='/createPosts' element={<CreatePost/>}></Route>
          <Route path='/schemes' element={<Schemes/>}></Route>
        </Routes>
      </Router>
    </>
  );
}
// <Route path="/" element={<Home />}></Route> 


export default App;
