import React, { useState } from "react";
import "../styles/Global.css";
import styles from "../styles/ScanResult.module.css";

import { useLocation, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import Navbar from "./Navbar";

import axios from "axios";

const ScanResult = () => {
  const location = useLocation();
  const { file } = location.state;
  const [showDisplay, setShowDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Just for testing
  // const scanResultSample = `[[['1']], [['e4']], [['e5']], [['2']], [['Nh5']], [['Nc6']], [['3']], [['a6']], [['Nx6']], [['4']], [['Rh7']], [['Rh7']], [['5']], [['Rh7']], [['Rh7']], [['6']], [['Rh7']], [['Rh7']], [['7']], [['Rh7']], [['Rh7']], [['8']], [['Rh7']], [['Rh7']], [['e4']], [['Rh2']], [['Rh2']], [['1o']], [['Rh7']], [['Rh7']], [['Nh4']], [['Rh7']], [['Rh7']], [['12']], [['Rh7']], [['Rh7']], [['g5+']], [['Rh7']], [['Rh7']], [['14']], [['Rh7']], [['Rh7']], [['Ba6']], [['Rh7']], [['Rh7']], [['Nh7']], [['Rh7']], [['Rh7']], [['18']], [['Rh7']], [['Rh7']], [['Rf1']], [['Rh7']], [['Rh7']], [['2o']], [['Rh7']], [['Rh7']], [['2a']], [['Rh7']], [['Rh7']], [['fx+']], [['Rh7']], [['Rh7']], [['23']], [['Rh7']], [['Rh7']], [['24']], [['Rh7']], [['Rh7']], [['25']], [['Rh7']], [['Rh7']], [['27']], [['Rh7']], [['Rh7']], [['28']], [['Rh7']], [['Rh7']], [['f4+']], [['Rh7']], [['Rh7']], [['3o']], [['Rh7']], [['Rh7']], [['hx+']], [['Rh7']], [['Rh7']], [['32']], [['Rh7']], [['Rh7']], [['33']], [['Rh7']], [['Rh7']], [['34']], [['Rh2']], [['Rh2']], [['h4']], [['Rh7']], [['Rh7']], [['36']], [['Rh7']], [['Rh7']], [['37']], [['Rh7']], [['Rh7']], [['h4+']], [['Rh7']], [['Rh7']], [['h4+']], [['Rh7']], [['Rh7']], [['4o']], [['Rh7']], [['Rh7']], [['4']], [['Rh7']], [['Rh7']], [['42']], [['Rh7']], [['Rh7']], [['43']], [['Rh7']], [['Rh7']], [['4']], [['Rh7']], [['Rh7']], [['Kg6']], [['Rh7']], [['Rh7']], [['46']], [['Rh7']], [['Rh7']], [['48']], [['Rh7']], [['Rh7']], [['ba7+']], [['Rh7']], [['Rh7']], [['Qh1']], [['Rh7']], [['Rh7']], [['Bxe5']], [['Bg5']], [['x5']], [['Nge6+']], [['Rg7']], [['R74']], [['Nxe2']], [['Ng4']], [['fx4']]]`;

  // PGN file name and content
  const [title, setTitle] = useState("My Chess Game");
  const [scanResult, setScanResult] = useState(""); //change to null if it gives problems

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
      setScanResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.log("Scaning error");
      setScanResult("ERROR");
      console.error("Error with backend communication:", error);
    }
    setIsLoading(false);
    toggleDisplay();
    extractFileNameWithoutExtension(file.name);
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

  return (
    <>
      {/* <Navbar /> */}
      <div className={styles.main}>
        {!showDisplay && (
          <div>
            <img src={URL.createObjectURL(file)} alt={file.name} />
            <Button
              variant="contained"
              disableElevation
              onClick={handleScanButtonClick}
              style={{
                width: "500px",
                height: "100px",
                textTransform: "none",
                borderRadius: "100px",
                fontSize: "var(--font-size-lg)",
                fontWeight: "var(--font-weight-normal)",
              }}
            >
              {!isLoading ? (
                "Scan"
              ) : (
                <CircularProgress
                  size="100px"
                  thickness="10"
                  style={{ color: "#ffffff" }}
                />
              )}
            </Button>
          </div>
        )}

        {showDisplay && (
          <div>
            <div className={styles.container}>
              <p>RESULTADO DEL OUTPUT:</p>
              {scanResult && <p>{scanResult}</p>}
              <h1>Your file is ready!</h1>
              <p>Name your file and make sure there are no errors</p>
              <div className={styles.output_container}>
                <div className={styles.output_main}>
                  <p>Title</p>
                  <input
                    type="text"
                    className={styles.title}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <p>Edit</p>
                  <textarea
                    className={styles.edit}
                    value={scanResult}
                    onChange={(e) => setScanResult(e.target.value)}
                  />

                  <div className={styles.buttons}>
                    <Link to="/homepage">
                      <Button variant="contained" sx={{ borderRadius: "20px" }}>
                        Homepage
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      sx={{ borderRadius: "20px" }}
                      onClick={handleDownload}
                    >
                      Download
                    </Button>
                  </div>
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
