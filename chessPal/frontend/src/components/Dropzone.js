import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

const Dropzone = ({ onFileAccepted }) => {
  const navigate = useNavigate();

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const acceptedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
        "image/bmp",
      ];

      if (!file) {
        onFileAccepted("sin archivo");
      } else if (acceptedFiles.length > 1) {
        onFileAccepted("solo se permite un archivo a la vez");
      } else if (!acceptedTypes.includes(file.type)) {
        onFileAccepted("archivo no válido");
      } else {
        onFileAccepted("archivo válido");
        navigate("/VistaArchivo", { state: { file } });
      }
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #007bff",
        padding: "20px",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta el archivo aquí...</p>
      ) : (
        <p>Arrastra un archivo aquí o haz clic para seleccionar un archivo</p>
      )}
    </div>
  );
};

export default Dropzone;
