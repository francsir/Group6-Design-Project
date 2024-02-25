import React, { useState } from "react";
import "../styles/Homepage.css";
import logoImage from "../images/ChessPalLogoTransparent.png";
import fileImage from "../images/FileScanTransparent.png";
import Step1 from "../images/Step1Image.png";
import Step2 from "../images/Step2Image.png";
import Step3 from "../images/Step3Image.png";
import Button from "@mui/material/Button";
import { FaTimes } from "react-icons/fa";

const Homepage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [scanButtonVisible, setScanButtonVisible] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedFormats = [".png", ".jpg", ".jpeg"];
      const fileExtension = file.name
        .substring(file.name.lastIndexOf("."))
        .toLowerCase();

      if (allowedFormats.includes(fileExtension)) {
        setSelectedFile(file);
        setErrorMessage(null);
        setScanButtonVisible(true);
      } else {
        setSelectedFile(null);
        setErrorMessage("Incorrect format");
        setScanButtonVisible(false);
      }
    } else {
      setSelectedFile(null);
      setErrorMessage(null);
      setScanButtonVisible(false);
    }
  };

  const handleScanButtonClick = () => {
    console.log("Scanning file:", selectedFile.name);
  };

  const handleDeselectFile = () => {
    setSelectedFile(null);
    setScanButtonVisible(false);
  };

  return (
    <div className="hero">
      <div className="content">
        <img src={logoImage} alt="Logo" className="logo-title" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <h1>SCAN NOW</h1>
        <img src={fileImage} alt="FileScan" className="file-image" />

        {errorMessage ? <p className="selection-text">{errorMessage}</p> : null}
        {selectedFile ? (
          <p className="selection-text">
            Selected file: {selectedFile.name}
            <FaTimes className="close-icon" onClick={handleDeselectFile} />
          </p>
        ) : null}

        <div className="input-button">
          {scanButtonVisible ? (
            <Button
              variant="contained"
              sx={{ borderRadius: "10px" }}
              onClick={handleScanButtonClick}
            >
              Scan File
            </Button>
          ) : (
            <label htmlFor="fileInput">
              <Button
                variant="contained"
                sx={{ borderRadius: "10px" }}
                component="span"
              >
                Choose File
              </Button>
              <input
                type="file"
                id="fileInput"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>

        {/* Information section */}
        <div className="information-section">
          <div className="step-container">
            <div className="step-number">1</div>
            <div className="image-container">
              <img src={Step1} alt="Step 1" className="step-image" />
            </div>
            <p className="step-text">
              Take a photo of your score sheet. Make sure your image and
              handwriting are as clear as possible.
            </p>
          </div>

          <div className="step-container">
            <div className="step-number">2</div>
            <div className="image-container">
              <img src={Step2} alt="Step 2" className="step-image" />
            </div>
            <p className="step-text">
              Attach the file with your image. Files supported: JPG | PNG | JPEG
            </p>
          </div>

          <div className="step-container">
            <div className="step-number">3</div>
            <div className="image-container">
              <img src={Step3} alt="Step 3" className="step-image" />
            </div>
            <p className="step-text">
              Let Chess Pal analyze the image and enjoy your virtualized game in
              multiple formats.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;