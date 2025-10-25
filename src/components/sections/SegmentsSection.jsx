import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Users, TrendingUp, Zap } from 'lucide-react';
import './SegmentsSection.css';

const segmentIcons = {
  'iGaming': '/icons/frankenstein-front-color.png',
  'Crypto-iGaming': '/icons/zombie-front-color.png',
  'LootBoxes': '/icons/candy-dynamic-color.png',
  'Агрегаторы': '/icons/candy-dynamic-color.png',
  'Aggregators': '/icons/folder-dynamic-color.png',
  'Crypto': '/icons/rocket-dynamic-color.png',
  'Dating': '/icons/map-pin-dynamic-color.png'
};

// Icon mapping for subtitle items
const getSubtitleIcon = (index) => {
  const icons = [Users, TrendingUp, Zap];
  return icons[index] || Users;
};

// Subtitle Bullet Card Component
const SubtitleCard = ({ text, index, inView }) => {
  const Icon = getSubtitleIcon(index);
  
  const cardVariant = useMemo(() => ({
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.3 + (index * 0.1),
        ease: "easeOut"
      }
    }
  }), [index]);

  return (
    <motion.div
      className="segments-subtitle-card"
      variants={cardVariant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ 
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {/* Icon container with gradient */}
      <div className="segments-card-icon-wrapper">
        <Icon className="segments-card-icon" />
      </div>
      
      {/* Text content */}
      <p className="segments-card-text">{text}</p>
      
      {/* Decorative gradient line */}
      <div className="segments-card-gradient-line" />
    </motion.div>
  );
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

        {/* Subtitle Cards Grid */}
        <div className="segments-subtitle-cards">
          {t.segments.subtitle.map((line, index) => (
            <SubtitleCard 
              key={`segments-subtitle-${line.substring(0, 20)}`}
              text={line}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        <div className="segments-grid">
          {t.segments.items.map((segment, index) => (
            <motion.div
              key={`segment-${segment}`}
              className="segment-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: 0.6 + (index * 0.1),
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
              <h2 className="segment-title">{segment}</h2>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
