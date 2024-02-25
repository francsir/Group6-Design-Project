import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../images/ChessPalLogoTransparent.png";
import Button from "@mui/material/Button";

import "../styles/Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const closeMenu = () => setClick(false);

  return (
    <div className="header">
      <nav className="navbar">
        <a href="/" className="logo">
          <img src={logo} alt="logo" />
        </a>
        <div className="menu-icon" onClick={handleClick}>
          {click ? (
            <FaTimes size={30} style={{ color: "#000000" }} />
          ) : (
            <FaBars size={30} style={{ color: "#000000" }} />
          )}
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/scan" onClick={closeMenu}>
              SCAN
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/historial" onClick={closeMenu}>
              HISTORIAL
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/discover" onClick={closeMenu}>
              DISCOVER
            </Link>
          </li>

          <div className="buttons">
            <Link to="/login">
              <Button variant="outlined" sx={{ borderRadius: "20px" }}>
                log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="contained" sx={{ borderRadius: "20px" }}>
                sign up
              </Button>
            </Link>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
