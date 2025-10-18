import React from 'react';
import './Button.css';

/**
 * Button Component
 * Reusable button with variants and sizes
 * Follows accessibility best practices
 * 
 * @param {React.ReactNode} children - Button content
 * @param {string} variant - Button style variant ('primary', 'secondary', 'outline')
 * @param {string} size - Button size ('sm', 'md', 'lg')
 * @param {Function} onClick - Click handler
 * @param {string} className - Additional CSS classes
 * @param {boolean} disabled - Disabled state
 * @param {string} type - Button type (default: 'button')
 * @param {string} ariaLabel - Accessible label for screen readers
 */
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  className = '',
  disabled = false,
  type = 'button',
  ariaLabel,
  ...props 
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
