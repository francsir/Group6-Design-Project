import React from "react";
import Navbar from "./components/Navbar";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //Routes is the updated Switch
import Homepage from "./sections/Homepage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Homepage />
        <Routes>
          <Route path="/" exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
