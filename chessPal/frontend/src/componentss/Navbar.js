import React, { useState } from "react";
import "../styles/Global.css";
import styles from "../styles/Navbar.module.css";

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
    <div className={styles.header}>
      <nav className={styles.navbar}>
        <a href="/" className={styles.logo}>
          <img src={logo} alt="logo" />
        </a>
        <div className={styles.menu_icon} onClick={handleClick}>
          {click ? (
            <FaTimes size={30} style={{ color: "#000000" }} />
          ) : (
            <FaBars size={30} style={{ color: "#000000" }} />
          )}
        </div>
        <ul
          className={
            click ? `${styles.nav_menu} ${styles.active}` : styles.nav_menu
          }
        >
          <li className={styles.nav_item}>
            <Link to="/scan" onClick={closeMenu}>
              SCAN
            </Link>
          </li>
          <li className={styles.nav_item}>
            <Link to="/historial" onClick={closeMenu}>
              HISTORIAL
            </Link>
          </li>
          <li className={styles.nav_item}>
            <Link to="/discover" onClick={closeMenu}>
              DISCOVER
            </Link>
          </li>
          <div className={styles.buttons}>
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
