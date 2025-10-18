import React, { useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageToggle } from '../ui/LanguageToggle';
import { Button } from '../ui/Button';
import './BurgerMenu.css';

export const BurgerMenu = ({ isOpen, onClose, onNavClick }) => {
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavClick = (id) => {
    onNavClick(id);
    onClose();
  };

  return (
    <div className={`burger-menu ${isOpen ? 'burger-menu-open' : ''}`}>
      <div className="burger-menu-content">
        <nav className="burger-menu-nav">
          {t.header.nav.map((item) => (
            <button
              key={item.id}
              className="burger-menu-item"
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="burger-menu-actions">
          <div className="burger-menu-toggles">
            <ThemeToggle />
            <LanguageToggle />
          </div>
          <Button className="burger-menu-button">{t.header.loginBtn}</Button>
        </div>
      </div>
    </div>
  );
};
