import React from "react";
import { Link } from "react-router-dom";
import { FaChessKnight } from "react-icons/fa";
import "./styles/Navbar.css";
import Button from "@mui/material/Button";

function Navbar() {
  return (
    <header>
      <h3>
        <Link to="/">
          ChessPal
          <FaChessKnight />
        </Link>
      </h3>
      <nav>
        <Link to="/scan">Scan</Link>
        <Link to="/historial">Historial</Link>
        <Link to="/discover">Discover</Link>
        <div className="buttons">
          <Button variant="contained">log in</Button>
          <Button variant="contained">sign up</Button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
