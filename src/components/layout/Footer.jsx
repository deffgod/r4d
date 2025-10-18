import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Footer.css';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
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
