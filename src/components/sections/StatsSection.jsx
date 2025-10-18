import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './StatsSection.css';

/**
 * StatsSection Component
 * Modern feature cards design inspired by 21st.dev
 * 2x2 grid layout on desktop, stacked on mobile
 * Preserves all text content with enhanced visual design
 */

// Individual Stat Card with hover effects
const StatCard = ({ stat, index, inView }) => {
  // Staggered entrance animation
  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: index * 0.12
      }
    }
  }), [index]);

  // Value pop-in animation
  const valueVariants = useMemo(() => ({
    hidden: { 
      scale: 0.5,
      opacity: 0
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
        delay: index * 0.12 + 0.2
      }
    }
  }), [index]);

  // Label fade-in animation
  const labelVariants = useMemo(() => ({
    hidden: { 
      opacity: 0,
      y: 10
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.12 + 0.4,
        ease: "easeOut"
      }
    }
  }), [index]);

  return (
    <motion.div
      className="stat-card"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Top gradient accent line */}
      <div className="stat-card-accent" />
      
      {/* Subtle animated background gradient */}
      <motion.div 
        className="stat-card-gradient"
        animate={{
          opacity: [0.8, 1, 0.8],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Content */}
      <div className="stat-content">
        <motion.h3 
          className="stat-value"
          variants={valueVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {stat.value}
        </motion.h3>
        
        <motion.p 
          className="stat-label"
          variants={labelVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {stat.label}
        </motion.p>
      </div>

      {/* Shine effect on hover */}
      <div className="stat-card-shine" />
    </motion.div>
  );
};

export const StatsSection = () => {
  const { t } = useLanguage();
  const { ref, inView } = useScrollAnimation();

  // Title animation
  const titleVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  }), []);

  // Tagline animation
  const taglineVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.6,
        ease: "easeOut"
      }
    }
  }), []);

  return (
    <section id="about" className="stats-section section" ref={ref}>
      {/* Subtle dotted background pattern */}
      <div className="stats-bg">
        <div className="stats-grid"></div>
      </div>

      <div className="container">
        {/* Section Title */}
        <motion.h2 
          className="stats-title"
          variants={titleVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {t.stats.title}
        </motion.h2>

        {/* Stats Grid - 2x2 on desktop, stacked on mobile */}
        <div className="stats-grid">
          {t.stats.items.map((stat, index) => (
            <StatCard 
              key={`stat-${index}`}
              stat={stat} 
              index={index} 
              inView={inView}
            />
          ))}
        </div>

        {/* Tagline with decorative quotes */}
        <motion.p 
          className="stats-tagline"
          variants={taglineVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {t.stats.tagline}
        </motion.p>
      </div>
    </section>
  );
};