# CypherzoneX VR Universe

Futuristic VR arcade landing built with Next.js. It opens with a cinematic intro (boot logs → rapid neural sync HUD → logo spotlight → jump flash) and routes into an interactive single‑page experience with pricing, games, gallery, restaurant teaser, news, and admin controls.

## Features
- **Intro sequence** (`components/IntroAnimation.tsx`): three phases, custom SFX hooks, GSAP timelines, HUD rings, logo spotlight, and flash transition that hands control back to the app.
- **Hero + navigation**: dynamic header, active tab navigation, keyboard focus states, skip link for accessibility.
- **Content sections**: Games, Experiences, Pricing, Gallery, Restaurant, Contact, News, Working Days, and Admin panel for local config.
- **Styling**: Tailwind 4 (via PostCSS), custom fonts (Orbitron, Press Start 2P, Rajdhani), neon/cyberpunk palette, grid/scanline backdrops.
- **Media assets**: stored under `public/` and `public/media/` (games, food, gallery, etc.).
- **Metadata system**: `metadata.json` drives site name/description, icons, OG/Twitter cards, keywords, theme color, locale, robots, and share image. Consumed in `app/layout.tsx`.
- **Sound FX**: hover/click sounds via `useSfx` hook.

## Tech Stack
- **Framework**: Next.js 16 (app router)
- **Language**: TypeScript / React 19
- **Animation**: GSAP 3
- **Styling**: Tailwind 4 + custom utilities

## Getting Started
```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # eslint
npm run build    # production build
npm start        # run built app
```

## Project Layout (high level)
- `app/` — Next app router pages and layout  
  - `layout.tsx` — global metadata, fonts, ClientLayout wrapper  
  - `home/page.tsx` — main SPA router handling tabs/sections  
  - `favicon.ico`, `icon.png`, `apple-icon.png` — tab/OS icons  
- `components/` — UI blocks (Hero, Header, Footer, IntroAnimation, galleries, pricing, contact, etc.)
- `lib/` — hooks/utilities (e.g., `useSfx`)
- `public/` — static assets and media (`logo-black.png`, `logo-trans.png`, `media/*`)
- `metadata.json` — central site metadata configuration

## Customization Guide
### Branding / Logos
- Replace `public/logo-black.png` (and `public/logo-trans.png` if used) with your logo.
- Favicons/tab icons: replace `app/icon.png`, `app/apple-icon.png`, or `app/favicon.ico`. Metadata in `app/layout.tsx` already points to `/icon.png` and `/apple-icon.png`.
- Header/Footer logos live in `components/Header.tsx` and `components/Footer.tsx` (search for `logo-black.png`).
- Intro spotlight logo lives in `components/IntroAnimation.tsx` Phase 2 (`src="/logo-black.png"`).

### Metadata / SEO
Edit `metadata.json`:
- `name`, `description`
- `siteUrl`, `image` (1200x630 recommended), `keywords`, `twitter.handle`, `twitter.card`
- `themeColor`, `robots`, `locale`
`app/layout.tsx` reads this file and maps to Next `metadata`, Open Graph, Twitter, icons.

### Intro Animation Timing
- Phase durations and animations are in `components/IntroAnimation.tsx` GSAP timeline. Key durations: HUD entry (`0.75s`), sync progress (`1.8s`), logo spotlight hold (`1.8s`), flash jump.

### Content
- Section text/pricing defaults live in `app/home/page.tsx` (`DEFAULT_DATA`). Admin panel writes overrides to `localStorage` (`cypherzone_config`).
- Media: swap images in `public/media/*` to update galleries and hero/restaurant imagery.

## Deployment Notes
- Ensure `metadata.json.siteUrl` matches your production domain for correct OG/Twitter URLs.
- Update icons to branded assets before launch.
- Run `npm run build` to verify; address any ESLint warnings if needed (e.g., custom font message).

## Accessibility
- Skip-to-content link, focus outlines on nav, aria labels on controls, and color-contrast aware neon palette. Keep these in place when customizing.

## Scripts
- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — serve built app
- `npm run lint` — lint codebase

## Troubleshooting
- **Tab icon not updating**: hard reload (Ctrl/Cmd+Shift+R) and clear cache; ensure `app/icon.png` exists and `metadata.icons` points to it.
- **Intro not dismissing**: `onComplete` callback must be passed from parent; check GSAP timeline in `IntroAnimation.tsx`.
- **Sounds not playing**: verify audio assets/config in `useSfx` and browser autoplay policies.
