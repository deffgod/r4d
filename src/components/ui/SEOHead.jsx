import { useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * SEOHead Component
 * Manages document head meta tags for SEO optimization
 * Updates title, description, Open Graph, and Twitter Card metadata
 * 
 * @param {string} title - Page title (optional, uses default if not provided)
 * @param {string} description - Page description (optional)
 * @param {string} path - Current page path for canonical URL
 * @param {string} image - OG image URL (optional)
 */
export const SEOHead = ({ 
  title = '',
  description = '',
  path = '',
  image = '/og-image.jpg'
}) => {
  const { language } = useLanguage();
  
  const baseUrl = 'https://r4dpartners.com'; // Replace with actual domain
  const canonicalUrl = `${baseUrl}${path}`;
  
  const defaultTitle = language === 'ru' 
    ? 'R4D Partners - Партнерская платформа для iGaming и Crypto'
    : 'R4D Partners - Partnership Platform for iGaming & Crypto';
    
  const defaultDescription = language === 'ru'
    ? 'R4D Partners - ведущая партнерская платформа для iGaming, Crypto и игровой индустрии. Высокие комиссии, прозрачная статистика, надежные выплаты.'
    : 'R4D Partners - leading partnership platform for iGaming, Crypto and gaming industry. High commissions, transparent statistics, reliable payments.';
  
  const pageTitle = title || defaultTitle;
  const pageDescription = description || defaultDescription;
  const fullTitle = title ? `${title} | R4D Partners` : defaultTitle;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;
    
    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };
    
    // Basic meta tags
    updateMetaTag('description', pageDescription);
    updateMetaTag('keywords', language === 'ru' 
      ? 'партнерская программа, iGaming, криптоказино, affiliate, CPA, RevShare'
      : 'affiliate program, iGaming, crypto casino, affiliate, CPA, RevShare'
    );
    updateMetaTag('author', 'R4D Partners');
    updateMetaTag('language', language);
    
    // Open Graph tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', pageDescription, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:image', `${baseUrl}${image}`, true);
    updateMetaTag('og:locale', language === 'ru' ? 'ru_RU' : 'en_US', true);
    updateMetaTag('og:site_name', 'R4D Partners', true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', pageDescription);
    updateMetaTag('twitter:image', `${baseUrl}${image}`);
    
    // Update or create canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
    
    // Update language alternate links
    let alternateLang = document.querySelector(`link[rel="alternate"][hreflang="${language === 'ru' ? 'en' : 'ru'}"]`);
    if (!alternateLang) {
      alternateLang = document.createElement('link');
      alternateLang.setAttribute('rel', 'alternate');
      alternateLang.setAttribute('hreflang', language === 'ru' ? 'en' : 'ru');
      document.head.appendChild(alternateLang);
    }
    const alternatePath = path || '/';
    alternateLang.setAttribute('href', `${baseUrl}${language === 'ru' ? '/en' : '/ru'}${alternatePath}`);
    
  }, [fullTitle, pageDescription, canonicalUrl, image, language, path]);

  return null; // This component doesn't render anything
};

/**
 * Add structured data (JSON-LD) for rich snippets
 * Should be added to index.html or as a separate component
 */
export const generateStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'R4D Partners',
    'description': 'Partnership Platform for iGaming & Crypto',
    'url': 'https://r4dpartners.com',
    'logo': 'https://r4dpartners.com/logo/r4d-logo.png',
    'sameAs': [
      // Add social media links
      'https://t.me/r4dpartners',
      'https://twitter.com/r4dpartners'
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'Customer Service',
      'availableLanguage': ['en', 'ru']
    }
  };
};

