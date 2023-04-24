import React from 'react';
import './Menu.scss';
import closeIcon from '../../icons/close.svg';
import { Link } from 'react-router-dom';

const Menu = React.forwardRef(({ isOpen, onClose }, ref) => {
  const handleCloseKeyDown = (event) => {
    // Handle the Tab key press, and NOT when shift is also held (if users goes backwards through DOM)
    if (event.key === 'Tab' && !event.shiftKey) {
      event.preventDefault(); // prevent default tab behavior

      // Get the menu header element
      const menuHeader = document.querySelector('.menu-header').querySelector('h2');

      // Move focus to menu header element
      menuHeader.focus();
    }
  };
  const handleMenuHeaderKeyDown = (event) => {
    // Handle when Shift + Tab keys are pressed
    if (event.key === 'Tab' && event.shiftKey) {
      event.preventDefault(); // prevent default tab behavior

      // Get the menu close button element
      const menuClose = document.querySelector('.close-icon');

      // Move focus to menu close button element
      menuClose.focus();
    }
  };

  return (
    <div className={`menu ${isOpen ? 'open' : ''}`}>
      <div className="menu-header">
        <h2 tabIndex={-1} onKeyDown={handleMenuHeaderKeyDown}>Menu</h2>
      </div>
      <nav className="primary-links">
        <ul>
          <li><Link to="/" onClick={onClose} tabIndex={-1}>Home</Link></li>
          <li><Link to="/shop" onClick={onClose} tabIndex={-1}>Shop</Link></li>
          <li><Link to="/about" onClick={onClose} tabIndex={-1}>About Us</Link></li>
          <li><Link to="/robot" onClick={onClose} tabIndex={-1}>Robot</Link></li>
        </ul>
      </nav>
      <nav className="secondary-links">
        <ul>
          <li><Link to="/contact" onClick={onClose} tabIndex={-1}>Contact</Link></li>
          <li><Link to="/track" onClick={onClose} tabIndex={-1}>Track Your Order</Link></li>
          <li><Link to="/return" onClick={onClose} tabIndex={-1}>Return Policy</Link></li>
          <li><Link to="/shipping" onClick={onClose} tabIndex={-1}>Shipping Policy</Link></li>
        </ul>
      </nav>
      <button className="close-icon" tabIndex={-1} onClick={onClose} onKeyDown={handleCloseKeyDown}>
        <img src={closeIcon} width="28" height="28" alt="Close" />
      </button>
    </div>
  );
});

export default Menu;
