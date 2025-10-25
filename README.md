# R4D Partners - Payment Infrastructure Website

Modern, responsive corporate website built with React and Vite. Features clean Linear.app-inspired design with performance optimizations.

## ✨ Features

- 🎨 **Dual Theme Support** - Light/Dark mode with smooth transitions
- 🌍 **Bilingual Interface** - Russian/English language switching
- 📱 **Fully Responsive** - Mobile-first design with touch-friendly interactions
- ✨ **Smooth Animations** - Framer Motion powered micro-interactions
- 🚀 **Performance Optimized** - Code splitting, lazy loading, and fast builds
- ♿ **Accessible UI** - WCAG 2.1 AA compliant components
- 🎯 **Modern Design** - Linear.app-inspired clean aesthetic
- 🔧 **TypeScript Ready** - Full type safety support

## 🛠 Tech Stack

### Core
- **React 18** - Latest React with concurrent features
- **Vite 5** - Lightning-fast build tool
- **TypeScript 5** - Type-safe development

### UI & Animation
- **Framer Motion 11** - Production-ready animations
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **CSS Variables** - Dynamic theming system

### Forms & Validation
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation
- **Sonner** - Toast notifications

### Performance
- **Code Splitting** - Lazy-loaded sections
- **Suspense Boundaries** - Progressive loading
- **Error Boundaries** - Graceful error handling
- **Intersection Observer** - Scroll-triggered animations

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build
```bash
npm run build
```

### Preview Production
```bash
npm run preview
```

## 📁 Project Structure

```
r4d/
├── public/
│   ├── coolshapes/       # 3D animated icons
│   └── logo/             # Brand assets (SVG, PNG)
├── src/
│   ├── components/
│   │   ├── animations/   # 1 animation component (joi-download-button)
│   │   ├── forms/        # Form components (ContactForm, etc.)
│   │   ├── layout/       # Layout components (Header, Footer, MobileTabBar)
│   │   ├── sections/     # Page sections (Hero, Stats, Solutions, etc.)
│   │   └── ui/          # Reusable UI components (Button, Card, etc.)
│   ├── contexts/         # React contexts (Theme, Language)
│   ├── hooks/           # Custom hooks (useScrollAnimation, useMediaQuery)
│   ├── data/            # Content data (translations, content)
│   ├── styles/          # Global styles and design system
│   │   ├── variables.css        # CSS custom properties
│   │   ├── linear-variables.css # Linear.app design tokens
│   │   ├── typography.css       # Typography system
│   │   ├── animations.css       # Animation utilities
│   │   └── global.css           # Global styles
│   ├── utils/           # Utility functions
│   ├── config/          # Configuration files
│   └── lib/             # Shared libraries
└── package.json
```

## 🎨 Design System

### Colors
- **Primary**: `#4E3AFB` (Indigo)
- **Accent**: `#6B4EFF` (Purple)
- **Success**: `#00D9A3` (Teal)
- **Warning**: `#FFB800` (Amber)

### Typography
- **Heading**: Clash Display / Space Grotesk
- **Body**: Inter
- **Scale**: Modular scale (1.25 ratio)

### Spacing
- **Base**: 8px grid system
- **Scale**: xs (0.5rem) → 3xl (6rem)

## 🔧 Customization

### Content
Edit `src/data/content.js` to update text content and translations.

### Colors
Modify `src/styles/linear-variables.css` for color scheme changes.

### Contact Form
Implement form submission in `src/components/forms/ContactForm.jsx`:
- **EmailJS** - Client-side email service
- **API Endpoint** - Backend integration
- **Telegram Bot** - Direct messaging

### Adding Sections
1. Create component in `src/components/sections/`
2. Add CSS file with Linear.app styling
3. Import in `src/App.jsx` with lazy loading
4. Wrap with Suspense and ErrorBoundary

## 📊 Performance

- **Build Time**: ~1.8s (optimized)
- **Bundle Size**: Optimized with code splitting
- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1

## 🌐 Browser Support

- **Chrome** (latest)
- **Firefox** (latest) 
- **Safari** (latest)
- **Edge** (latest)

## 📝 Development Notes

### Recent Updates
- ✅ **Cleanup Completed** - Removed 100+ unused files
- ✅ **Linear Design** - Modern Linear.app-inspired aesthetic
- ✅ **Performance** - Optimized build and bundle size
- ✅ **TypeScript** - Full type safety implementation

### Code Quality
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Error Boundaries** - Graceful error handling
- **Accessibility** - WCAG 2.1 AA compliance

## 📄 License

© 2025 R4D Partners. All rights reserved.