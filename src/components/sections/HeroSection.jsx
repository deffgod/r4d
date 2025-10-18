import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';
import { LiquidCrystalBackground } from '../ui/LiquidCrystalBackground';
import './HeroSection.css';

export const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="hero-section">
      <div className="hero-bg">
        <LiquidCrystalBackground
          speed={0.4}
          radii={[0.25, 0.18, 0.3]}
          smoothK={[0.25, 0.3]}
          className="hero-liquid-bg"
        />
      </div>

      <div className="container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.hero.title}
          </motion.h1>

          <motion.div 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t.hero.subtitle.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </motion.div>

          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg">{t.hero.buttons.primary}</Button>
            <Button variant="secondary" size="lg">{t.hero.buttons.secondary}</Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
