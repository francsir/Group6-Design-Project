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

function LogInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  const goToSignUp = () => {
    navigate("/SignUp");
  };

  const goToHome = () => {
    navigate("/Homepage");
  };

  const goToLandingPage = () => {
    navigate("/");
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
          console.log("Sign In succesful", response.data);
          localStorage.setItem('userId', response.data.userId);
          console.log("User ID" + response.data.userId)
          navigate("/Homepage", { state: { userId: response.data.userId } });
        } else {
          setAlertMessage(
            "Username and/or password are incorrect. Please try again."
          );
        }
      } catch (error) {
        if (error.response) {
          console.error("Login failed: " + error.response.data.message);
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
          console.error("Failed to set up the request: " + error.message);
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
              <h1>Log in to your chess space</h1>
              <p>
                Log in with your email and password to access your Chess Pal
                account. Join our vibrant community and start exploring all the
                features.
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
            <h2>Log in to your account</h2>
            <form onSubmit={handleLogIn}>
              <div className={"flex-column " + styles.input_container}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="email address or username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className={styles.input}
                  type="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles.alert}>{alertMessage}</div>
              <p className="center-div">Forgot your password? </p>
              <hr
                style={{
                  color: "#000000",
                  backgroundColor: "#000000",
                  height: "1px",
                  margin: "30px 0 30px 0",
                }}
              />
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
                  "Log In"
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
              Don't have an account?{" "}
              <span className={styles.switch_page} onClick={goToSignUp}>
                Click here to create one
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogInPage;
