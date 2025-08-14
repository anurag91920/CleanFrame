import React from "react";
import './Testimonial.css';

const Testimonal = () => {
  return (
    <div className="testimonial-container">
      <h2 className="testimonial-title">What Our Users Say</h2>
      <div className="testimonial-grid">

        <div className="testimonial-card">
          <p className="testimonial-text">
            “This background remover saved me hours of editing. Super easy and accurate!”
          </p>
          <h4 className="testimonial-name">— Sarah M.</h4>
        </div>

        <div className="testimonial-card">
          <p className="testimonial-text">
            “Perfect for my product photos. Clean cutouts and fast results. Love it!”
          </p>
          <h4 className="testimonial-name">— Alex T.</h4>
        </div>

        <div className="testimonial-card">
          <p className="testimonial-text">
            “I use it for my social media graphics. The results look professional every time.”
          </p>
          <h4 className="testimonial-name">— Priya K.</h4>
        </div>

      </div>
    </div>
  );
};

export default Testimonal;
