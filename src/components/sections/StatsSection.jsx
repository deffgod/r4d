import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { TrendingUp, Globe, Zap, Rocket } from 'lucide-react';
import './StatsSection.css';

/**
 * StatsSection Component
 * Modern feature-oriented design with horizontal cards
 * Inspired by 21st.dev feature sections
 * Icon-enhanced stats with better visual hierarchy
 */

// Icon mapping for each stat
const getStatIcon = (index) => {
  const icons = [TrendingUp, Globe, Zap, Rocket];
  return icons[index] || TrendingUp;
};

// Individual Stat Card with icon and enhanced design
const StatCard = ({ stat, index, inView }) => {
  const Icon = getStatIcon(index);
  
  // Staggered entrance animation
  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.15
      }
    }
  }), [index]);

  // Icon animation
  const iconVariants = useMemo(() => ({
    hidden: { 
      scale: 0,
      rotate: -180
    },
    visible: { 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: index * 0.15 + 0.3
      }
    }
  }), [index]);

  return (
    <motion.div
      className="stat-card-modern"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ 
        y: -12,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Animated background glow */}
      <div className="stat-card-glow" />
      
      {/* Icon container */}
      <motion.div 
        className="stat-icon-container"
        variants={iconVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <Icon className="stat-icon" />
      </motion.div>

      {/* Content */}
      <div className="stat-content-modern">
        <motion.div 
          className="stat-value-modern"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: index * 0.15 + 0.4 }}
        >
          {stat.value}
        </motion.div>
        
        <motion.div 
          className="stat-label-modern"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.15 + 0.5 }}
        >
          {stat.label}
        </motion.div>
      </div>

      {/* Decorative corner element */}
      <div className="stat-corner-accent" />
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
      y: 40
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }), []);

  // Tagline animation
  const taglineVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.8,
        ease: "easeOut"
      }
    }
  }), []);

  return (
    <section id="about" className="stats-section-modern section card " ref={ref}>
      {/* Gradient background effects */}
      <div className="stats-bg-modern">
        <div className="gradient-orb gradient-orb-1" />
        <div className="gradient-orb gradient-orb-2" />
      </div>

      <div className="container">
        {/* Section Header */}
        <div className="stats-header-modern">
          <motion.h2 
            className="stats-title-modern"
            variants={titleVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {t.stats.title}
          </motion.h2>
        </div>

        {/* Stats Grid - Horizontal cards */}
        <div className="stats-grid-modern">
          {t.stats.items.map((stat, index) => (
            <StatCard 
              key={`stat-${stat.value}-${stat.label}`}
              stat={stat} 
              index={index} 
              inView={inView}
            />
          ))}
        </div>

        {/* Tagline with modern styling */}
        <motion.div
          className="stats-tagline-modern"
          variants={taglineVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="tagline-accent-line" />
          <p className="tagline-text">{t.stats.tagline}</p>
          <div className="tagline-accent-line" />
        </motion.div>
      </div>
    </section>
  );
};