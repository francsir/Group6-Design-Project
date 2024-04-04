import React, { useState } from "react";

import "../styles/Global.css";
import styles from "../styles/ProfilePage.module.css";

import Navbar from "./Navbar";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

import defaultProfileImage from "../images/user.jpg";

function ProfilePage() {
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar />
      <div className={"flex-container " + styles.main}>
        <div className={"flex-container " + styles.width_limiter}>
          <div className={"flex-column " + styles.section1}>
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
              className={"flex-container " + styles.profpic_container}
              onClick={() => imageUploader.current.click()}
            >
              <img src={profileImage} alt="Profile" ref={uploadedImage} />
            </div>
            <h2>Click to upload new profile picture</h2>
          </div>
          <div className={"flex-column " + styles.section2}>
            <form>
              <h2>Username</h2>
              <input
                type="text"
                placeholder="user.Username"
                className={styles.rounded_input}
              />
              <IconButton>
                <EditIcon style={{ color: "white" }} />
              </IconButton>
              <h2>Email</h2>
              <input
                type="text"
                placeholder="user.Email"
                className={styles.rounded_input}
              />
              <IconButton>
                <EditIcon style={{ color: "white" }} />
              </IconButton>
              <h2>Password</h2>
              <input
                type="text"
                placeholder="user.Password"
                className={styles.rounded_input}
              />
              <IconButton>
                <EditIcon style={{ color: "white" }} />
              </IconButton>
            </form>
            <div className={styles.banner}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
