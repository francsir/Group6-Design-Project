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

    /*
    const goToHome = () => {
        navigate('/Homepage');
    };
    */
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
                        <h4>Create an account to access all the features of Chess Pal. 
                            Review your game history, connect with friends, discover new ways to play, 
                            and enjoy a wide range of new opportunities.</h4>
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
                        <h2> Create a new account </h2>
                    </div>
                    <form>
                        <div className="center-div">
                            <input type="text" placeholder="username" id="rounded-input" />
                        </div>
                        <div className="center-div">
                            <input type="text" placeholder="email address" id="rounded-input" />
                        </div>
                        <div className="center-div">
                            <input type="text" placeholder="password" id="rounded-input" />
                        </div>
                    </form>
                    
                    <div className="center-div">
                        <Button class="black-white-button" /*onClick={goToHome}*/>Sign Up</Button>
                    </div>
                    <li className="center-div" onClick={goToLogIn}>Have an account? Click here to log in </li>
                </div>
            </div>
        </div>
    )
}

export default LogInPage;