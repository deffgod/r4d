import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import R4D3D from '../ui/R4D3D';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';
import { Code, Layers, ShieldCheck } from 'lucide-react';
import './HeroSection.css';

/**
 * Hero Section Component
 * Clean minimal tech design with subtitle bullet cards
 * Features icon-enhanced feature cards
 */

// Icon mapping for subtitle items
const getSubtitleIcon = (index) => {
  const icons = [Code, Layers, ShieldCheck];
  return icons[index] || Code;
};

// Subtitle Bullet Card Component
const SubtitleCard = ({ text, index }) => {
  const Icon = getSubtitleIcon(index);
  
  const cardVariant = useMemo(() => ({
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2 + (index * 0.1),
        ease: "easeOut"
      }
    }
  }), [index]);

  return (
    <motion.div
      className="hero-subtitle-card"
      variants={cardVariant}
      initial="initial"
      animate="animate"
      whileHover={{ 
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {/* Icon container with gradient */}
      <div className="hero-card-icon-wrapper">
        <Icon className="hero-card-icon" />
      </div>
      
      {/* Text content */}
      <p className="hero-card-text">{text}</p>
      
      {/* Decorative gradient line */}
      <div className="hero-card-gradient-line" />
    </motion.div>
  );
};

export const HeroSection = () => {
  const { t } = useLanguage();

  // Memoize animation variants for performance
  const contentVariant = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }), []);

  const titleVariant = useMemo(() => ({
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.1, ease: "easeOut" }
  }), []);

  const buttonsVariant = useMemo(() => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.5, ease: "easeOut" }
  }), []);

  return (
    <section id="home" className="hero-section">
      {/* Animated background elements */}
      <motion.div 
        className="hero-gradient-orb hero-gradient-orb-1"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="hero-gradient-orb hero-gradient-orb-2"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <div className="hero-content container">
        <motion.div 
          className="hero-content-container"
          {...contentVariant}
        >
          {/* Two Column Layout */}
          <div className="hero-grid">
            {/* Left Column: 3D Logo */}
            <motion.div 
              className="hero-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <R4D3D />
              
              
            </motion.div>

            {/* Right Column: Title & Cards */}
            <div className="hero-right">
              <motion.h1 
                className="hero-title container"
                {...titleVariant}
              >
                <span className="hero-title-text ">{t.hero.title}</span>
              </motion.h1>

              {/* Subtitle Cards - Vertical Compact */}
              <div className="hero-subtitle-cards container">
                {t.hero.subtitle.map((line, index) => (
                  <SubtitleCard 
                    key={`subtitle-card-${line.substring(0, 20)}`}
                    text={line}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Buttons Below - Full Width */}
          <motion.div 
            className="container hero-grid hero-content"
            {...buttonsVariant}
          >  <Button size="lg" variant="outline">
          {t.hero.buttons.secondary}
        </Button>
            <Button size="lg" variant="primary">
              {t.hero.buttons.primary}
            </Button>
          
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
