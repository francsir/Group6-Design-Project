// Dropzone.js
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ onFileAccepted }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]; // Solo procesamos el primer archivo
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
