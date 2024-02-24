import React from 'react';
import chessPalLogo from '../Images/ChessPalLogo.png';
import '../styleSheet.css';
import Button from '@mui/material/Button';

function LandingPage() {
    return (
        <div className="wrapper">
            <div className="flex-item">
                <div className="center-img-half">
                    <img
                        src={chessPalLogo}
                        alt="Chess Pal Logo"
                    />
                </div>
            </div>
            <div className="flex-item">
                <div className="subtitle"> A new way to analyze chess </div>
            </div>
                <div className="flex-item">
                    <div className="center-div"> <Button class="black-white-button">Log In</Button> </div>
                </div>
                <div className="flex-item">
                    <div className="center-div"> <Button class="black-white-button">Sign Up</Button> </div>
                </div>
                <div className="flex-item">
                    <div className="center-div"> <Button class="black-white-button">Continue as Guest</Button> </div>
            </div>
            <div className="flex-item">
                <div className="banner">
                </div>
            </div>
        </div>
    )
}
export default LandingPage;