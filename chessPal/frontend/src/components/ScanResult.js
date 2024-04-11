import React, { useState } from "react";
import "../styles/Global.css";
import styles from "../styles/ScanResult.module.css";

import { useLocation, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { CircularProgress } from "@mui/material";
import Navbar from "./Navbar";

import axios from "axios";

import { FiZoomIn, FiZoomOut } from "react-icons/fi";

import { toast } from "react-toastify";

const ScanResult = () => {
  const location = useLocation();
  const { file } = location.state;
  const [showDisplay, setShowDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scale, setScale] = useState(1);

  // Just for testing
  // const scanResultSample = `[[['1']], [['e4']], [['e5']], [['2']], [['Nh5']], [['Nc6']], [['3']], [['a6']], [['Nx6']], [['4']], [['Rh7']], [['Rh7']], [['5']], [['Rh7']], [['Rh7']], [['6']], [['Rh7']], [['Rh7']], [['7']], [['Rh7']], [['Rh7']], [['8']], [['Rh7']], [['Rh7']], [['e4']], [['Rh2']], [['Rh2']], [['1o']], [['Rh7']], [['Rh7']], [['Nh4']], [['Rh7']], [['Rh7']], [['12']], [['Rh7']], [['Rh7']], [['g5+']], [['Rh7']], [['Rh7']], [['14']], [['Rh7']], [['Rh7']], [['Ba6']], [['Rh7']], [['Rh7']], [['Nh7']], [['Rh7']], [['Rh7']], [['18']], [['Rh7']], [['Rh7']], [['Rf1']], [['Rh7']], [['Rh7']], [['2o']], [['Rh7']], [['Rh7']], [['2a']], [['Rh7']], [['Rh7']], [['fx+']], [['Rh7']], [['Rh7']], [['23']], [['Rh7']], [['Rh7']], [['24']], [['Rh7']], [['Rh7']], [['25']], [['Rh7']], [['Rh7']], [['27']], [['Rh7']], [['Rh7']], [['28']], [['Rh7']], [['Rh7']], [['f4+']], [['Rh7']], [['Rh7']], [['3o']], [['Rh7']], [['Rh7']], [['hx+']], [['Rh7']], [['Rh7']], [['32']], [['Rh7']], [['Rh7']], [['33']], [['Rh7']], [['Rh7']], [['34']], [['Rh2']], [['Rh2']], [['h4']], [['Rh7']], [['Rh7']], [['36']], [['Rh7']], [['Rh7']], [['37']], [['Rh7']], [['Rh7']], [['h4+']], [['Rh7']], [['Rh7']], [['h4+']], [['Rh7']], [['Rh7']], [['4o']], [['Rh7']], [['Rh7']], [['4']], [['Rh7']], [['Rh7']], [['42']], [['Rh7']], [['Rh7']], [['43']], [['Rh7']], [['Rh7']], [['4']], [['Rh7']], [['Rh7']], [['Kg6']], [['Rh7']], [['Rh7']], [['46']], [['Rh7']], [['Rh7']], [['48']], [['Rh7']], [['Rh7']], [['ba7+']], [['Rh7']], [['Rh7']], [['Qh1']], [['Rh7']], [['Rh7']], [['Bxe5']], [['Bg5']], [['x5']], [['Nge6+']], [['Rg7']], [['R74']], [['Nxe2']], [['Ng4']], [['fx4']]]`;

  // PGN file attributes
  const [title, setTitle] = useState("My Chess Game");
  const [opponent, setOpponent] = useState("Opponent");
  const [gameDate, setGameDate] = useState(
    dayjs("2024-04-12").format("YYYY-MM-DD")
  );
  const [scanResult, setScanResult] = useState(""); //change to null if it gives problems
  const [isFirstSwitchOn, setIsFirstSwitchOn] = useState(false);
  const [isSecondSwitchOn, setIsSecondSwitchOn] = useState(false);

  // Toggles display between the image preview and the scan result
  const toggleDisplay = () => {
    setShowDisplay(!showDisplay);
  };

  // Obtains file name without the extension
  const extractFileNameWithoutExtension = (fileName) => {
    const nameWithoutExtension =
      fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
    setTitle(nameWithoutExtension);
  };

  // Handles date change
  const handleDateChange = (newDate) => {
    setGameDate(dayjs(newDate).format("YYYY-MM-DD"));
  };

  // Handles the communication with backend and the display toggle
  const handleScanButtonClick = async () => {
    setIsLoading(true);
    try {
      console.log("Scaning");
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        "http://localhost:8000/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File scaned succesfully");
      setScanResult(JSON.stringify(response.data["moves"], null, 2));
      toggleDisplay();
      extractFileNameWithoutExtension(file.name);
    } catch (error) {
      console.log("Scaning error");
      setScanResult("");
      console.error("Error with backend communication:", error);
      toast("Error scaning the file", {
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
    }
    setIsLoading(false);
  };

  // Handles the download of the PGN file
  const handleDownload = () => {
    const filename = `${title}.pgn`;
    const blob = new Blob([scanResult], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Creates a JSON with all data to send it to backend
  const handleSaveGame = () => {
    const userid = localStorage.getItem("userId");
    const gameData = {
      gameName: title,
      opponent: opponent,
      gameDate: gameDate,
      gameResult: isFirstSwitchOn ? "W" : "L",
      color: isSecondSwitchOn ? "B" : "W",
      pgn: scanResult,
    };

    const JSONstring = JSON.stringify(gameData);
    console.log(JSONstring);
    axios.post(
      `http://localhost:8000/game_upload?userid=${userid}`,
      JSONstring
    );
  };

  // Handles image zoom
  const handleWheel = (e) => {
    // e.preventDefault();    For some reason produces console errors
    const scaleAmount = 0.1;
    const minScale = 0.5;
    const maxScale = 3.0;
    let newScale;

    if (e.deltaY < 0) {
      newScale = scale + scaleAmount;
    } else {
      newScale = scale - scaleAmount;
    }

    newScale = Math.min(Math.max(newScale, minScale), maxScale);

    setScale(newScale);
  };

  const handleFirstSwitchChange = (event) => {
    setIsFirstSwitchOn(event.target.checked);
  };

  const handleSecondSwitchChange = (event) => {
    setIsSecondSwitchOn(event.target.checked);
  };

  return (
    <>
      <Navbar />
      <div className={""}>
        {!showDisplay && (
          <div className={"flex-column " + styles.main1}>
            <h1>Do you want to scan this image?</h1>
            <div className={styles.image_container}>
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                onWheel={handleWheel}
                style={{
                  transform: `scale(${scale})`,
                }}
              />
              <div className={"flex-row " + styles.zoom_value}>
                <FiZoomOut />
                {Math.round(scale * 100)}%
                <FiZoomIn />
              </div>
            </div>

            <div className={"flex-row " + styles.buttons}>
              <Link to="/homepage">
                <Button
                  variant="contained"
                  disableElevation
                  style={{
                    width: "120px",
                    height: "50px",
                    textTransform: "none",
                    borderRadius: "10px",
                    fontSize: "var(--font-size-md)",
                    fontWeight: "var(--font-weight-bold)",
                  }}
                >
                  Homepage
                </Button>
              </Link>
              <Button
                variant="contained"
                disableElevation
                onClick={handleScanButtonClick}
                style={{
                  width: "120px",
                  height: "50px",
                  textTransform: "none",
                  borderRadius: "10px",
                  fontSize: "var(--font-size-md)",
                  fontWeight: "var(--font-weight-bold)",
                }}
              >
                {!isLoading ? (
                  "Scan"
                ) : (
                  <CircularProgress
                    size="30px"
                    thickness={5}
                    style={{ color: "#ffffff" }}
                  />
                )}
              </Button>
            </div>
          </div>
        )}

        {showDisplay && (
          <div className={"flex-column " + styles.main2}>
            <div className={"flex-row " + styles.width_limiter}>
              <div className={"flex-column " + styles.info_container}>
                <h1>File name</h1>
                <input
                  type="text"
                  className={styles.text_input}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className={"flex-row " + styles.multiple_container}>
                  <div className={"flex-column " + styles.column1}>
                    <h1>Game date</h1>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateField
                        defaultValue={dayjs("2024-04-12")}
                        format="LL"
                        className={styles.custom_date_field}
                        onChange={handleDateChange}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className={"flex-column " + styles.column2}>
                    <h1>Opponent name</h1>
                    <input
                      type="text"
                      className={styles.text_input}
                      value={opponent}
                      onChange={(e) => setOpponent(e.target.value)}
                    />
                  </div>
                  <div className={"flex-column " + styles.column3}>
                    <h1>Additional info</h1>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={isFirstSwitchOn}
                            onChange={handleFirstSwitchChange}
                          />
                        }
                        label={isFirstSwitchOn ? "Win" : "Lose"}
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={isSecondSwitchOn}
                            onChange={handleSecondSwitchChange}
                          />
                        }
                        label={isSecondSwitchOn ? "Black" : "White"}
                      />
                    </FormGroup>
                  </div>
                </div>

                <h1>Edit</h1>
                <textarea
                  className={styles.text_input + " " + styles.file_edit}
                  value={scanResult}
                  onChange={(e) => setScanResult(e.target.value)}
                />
              </div>
              <div className={"flex-column " + styles.image_container}>
                <img src={URL.createObjectURL(file)} alt={file.name} />
                <div className={"flex-container " + styles.buttons_container}>
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={handleSaveGame}
                    style={{
                      textTransform: "none",
                      borderRadius: "var(--border-radius)",
                      fontSize: "var(--font-size-md)",
                      fontWeight: "var(--font-weight-bold)",
                    }}
                  >
                    Save game
                  </Button>
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={handleDownload}
                    style={{
                      textTransform: "none",
                      borderRadius: "var(--border-radius)",
                      fontSize: "var(--font-size-md)",
                      fontWeight: "var(--font-weight-bold)",
                    }}
                  >
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ScanResult;
