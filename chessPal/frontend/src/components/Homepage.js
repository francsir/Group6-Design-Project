import React from "react";
import "../styles/Global.css";
import styles from "../styles/Homepage.module.css";

import Navbar from "./Navbar";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className={"text-center bg-orange " + styles.header}>
        <div className={"flex-column"}>
          <div className={"flex-row bg-green " + styles.section1}>
            <div className={"bg-yellow " + styles.image_section}>IMAGEN</div>
            <div className={"bg-red " + styles.scan_section}>
              <h1>TITULO</h1>
              <p>DESCRIPCION</p>
              <div className={"flex-column bg-silver " + styles.upload_section}>
                <div className="bg-pink">BOTON</div>
                <p>texto</p>
                <div>formatos</div>
              </div>
              <p>texto</p>
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
