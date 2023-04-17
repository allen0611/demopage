import React, { useState, useEffect } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Track from './pages/Track/Track';
import Return from './pages/Return/Return';
import Shipping from './pages/Shipping/Shipping';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
        <Header onMenuToggle={handleMenuOpen} />
        <Menu isOpen={isMenuOpen} onClose={handleMenuClose} />
        <div className='wrapper-wrapping'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/track" element={<Track />} />
            <Route path="/return" element={<Return />} />
            <Route path="/shipping" element={<Shipping />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
