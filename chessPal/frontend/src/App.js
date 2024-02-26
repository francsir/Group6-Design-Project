import React from "react";
import Navbar from "./components/Navbar";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; //Routes is the updated Switch
import Homepage from "./sections/Homepage";
import './styleSheet.css';
import Button from '@mui/material/Button';
import LandingPage from './Components/LandingPage';
import LogInPage from './Components/LogInPage';
import SignUpPage from './Components/SignUpPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path = "/" element={<LandingPage/>}/>
        <Route exact path = "LogIn" element={<LogInPage/>} />
        <Route exact path = "SignUp" element = {<SignUpPage/>}/>
        <Route exact path ="Homepage" element = {<Homepage/>} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
