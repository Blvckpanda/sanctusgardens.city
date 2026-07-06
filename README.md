# Sanctus Gardens City — Investment Discovery Website

**Developer:** Heri Homes and Properties Limited  
**Project:** Sanctus Gardens City (SGC) — Phase 1 Marketing & Investment Discovery  
**Location:** Ogbogoro, Port Harcourt, Rivers State, Nigeria  
**Brand Tone:** Premium · Visionary · Minimal · Sophisticated · Future-forward · Investment-led · Credible

---

## Sitemap

```
sanctus-gardens.city/
├── index.html              Homepage (hero, vision, stats, districts, infra, 
│                            sustainability, masterplan preview, opportunities, CTA)
├── masterplan.html          Interactive SVG masterplan (zoom/pan/hover/click/drawers)
├── district.html             District Detail Page (dynamic via ?id= parameter)
│     ?id=residential        Waterfront Living
│     ?id=commercial          Business & Retail
│     ?id=leisure             Marina & Culture
│     ?id=innovation          Research & Tech
│     ?id=landmark            Sanctus Tower
├── opportunity.html          Investment Opportunities (with gated info modal)
├── infrastructure.html       City Infrastructure (7 systems + landmarks)
├── about-city.html           About Sanctus Gardens City (vision, phases, strategy)
├── about-heri.html           About Heri Homes (company, mission, leadership)
├── contact.html              Speak With Our Investment Team (form + categories)
├── thank-you.html            Post-submission confirmation
├── sustainability.html       Sustainability framework & KPIs
├── faq.html                  Frequently Asked Questions (accordion)
├── partnerships.html         Strategic partnership opportunities
│
└── assets/
    ├── css/
    │   └── style.css         Design system + all component styles (1 file)
    └── js/
        └── main.js           Core JS (canvas particles, scroll reveal, masterplan, 
                               panorama, modal, drawer, accordion, forms)
```

**12 pages total** — 9 core (including thank-you) + 3 supporting (sustainability, FAQ, partnerships).

---

## Design System — Style Guide

### Typography

| Role | Typeface | Weight(s) | Use |
|------|----------|-----------|-----|
| **Headlines (display)** | Fraunces | 300–600, italic variant | Hero titles, section headings, large editorial statements |
| **UI / Body / Labels** | Inter | 300–700 | Paragraphs, navigation, buttons, cards, meta |

### Color Palette

```
── Deep Green (primary brand)
    green-900:  #07261B
    green-700:  #0F3D2E  ← brand primary
    green-500:  #1F6A4F
    green-100:  #D7E8DF

── Gold (accent)
    gold-700:   #7C5E20
    gold-500:   #B8923A  ← accent primary
    gold-400:   #C9A24B
    gold-300:   #DCC07A
    gold-100:   #F2E6C4

── Warm Cream (background)
    cream-000:  #FCF8F0  ← page bg
    cream-100:  #F9F3E8  ← alt bg
    cream-200:  #F2EADA  ← soft bg
    cream-300:  #EAE0CC  ← border/stripe

── Charcoal / Ink (text)
    ink:        #1A1A14   ← body text
    charcoal-700: #2C2A24
    charcoal-500: #4A483F
    muted:      #79766A
```

### Spacing & Layout

- **Grid:** `12-column flexible` → collapses to 1 col below 860px
- **Max width container:** 1280px (narrow: 920px, wide: 1480px)
- **Gutter:** `clamp(20px, 5vw, 72px)`
- **Section padding:** `clamp(70px, 9vw, 140px)`

### Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--r-sm` | 10px | Chips, small elements |
| `--r` | 18px | Cards, inputs |
| `--r-lg` | 26px | Large cards, modals, containers |
| `--r-xl` | 38px | Hero images, masterplan |
| `--r-pill` | 999px | Buttons, badges |

### Component Tokens

| Component | Style |
|-----------|-------|
| **Buttons** | Pill shape (999px), gold/green/ghost/dark variants, arrow icon animation on hover |
| **Cards** | White surface, 1px line border, 18px radius, subtle shadow, lift on hover |
| **Modals** | Fullscreen overlay + cream panel, backdrop blur, gated form state |
| **Drawers** | Right-side panel (520px), scrim behind, slide-in animation |
| **Masterplan** | Dark SVG stage with zoom/pan/hover/click, tooltip, legend, HUD controls |
| **Forms** | 12px radius inputs, gold focus ring, stacked or 2-col grid |
| **Pillar icons** | Icon + title + description, used in infrastructure, sustainability, partners |

