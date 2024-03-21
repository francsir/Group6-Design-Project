// ScanResult.js

import React from "react";
import "../styles/ScanResult.css";

const ScanResult = () => {
  return (
    <div className="scan-result-page">
      <h1>Your file is ready</h1>
      <div className="main-container">
        <div className="first-column">
          <div className="container-row">
            <div className="item">a</div>
            <div className="item">b</div>
          </div>
          <div className="container-row">
            <div className="item">c</div>
            <div className="item"></div>
          </div>
        </div>
        <div className="second-column">
          <div className="container-row">
            <div className="item">Item 5</div>
            <div className="item">Item 6</div>
          </div>
          {/* <div className="container-row">
            <div className="item">Item 7</div>
            <div className="item">Item 8</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ScanResult;
