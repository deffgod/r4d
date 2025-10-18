import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './LanguageToggle.css';

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      className="language-toggle" 
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      {language === 'ru' ? 'EN' : 'RU'}
    </button>
  );
};
