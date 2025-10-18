import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageToggle } from '../ui/LanguageToggle';
import { Button } from '../ui/Button';
import { BurgerMenu } from './BurgerMenu';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import './Header.css';

export const Header = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
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
    setMenuOpen(false);
  };

  // Выбираем логотип в зависимости от темы
  const logoSrc = theme === 'dark' ? '/logo/R4D-white.svg' : '/logo/R4D-indigo.svg';

  return (
    <>
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            <button 
              className="header-logo"
              onClick={() => handleNavClick('home')}
              aria-label="R4D Home"
            >
              <img src={logoSrc} alt="R4D" className="header-logo-image" />
            </button>

            {!isMobile && (
              <>
                <nav className="header-nav">
                  {t.header.nav.map((item) => (
                    <button
                      key={item.id}
                      className="header-nav-item"
                      onClick={() => handleNavClick(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>

                <div className="header-actions">
                  <ThemeToggle />
                  <LanguageToggle />
                  <Button size="sm">{t.header.loginBtn}</Button>
                </div>
              </>
            )}

            {isMobile && (
              <button 
                className="header-burger"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            )}
          </div>
        </div>
      </header>

      {isMobile && (
        <BurgerMenu 
          isOpen={menuOpen} 
          onClose={() => setMenuOpen(false)}
          onNavClick={handleNavClick}
        />
      )}
    </>
  );
};
