# Adon S. Banker — Portfolio

A retro desktop-OS themed portfolio built with **React + Vite + Tailwind CSS**.
Graph-paper background, terminal-style windows, folder shortcuts, and an olive
task bar — with elegant, lightweight scroll/hover animations that respect
`prefers-reduced-motion` and stay smooth on any device.

## Run locally

```bash
cd portfolio
npm install
npm run dev      # http://localhost:5173
```

## Build for production

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

## Customize

All your details live at the top of [`src/App.jsx`](src/App.jsx):

- `ME` — name, role, quote, email, social links
- `TOOLS` — the skills/tools grid
- `PROJECTS` — the project cards

Swap the initials avatar in the **profile** window for a real photo by
replacing the `<div>` with the initials inside the `#profile` section with an
`<img>` (add the file to `public/` and use `alt` text).

## Deploy

The build is fully static. Drop the `dist/` folder on any host
(GitHub Pages, Netlify, Vercel, Cloudflare Pages). `vite.config.js` uses
`base: './'` so it works from any sub-path.

## Design notes

- **Type:** Archivo (display) + Space Grotesk (body) + VT323 (mono/terminal)
- **Palette:** paper `#ecead8`, olive `#7c7f4e`, cream `#f3f1e2`, accent `#e8862b`
- **Animations:** transform/opacity only, IntersectionObserver-driven reveals
- **A11y:** focus-visible rings, aria-labels on icon links, 44px+ touch targets
