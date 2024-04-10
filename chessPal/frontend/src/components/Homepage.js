import React, { useState } from "react";
import "../styles/Global.css";
import styles from "../styles/Homepage.module.css";

import Navbar from "./Navbar";
import Dropzone from "./Dropzone";

import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

//Icon imports

import { IoMdInformationCircleOutline } from "react-icons/io";

//Image imports
import showcase from "../images/Showcase.png";


const Homepage = () => {
  const userId = localStorage.getItem("userId");
  console.log(userId)
  const handleFileAccepted = (msg) => {
    toast(msg, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      closeButton: false,
      style: {
        backgroundColor: "white",
        color: "red",
        textAlign: "center",
        fontFamily: "var(--font-family-sans-serif)",
        fontSize: "var(--font-size-sm)",
        fontWeight: "var(--font-weight-bold)",
      },
    });
  };

  return (
    <>
      <Navbar/>
      <div className={"text-center " + styles.main}>
        <div className={"flex-column " + styles.column_container}>
          <div className={"flex-row " + styles.section1}>
            <div className={styles.image_section}>
              <img src={showcase} alt="Showcase" />
            </div>
            <div className={styles.scan_section}>
              <h1>Scan and Convert Chess Notation Sheets to PGN Files</h1>
              <p>
                Effortlessly convert your chess notation sheets into PGN files
                with our intuitive online tool. Enhance your experience by
                effortlessly transforming handwritten or printed chess notation
                into digital format, anytime, anywhere.
              </p>
              <Dropzone onFileAccepted={handleFileAccepted} />
              <div className={styles.terms_service}>
                <IoMdInformationCircleOutline /> By uploading an image you agree
                to our Terms of Services.
              </div>
            </div>
          </div>
          <div className={"flex-column " + styles.section2}>
            <h1>How to Scan and Convert Chess Notation Sheets</h1>
            <p>
              Our straightforward process simplifies the conversion of chess
              notation sheets into PGN files:
            </p>
            <div className={"flex-row " + styles.steps_container}>
              <div className={"flex-column " + styles.step_container}>
                <div className={styles.step_number}>1</div>
                <div className={styles.step_image_container}>
                  <img src={showcase} alt="Step1" />
                </div>
                <h2>Upload Notation Sheet</h2>
                <p>
                  Ensure the image is clear and well-lit for optimal results.
                  Supported formats include JPG, PNG, JPEG, BMP, or WEBP, with a
                  maximum file size of 25 MB.
                </p>
              </div>
              <div className={"flex-column " + styles.step_container}>
                <div className={styles.step_number}>2</div>
                <div className={styles.step_image_container}>
                  <img src={showcase} alt="Step2" />
                </div>
                <h2>Initiate Conversion</h2>
                <p>
                  Once your image is uploaded, initiate the conversion process.
                  Our tool will analyze the notation and convert it into a
                  digital PGN file format.
                </p>
              </div>
              <div className={"flex-column " + styles.step_container}>
                <div className={styles.step_number}>3</div>
                <div className={styles.step_image_container}>
                  <img src={showcase} alt="Step3" />
                </div>
                <h2>Preview and Download</h2>
                <p>
                  You can preview it after conversion. Simply click the Download
                  button to obtain your PGN file, ready for use in your favorite
                  chess software or platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
