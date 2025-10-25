import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import './Footer.css';

export const Footer = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const logoSrc = theme === 'dark' ? '/logo/logo-r4d-1024x1024-frame.svg' : '/logo/logo-r4d-1024x1024-frame.svg';

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Логотип в футере */}
          <div className="footer-brand">
            <img src={logoSrc} alt="R4D" className="footer-logo" />
          </div>

          <div className="footer-slogan">
            {t.footer.slogan.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>

          <div className="footer-divider"></div>

          <div className="footer-info">
            <p className="footer-copyright">{t.footer.copyright}</p>
            <p className="footer-tagline">{t.footer.tagline}</p>
            <p className="footer-rights">{t.footer.rights}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
