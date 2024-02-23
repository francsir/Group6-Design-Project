import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";
import Button from "@mui/material/Button";
import logo from "../images/ChessPalLogoTransparent.png";

function Navbar() {
  return (
    <header>
      <h3>
        <Link to="/">
          <img src={logo} alt="ChessPal Logo" className="logo-image" />
        </Link>
      </h3>
      <nav>
        <Link to="/scan">Scan</Link>
        <Link to="/historial">Historial</Link>
        <Link to="/discover">Discover</Link>
        <div className="buttons">
          <Link to="/login">
            <Button variant="outlined" sx={{ borderRadius: "20px" }}>
              log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="contained" sx={{ borderRadius: "20px" }}>
              sign up
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
