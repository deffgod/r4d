import React from 'react';
import { motion } from 'framer-motion';
import './TechButton.css';

/**
 * TechButton Component
 * Futuristic button with tech-themed effects (glow, scan animation)
 * Animated with Framer Motion, respects prefers-reduced-motion
 * 
 * @param {React.ReactNode} children - Button content
 * @param {string} variant - Button variant ('primary', 'secondary')
 * @param {string} size - Button size ('sm', 'md', 'lg')
 * @param {boolean} glow - Enable neon glow effect
 * @param {boolean} scan - Enable scan line animation
 * @param {string} className - Additional CSS classes
 * @param {Function} onClick - Click handler
 * @param {boolean} disabled - Disabled state
 * @param {string} type - Button type (default: 'button')
 * @param {string} ariaLabel - Accessible label for screen readers
 */
export const TechButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  glow = true,
  scan = false,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  ariaLabel,
  ...props
}) => {
  return (
    <motion.button
      type={type}
      className={`tech-button tech-button-${variant} tech-button-${size} ${glow ? 'tech-button-glow' : ''} ${scan ? 'tech-button-scan' : ''} ${className}`}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      {...props}
    >
      {scan && <span className="scan-line-overlay" aria-hidden="true" />}
      <span className="tech-button-content">{children}</span>
    </motion.button>
  );
};

