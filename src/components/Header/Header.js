import React from 'react';
import './Header.scss';
import menuIcon from '../../icons/menu.svg';

function Header(props) {
  return (
    <header className='page-header'>
      <h1 className='page-heading'>Page title</h1>
      <button className="menu-icon" onClick={props.onMenuToggle}>
        <img src={menuIcon} alt="Menu" />
      </button>
    </header>
  );
}

export default Header;
