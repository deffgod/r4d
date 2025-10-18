import React from 'react';
import { motion } from 'framer-motion';
import './HolographicText.css';

export const HolographicText = ({ 
  children, 
  as = 'h1',
  gradient = true,
  shimmer = true,
  glow = false,
  className = '' 
}) => {
  const Component = motion[as] || motion.div;
  
  return (
    <Component
      className={`holographic-text ${gradient ? 'holographic-gradient' : ''} ${shimmer ? 'holographic-shimmer' : ''} ${glow ? 'holographic-glow' : ''} ${className}`}
    >
      {children}
    </Component>
  );
};

