import React, { useState } from "react";
import "../styles/ScanResult.css";

import { useLocation, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Navbar from "./Navbar";

const ScanResult = () => {
  const location = useLocation();
  const responseData = location.state?.responseData;
  const formatedresponseData = JSON.stringify(responseData, null, 2);
  // const responseDataSample = `[[['1']], [['e4']], [['e5']], [['2']], [['Nh5']], [['Nc6']], [['3']], [['a6']], [['Nx6']], [['4']], [['Rh7']], [['Rh7']], [['5']], [['Rh7']], [['Rh7']], [['6']], [['Rh7']], [['Rh7']], [['7']], [['Rh7']], [['Rh7']], [['8']], [['Rh7']], [['Rh7']], [['e4']], [['Rh2']], [['Rh2']], [['1o']], [['Rh7']], [['Rh7']], [['Nh4']], [['Rh7']], [['Rh7']], [['12']], [['Rh7']], [['Rh7']], [['g5+']], [['Rh7']], [['Rh7']], [['14']], [['Rh7']], [['Rh7']], [['Ba6']], [['Rh7']], [['Rh7']], [['Nh7']], [['Rh7']], [['Rh7']], [['18']], [['Rh7']], [['Rh7']], [['Rf1']], [['Rh7']], [['Rh7']], [['2o']], [['Rh7']], [['Rh7']], [['2a']], [['Rh7']], [['Rh7']], [['fx+']], [['Rh7']], [['Rh7']], [['23']], [['Rh7']], [['Rh7']], [['24']], [['Rh7']], [['Rh7']], [['25']], [['Rh7']], [['Rh7']], [['27']], [['Rh7']], [['Rh7']], [['28']], [['Rh7']], [['Rh7']], [['f4+']], [['Rh7']], [['Rh7']], [['3o']], [['Rh7']], [['Rh7']], [['hx+']], [['Rh7']], [['Rh7']], [['32']], [['Rh7']], [['Rh7']], [['33']], [['Rh7']], [['Rh7']], [['34']], [['Rh2']], [['Rh2']], [['h4']], [['Rh7']], [['Rh7']], [['36']], [['Rh7']], [['Rh7']], [['37']], [['Rh7']], [['Rh7']], [['h4+']], [['Rh7']], [['Rh7']], [['h4+']], [['Rh7']], [['Rh7']], [['4o']], [['Rh7']], [['Rh7']], [['4']], [['Rh7']], [['Rh7']], [['42']], [['Rh7']], [['Rh7']], [['43']], [['Rh7']], [['Rh7']], [['4']], [['Rh7']], [['Rh7']], [['Kg6']], [['Rh7']], [['Rh7']], [['46']], [['Rh7']], [['Rh7']], [['48']], [['Rh7']], [['Rh7']], [['ba7+']], [['Rh7']], [['Rh7']], [['Qh1']], [['Rh7']], [['Rh7']], [['Bxe5']], [['Bg5']], [['x5']], [['Nge6+']], [['Rg7']], [['R74']], [['Nxe2']], [['Ng4']], [['fx4']]]`;

  const [title, setTitle] = useState("Example Title");
  const [content, setContent] = useState(formatedresponseData);

  // Function to handle download button click
  const handleDownload = () => {
    const filename = `${title}.pgn`;
    const blob = new Blob([content], { type: "text/plain" });
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
      <Navbar />
      <div className="container">
        <h1>Your file is ready!</h1>
        <p>Name your file and make sure there are no errors</p>
        <div className="output-container">
          <div className="output-main">
            <p>Title</p>
            <input
              type="text"
              className="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p>Edit</p>
            <textarea
              className="edit"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="buttons">
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
    </>
  );
};

export default ScanResult;
