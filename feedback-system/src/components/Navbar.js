import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>📢 Feedback System</h2>
      <div className="nav-links">
        <Link to="/">Add Review</Link>
        <Link to="/reviews">View Reviews</Link>
        <Link to="/chart">Chart</Link>
      </div>
    </nav>
  );
};

export default Navbar;
