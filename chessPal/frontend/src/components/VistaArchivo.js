import React from "react";
import { useLocation } from "react-router-dom";

const VistaArchivo = () => {
  const location = useLocation();
  const { file } = location.state;

  return (
    <div>
      <h2>Detalles del archivo</h2>
      {file && (
        <div>
          <p>Nombre: {file.name}</p>
          <p>Tipo: {file.type}</p>
          <p>Tamaño: {file.size} bytes</p>
        </div>
      )}
    </div>
  );
};

export default VistaArchivo;
