# Sanctus Gardens City (SGC)

## Engineering Design System Contract

### Purpose

This document defines the interaction rules, component constraints, accessibility requirements, and layout logic for the Sanctus Gardens City Investment Discovery Platform.

**This document is authoritative.** It dictates *how* the UI behaves. For raw programmatic values (colors, typography sizing, spacing), refer strictly to `ui-tokens.md`. If a developer or AI coding agent introduces arbitrary constraints that conflict with this document, the implementation must be rejected.

---

### Part 1: Strategic Design Principles

These principles prevent the project from degrading into a generic real estate template.

* **DP-001: City Before Property:** The MVP focuses on Business Town One (BT-1). Always lead the user experience with macro-infrastructure (e.g., The Conservatory, Monorail systems, Sanctus Tower) and long-term vision before displaying specific residential or commercial acquisition opportunities.
* **DP-002: Editorial Over Commercial:** The visual language must mimic an institutional investor prospectus or a luxury editorial publication (e.g., Aman, NEOM). Banned patterns include: urgent sales banners, dense marketplace property grids, and SaaS-style dashboards.
* **DP-003: Simplicity Over Decoration:** Every visual element must serve a purpose. Remove excessive gradients, decorative clutter, and unnecessary animations.
* **DP-004: Deterministic Data Mapping:** Visual presentation must be driven by the Sanity CMS schema or Supabase database state. Do not hardcode a zone's presentation theme into the React components.

---

### Part 2: Layout & Grid Constraints

All layouts must prioritize mobile responsiveness. Desktop enhancements are secondary.

* **Grid Architecture:**
* Mobile (`< 640px`): 4 Columns
* Tablet (`640px - 1024px`): 8 Columns
* Desktop (`> 1024px`): 12 Columns

* **Container Widths:**
* `container-narrow` (max 48rem / 768px): Used exclusively for long-form editorial text to maintain optimal reading line length.
* `container-standard` (max 75rem / 1200px): Default boundary for standard page content.
* `container-wide` (max 90rem / 1440px): Reserved for expansive visual sections like the Before/After slider and Masterplan previews.

* **Z-Index Hierarchy:**
* Z-index values must strictly follow the `--z-index-*` scale defined in `ui-tokens.md`.
* *Rule:* The `z-index-modal` must always sit above `z-index-drawer`, which must always sit above `z-index-map-overlay`.

---

### Part 3: Component API Contracts

Components must be built to handle edge cases gracefully without breaking the layout.

#### 3.1 Buttons

* **Minimum Dimensions:** All buttons must have a minimum height of `48px` (3rem) to satisfy mobile touch target requirements.
* **Primary CTA ("Speak With Our Investment Team"):** Must utilize the primary brand background with the designated foreground text color and gold hover accent.
* **Secondary CTA ("Request Investment Information"):** Must utilize an outline style with a transparent background.

#### 3.2 Cards (Opportunity & Infrastructure)

* **Truncation:** Opportunity titles must be strictly clamped to a maximum of 2 lines (`line-clamp: 2`). Summary descriptions must be clamped to 3 lines.
* **Aspect Ratios:** All hero media within cards must enforce a strict `16:9` aspect ratio. The Next.js `<Image />` component must use `object-cover` to prevent distortion of Cloudinary assets.
* **Shadows:** Cards must utilize a flat, editorial aesthetic. Box shadows are strictly prohibited on default states and only permitted on `hover` or `focus-within` states.

#### 3.3 Interactive Masterplan (Leaflet)

* **Base Layer:** The underlying map tiles must remain unobtrusive to ensure the Zone polygons are the primary visual focus.
* **Polygon Opacity:** Active Zone polygons must use an opacity fill (e.g., 20% default, 60% selected) to ensure the underlying topography and water features (Bight of Bonny tributary) remain visible. Solid hex fills are banned.
* **Markers:** Do not use default Leaflet blue pins. Landmarks (like the 325m Sanctus Tower) must utilize custom, scalable SVG markers.

#### 3.4 Immersive Panoramas (Pannellum)

* **Loading State:** The application must never display a blank `<canvas>` element. A branded loading overlay with a deterministic progress indicator must be present while the multi-resolution Cloudinary tiles fetch.
* **Interaction Hint:** On the user's first visit to a panorama scene, a temporary "Drag to explore" overlay must appear and automatically dismiss upon the first interaction event.
* **Hotspots:** Must utilize custom SVG markers. Gold for navigation (scene transitions), primary color for information (data payloads).

#### 3.5 Before/After Slider

* **Constraint:** Images passed to the Before/After component MUST have matching aspect ratios and exact pixel dimensions enforced before reaching the frontend. The UI component is not responsible for cropping mismatched images.
* **Controls:** The slider handle must clearly display "Drawing" and "Render" text labels.

#### 3.6 Forms & Investment Gates

* **Validation:** All validation must execute inline and immediately upon the `onBlur` event. Never utilize intrusive modal alerts for form validation.
* **State Constraints:** Input fields must have explicitly defined visual states for `default`, `hover`, `focus`, `invalid` (Error), and `disabled`.
* **Color Reliance:** Never rely solely on color to communicate form validation. An invalid state must include both an error color border and explicit text warning.

---

### Part 4: Motion & Interaction System

Motion is permitted only to guide attention, reinforce hierarchy, or improve storytelling.

* **Centralized Animation:** All GSAP and Framer Motion animations must utilize the duration and easing tokens defined in `ui-tokens.md`. Hardcoded timing functions inside individual components are prohibited.
* **Allowed Motion:** Fade, reveal, parallax, scroll-triggered storytelling, and micro-interactions.
* **Banned Motion:** Infinite looping animations, erratic bouncing, and auto-playing video with sound are strictly forbidden.
* **Performance Clause:** If an animation causes the device to drop below 60fps or delays content access, it must be disabled or replaced with a simple CSS fade transition.

---

### Part 5: Accessibility (A11y) Standards

The platform must meet WCAG AA standards. This is a non-negotiable launch blocker.

* **Keyboard Navigation:** The entire platform, notably the Consultation Lead flow and Investment Gate, must be fully navigable using only the `Tab`, `Enter`, and `Space` keys.
* **Focus Management:** When the Investment Gate modal or a District Drawer opens, the browser focus must be programmatically trapped inside that element. When closed, focus must return to the element that triggered it.
* **Focus Rings:** `outline: none` is only permitted if an alternative, highly visible `box-shadow` or custom focus ring is explicitly defined in its place.
* **Screen Readers:** All icon-only buttons (like modal close buttons or slider arrows) must possess descriptive `aria-label` attributes. Semantic HTML (`<header>`, `<nav>`, `<main>`, `<article>`) is mandatory.
