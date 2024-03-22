import React, {useState} from "react";
import "../styles/styleSheet.css";

import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

//image imports
import chessPalLogo from "../images/ChessPalLogo.png";
import LogInChessImage from "../images/LogInChessImage.png";

import axios from "axios";

function LogInPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const goToLogIn = () => {
    navigate("/LogIn");
  };

  const goToSignUp = () => {
    navigate("/SignUp");
  };

  const goToHome = () => {
    navigate("/Homepage");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    if (!username || !email || !password) {
      console.error("Please fill in all fields");
      return;
    }
    try {
      // Make a POST  to Django backend
      const response = await axios.post("http://localhost:8000/signup/", {
        username: username,
        password1: password,
        password2: password,
      }, {
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
      if(response.data.success)
      {
        console.log("Signup successful", response.data);
        goToHome();  
      }
      else{
        console.log("User exist", response.data)
      }
    } catch (error) {
      if(error.response){
        console.error("Signup failed", error.response.data);
      }
      else if (error.request){
        console.error("No Res")
      }else{
        console.error("Error setting up req", error.message)
      }
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
            <h2>Create an account</h2>
          </div>
          <div className="center-div">
            <h4>
              Create an account to access all the features of Chess Pal. Review
              your game history, connect with friends, discover new ways to
              play, and enjoy a wide range of new opportunities.
            </h4>
          </div>
        </div>
        <div className="login-column2">
          <div className="center-img-half">
            <img src={chessPalLogo} alt="Chess Pal Logo" />
          </div>
          <div className="center-div">
            <h2> Create a new account </h2>
          </div>
          <form onSubmit={handleSignUp}>
            <div className="center-div">
              <input type="text" placeholder="username" id="rounded-input" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="center-div">
              <input
                type="text"
                placeholder="email address"
                id="rounded-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="center-div">
              <input type="text" placeholder="password" id="rounded-input" onChange={(e) => setPassword(e.target.value)}/>
            </div>

          <div className="center-div">
            <Button class="black-white-button" type="submit">
              Sign Up
            </Button>
          </div>
          </form>
          <li className="center-div" onClick={goToLogIn}>
            Have an account? Click here to log in{" "}
          </li>
        </div>
      </div>
    </div>
  );
}

export default LogInPage;
