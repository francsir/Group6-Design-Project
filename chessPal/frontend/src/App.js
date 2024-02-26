import React from 'react';
import { createRoot } from 'react-dom/client';
import './styleSheet.css';
import Button from '@mui/material/Button';
import LandingPage from './Components/LandingPage';
import LogInPage from './Components/LogInPage';
import SignUpPage from './Components/SignUpPage';
import { BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path = "/" element={<LandingPage/>}/>
        <Route exact path = "LogIn" element={<LogInPage/>} />
        <Route exact path = "SignUp" element = {<SignUpPage/>}/>
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;