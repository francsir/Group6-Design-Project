import React, { useState,useEffect, useRef } from "react";
import axios from "axios"; 

import "../styles/Global.css";
import styles from "../styles/ProfilePage.module.css";

import Navbar from "./Navbar";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from '@mui/icons-material/Save';

import defaultProfileImage from "../images/user.jpg";

function ProfilePage(props) {
  const userId = localStorage.getItem("userId");
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isUsernameEditable, setIsUsernameEditable] = useState(false);
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [isPasswordEditable, setIsPasswordEditable] = useState(false);

    const imageUploader = useRef(null);

    useEffect(() => {
      
      axios.get(`http://localhost:8000/get_profile?userid=${userId}`)
          .then(response => {
              const userData = response.data;
              setUsername(userData.username);
              setEmail(userData.email);
              setPassword(userData.password);
          })
          .catch(error => {
              console.error("Error fetching user data:", error);
          });
  }, [userId]);

  const handleImageUpload = (e) => {
    const [file] = e.target.files[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      // const { current } = uploadedImage;
      // current.file = file;
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

const handleUpdateProfile = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put(`/api/user/${userId}`, {
        username,
        email,
        password,
      });
      // Handle success
      console.log("Profile updated:", response.data);
      setIsUsernameEditable(false);
      setIsEmailEditable(false);
      setIsPasswordEditable(false);
    } catch (error) {
      // Handle error
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar/>
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
              <img src={profileImage} alt="Profile" />
            </div>
            <h2>Click to upload new profile picture</h2>
          </div>
          <div className={"flex-column " + styles.section2}>
            <form>
              <h2>Username</h2>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.rounded_input}
                disabled={!isUsernameEditable}
              />
              <IconButton onClick={() => setIsUsernameEditable(!isUsernameEditable)}>
                {isUsernameEditable ? <SaveIcon style={{ color: "white" }}  /> : <EditIcon style={{ color: "white" }}/>}
              </IconButton>
              <h2>Email</h2>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.rounded_input}
                disabled={!isEmailEditable}
              />
           <IconButton onClick={() => setIsEmailEditable(!isEmailEditable)}>
                {isEmailEditable ? <SaveIcon style={{ color: "white" }}/> : <EditIcon style={{ color: "white" }}/>}
              </IconButton>
              <h2>Password</h2>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.rounded_input}
                disabled={!isPasswordEditable}
              />
              <IconButton onClick={() => setIsPasswordEditable(!isPasswordEditable)}>
                {isPasswordEditable ? <SaveIcon style={{ color: "white" }}/> : <EditIcon style={{ color: "white" }}/>}
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
