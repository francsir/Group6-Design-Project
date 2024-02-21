import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FiMenu, FiX } from "react-icons/fi";
import { FaChessKnight } from "react-icons/fa";

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Homepage */}
          <Link to="/" className="navbar-logo">
            ChessPal
            <FaChessKnight className="navbar-logo-icon" />
          </Link>

          {/* Interaction menu */}
          <div className="navbar-menu" onClick={handleClick}>
            {click ? <FiX /> : <FiMenu />}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
