import React from "react";
import "../styles/styleSheet.css";

import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

//image imports
import chessPalLogo from "../images/ChessPalLogo.png";

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
    <div className="wrapper">
      <div className="flex-item">
        <div className="center-img-half">
          <img src={chessPalLogo} alt="Chess Pal Logo" />
        </div>
      </div>
      <div className="flex-item">
        <div className="subtitle"> A new way to analyze chess </div>
      </div>
      <div className="flex-item">
        <div className="center-div">
          {" "}
          <Button class="black-white-button" onClick={goToLogIn}>
            Log In
          </Button>{" "}
        </div>
      </div>
      <div className="flex-item">
        <div className="center-div">
          {" "}
          <Button class="black-white-button" onClick={goToSignUp}>
            Sign Up
          </Button>{" "}
        </div>
      </div>
      <div className="flex-item">
        <div className="center-div">
          {" "}
          <Button class="black-white-button" onClick={goToHome}>
            Continue as Guest
          </Button>{" "}
        </div>
      </div>
      <div className="flex-item">
        <div className="banner"></div>
      </div>
    </div>
  );
}
export default LandingPage;
