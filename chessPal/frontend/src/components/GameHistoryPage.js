import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/Global.css";
import styles from "../styles/GameHistoryPage.module.css";

import Navbar from "./Navbar";
import GameHistoryTable from "./GameHistoryTable";

import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";

function GameHistoryPage() {
  return (
    <>
      <Navbar />
      <div className={styles.pageContainer}>
        <div className={"flex-row"}>
          <div className={"flex-column"}>
            <div style={{ padding: "10px" }}></div>
            <div className={styles.center_div}>
              <h1 color="white">Game History</h1>
            </div>
            <div className={styles.center_div}>
              <p color="white">select a row to view more details</p>
            </div>
            <div className={styles.tableContainer}>
              <GameHistoryTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameHistoryPage;
