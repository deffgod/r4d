import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Ticker.css';

export const Ticker = () => {
  const { t } = useLanguage();
  const tickerText = t.ticker + ' ' + t.ticker;

  return (
    <div className="ticker">
      <div className="ticker-content">
        <span>{tickerText}</span>
        <span>{tickerText}</span>
      </div>
    </div>
  );
};
