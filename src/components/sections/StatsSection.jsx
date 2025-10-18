import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './StatsSection.css';

/**
 * StatsSection Component
 * Clean minimal design with subtle animations
 * Focus on typography and clean card layout
 */

// Individual Stat Card - Clean and Simple
const StatCard = ({ stat, index, inView }) => {
  // Card animation variants
  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
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
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="stat-content">
        <motion.h3 
          className="stat-value"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ 
            delay: index * 0.1 + 0.2,
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          {stat.value}
        </motion.h3>
        
        <motion.p 
          className="stat-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          {stat.label}
        </motion.p>
      </div>
    </motion.div>
  );
};

export const StatsSection = () => {
  const { t } = useLanguage();
  const { ref, inView } = useScrollAnimation();

  // Memoize animations
  const titleVariant = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }), []);

  const taglineVariant = useMemo(() => ({
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  }), []);

  return (
    <section id="about" className="stats-section section" ref={ref}>
      {/* Subtle background pattern */}
      <div className="stats-bg">
        <div className="stats-grid"></div>
      </div>

      <div className="container">
        <motion.h2 
          className="stats-title"
          variants={titleVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {t.stats.title}
        </motion.h2>

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

        <motion.p 
          className="stats-tagline"
          variants={taglineVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {t.stats.tagline}
        </motion.p>
      </div>
    </section>
  );
};
