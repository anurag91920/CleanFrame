import React from 'react';
import './Steps.css';
import { FaUpload, FaMagic, FaDownload } from 'react-icons/fa';

const Steps = () => {
  return (
    <div className="steps-container">
      <h2 className="steps-title">How to Remove Image Background</h2>
      <div className="steps-grid">
        <div className="step-card">
          <FaUpload className="step-icon" />
          <h3>1. Upload Image</h3>
          <p>Select your image using the upload button. We support JPG, PNG, and more.</p>
        </div>

        <div className="step-card">
          <FaMagic className="step-icon" />
          <h3>2. Background Removed</h3>
          <p>Our AI will instantly remove the background for you in just seconds.</p>
        </div>

        <div className="step-card">
          <FaDownload className="step-icon" />
          <h3>3. Download Image</h3>
          <p>Download the transparent or new background version of your image.</p>
        </div>
      </div>
    </div>
  );
};

export default Steps;
