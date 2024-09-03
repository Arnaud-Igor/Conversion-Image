/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./App.css";
import { saveAs } from "file-saver";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [outputFormat, setOutputFormat] = useState("png");

  const displayImage = (file) => {
    const reader = new FileReader();
    reader.onload = function () {
      const dataUrl = reader.result;
      document.getElementById("image-display").src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleChangeFormat = (e) => {
    setOutputFormat(e.target.value);
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log(file);
    displayImage(file);
  };

  const convertImage = () => {
    if (!selectedFile) {
      alert("Sélectionnez un fichier");
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      const dataUrl = reader.result;
      const blob = dataURItoBlob(dataUrl);
      saveAs(blob, `converted_image.${outputFormat}`);
    };
    reader.readAsDataURL(selectedFile);
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div className="app-container">
      <div className="input-container">
        <input type="file" accept="image/" onChange={handleChangeFile} />
        <div className="image-container">
          <img src="" alt="" id="image-display" />
        </div>
        <select onChange={handleChangeFormat} value={outputFormat}>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
          <option value="gif">GIF</option>
          <option value="tiff">TIFF</option>
        </select>
        <button className="btn" onClick={convertImage}>
          Convertir image
        </button>
      </div>
    </div>
  );
}

export default App;
