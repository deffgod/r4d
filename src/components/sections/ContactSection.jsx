import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ContactForm } from '../forms/ContactForm';
import './ContactSection.css';

export const ContactSection = () => {
  const { t } = useLanguage();
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="contact" className="contact-section section" ref={ref}>
      <div className="container">
        <motion.h2
          className="contact-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t.contact.title}
        </motion.h2>

        <motion.p
          className="contact-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.contact.subtitle}
        </motion.p>

        <motion.div
          className="contact-content"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="contact-info">
            <div className="contact-info-item">
              <h3>{t.contact.email.label}</h3>
              <a href={`mailto:${t.contact.email.value}`}>
                {t.contact.email.value}
              </a>
            </div>
            
            <div className="contact-info-item">
              <h3>{t.contact.telegram.label}</h3>
              <a href={t.contact.telegram.value} target="_blank" rel="noopener noreferrer">
                @r4dpartners
              </a>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
