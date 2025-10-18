import React, { useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './StatsSection.css';

/**
 * StatsSection Component
 * Displays key statistics with 3D card effects and holographic animations
 * Features counter animations and interactive hover effects
 */

// Individual Stat Card with 3D tilt effect
const StatCard = ({ stat, index, inView }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // 3D tilt effect on mouse move
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);
  
  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // Card animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.15
      }
    }
  };

  return (
    <motion.div
      className="stat-card"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Holographic shine effect */}
      <motion.div 
        className="stat-card-shine"
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Glowing orb decoration */}
      <motion.div 
        className="stat-orb"
        animate={isHovered ? { 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        } : {}}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Content */}
      <div className="stat-content">
        <motion.h3 
          className="stat-value"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ 
            delay: index * 0.15 + 0.3,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
        >
          {stat.value}
        </motion.h3>
        
        <motion.p 
          className="stat-label"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.15 + 0.5 }}
        >
          {stat.label}
        </motion.p>
      </div>

      {/* Particle effects on hover */}
      {isHovered && (
        <div className="stat-particles">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 100],
                y: [0, (Math.random() - 0.5) * 100],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export const StatsSection = () => {
  const { t } = useLanguage();
  const { ref, inView } = useScrollAnimation();

  // Memoize title animation
  const titleVariant = useMemo(() => ({
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    }
  }), []);

  const taglineVariant = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8
      }
    }
  }), []);

  return (
    <section id="about" className="stats-section section" ref={ref}>
      {/* Animated background grid */}
      <div className="stats-bg-grid" />
      
      {/* Floating particles */}
      <div className="stats-bg-particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container">
        <motion.h2 
          className="stats-title"
          variants={titleVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <span className="title-gradient">{t.stats.title}</span>
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
          <span className="tagline-highlight">{t.stats.tagline}</span>
        </motion.p>
      </div>
    </section>
  );
};
