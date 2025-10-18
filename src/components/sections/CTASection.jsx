import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Button } from '../ui/Button';
import './CTASection.css';

export const CTASection = () => {
  const { t } = useLanguage();
  const { ref, inView } = useScrollAnimation();

  const handleCTAClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="cta-section section" ref={ref}>
      <div className="container">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="cta-background-shape"></div>
          
          <h2 className="cta-title">{t.cta.title}</h2>
          <p className="cta-subtitle">{t.cta.description}</p>
          
          <div className="cta-buttons">
            <Button variant="primary" size="lg" onClick={handleCTAClick}>
              {t.cta.button}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
