import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom"; // Import Link

const Navbar = () => {
  return (
    <div className="container">
      <Link to="/search" className="logo">
        Stock Search
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/watchlist">Watchlist</Link>
          </li>
          <li>
            <Link to="/portfolio">Portfolio</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
