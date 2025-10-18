import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './StatsSection.css';

export const StatsSection = () => {
  const { t } = useLanguage();
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="about" className="stats-section section" ref={ref}>
      <div className="container">
        <motion.h2 
          className="stats-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t.stats.title}
        </motion.h2>

        <div className="stats-grid">
          {t.stats.items.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.p 
          className="stats-tagline"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t.stats.tagline}
        </motion.p>
      </div>
    </section>
  );
};
