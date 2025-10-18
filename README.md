# R4D Partners - Payment Infrastructure Website

Modern, responsive corporate website built with React and Vite.

## Features

- 🎨 Dual theme support (Light/Dark)
- 🌍 Bilingual (Russian/English)
- 📱 Fully responsive design
- ✨ Smooth animations with Framer Motion
- 🚀 Fast performance with Vite
- ♿ Accessible UI components

## Tech Stack

- React 18
- Vite 5
- Framer Motion
- CSS3 with CSS Variables
- React Intersection Observer

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
r4d/
├── public/
│   ├── coolshapes/       # 3D icons
│   └── logo/             # Logo files
├── src/
│   ├── components/       # React components
│   ├── contexts/         # React contexts (Theme, Language)
│   ├── hooks/            # Custom hooks
│   ├── data/             # Content data
│   ├── styles/           # Global styles
│   └── utils/            # Utility functions
└── package.json
```

## Customization

### Colors

Edit `src/styles/variables.css` to change the color scheme.

### Content

Edit `src/data/content.js` to update text content.

### Contact Form

Implement form submission in `src/components/forms/ContactForm.jsx`:
- Option 1: Email service (EmailJS)
- Option 2: API endpoint
- Option 3: Telegram bot

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 R4D Partners. All rights reserved.
