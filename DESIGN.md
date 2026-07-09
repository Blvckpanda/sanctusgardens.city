---
name: Sanctus Gardens City
description: Africa's first revolutionary waterfront smart city — investment discovery platform
colors:
  brand-deep: "#07261B"
  brand: "#0F3D2E"
  brand-soft: "#D7E8DF"
  gold-accent: "#B8923A"
  gold-strong: "#9A7826"
  gold-light: "#DCC07A"
  cream-bg: "#FCF8F0"
  cream-alt: "#F9F3E8"
  cream-surface: "#FFFFFF"
  ink: "#1A1A14"
  charcoal: "#4A483F"
  muted: "#79766A"
typography:
  display:
    fontFamily: '"Fraunces", "Cormorant Garamond", Georgia, "Times New Roman", serif'
    fontSize: 'clamp(2.6rem, 6vw, 5.4rem)'
    fontWeight: 340
    lineHeight: 1.06
    letterSpacing: -0.012em
  headline:
    fontFamily: '"Fraunces", "Cormorant Garamond", Georgia, "Times New Roman", serif'
    fontSize: 'clamp(2rem, 3.6vw, 3.4rem)'
    fontWeight: 380
    lineHeight: 1.06
    letterSpacing: -0.012em
  title:
    fontFamily: '"Fraunces", "Cormorant Garamond", Georgia, "Times New Roman", serif'
    fontSize: 'clamp(1.4rem, 1.8vw, 2rem)'
    fontWeight: 380
    lineHeight: 1.06
    letterSpacing: -0.012em
  body:
    fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    fontSize: 'clamp(16px, 0.95vw + 13px, 18px)'
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    fontSize: 0.74rem
    fontWeight: 600
    letterSpacing: 0.24em
    textTransform: uppercase
rounded:
  pill: 999px
  xl: 38px
  lg: 26px
  md: 18px
  sm: 10px
spacing:
  gutter: 'clamp(20px, 5vw, 72px)'
  section-block: 'clamp(70px, 9vw, 140px)'
components:
  button-primary:
    backgroundColor: '{colors.brand}'
    textColor: '{colors.cream-bg}'
    rounded: '{rounded.pill}'
    padding: 0.95em 1.6em
  button-primary-hover:
    backgroundColor: '{colors.brand}'
    typography: '{typography.body}'
    rounded: '{rounded.pill}'
    padding: 0.95em 1.6em
  button-gold:
    backgroundColor: '{colors.gold-accent}'
    textColor: '#2a2208'
    rounded: '{rounded.pill}'
    padding: 0.95em 1.6em
  button-ghost:
    backgroundColor: transparent
    textColor: '{colors.ink}'
    rounded: '{rounded.pill}'
    padding: 0.95em 1.6em
  card:
    backgroundColor: '{colors.cream-bg}'
    rounded: '{rounded.lg}'
    padding: 1.6rem
---

# Design System: Sanctus Gardens City

## 1. Overview

**Creative North Star: "The New Eden"**

Sanctus Gardens City presents itself as Africa's first revolutionary waterfront smart city — a mega-development on the scale of NEOM, presented with the editorial refinement of a luxury architectural monograph. The visual system is *ambitious through restraint*: deep mangrove greens anchor the palette, warm gold accents punctuate key moments, and cream backgrounds keep the canvas light and airy. Nothing is cluttered. Nothing shouts. The scale of the project speaks for itself.

This system explicitly rejects the clichés of real estate marketing — no beige luxury, no stock families, no crowded brochure layouts, no heavy gradients. It also rejects the generic Nigerian development aesthetic of bright primaries and dense information grids. Every page reads like a room in a well-edited gallery: the masterplan is the lobby, each district is a wing, the opportunity pages are the boardroom.

**Key Characteristics:**
- Editorial over marketing — copy and layout carry equal weight with imagery
- Deep green + gold + cream palette rooted in the mangrove-waterfront geography
- Generous whitespace and open compositions — the page breathes
- Pill-shaped buttons as the only decorative shape language
- Soft, tonal layering for depth — shadows accent, they don't define hierarchy
- Reduced motion by default; reveals work as crossfades and gentle fade-ups
- Desktop-first due diligence experience, gracefully responsive

## 2. Colors: The Mangrove-Editorial Palette

The palette is anchored in the physical landscape of Port Harcourt's Bight of Bonny tributary — deep mangrove greens, warm golds from the equatorial light, and cream tones from sun-bleached earth.

### Primary

- **Deep Mangrove** (`#0F3D2E` / `#07261B`): The brand color. Used for hero backgrounds, primary buttons, the header, dark section blocks, and as the dominant color in the hero canvas particle system. Represents the physical territory — green, grounded, aquatic.
- **Gold Accent** (`#B8923A` / `#9A7826`): The editorial accent. Used sparingly — eyebrow markers, hover states, decorative section markers, the footer headline color, and the masterplan tooltip accent. It is the punctuation, not the sentence.

### Neutral

