import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

import "../styles/Global.css";
import styles from "../styles/Dropzone.module.css";

import Button from "@mui/material/Button";
import { GrUploadOption } from "react-icons/gr";

const Dropzone = ({ onFileAccepted }) => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

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

      const maxSize = 25 * 1024 * 1024;
      const maxWidth = 1920;
      const maxHeight = 1080;

      // if (!file) {
      //   onFileAccepted("No file");
      // } else if (acceptedFiles.length > 1) {
      //   onFileAccepted("You can only upload one file");
      // } else if (!acceptedTypes.includes(file.type)) {
      //   onFileAccepted("File is invalid");
      // } else if (file.size > maxSize) {
      //   onFileAccepted("File exceeds size limit");
      // } else {
      //   const image = new Image();
      //   image.onload = () => {
      //     if (image.width > maxWidth || image.height > maxHeight) {
      //       onFileAccepted("Image dimensions exceed limit (1920x1080)");
      //     } else {
      //       navigate("/ScanResult", { state: { file } });
      //     }
      //   };
      //   image.src = URL.createObjectURL(file);
      // }
      navigate("/ScanResult", { state: { file } });
    },
    [onFileAccepted, navigate]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  return (
    <div
      {...getRootProps()}
      className={`${styles.upload_section} ${
        isDragging ? styles.dragging : ""
      }`}
    >
      <input {...getInputProps()} />
      <div className={styles.button_container}>
        <Button
          variant="contained"
          disableElevation
          startIcon={<GrUploadOption />}
          style={{
            padding: "10px 17px 10px 17px",
            textTransform: "none",
            borderRadius: "var(--border-radius)",
            fontSize: "var(--font-size-lg)",
            fontWeight: "var(--font-weight-normal)",
          }}
        >
          Upload Image
        </Button>
      </div>
      {isDragActive ? (
        <p>Drop the file here...</p>
      ) : (
        <p>Drag and drop an image here (max size 25MB)</p>
      )}
      <div className={"flex-row " + styles.formats_container}>
        <p>Supported formats:</p>
        <div className={"flex-row " + styles.format_boxes_container}>
          <div className={styles.format_box}>png</div>
          <div className={styles.format_box}>jpeg</div>
          <div className={styles.format_box}>jpg</div>
          <div className={styles.format_box}>webp</div>
          <div className={styles.format_box}>bmp</div>
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
