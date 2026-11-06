# Personal Portfolio

A personal portfolio website built with React, Vite, and Tailwind CSS.

## Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- Google Fonts: Cormorant Garamond and Playfair Display

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm

### Installation

```bash
git clone <repo-url>
cd personal_portfolio
npm install
```

### Development

```bash
npm run dev
```

Vite starts a dev server with hot reload, by default at http://localhost:5173.

### Production Build

```bash
npm run build     # outputs to dist/
npm run preview   # serves the production build locally
```

## Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Create an optimized production build |
| `npm run preview` | Preview the production build locally |

## Project Structure

```
personal_portfolio/
├── index.html       # HTML entry point, loads fonts and /src/main.jsx
├── package.json
└── src/
    └── main.jsx     # React entry point, mounts <App /> into #root
```

`src/main.jsx` imports `App.jsx` and `styles.css` from `src/`.

## Customization

- Update the page title and metadata in `index.html`.
- Edit the content and layout in `src/App.jsx`.
- Adjust global styles and Tailwind setup in `src/styles.css`.

## License

All rights reserved. Add a license here if you intend to open-source the project.
