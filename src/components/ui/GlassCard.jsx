import React from 'react';
import { motion } from 'framer-motion';
import './GlassCard.css';

export const GlassCard = ({ 
  children, 
  className = '', 
  hover = true,
  glow = false,
  holographic = false,
  delay = 0,
  onClick
}) => {
  return (
    <motion.div
      className={`glass-card-component ${hover ? 'glass-card-hover' : ''} ${glow ? 'glass-card-glow' : ''} ${holographic ? 'holographic' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