---

## Architecture Decisions

### Progressive Enhancement (Critical)

The site uses a progressive enhancement pattern for scroll-reveal animations:

```css
.reveal {
  transition: opacity 0.8s var(--ease), transform 0.8s var(--ease);
}
.js-enabled .reveal {
  opacity: 0;
  transform: translateY(28px);
}
.js-enabled .reveal.in {
  opacity: 1;
  transform: translateY(0);
}
```

- **Content is ALWAYS visible by default** — `opacity: 0` only activates after JavaScript confirms the page is running normally
- If JS fails, is blocked, or loads slowly, all content displays immediately without animation
- `document.documentElement.classList.add('js-enabled')` is the very first JS execution
- Reduced motion media query overrides all transitions

### Canvas Particle Engine

The homepage hero uses an HTML5 Canvas particle system (80 floating particles with connection lines) for a NEOM-style atmospheric background effect. Pure JS, zero dependencies.

### Why no build step?

This is a **static HTML + CSS + JS** site. Zero build tools, no Node.js, no bundler — open any file in a browser and it works. Keeps it portable for the Heri Homes team to hand off, host anywhere (Netlify, Vercel, S3, cPanel), and iterate without a development environment.

### Why SVG masterplan instead of WebGL or GIS?

The brief explicitly states "Avoid advanced GIS functionality." An SVG-based interactive map gives zoom/pan/hover/click/drawer/popup with zero dependencies, works on all browsers, and is trivially editable by anyone who can read SVG tags. Three.js or Leaflet would be overkill for 5 districts + labels + roads.

### Why single-page district template?

`district.html?id=residential` serves all 5 districts by changing content via URL parameter. Same architecture scales to any number of districts — just add data in the JS. Avoids 5 almost-identical HTML files.

### 360 Panorama

The panorama component uses a wide SVG scene + drag-to-pan with progress bar. When actual equirectangular photography is available, replace `.panorama__scene` inner SVG with a panoramic photo strip.

### Forms — no backend

Forms are front-end only. They validate, show a loading state, and redirect to `thank-you.html`. To wire to a real backend:

1. Replace `action` attribute on the form element
2. Or intercept `submit` in `main.js` and POST to your CRM/email endpoint via `fetch()`
3. Remove the mock `setTimeout` and use real server response

---

## How to Run

**Option A — Serve locally (recommended):**

```bash
# Python
python -m http.server 8000 --directory C:/Users/pc/SGC

# Node (if available)
npx serve C:/Users/pc/SGC

# Or use VS Code "Live Server" extension
```

Then open `http://localhost:8000` in a browser.

**Option B — Open directly:**
Double-click any `.html` file. Note: `fetch()`-based includes won't work from `file://` protocol — but all pages include a static header, so it works fine from disk.

---

## What to Wire Up for Production

- [ ] **Form submission**: Connect `consult-form` and `unlock-form` to Heri Homes CRM or email-to-SMTP service (e.g., Formspree, Netlify Forms, AWS SES)
- [ ] **Images/video**: Replace SVG placeholder hero scenes with actual photography (aerial drone footage, district renders, lifestyle shots)
- [ ] **Investment data**: Update pricing, phase status, and unit information in the unlocked modal content and opportunity `opp-bar` cells
- [ ] **Design polish**: Audit all SVG hero art for brand-appropriate imagery once assets are available
- [ ] **Analytics**: Add Google Tag Manager, Facebook Pixel, or LinkedIn Insight Tag for conversion tracking
- [ ] **Domain**: Set up `sanctusgardens.city` DNS with hosting provider
- [ ] **Thank-you email trigger**: Connect contact form to an auto-responder confirming receipt
#   s a n c t u s g a r d e n s . c i t y  
 #   s a n c t u s g a r d e n s . c i t y  
 #   s a n c t u s g a r d e n s . c i t y  
 # sanctusgardens.city
