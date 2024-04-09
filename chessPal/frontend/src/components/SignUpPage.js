import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import styles from "../styles/Login_Signup.module.css";
import "../styles/Global.css";

import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

//image imports
import chessPalLogo from "../images/logo/ChessPalLogoWhiteTransparent.png";
import LogInChessImage from "../images/LogInChessImage.png";

import axios from "axios";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const goToLogIn = () => {
    navigate("/LogIn");
  };

  const goToHome = () => {
    navigate("/Homepage");
  };

  const goToLandingPage = () => {
    navigate("/");
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsLoading(true);

    if (username && email && password) {
      setAlertMessage("");
      try {
        // Make a POST  to Django backend
        const response = await axios.post(
          "http://localhost:8000/signup/",
          {
            username: username,
            password1: password,
            password2: password,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        if (response.data.success) {
          console.log("Sign Up successful", response.data);
          localStorage.setItem('userId', response.data.userId);
          goToHome();
        } else {
          setAlertMessage("User exist");
          console.log("User exist", response.data);
        }
      } catch (error) {
        if (error.response) {
          console.error("Signup failed", error.response.data);
        } else if (error.request) {
          toast(
            "No response received from the server. Please check your internet connection and try again",
            {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              closeButton: false,
              style: {
                backgroundColor: "white",
                color: "red",
                textAlign: "center",
                fontFamily: "var(--font-family-sans-serif)",
                fontSize: "var(--font-size-sm)",
                fontWeight: "var(--font-weight-bold)",
              },
            }
          );
          console.error("No response received from the server");
        } else {
          console.error("Failed to set up the request: ", error.message);
        }
      }
    } else {
      setAlertMessage("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className={"flex-container text-center " + styles.main}>
        <div className={"flex-container " + styles.width_limiter}>
          <div className={"flex-column " + styles.section1}>
            <img src={LogInChessImage} alt="LogInChessImage" />
            <div className={styles.text}>
              <h1>Create an account</h1>
              <p>
                Create an account to access all the features of Chess Pal.
                Review your game history, connect with friends, discover new
                ways to play, and enjoy a wide range of new opportunities.
              </p>
            </div>
          </div>
          <div className={"flex-column " + styles.section2}>
            {/* <h1 onClick={goToLandingPage}>Chess Pal</h1> */}
            <img
              src={chessPalLogo}
              alt="Chess Pal Logo"
              onClick={goToLandingPage}
            />
            <h2>Create a new account</h2>
            <form onSubmit={handleSignUp}>
              <div className={"flex-column " + styles.input_container}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className={styles.input}
                  type="text"
                  placeholder="email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className={styles.input}
                  type="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles.alert}>{alertMessage}</div>
              <Button
                type="submit"
                variant="contained"
                disableElevation
                style={{
                  width: "200px",
                  padding: "5px",
                  textTransform: "none",
                  borderRadius: "10px",
                  fontSize: "var(--font-size-lg)",
                  fontWeight: "var(--font-weight-normal)",
                }}
              >
                {!isLoading ? (
                  "Sign Up"
                ) : (
                  <CircularProgress
                    size="30px"
                    thickness={5}
                    style={{ color: "#ffffff" }}
                  />
                )}
              </Button>
            </form>
            <p className={styles.switch_page_container}>
              Have an account?{" "}
              <span className={styles.switch_page} onClick={goToLogIn}>
                Log In
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
