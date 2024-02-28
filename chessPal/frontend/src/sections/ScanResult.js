import React from "react";
import { useLocation } from "react-router-dom";

const ScanResult = () => {
  const location = useLocation();
  const responseData = location.state?.responseData;

  return (
    <div>
      <h2>Scan Result</h2>
      <p>Data received from Homepage component:</p>
      <pre>{JSON.stringify(responseData, null, 2)}</pre>
    </div>
  );
};

export default ScanResult;
