# Dudhvardhini

A static React + JavaScript website for farmers, dairy owners, dealers and distributors. Marathi is the initial language; visitors can select Hindi or English. Their selection is saved on the device.

## Run

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

Deploy the generated `dist` directory to a static host. No backend or environment secrets are required. All product images and the Marathi brochure are served locally. Google Fonts requires an internet connection; system fonts are used as a fallback.

## Content

- `src/content.js`: all three language versions.
- `src/main.jsx`: sections and interactions.
- `src/premium.css`: active responsive visual design. The earlier stylesheets are retained as unused references.
- `public/assets`: supplied logo, packaging, brochure imagery and original PDF.

The hero uses an 18-second muted cattle video at 50% opacity. It loops inline,
includes a translated pause/resume control, respects reduced-motion preferences,
and falls back to its poster image if playback is unavailable. Footage credits
and the Pexels source/license are recorded in `public/assets/video-credits.txt`.

The farm and botanical sections now use new illustrative images with responsive
640/1280/1920/3840-pixel WebP versions. Their 4K exports are upscaled from the
generated originals; they are not represented as native 4K photographs.
The product photo and logo retain their original printed artwork and available
resolution. The video serves 720p on phones, 1080p on typical desktops and native
4K on viewports wider than 1920 pixels. Full imagery details and generation
briefs are in `public/assets/visual-assets-notes.md`.

## Before public launch

Phone and WhatsApp support are configured for **9063639070** (+91). The site includes localized call and WhatsApp links, a dedicated support section, a desktop contact shortcut and a mobile contact bar. WhatsApp links open a prefilled message; they do not send automatically. The ingredient gallery uses six individual transparent herb illustrations; files and generation briefs are documented in `public/assets/herb-visuals.md`.

Remaining launch information: email, address, official domain, manufacturer/legal business name, full composition, daily dosage, storage instructions and the current product label. The original downloadable brochure is preserved. Product claims are written conservatively; no guaranteed percentage gains or invented customer testimonials are included.

`scripts/prepare-assets.mjs` was used once to crop/optimise supplied local assets; runtime-specific source paths are not needed to build or run the website.
