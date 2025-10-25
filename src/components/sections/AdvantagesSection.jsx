import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './AdvantagesSection.css';

export const AdvantagesSection = () => {
  const { t } = useLanguage();
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="advantages-section section" ref={ref}>
      <div className="container">
        <motion.h2
          className="advantages-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t.advantages.title}
        </motion.h2>

        <div className="advantages-grid ">
          {t.advantages.items.map((advantage, index) => (
            <motion.div
              key={index}
              className="advantage-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="advantage-icon">
                <img 
                  src={advantage.icon} 
                  alt={advantage.title}
                  loading="lazy"
                />
              </div>
              <h3 className="advantage-title">{advantage.title}</h3>
              <p className="advantage-description">{advantage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