- **Cream Paper** (`#FCF8F0` / `#F9F3E8`): The primary background. A warm off-white with subtle golden undertone (chroma toward gold). Serves as body background and card background. The alternative (`#F2EADA`) is used for section alternation.
- **White Surface** (`#FFFFFF`): Used for cards, form backgrounds, and the poll widget — surfaces that need to read as elevated paper on the cream page.
- **Ink** (`#1A1A14`): Primary body text. Near-black with a greenish warm cast — not pure #000.
- **Charcoal** (`#4A483F`): Secondary text, lead paragraph weight (at 320 weight).
- **Muted** (`#79766A`): Soft metadata, footer details, decorative sub-text.
- **Hairline** (`rgba(26, 26, 20, 0.10)` / `rgba(26, 26, 20, 0.18)`): The only border token — used for sections and card edges. Never a solid color border.

### Named Rules

**The No-Brand-Color-Background Rule.** The deep green (`--brand`) is used on approximately 20% of screen surfaces — hero sections, the footer, one alternating section per page. Its rarity is the point. When it appears, it creates a room transition: the reader knows they've entered a new space.

**The Gold Punctuation Rule.** Gold is used on ≤5% of any given screen — the eyebrow line, a hover accent, the footer's section title. If gold appears in more than one role per viewport, the page is overcooked.

## 3. Typography

**Display Font:** Fraunces (with Cormorant Garamond, Georgia, Times New Roman fallback)
**Body Font:** Inter (with system-ui, Segoe UI, Arial fallback)

**Character:** A deliberate axis of contrast — Fraunces is an old-style serif with sharp ink traps and an architectural, almost sharp elegance; Inter is a neutral, highly legible sans. The pairing says "editorial monograph" not "tech startup." Fraunces carries the voice (headlines, wayfinding, big numbers); Inter does the work (body copy, labels, navigation, buttons).

### Hierarchy

- **Display** (Fraunces 340, `clamp(2.6rem, 6vw, 5.4rem)`, 1.06): Hero headlines only. One per page. Below threshold letter-spacing (`-0.02em`) gives a sculptural, carved quality.
- **Headline** (Fraunces 380, `clamp(2rem, 3.6vw, 3.4rem)`, 1.06): Section titles. The main structural heading of each content block.
- **Title** (Fraunces 380, `clamp(1.4rem, 1.8vw, 2rem)`, 1.06): Card titles, drawer titles, sub-section headings.
- **Body** (Inter 400, `clamp(16px, 0.95vw + 13px, 18px)`, 1.6): All prose. Capped at 70ch max-width for readability.
- **Lead** (Inter 320, `clamp(1.15rem, 1.6vw, 1.5rem)`, 1.5): Intro paragraphs below headlines. Uses a lighter weight (320) to contrast with the Fraunces headline above it.
- **Label/Eyebrow** (Inter 600, `0.74rem`, 0.24em letter-spacing, uppercase): Used exclusively for the `.eyebrow` component — the gold-accented section kicker with a line decorator. Never used without the line.

### Named Rules

**The One-Heading Rule.** Every page has exactly one h1 (the hero). All subsequent headings are h2 or h3. There is no sub-heading hierarchy deeper than h3 on any page.

## 4. Elevation

The system uses **tonal layering with subtle shadows** — surfaces are primarily separated by background color shifts (cream paper → white surface → dark green field), with shadows serving as secondary depth cues. The physical metaphor is *paper on a desk*, not *floating cards*.

### Shadow Vocabulary

- **Card Shadow** (`0 1px 2px rgba(20,30,24,.04), 0 12px 34px rgba(20,30,24,.07)`): The default for cards, form panels, and the poll widget. A subtle lift that separates the surface from the page without shouting.
- **Drawer Shadow** (`-24px 0 60px rgba(7,38,27,0.22)`): The side drawer casts a wide, soft shadow on the page — conveys that the drawer is a distinct layer, not a card.
- **Modal Shadow** (`0 8px 20px rgba(20,30,24,0.08), 0 36px 70px rgba(20,30,24,0.14)`): The strongest shadow in the system. Only the modal overlay uses this.
- **Hover Lift** (cards: `translateY(-5px)` + `shadow-lg`, buttons: `translateY(-2px)` + custom green/gold box-shadow): Hover is the only state that adds shadow. At rest, surfaces are flat.

### Named Rules

**The Flat-by-Default Rule.** Surfaces are flat at rest. Shadows appear only as a response to interaction (hover) or structural hierarchy (drawer, modal). No decorative shadows on static elements.

## 5. Components

### Buttons

- **Shape:** Pill-shaped (999px radius). This is the only decorative radius in the system — buttons are deliberately distinct from the straight/slightly-rounded corners of cards and containers.
- **Primary (Deep Green):** Background `var(--green-700)`, text `var(--cream-000)`, 1px border matching background. Padding `0.95em 1.6em`. Hover lifts the button 2px with a green-tinted glow shadow. The arrow inside animates 4px rightward on hover.
- **Gold:** Background `var(--gold-500)`, text `#2a2208`. Used for the primary conversion action (consultation CTA). Hover adds a gold glow shadow.
- **Ghost:** Transparent background, `1px solid` border at hairline-strong opacity, ink text. Hover swaps border and text to green-700. Used for secondary actions and "on-dark" scenarios.
- **On-Dark:** Transparent with `35% white` border, white text. Hover adds a subtle white background tint and strengthens border to 60% opacity. Only used on hero and dark section overlays.
- **Sizes:** Default, `--lg` (larger padding, `1rem` font), `--sm` (compact padding, `0.82rem` font). Block variant (`--block`) for full-width mobile CTAs.

