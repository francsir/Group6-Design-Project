import React from "react";
import "../styles/Global.css";
import styles from "../styles/Homepage.module.css";

import Navbar from "./Navbar";

import Button from "@mui/material/Button";

//Icon imports
import { GrUploadOption } from "react-icons/gr";
import { IoMdInformationCircleOutline } from "react-icons/io";

//Image imports
import imagen from "../images/Chess.jpg";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className={"text-center bg-orange " + styles.main}>
        <div className={"flex-column"}>
          <div className={"flex-row bg-green " + styles.section1}>
            <div className={"bg-yellow " + styles.image_section}>
              <img src={imagen} alt="Showcase" />
            </div>
            <div className={"bg-red " + styles.scan_section}>
              <h1>Scan and Convert Chess Notation Sheets to PGN Files</h1>
              <p>
                Effortlessly convert your chess notation sheets into PGN files
                with our intuitive online tool. Enhance your experience by
                effortlessly transforming handwritten or printed chess notation
                into digital format, anytime, anywhere.
              </p>
              <div className={"flex-column bg-silver " + styles.upload_section}>
                <div className={"bg-pink " + styles.button_container}>
                  <Button
                    variant="contained"
                    disableElevation
                    startIcon={<GrUploadOption />}
                    className={styles.upload_image_button}
                  >
                    Upload Image
                  </Button>
                </div>
                <p>Drag and drop an image here (max size 25MB)</p>
                <div
                  className={"flex-row bg-green " + styles.formats_container}
                >
                  <p>Supported formats:</p>
                  <div className={"flex-row " + styles.format_boxes_container}>
                    <div className={styles.format_box}>png</div>
                    <div className={styles.format_box}>jpeg</div>
                    <div className={styles.format_box}>jpg</div>
                    <div className={styles.format_box}>webp</div>
                    <div className={styles.format_box}>bmp</div>
                  </div>
                </div>
              </div>
              <div className={styles.terms_service}>
                <IoMdInformationCircleOutline />
                By uploading an image you agree to our Terms of Services.
              </div>
            </div>
          </div>
          <div className={"flex-column bg-blue " + styles.section2}>
            <h1>Titulo</h1>
            <p>Descripcion</p>
            <div className={"flex-row bg-orange"}>
              <div className={"flex-column bg-red " + styles.step_container}>
                <div className={"bg-purple"}>1</div>
                <div className={"bg-cyan"}>IMAGEN</div>
                <h2>TITULO</h2>
                <p>DESCRIPCION</p>
              </div>
              <div className={"flex-column bg-yellow " + styles.step_container}>
                <div className={"bg-purple"}>2</div>
                <div className={"bg-cyan"}>IMAGEN</div>
                <h2>TITULO</h2>
                <p>DESCRIPCION</p>
              </div>
              <div className={"flex-column bg-gold " + styles.step_container}>
                <div className={"bg-purple"}>3</div>
                <div className={"bg-cyan"}>IMAGEN</div>
                <h2>TITULO</h2>
                <p>DESCRIPCION</p>
              </div>
            </div>
            <div className={"bg-pink"}>BOTON</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
