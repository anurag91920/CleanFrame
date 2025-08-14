import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import './Result.css';

const Result = () => {
  const { image, resultImage } = useContext(AppContext);

  return (
    <div className="result-container">
      <h2 className="result-title">Image Comparison</h2>
      <div className="image-wrapper">

        {/* Original Image */}
        <div className="image-box">
          <h3>Original</h3>
          {image ? (
            <img src={URL.createObjectURL(image)} alt="Original" className="image-preview" />
          ) : (
            <p className="image-placeholder">No image selected</p>
          )}
        </div>

        {/* Background Removed Image */}
        <div className="image-box">
          <h3>Background Removed</h3>
          {resultImage ? (
            <>
              <img src={resultImage} alt="Background Removed" className="image-preview" />
              <a href={resultImage} download="no-bg.png" className="download-button">Download Image</a>
            </>
          ) : (
            <p className="image-placeholder">No result available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
