import React, { useState } from "react";
import './Upload.css';

const Upload = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image file.");
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">Upload Your Image</h2>

      <label htmlFor="imageInput" className="upload-label">
        Choose File
      </label>
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageUpload}
      />

      {image && (
        <div className="image-preview">
          <p>Preview:</p>
          <img src={image} alt="Uploaded Preview" />
        </div>
      )}
    </div>
  );
};

export default Upload;
