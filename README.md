# OXmemo

React + Vite clone of storiz.ma, rebranded as **OXmemo**, restyled with a navy/gold palette.

## Color palette note

The palette (`src/theme/colors.js` and `tailwind.config.js`) is a professional-judgment
approximation of **offresexclusives.org**'s navy + gold job-board look. That site is
Blogger-hosted, so its compiled CSS/theme color isn't reachable through automated tools —
these hex values weren't extracted from the live site, they were inferred from how the
site visually reads. If you pull exact hex codes from the site's browser devtools
(Inspect → computed styles on the header/buttons), update `src/theme/colors.js` — every
component reads from that single file, so the whole app re-themes from one place.

## Getting started

```bash
npm install
npm run dev       # start local dev server (Vite)
npm run build      # production build to /dist
npm run preview    # preview the production build locally
```

## Project structure

```
oxmemo-app/
├── index.html                 # Vite entry HTML, loads Google Fonts (Sora + Inter)
├── package.json
├── vite.config.js
├── tailwind.config.js         # palette + font tokens live here too
├── postcss.config.js
└── src/
    ├── main.jsx                # React root
    ├── App.jsx                 # composes all sections, owns shared "selectedPack" state
    ├── index.css                # Tailwind directives + base styles
    ├── theme/
    │   └── colors.js            # single source of truth for the palette
    ├── data/
    │   └── content.js           # packs, videos, steps, testimonials, FAQ copy
    └── components/
        ├── ui/
        │   ├── Button.jsx
        │   ├── Eyebrow.jsx
        │   └── LogoMark.jsx
        ├── Header.jsx
        ├── Hero.jsx
        ├── VideoShowcase.jsx
        ├── Packs.jsx
        ├── OrderForm.jsx
        ├── Steps.jsx
        ├── FormatSection.jsx
        ├── Testimonials.jsx
        ├── FAQ.jsx
        ├── CTABanner.jsx
        ├── Footer.jsx
        └── WhatsAppFloat.jsx
```

## Notes

- Pack selection state (`selectedPack`) is lifted to `App.jsx` and passed down to both
  `Packs` (pricing cards) and `OrderForm` (order total + toggle), so picking a pack from
  either place stays in sync.
- All copy/content lives in `src/data/content.js` — edit prices, features, testimonials,
  or FAQ answers there without touching component code.
- Video and product image URLs currently point at the original Storiz CDN for placeholder
  purposes — swap these for your own hosted assets before shipping to production.
