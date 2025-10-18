import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './MobileTabBar.css';

export const MobileTabBar = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const getIcon = (id) => {
    const icons = {
      home: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" 
                stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      ),
      about: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      solutions: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      ),
      contacts: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" 
                stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      )
    };
    return icons[id];
  };

  return (
    <div className="mobile-tabbar">
      {t.header.nav.map((item) => (
        <button
          key={item.id}
          className={`mobile-tabbar-item ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => handleTabClick(item.id)}
        >
          {getIcon(item.id)}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};
