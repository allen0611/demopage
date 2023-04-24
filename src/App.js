import React, { useState, useEffect, lazy, Suspense } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import BodyDataAttr from './components/BodyDataAttr/BodyDataAttr';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home/Home'));
const Shop = lazy(() => import('./pages/Shop/Shop'));
const About = lazy(() => import('./pages/About/About'));
const Robot = lazy(() => import('./pages/Robot/Robot'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Track = lazy(() => import('./pages/Track/Track'));
const Return = lazy(() => import('./pages/Return/Return'));
const Shipping = lazy(() => import('./pages/Shipping/Shipping'));

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuAnimationDuration = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--menu-animation-duration'));

  useEffect(() => {
    document.querySelectorAll('.menu [tabIndex]').forEach((el) => {
      el.tabIndex = isMenuOpen ? '0' : '-1';
    });
  }, [isMenuOpen]);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);

    // Get the menu header element
    const menuHeader = document.querySelector('.menu-header').querySelector('h2');

    setTimeout(() => { // To account for how long it takes the menu to open
      menuHeader.focus();
    }, menuAnimationDuration);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);

    // Get the menu icon button
    const menuIcon = document.querySelector('.menu-icon');

    setTimeout(() => { // To account for how long it takes the menu to open
      menuIcon.focus();
    }, menuAnimationDuration);
  };

  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      setIsMenuOpen(false);

      // Get the menu icon button
      const menuIcon = document.querySelector('.menu-icon');
  
      setTimeout(() => { // To account for how long it takes the menu to open
        menuIcon.focus();
      }, menuAnimationDuration);
    }
  };

  // On mousedown, add the 'mouse-used' class and remove the class 'key-used' from <body>
  document.body.addEventListener('mousedown', () => {
    document.body.classList.add('mouse-used');
    document.body.classList.remove('key-used');
  });
  
  // On keydown, add the 'key-used' class and remove the class 'mouse-used' from <body>
  document.body.addEventListener('keydown', () => {
    document.body.classList.add('key-used');
    document.body.classList.remove('mouse-used');
  });



  return (
    <div className="App" onKeyDown={handleEscape}>
      <Router>
        <BodyDataAttr />
        <Header onMenuToggle={handleMenuOpen} />
        <Menu isOpen={isMenuOpen} onClose={handleMenuClose} />
        <div className='wrapper-wrapping'>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/robot" element={<Robot />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/track" element={<Track />} />
              <Route path="/return" element={<Return />} />
              <Route path="/shipping" element={<Shipping />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </div>
  );
}

export default App;
