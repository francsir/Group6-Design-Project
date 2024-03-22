import React, { useState } from "react";
import "../styles/styleSheet.css";

import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

//image imports
import chessPalLogo from "../images/ChessPalLogo.png";
import LogInChessImage from "../images/LogInChessImage.png";

import axios from "axios";

function LogInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
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

  const handleLogIn = async (e) => {
    e.preventDefault();

    //Check if there is input
    if (username && password) {
      setAlertMessage("");
      try {
        const response = await axios.post(
          "http://localhost:8000/login/",
          {
            username: username,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        if (response.data.success) {
          setAlertMessage("Sign In succesful");
          // goToHome();
        } else {
          setAlertMessage(
            "Username and/or password are incorrect. Please try again."
          );
        }
      } catch (error) {
        if (error.response) {
          setAlertMessage("Failed to sign in: " + error.response.data.message);
        } else if (error.request) {
          setAlertMessage(
            "No response received from the server. Please check your internet connection and try again"
          );
        } else {
          setAlertMessage("Failed to set up the request: " + error.message);
        }
      }
    } else {
      setAlertMessage("Please fill in all fields");
      return;
    }
  };

  return (
    <div className="wrapper">
      <div className="row">
        <div className="login-column1">
          <div className="center-img-half">
            <img src={LogInChessImage} />
          </div>
          <div className="center-div">
            <h2>Log in to your chess space</h2>
          </div>
          <div className="center-div">
            <h4>
              Log in with your email and password to access your ChessPal
              account.
            </h4>
          </div>
        </div>
        <div className="login-column2">
          <div className="center-img-half">
            <img src={chessPalLogo} alt="Chess Pal Logo" />
          </div>
          <div className="center-div">
            <h2> Log in to your ChessPal account </h2>
          </div>
          <form onSubmit={handleLogIn}>
            <div className="alert">{alertMessage}</div>
            <div className="center-div">
              <input
                type="text"
                placeholder="email address or username"
                id="rounded-input"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="center-div">
              <input
                type="text" //change to password later
                placeholder="password"
                id="rounded-input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="center-div">
              <Button className="black-white-button" type="submit">
                Log In
              </Button>
            </div>
          </form>
          <h5 className="center-div">forgot your password? </h5>
          <hr
            style={{
              color: "#000000",
              backgroundColor: "#000000",
              height: "1px",
              width: "80%",
            }}
          />
          <li className="center-div" onClick={goToSignUp}>
            Don't have an account? Click here to create one{" "}
          </li>
        </div>
      </div>
    </div>
  );
}

export default LogInPage;
