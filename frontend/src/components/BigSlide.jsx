import React, { useRef, useState } from "react";
import "./BigSlide.css";

const BigSlide = () => {
  const containerRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(50); // 50% by default

  const handleMouseMove = (e) => {
    const bounds = containerRef.current.getBoundingClientRect();
    const position = ((e.clientX - bounds.left) / bounds.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  const handleTouchMove = (e) => {
    const bounds = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const position = ((touch.clientX - bounds.left) / bounds.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  return (
    <div className="bigslide-container">
      <h2 className="bigslide-title">Remove Background with High Quality and Accuracy</h2>
      <div
        className="compare-wrapper"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Full Image as base */}
        <img
          src="/images/sample2.jpg"
          alt="Full Before After"
          className="full-image"
        />

        {/* Overlayed Image (revealed based on slider) */}
        <div className="image-overlay" style={{ width: `${sliderPosition}%` }}>
          <img
            src="/images/sample1.jpg"
            alt="Overlay Image"
            className="full-image"
          />
        </div>

        {/* Slider handle */}
        <div className="slider-line" style={{ left: `${sliderPosition}%` }} />
      </div>
    </div>
  );
};

export default BigSlide;
