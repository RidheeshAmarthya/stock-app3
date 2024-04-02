import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom"; // Import NavLink

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Add state to control menu visibility

  // Function to close the menu
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="container">
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {/* Toggle Button */}☰
      </button>
      <NavLink
        to="/search"
        className={({ isActive }) => (isActive ? "logo" : "logo")}
        onClick={closeMenu} // Close menu when logo is clicked
      >
        Stock Search
      </NavLink>
      <nav className={isOpen ? "nav-active" : ""}>
        {/* Control visibility */}
        <ul>
          <li>
            <NavLink
              to="/search"
              className={({ isActive }) => (isActive ? "search-link" : "")}
              onClick={closeMenu} // Close menu when link is clicked
            >
              Search
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/watchlist"
              className={({ isActive }) => (isActive ? "search-link" : "")}
              onClick={closeMenu} // Close menu when link is clicked
            >
              Watchlist
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/portfolio"
              className={({ isActive }) => (isActive ? "search-link" : "")}
              onClick={closeMenu} // Close menu when link is clicked
            >
              Portfolio
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
