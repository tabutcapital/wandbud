import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = () => {
  const navLinks = [
    { path: '/', label: 'Home' },
  
    { path: '/about', label: 'About' },
   
    
    { path: '/user-profile', label: 'User Profile' },
  ];

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {navLinks.map((link, index) => (
          <li key={index} className="navbar-item">
            <Link to={link.path} className="navbar-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;