import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './R4D3D.css';

const R4D3D = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 1.5;
    const centerY = rect.height / 1.5;
    
    const rotateXValue = ((y - centerY) / centerY) * -15;
    const rotateYValue = ((x - centerX) / centerX) * 15;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="r4d-3d-container" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.div
        className="r4d-3d-wrapper"
        animate={{
          rotateX,
          rotateY,
          rotateZ: 0
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
      >
        <div className="r4d-3d-logo">
          <div className="r4d-3d-face r4d-3d-front">
            <img src="/logo/Logo-r4d.svg" alt="R4D Logo" />
          </div>
          <div className="r4d-3d-face r4d-3d-back">
            <img src="/logo/Logo-r4d.svg" alt="R4D Logo" />
          </div>
          <div className="r4d-3d-face r4d-3d-left">
            <img src="/logo/Logo-r4d.svg" alt="R4D Logo" />
          </div>
          <div className="r4d-3d-face r4d-3d-left">
            <img src="/logo/R4D-white.svg" alt="R4D Logo" />
          </div>
          <div className="r4d-3d-face r4d-3d-right">
            <img src="/logo/R4D-white.svg" alt="R4D Logo" />
          </div>
          <div className="r4d-3d-face r4d-3d-top">
            <img src="/logo/Logo-r4d.svg" alt="R4D Logo" />
          </div>
          <div className="r4d-3d-face r4d-3d-bottom">
            <img src="/logo/Logo-r4d.svg" alt="R4D Logo" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default R4D3D;
