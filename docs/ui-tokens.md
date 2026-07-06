# Sanctus Gardens City (SGC)

## UI Token Architecture v1.0

### Purpose

This document defines all implementation-level design tokens for the SGC platform. These tokens are the definitive source of truth for the Tailwind CSS v4 `@theme` directive, global stylesheets, and shadcn/ui component overrides.

All design tokens are managed centrally. Utilizing raw hexadecimal values or default Tailwind utility colors outside of this token system is strictly prohibited.

---

### Tailwind v4 `@theme` Configuration

The following variables must be defined within the `@theme` block in `app/globals.css`.

```css
@theme {
  /* Fonts */
  --font-display: "Cormorant Garamond", serif;
  --font-sans: "Inter", sans-serif;

  /* Page & Surface Backgrounds */
  --color-background: #f7f5f0;
  --color-surface: #ffffff;
  --color-surface-secondary: #f7f5f0;
  --color-surface-tertiary: #f2efe8;

  /* Borders */
  --color-border: #e8e2d8;
  --color-border-light: #efeae0;

  /* Typography Colors */
  --color-text-primary: #111111;
  --color-text-secondary: #6b7280;
  --color-text-muted: #9aa0a8;

  /* Primary Theme (Deep Green) */
  --color-primary: #0f3d2e;
  --color-primary-dark: #0a2a20;
  --color-primary-light: #e8f0ec;
  --color-primary-foreground: #ffffff;

  /* Accent Theme (Gold) */
  --color-gold: #c8a44d;
  --color-gold-light: #d8b86a;
  --color-gold-bg: #fdf8ee;
  --color-gold-foreground: #111111;

  /* Status & Feedback */
  --color-success: #2e7d32;
  --color-success-bg: #edf7ee;
  --color-warning: #b7791f;
  --color-warning-bg: #fdf3e0;
  --color-error: #a82828;
  --color-error-bg: #fdf2f2;

  /* Interactive Map States */
  --color-map-default: rgba(15, 61, 46, 0.2);
  --color-map-hover: var(--color-gold);
  --color-map-active: var(--color-primary);

  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-full: 9999px;

  /* Spacing Scale (8px Base) */
  --spacing-1: 0.25rem;  /* 4px */
  --spacing-2: 0.5rem;   /* 8px */
  --spacing-3: 1rem;     /* 16px */
  --spacing-4: 1.5rem;   /* 24px */
  --spacing-6: 2rem;     /* 32px */
  --spacing-8: 3rem;     /* 48px */
  --spacing-12: 4rem;    /* 64px */
  --spacing-16: 6rem;    /* 96px */
  --spacing-20: 8rem;    /* 128px */
}

```

---

### Typography Scale & Architecture

Both primary brand fonts must be imported via `next/font/google` in the root layout.

| Element | Font Family | Size | Weight | Line Height | Use Cases |
| --- | --- | --- | --- | --- | --- |
| **Display** | Cormorant Garamond | 72px | 300 | 1.05 | Homepage hero titles |
| **H1** | Cormorant Garamond | 56px | 300 | 1.10 | District page hero sections |
| **H2** | Cormorant Garamond | 40px | 400 | 1.15 | Major page section titles |
| **H3** | Cormorant Garamond | 32px | 400 | 1.20 | Subsection headers |
| **H4** | Cormorant Garamond | 24px | 600 | 1.25 | Structural card headings |
| **Body Large** | Inter | 18px | 300 | 1.70 | Narrative and editorial copy |
| **Body** | Inter | 16px | 400 | 1.65 | Default body text, forms, navigation |
| **Caption** | Inter | 14px | 400 | 1.50 | Metadata, secondary details |
| **Small** | Inter | 12px | 500 | 1.40 | Map labels, fine print |

---

### Component Token Specifications

#### Buttons

The system permits exactly three button variants:

1. **Primary**: `bg-primary`, `text-primary-foreground`, `rounded-sm` (8px). Heights: 48px (Default), 56px (Hero), 40px (Small). Typography: Inter, 500 weight.
2. **Secondary**: `bg-surface`, `text-primary`, `rounded-sm` (8px), with a `1px solid var(--color-primary)` outline.
3. **Text**: `transparent` background, `text-primary`. Underline decoration displays *only* on hover.

#### Cards

* **Background**: `bg-surface`
* **Border**: `1px solid var(--color-border)`
* **Radius**: `rounded-md` (16px)
* **Padding**: 24px (`spacing-4`)
* **Shadow**: None (`box-shadow: none`). Flat, editorial aesthetic.

#### Forms & Inputs

* **Background**: `bg-surface`
* **Border**: `1px solid var(--color-border)`
* **Radius**: `rounded-sm` (8px)
* **Height**: 56px
* **Text**: `text-text-primary` (Input) / `text-text-muted` (Placeholder)
* **Focus State**: `ring-1 ring-primary border-primary`
* **Validation**: Render inline text only. No intrusive modal alerts.

#### Masterplan Map Vectors & Markers

* **Default Polygon**: Inline style `fill: var(--color-map-default)`.
* **Hover Polygon**: Inline style `stroke: var(--color-map-hover)`.
* **Active Polygon**: Inline style `fill: var(--color-map-active)` + `stroke: var(--color-gold)`.
* **District Marker**: `bg-surface` wrapped in a gold border (`rounded-full`). Text uses Inter, 12px, 500 weight.

#### Immersive Elements

* **Drawers**: 400px fixed width on desktop, full-width bottom sheet on mobile. `bg-surface` with `rounded-lg` (24px) leading edge.
* **Before/After Slider**: 16px container radius. 48px circular handle (`bg-surface`, gold border, drag cursor). 2px `bg-gold` dividing line. Labels: Inter, 12px, uppercase, 1px letter-spacing.
* **Pannellum Hotspots**: Minimum 32px touch target. Navigation = SVG arrow (`fill: var(--color-gold)`). Info = SVG marker (`fill: var(--color-primary)`).

#### Opportunity Status Badges

* **Available**: `bg-success-bg`, `text-success`
* **Gated / Registration Required**: `bg-gold-bg`, `text-gold`
* **Sold Out**: `bg-surface-secondary`, `text-text-secondary`

---

### System Invariants

* **No Direct Hex Codes**: Hexadecimal values are banned in component classes.
* **No Raw Tailwind Colors**: Default Tailwind colors (e.g., `bg-green-800`) are strictly forbidden.
* **Exclusive Palette**: `--color-primary` is the only permitted green. `--color-gold` is the only permitted accent yellow/gold.
* **Default Borders**: All standard dividers must use `--color-border`. Utility gray borders are prohibited.
* **Provisional Design State**: All colors are provisional until validated against the final SGC brand guidelines.
