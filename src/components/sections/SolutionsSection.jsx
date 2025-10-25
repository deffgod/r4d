import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Card } from '../ui/Card';
import './SolutionsSection.css';
import { Sparkles, Zap, Shield, Rocket } from 'lucide-react';

const solutionIcons = {
  'Sparkles': Sparkles,
  'Zap': Zap,
  'Shield': Shield,
  'Rocket': Rocket
};
  
export const SolutionsSection = () => {
  const { t } = useLanguage();
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="solutions" className="solutions-section section" ref={ref}>
      <div className="container">
        <motion.h2
          className="solutions-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t.solutions.title}
        </motion.h2>

        <motion.p
          className="solutions-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.solutions.subtitle}
        </motion.p>

        <div className="solutions-grid">
          {t.solutions.items.map((solution, index) => (
            <motion.div
              key={`solution-${solution.title}`}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                icon={solution.icon}
                title={solution.title}
                description={solution.description}
                features={solution.features}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
