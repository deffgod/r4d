import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';
import './HeroSection.css';

/**
 * Hero Section Component
 * Clean minimal tech design with subtle animations
 * Focus on typography and clean layout
 */
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

  const subtitleVariant = useMemo(() => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.2, ease: "easeOut" }
  }), []);

  const buttonsVariant = useMemo(() => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.3, ease: "easeOut" }
  }), []);

  return (
    <section id="home" className="hero-section">
      {/* Animated background elements */}
      <div className="hero-bg">
        <div className="hero-grid"></div>
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
      </div>

      <div className="container">
        <motion.div 
          className="hero-content"
          {...contentVariant}
        >
          <motion.h1 
            className="hero-title"
            {...titleVariant}
          >
            <span className="hero-title-gradient">{t.hero.title}</span>
          </motion.h1>

          <motion.div 
            className="hero-subtitle"
            {...subtitleVariant}
          >
            {t.hero.subtitle.map((line, index) => (
              <p key={`subtitle-${index}`}>{line}</p>
            ))}
          </motion.div>

          <motion.div 
            className="hero-buttons"
            {...buttonsVariant}
          >
            <Button size="lg" variant="primary">
              {t.hero.buttons.primary}
            </Button>
            <Button size="lg" variant="outline">
              {t.hero.buttons.secondary}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
