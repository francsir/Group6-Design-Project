import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/styleSheet.css";

import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

import chessPalLogo from "../images/logo/ChessPalLogo.png";
import LogInChessImage from "../images/LogInChessImage.png";

import Navbar from "./Navbar";

import axios from "axios";

function ProfilePage() {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="navbar-wrapper">
      <Navbar />
      <div className="bumper-row"></div>
      <div className="row">
        <div className="column">
          <div className="center-div">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={imageUploader}
              style={{
                display: "none",
              }}
              multiple="false"
            />
            <div
              className="profpic-container"
              onClick={() => imageUploader.current.click()}
            >
              <img className="profilepicture" ref={uploadedImage} />
            </div>
          </div>
          <div className="center-div">click to upload new profile picture</div>
        </div>
        <div className="column">
          <div className="center-div">
            <form>
              <div className="center-div">
                <h2>Username</h2>
              </div>
              <div className="center-div">
                <input
                  type="text"
                  placeholder="user.Username"
                  id="rounded-input"
                />
                <IconButton>
                  <EditIcon style={{ color: "black" }} />
                </IconButton>
              </div>
              <div className="center-div">
                <h2>Email</h2>
              </div>
              <div className="center-div">
                <input
                  type="text"
                  placeholder="user.Email"
                  id="rounded-input"
                />
                <IconButton>
                  <EditIcon style={{ color: "black" }} />
                </IconButton>
              </div>
              <div className="center-div">
                <h2>Password</h2>
              </div>
              <div className="center-div">
                <input
                  type="text"
                  placeholder="user.Password"
                  id="rounded-input"
                />
                <IconButton>
                  <EditIcon style={{ color: "black" }} />
                </IconButton>
              </div>
            </form>
          </div>
        </div>
        <div className="banner"></div>
      </div>
    </div>
  );
}

export default ProfilePage;
