import React from "react";
import "./styles/App.css";
import "./styles/styleSheet.css";

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./components/LandingPage";
import Homepage from "./components/Homepage";
import LogInPage from "./components/LogInPage";
import SignUpPage from "./components/SignUpPage";
import ScanResult from "./components/ScanResult";
import ProfilePage from "./components/ProfilePage";
import GameHistoryPage from "./components/GameHistoryPage";
import FriendsPage from "./components/FriendsPage";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="Homepage" element={<Homepage />} />
        <Route exact path="LogIn" element={<LogInPage />} />
        <Route exact path="SignUp" element={<SignUpPage />} />
        <Route exact path="ScanResult" element={<ScanResult />} />
        <Route exact path="Profile" element={<ProfilePage />} />
        <Route exact path="GameHistory" element={<GameHistoryPage />} />
        <Route exact path="Friends" element={<FriendsPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
