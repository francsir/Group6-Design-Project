import React from "react";

import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

import "../styles/Global.css";
import styles from "../styles/LandingPage.module.css";

//image imports
import chessPalLogo from "../images/logo/ChessPalLogoWhiteTransparent.png";
import banner from "../images/banner/LandingBannerWhiteTransparent.png";

function LandingPage() {
  const navigate = useNavigate();
  const goToLogIn = () => {
    navigate("/LogIn");
  };

  const goToSignUp = () => {
    navigate("/SignUp");
  };

  const goToHome = () => {
    navigate("/Homepage");
  };
  return (
    <>
      <div className={"flex-column " + styles.main}>
        {/* <h1>Chess Pal</h1> */}
        <img src={chessPalLogo} alt="Chess Pal Logo" />
        <h2>A new way to analyze chess!</h2>
        <Button
          onClick={goToLogIn}
          variant="contained"
          disableElevation
          style={{
            width: "160px",
            padding: "5px",
            textTransform: "none",
            borderRadius: "10px",
            fontSize: "var(--font-size-lg)",
            fontWeight: "var(--font-weight-normal)",
            marginBottom: "20px",
          }}
        >
          Log In
        </Button>
        <Button
          onClick={goToSignUp}
          variant="contained"
          disableElevation
          style={{
            width: "160px",
            padding: "5px",
            textTransform: "none",
            borderRadius: "10px",
            fontSize: "var(--font-size-lg)",
            fontWeight: "var(--font-weight-normal)",
          }}
        >
          Sign Up
        </Button>
        <div className={"flex-container " + styles.divider_container}>
          <div className={styles.line}></div>
          <div className={styles.text}>or</div>
          <div className={styles.line}></div>
        </div>
        <p className={styles.enter_as_guest}>
          Enter as{" "}
          <span className={styles.guest_user} onClick={goToHome}>
            Guest User
          </span>
        </p>
        <div className={styles.banner}></div>
      </div>
    </>
  );
}

export default LandingPage;