### Cards

- **Corner Style:** Rounded-lg (26px). Deliberately less rounded than buttons to distinguish containers from actions.
- **Background:** `var(--cream-000)` — matches the page background, so cards feel like delineated areas on the same paper rather than floating foreign objects.
- **Shadow Strategy:** Subtle card shadow at rest (`var(--shadow-card)`), `translateY(-5px)` + `var(--shadow-lg)` on hover. The lift is the interactive signal.
- **Border:** None — the shadow alone defines the edge. Cards inside dark backgrounds use tonal background shifts instead of borders.
- **Internal Padding:** `1.6rem` (scales with viewport).

### Navigation (Header)

- **Style:** Fixed top bar, 78px height (`--nav-h`). Transparent at the top of the page, transitioning to a `88% opacity cream` backdrop-blur surface on scroll (`0.5s ease` transition).
- **Desktop Nav:** Inline links with pill-shaped hover backgrounds (`rgba(15,61,46,0.06)`). Current page gets a gold underline via `::after`.
- **Mobile Nav:** Full-screen overlay from `green-900` background, slides down with `transform: translateY()` transition. Fraunces at 1.7rem for links, Inter uppercase gold labels for groups. A hamburger toggle animates into a cross.

### Drawer

- **Style:** Fixed right-side panel, `min(520px, 92vw)` wide, cream background. Slides in from right with 0.55s ease transition. Deep green scrim (`rgba(7,38,27,0.45)`) with blur backdrop sits behind at z-index 210.
- **Content:** Eyebrow → title → description → chips → opportunity list → "Explore" CTA.
- **When:** Opened by clicking a district on the masterplan map.

### Inputs / Fields

- **Style:** White background (`var(--surface)`), `1px solid` hairline border, rounded-xl (38px). Uniform padding.
- **Focus:** `2px solid gold-500` outline, 3px offset (via `:focus-visible` global rule).
- **Error / Disabled:** Standard browser defaults — the system hasn't yet customized error states.

### Chips

- **Style:** Background `var(--cream-200)`, text `var(--charcoal-500)`, rounded-pill (999px). Used inside the drawer for district tag labels.
- **State:** Presentational only (no selected/unselected variants).

### Modal

- **Style:** Centered panel (`min(560px, 100%)`, max-height `90dvh`), cream background, rounded-xl (38px), strongest shadow. Backdrop is a deep green scrim with blur.
- **When:** Gated content unlock (investment details).

## 6. Do's and Don'ts

### Do:
- **Do** use the cream paper background (`#FCF8F0`) as the default canvas. The page should feel like an open magazine spread.
- **Do** use Fraunces for all headings h1–h4. It is the voice of the brand.
- **Do** keep body text at `/70ch` max width. Long lines break editorial rhythm.
- **Do** use the gold eyebrow (Inter 600, `0.74rem`, `0.24em` tracking, uppercase) with the gold line decorator for section wayfinding.
- **Do** space generously — sections get `clamp(70px, 9vw, 140px)` vertical padding. The page should breathe.
- **Do** animate reveals as fade-ups with `0.8s` duration and `var(--ease)` curve. Multiple reveals on the same section stagger by `0.12s`.
- **Do** use pill-shaped buttons for all action items. They are the only decorative-radius element in the system.

### Don't:
- **Don't** use beige, marble textures, Champagne gold, or any "luxury real estate" signifiers. The palette is mangrove green + warm cream + editorial gold. No taupe, no ivory, no champagne.
- **Don't** use stock photography of families, generic skyscrapers, or happy professionals. Imagery should be cinematic, architectural, or atmospheric — renders of the city, aerial perspectives, water and sky.
- **Don't** crowd the layout. No dense information grids, no compact card arrays, no market-data tables. If a section looks like a dashboard or a property listing portal, it's wrong.
- **Don't** use heavy gradients, loud primary colors, or any gradient-text (`background-clip: text`). The palette is solid colors treated with opacity.
- **Don't** use solid-color borders. The only border token is the hairline (`rgba(26,26,20,0.10)`).
- **Don't** use glassmorphism or decorative backdrop-blur. The only blur is on the scrim overlay and the scrolled header background.
- **Don't** use more than one h1 per page. The hero owns that.
- **Don't** apply the `btn--gold` variant more than once per viewport. Gold is punctuation, not a pattern.
- **Don't** animate layout properties (width, height, top, padding). Animate only transform and opacity.
- **Don't** add numbered section markers (`01`, `02`, `03`) — the gold eyebrow + headline is the wayfinding system.
