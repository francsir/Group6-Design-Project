import React from 'react';
import chessPalLogo from '../Images/ChessPalLogo.png';
import '../styleSheet.css';
import Button from '@mui/material/Button';
import LogInChessImage from '../Images/LogInChessImage.png';
import {Routes, Route, useNavigate} from 'react-router-dom';


function LogInPage() {
    const navigate = useNavigate();

    const goToLogIn = () => {
        navigate('/LogIn');
    };

    const goToSignUp = () => {
        navigate('/SignUp');
    };

    const goToHome = () => {
        navigate('/Homepage');
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
                        <h4>Log in with your email and password to access your ChessPal account.</h4>
                    </div>
                </div>
                <div className="login-column2">
                    <div className="center-img-half">
                        <img
                            src={chessPalLogo}
                            alt="Chess Pal Logo"
                        />
                    </div>
                    <div className="center-div">
                        <h2> Log in to your ChessPal account </h2>
                    </div>
                    <form>
                        <div className="center-div">
                            <input type="text" placeholder="email address or username" id="rounded-input" />
                        </div>
                        <div className="center-div">
                            <input type="text" placeholder="password" id="rounded-input" />
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
                    <div className="center-div">
                        <Button class="black-white-button" onClick={goToHome} >Log In</Button>
                    </div>
                    <li className="center-div" onClick={goToSignUp}>Don't have an account? Click here to create one </li>
                </div>
            </div>
        </div>
    )
}

export default LogInPage;