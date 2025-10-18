import React, { Suspense, lazy } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileTabBar } from './components/layout/MobileTabBar';
import { Ticker } from './components/ui/Ticker';
import { HeroSection } from './components/sections/HeroSection';
import { useMediaQuery } from './hooks/useMediaQuery';
import './App.css';

// Lazy load sections for better performance (code splitting)
const StatsSection = lazy(() => import('./components/sections/StatsSection').then(m => ({ default: m.StatsSection })));
const SegmentsSection = lazy(() => import('./components/sections/SegmentsSection').then(m => ({ default: m.SegmentsSection })));
const SolutionsSection = lazy(() => import('./components/sections/SolutionsSection').then(m => ({ default: m.SolutionsSection })));
const AdvantagesSection = lazy(() => import('./components/sections/AdvantagesSection').then(m => ({ default: m.AdvantagesSection })));
const CTASection = lazy(() => import('./components/sections/CTASection').then(m => ({ default: m.CTASection })));
const ContactSection = lazy(() => import('./components/sections/ContactSection').then(m => ({ default: m.ContactSection })));

/**
 * Loading fallback component for Suspense boundaries
 */
const SectionSkeleton = () => (
  <div className="section-skeleton" style={{ 
    minHeight: '400px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    opacity: 0.5 
  }}>
    <div className="pulse" style={{ 
      width: '80%', 
      height: '300px', 
      background: 'var(--surface)', 
      borderRadius: 'var(--radius-lg)' 
    }} />
  </div>
);

/**
 * Main App Component
 * Implements performance optimizations:
 * - Code splitting with React.lazy()
 * - Suspense boundaries for progressive loading
 * - Error boundaries for graceful error handling
 * - Responsive design with useMediaQuery hook
 */
export const App = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <ErrorBoundary fallbackMessage="Unable to load the application. Please refresh the page.">
      <ThemeProvider>
        <LanguageProvider>
          <div className="app">
            <ErrorBoundary fallbackMessage="Navigation error occurred.">
              <Header />
            </ErrorBoundary>
            
            <main className="main-content">
              {/* Hero loads immediately - critical for FCP/LCP */}
              <ErrorBoundary fallbackMessage="Hero section unavailable.">
                <HeroSection />
              </ErrorBoundary>

              {/* Below-fold sections load lazily */}
              <Suspense fallback={<SectionSkeleton />}>
                <ErrorBoundary>
                  <StatsSection />
                </ErrorBoundary>
              </Suspense>

              <Suspense fallback={<SectionSkeleton />}>
                <ErrorBoundary>
                  <SegmentsSection />
                </ErrorBoundary>
              </Suspense>

              <Suspense fallback={<SectionSkeleton />}>
                <ErrorBoundary>
                  <SolutionsSection />
                </ErrorBoundary>
              </Suspense>

              <Suspense fallback={<SectionSkeleton />}>
                <ErrorBoundary>
                  <AdvantagesSection />
                </ErrorBoundary>
              </Suspense>

              <Suspense fallback={<SectionSkeleton />}>
                <ErrorBoundary>
                  <CTASection />
                </ErrorBoundary>
              </Suspense>

              <Suspense fallback={<SectionSkeleton />}>
                <ErrorBoundary>
                  <ContactSection />
                </ErrorBoundary>
              </Suspense>
            </main>

            <ErrorBoundary>
              <Ticker />
            </ErrorBoundary>

            <ErrorBoundary fallbackMessage="Footer unavailable.">
              <Footer />
            </ErrorBoundary>
            
            {isMobile && (
              <ErrorBoundary>
                <MobileTabBar />
              </ErrorBoundary>
            )}
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
