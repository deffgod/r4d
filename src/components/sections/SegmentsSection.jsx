import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './SegmentsSection.css';

const segmentIcons = {
  'iGaming': '/coolshapes/CS_Star_5.png',
  'Crypto-iGaming': '/coolshapes/CS_Flower_8.png',
  'Игровые кейсы': '/coolshapes/CS_Wheel_4.png',
  'Game Studios': '/coolshapes/CS_Wheel_4.png',
  'Агрегаторы': '/coolshapes/CS_Polygon_7.png',
  'Aggregators': '/coolshapes/CS_Polygon_7.png',
  'Crypto': '/coolshapes/CS_Moon_6.png',
  'Dating': '/coolshapes/CS_Triangle_8.png'
};

export const SegmentsSection = () => {
  const { t } = useLanguage();
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="segments-section section" ref={ref}>
      <div className="container">
        <motion.h2
          className="segments-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t.segments.title}
        </motion.h2>

        <motion.div
          className="segments-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.segments.subtitle.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </motion.div>

        <div className="segments-grid">
          {t.segments.items.map((segment, index) => (
            <motion.div
              key={index}
              className="segment-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -10,
                transition: { 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 10 
                }
              }}
            >
              <div className="segment-icon-wrapper">
                <motion.img 
                  src={segmentIcons[segment] || '/coolshapes/CS_Misc_5.png'}
                  alt={segment}
                  className="segment-icon"
                  loading="lazy"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1,
                    transition: { duration: 0.5 }
                  }}
                />
              </div>
              <h3 className="segment-title">{segment}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
