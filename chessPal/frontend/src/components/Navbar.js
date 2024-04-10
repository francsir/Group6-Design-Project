import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import styles from "../styles/Navbar.module.css";

import logo from "../images/logo/ChessPalLogoTransparent.png";
import defaultProfilePic from "../images/user.jpg";
import Button from "@mui/material/Button";

//Icon imports
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [isLogged, setIsLogged] = useState(false);

  const closeMenu = () => setClick(false);

  const checkScreenWidth = () => {
    if (window.innerWidth >= 1000) {
      setClick(false);
    }
  };

  useEffect(() => {
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  return (
    <>
      <div className={"flex-row " + styles.nav}>
        <Link to="/">
          <img src={logo} alt="logo" className={styles.logo} />
        </Link>
        <div className={styles.menu_icon} onClick={handleClick}>
          {click ? (
            <FaTimes size={30} style={{ color: "#000000" }} />
          ) : (
            <FaBars size={30} style={{ color: "#000000" }} />
          )}
        </div>
        <div
          className={
            click
              ? "flex-column " + `${styles.right_section_menu}`
              : "flex-row " + `${styles.right_section}`
          }
        >
          <div className={styles.item}>
            <Link to="/Homepage" onClick={closeMenu} className={styles.link}>
              HOMEPAGE
            </Link>
          </div>
          <div className={styles.item}>
            <Link to="/GameHistory" onClick={closeMenu} className={styles.link}>
              GAME HISTORY
            </Link>
          </div>
          <div className={styles.item}>
            <Link to="/friends" onClick={closeMenu} className={styles.link}>
              FRIENDS
            </Link>
          </div>
          {isLogged ? (
            <div className={"flex-container " + styles.user_profile_container}>
              <Link to="/Profile" onClick={closeMenu}>
                <img
                  src={defaultProfilePic}
                  alt="profile"
                  onClick={closeMenu}
                  className={styles.user_profile}
                />
              </Link>
            </div>
          ) : (
            <div className={"flex-row " + styles.buttons}>
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
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
