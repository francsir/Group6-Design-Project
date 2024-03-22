import React from "react";
import "./styles/App.css";
import "./styles/styleSheet.css";

import { Routes, Route } from "react-router-dom";

import LandingPage from "./sections/LandingPage";
import Homepage from "./sections/Homepage";
import LogInPage from "./sections/LogInPage";
import SignUpPage from "./sections/SignUpPage";
import ScanResult from "./sections/ScanResult";
import ProfilePage from "./sections/ProfilePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="Homepage" element={<Homepage />} />
        <Route exact path="LogIn" element={<LogInPage />} />
        <Route exact path="SignUp" element={<SignUpPage />} />
        <Route exact path="ScanResult" element={<ScanResult />} />
        <Route exact path="Profile" element={<ProfilePage/>} />
      </Routes>
    </div>
  );
}

export default App;
