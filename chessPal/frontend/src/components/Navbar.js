import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { FaChessKnight } from "react-icons/fa";
import "./styles/Navbar.css";

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
          <Button buttonStyle="btn--outline">LOG IN</Button>
          <Button buttonStyle="btn--1">SIGN UP</Button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
