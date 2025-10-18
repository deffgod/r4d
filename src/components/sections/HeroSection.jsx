import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { TechButton } from '../ui/TechButton';
import { HolographicText } from '../ui/HolographicText';
import { LiquidCrystalBackground } from '../ui/LiquidCrystalBackground';
import './HeroSection.css';

/**
 * Hero Section Component
 * Main landing section with animated title, subtitle, and CTA buttons
 * Includes WebGL liquid crystal background for visual impact
 * Optimized with useMemo for animation variants
 */
export const HeroSection = () => {
  const { t } = useLanguage();

  // Memoize animation variants to prevent recreation on each render
  const contentVariant = useMemo(() => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  }), []);

  const titleVariant = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.2 }
  }), []);

  const subtitleVariant = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.4 }
  }), []);

  const buttonsVariant = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.6 }
  }), []);

  return (
    <section id="home" className="hero-section">
      <div className="hero-bg">
        <LiquidCrystalBackground
          speed={0.4}
          radii={[0.25, 0.18, 0.3]}
          smoothK={[0.25, 0.3]}
          className="hero-liquid-bg"
        />
        <div className="hero-tech-grid"></div>
      </div>
      
      <div className="hero-scan-line"></div>

      <div className="container">
        <motion.div 
          className="hero-content"
          {...contentVariant}
        >
          <HolographicText 
            as="h1"
            className="hero-title"
            gradient={true}
            shimmer={true}
          >
            <motion.span {...titleVariant}>
              {t.hero.title}
            </motion.span>
          </HolographicText>

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
            <TechButton size="lg" glow={true} scan={true}>
              {t.hero.buttons.primary}
            </TechButton>
            <TechButton variant="secondary" size="lg" glow={true}>
              {t.hero.buttons.secondary}
            </TechButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
