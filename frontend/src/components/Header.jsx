import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import video from '../assets/NewVidio.mp4';
import './Header.css';

const Header = () => {
  const { setImage, setResultImage } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setImage(file); // Original image context में डालो

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post("http://localhost:9000/api/images/upload", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const imageUrl = `http://localhost:9000${response.data.imageUrl}`;
      setResultImage(imageUrl); // Processed image context में डालो

      // ✅ Navigate to /result page
      navigate("/result");
    } catch (error) {
      console.error(error);
      alert("Failed to remove background. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Left Side */}
      <div className="left-container">
        <h1 className="left-h1">
          Remove the <br /><span>background</span> from Images for free
        </h1>
        <p className="left-p">
          Transform your photos effortlessly with BG-removal software. You can easily eliminate backgrounds from images,
          enhancing your creativity and making your projects stand out.
        </p>

        <div className="upload-section">
          <input type="file" id="upload" accept="image/*" onChange={handleImageUpload} hidden />
          <label htmlFor="upload" className="upload-button" disabled={loading}>
            {loading ? "Uploading..." : "Upload Image"}
          </label>
        </div>

        {loading && <p className="pas">Processing image...</p>}
      </div>

      {/* Right Side */}
      <div className="right-container">
        <video className="demo-video" autoPlay muted loop>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Header;
