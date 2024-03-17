import React from 'react';
import '../../App.css';
//import Home from './Home'; // Example import statement

import HeroSection from '../HeroSection';
import Cards from '../Cards';
import Footer from '../Footer';

function Home() {
  return (
    <>
      <HeroSection />
      <Cards/> 
      <Footer /> 
      

    </>
  );
}

export default Home;