import React from 'react';
import { motion } from 'framer-motion';
import './Card.css';

export const Card = ({ 
  children, 
  icon,
  title,
  description,
  features,
  className = '', 
  hoverable = true,
  delay = 0 
}) => {
  return (
    <motion.div
      className={`card ${hoverable ? 'card-hoverable' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {icon && (
        <div className="card-icon">
          <img src={icon} alt={title} loading="lazy" />
        </div>
      )}
      {title && <h3 className="card-title">{title}</h3>}
      {description && <p className="card-description">{description}</p>}
      {features && (
        <ul className="card-features">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      )}
      {children}
    </motion.div>
  );
};
