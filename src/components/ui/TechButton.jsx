import React from 'react';
import { motion } from 'framer-motion';
import './TechButton.css';

export const TechButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  glow = true,
  scan = false,
  className = '',
  onClick,
  ...props
}) => {
  return (
    <motion.button
      className={`tech-button tech-button-${variant} tech-button-${size} ${glow ? 'tech-button-glow' : ''} ${scan ? 'tech-button-scan' : ''} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      {...props}
    >
      {scan && <span className="scan-line-overlay" />}
      <span className="tech-button-content">{children}</span>
    </motion.button>
  );
};

