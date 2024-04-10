import React, { useState, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";

import styles from "../styles/Navbar.module.css";

import logo from "../images/logo/ChessPalLogoTransparent.png";
import defaultProfilePic from "../images/user.jpg";
import Button from "@mui/material/Button";

//Icon imports
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isLogged, setIsLogged] = useState(true);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const location = useLocation();

  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const checkScreenWidth = () => {
    if (window.innerWidth >= 1000) {
      setClick(false);
      setOpenProfileMenu(false);
    }
  };

  useEffect(() => {
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  const isSectionActive = (section) => {
    return location.pathname === section ? styles.activeSection : "";
  };

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
            <Link
              to="/Homepage"
              onClick={closeMenu}
              className={`${styles.link} ${isSectionActive("/Homepage")}`}
            >
              HOMEPAGE
            </Link>
          </div>
          <div className={styles.item}>
            <Link
              to="/GameHistory"
              onClick={closeMenu}
              className={`${styles.link} ${isSectionActive("/GameHistory")}`}
            >
              GAME HISTORY
            </Link>
          </div>
          <div className={styles.item}>
            <Link
              to="/friends"
              onClick={closeMenu}
              className={`${styles.link} ${isSectionActive("/friends")}`}
            >
              FRIENDS
            </Link>
          </div>
          {isLogged ? (
            <>
              {click ? (
                <div className={"flex-column " + styles.profile_options_menu}>
                  <div className={"flex-container " + styles.divider_container}>
                    <div className={styles.line}></div>
                    <div className={styles.text}>User options</div>
                    <div className={styles.line}></div>
                  </div>
                  <div className={styles.item}>
                    <Link
                      to="/Profile"
                      className={`${styles.link} ${isSectionActive(
                        "/Profile"
                      )} `}
                    >
                      Profile
                    </Link>
                  </div>
                  <div className={styles.item}>
                    <Link className={styles.link} style={{ color: "red" }}>
                      Logout
                    </Link>
                  </div>
                </div>
              ) : (
                <div
                  className={"flex-container " + styles.user_profile_container}
                >
                  <img
                    src={defaultProfilePic}
                    alt="profile"
                    onClick={() => setOpenProfileMenu((prev) => !prev)}
                    className={styles.user_profile}
                  />
                  {openProfileMenu && (
                    <div className={"flex-column " + styles.dropdown}>
                      <ul>
                        <Link
                          to="/Profile"
                          className={`${styles.link} ${isSectionActive(
                            "/Profile"
                          )} `}
                        >
                          <li>Profile</li>
                        </Link>
                        <Link
                          to="/logout"
                          className={styles.link}
                          style={{ color: "red" }}
                        >
                          <li>Logout</li>
                        </Link>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </>
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
