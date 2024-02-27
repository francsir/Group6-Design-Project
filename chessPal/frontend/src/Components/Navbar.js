import React, { useState } from "react";
import "../styles/Navbar.css";

import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

//Icon imports
import { FaBars, FaTimes } from "react-icons/fa";

//Image imports
import logo from "../images/ChessPalLogoTransparent.png";

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
              <Button
                variant="outlined"
                sx={{ borderRadius: "20px" }}
                onClick={closeMenu}
              >
                log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="contained"
                sx={{ borderRadius: "20px" }}
                onClick={closeMenu}
              >
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
