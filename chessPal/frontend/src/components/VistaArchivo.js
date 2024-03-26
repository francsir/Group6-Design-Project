import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "./Navbar";

import axios from "axios";

const VistaArchivo = () => {
  const location = useLocation();
  const { file } = location.state;
  const [scanResult, setScanResult] = useState(null);

  const handleScanButtonClick = async () => {
    try {
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

      setScanResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("Error al cargar el archivo:", error);
    }
  };

  return (
    // <div>
    //   <h2>Detalles del archivo</h2>
    //   {file && (
    //     <div>
    //       <p>Nombre: {file.name}</p>
    //       <p>Tipo: {file.type}</p>
    //       <p>Tamaño: {file.size} bytes</p>
    //     </div>
    //   )}
    // </div>
    <>
      <Navbar />
      <div>
        <h2>Detalles del archivo</h2>
        {file && (
          <div>
            <p>Nombre: {file.name}</p>
            <p>Tipo: {file.type}</p>
            <p>Tamaño: {file.size} bytes</p>
            <p>Vista previa:</p>
            <img src={URL.createObjectURL(file)} alt={file.name} />
          </div>
        )}
        <p>RESULTADO DEL OUTPUT:</p>
        {scanResult && <p>{scanResult}</p>}
        <button onClick={handleScanButtonClick}>Scan File</button>
      </div>
    </>
  );
};

export default VistaArchivo;
