import React from 'react';
import HelloWorld from './HelloWorld';
import { createRoot } from 'react-dom/client';
import chessPalLogo from './Images/ChessPalLogo.png';
import './styleSheet.css';
import Button from '@mui/material/Button';

const logo = (
  <div class="center-logo">
    <img
      src={chessPalLogo}
      alt="Chess Pal Logo"
    />
  </div>
);


function App() {
  return (
    <div className="hold">
      <div className="center-logo">
        <img
          src={chessPalLogo}
          alt="Chess Pal Logo"
        />
      </div>
      <div className="subtitle"> A new way to analyze chess </div>
      <div className="center-div"> <Button class="black-white-button">Log In</Button> </div>
      <div className="center-div"> <Button class="black-white-button">Sign Up</Button> </div>
      <div className="center-div"> <Button class="black-white-button">Continue as Guest</Button> </div>
      <div className="banner"> </div>

    </div>
  );
}

export default App;