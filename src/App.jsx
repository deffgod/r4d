import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileTabBar } from './components/layout/MobileTabBar';
import { Ticker } from './components/ui/Ticker';
import { HeroSection } from './components/sections/HeroSection';
import { StatsSection } from './components/sections/StatsSection';
import { SegmentsSection } from './components/sections/SegmentsSection';
import { SolutionsSection } from './components/sections/SolutionsSection';
import { AdvantagesSection } from './components/sections/AdvantagesSection';
import { CTASection } from './components/sections/CTASection';
import { ContactSection } from './components/sections/ContactSection';
import { useMediaQuery } from './hooks/useMediaQuery';
import './App.css';

function App() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app">
          <Header />
          
          <main className="main-content">
            <HeroSection />
            <StatsSection />
            <SegmentsSection />
            <SolutionsSection />
            <AdvantagesSection />
            <CTASection />
            <ContactSection />
          </main>

          <Ticker />
          <Footer />
          
          {isMobile && <MobileTabBar />}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
