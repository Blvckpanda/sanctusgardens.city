# Sanctus Gardens City (SGC)

## Engineering Build Plan

### Executive Architect Notes: Placeholders & Methodology Pushback

1. **Asset Placeholder Strategy (Acknowledged):** I understand we lack final assets. To ensure the codebase remains structurally sound, placeholders cannot be simple `<img>` tags if the final asset requires a complex pipeline.

* *Standard Images:* We will use high-quality, royalty-free architectural placeholders (e.g., Unsplash) served via Cloudinary.
* *Panoramas:* We cannot use a standard flat image placeholder. We must download a public-domain 360° equirectangular image and run it through `generate-panorama.py` so the `Pannellum` multiresolution tile architecture is built correctly from day one.
* *Masterplan Map:* We will use a generic `geojson` polygon over standard OpenStreetMap tiles until the Port Harcourt CAD files are geo-registered.

1. **Methodology Pushback:** The template provided advocates for building "Full page UI with mock data first." **I am actively pushing back on this for SGC.** SGC's primary technical risk is not UI; it is the integration of Sanity, Supabase, Leaflet, and Pannellum. We will adhere strictly to our established **Vertical Slice** approach: we wire the data and logic end-to-end first (unstyled), then apply the design system.

---

## Core Principle

**Vertical Slice First.** Build functionality end-to-end using unstyled HTML and real data connections. Prove the architecture (Sanity fetches → Next.js rendering → Supabase writes). Once the data flows securely, apply the SGC Design System and interactive UI polish.

---

## Phase 1 — Vertical Slice Foundation

### 01 Infrastructure Setup

Initialize the repository and core third-party services.

**Logic:**

* Next.js (App Router) + TypeScript + Tailwind v4 + shadcn/ui initialization.
* Create Supabase project; build `consultation_leads` table with Row Level Security (RLS).
* Create Sanity project; define `Zone`, `Opportunity`, `PanoramaScene`, and `InfrastructureItem` schemas.
* Implement Zod validation schemas for backend lead routes.

### 02 Data Seeding & Asset Pipeline

Prepare placeholder data that precisely matches the final data shape.

**Logic:**

* Seed "Business Town One" (Zone) and "Lapis Lazuli" (Opportunity) in Sanity using stock architectural imagery via Cloudinary.
* Run `generate-panorama.py` on a placeholder 360° image; output to `public/panoramas/placeholder-01/`.
* Export a simple square `.geojson` file to represent the BT-1 boundary.

### 03 Unstyled End-to-End Routing

Wire the core user journey using real data but zero CSS styling.

**UI:**

* Raw HTML outputs of `/zones/[slug]` and `/opportunities/[slug]`.
* Raw HTML form for Investment Pack capture.

**Logic:**

* `getZoneBySlug` and `getOpportunityBySlug` GROQ queries implemented.
* `POST /api/leads/investment-pack` endpoint created.
* Form submits data to Supabase and returns success state.

---

## Phase 2 — Design System & UI Primitives

### 04 Token & Typography Wiring

Implement the SGC visual identity across the global layout.

**UI:**

* Import `Cormorant Garamond` and `Inter` in `layout.tsx`.
* Configure `app/globals.css` with the `@theme` block defined in `ui-tokens.md`.
* Build shared `Navbar` and `Footer`.

**Logic:**

* Ensure all hardcoded pixels are replaced with `rem` and Tailwind `--spacing` tokens.

### 05 Component Library Extension

Build reusable UI components mapped to business entities.

**UI:**

* Primary/Secondary Buttons, Inputs, Cards (with `line-clamp`), Badges.
* `ZoneDrawer` (Right panel desktop, bottom sheet mobile).
* `InvestmentGateModal` (Focus-trapped dialog).
* `BeforeAfterSlider` (CSS clip-path implementation).

---

## Phase 3 — Core Marketing Pages

### 06 Homepage

Build the entry point for the investment discovery funnel.

**UI:**

* Cinematic Hero section with placeholder drone video/image.
* Stats count-up band (using Framer Motion `whileInView`).
* Infrastructure highlights and sustainability manifesto blocks.
* Masterplan and Opportunity preview cards.

**Logic:**

* Fetch featured Zone and Opportunities from Sanity to populate preview cards.

### 07 Corporate Pages

Build the narrative trust-building pages.

**UI:**

* `/about` (Heri Homes & SGC Vision) using `container-narrow` editorial layouts.
* `/contact` using the split-screen premium form layout.

**Logic:**

* Wire `/contact` form to `POST /api/leads/consultation`.

---

## Phase 4 — Spatial & Immersive Experiences

### 08 Interactive Masterplan

Build the 2D Leaflet exploration engine.

**UI:**

* Full viewport map at `/masterplan`.
* Custom SVG markers for landmarks.
* Active/Hover state styling for GeoJSON polygons based on `ui-tokens.md`.

**Logic:**

* Load `react-leaflet` as a Client Component.
* On polygon click: Update URL state `?zone=[slug]` and open `ZoneDrawer`.

### 09 Immersive Panorama Viewer

Build the 3D Pannellum integration.

**UI:**

* Branded loading state (prevent blank canvas).
* Mobile "Drag to Explore" hint.
* Custom SVG hotspots (Navigation and Info).

**Logic:**

* Initialize Pannellum via CDN script.
* Load multiresolution JSON config generated from Sanity data.
* Implement `use-scenechange-sync` hook to dispatch `pannellum:scenechange` events.

---

## Phase 5 — Conversion & Lead Engine

### 10 Opportunity Detail & Gate

Build the primary financial conversion node.

**UI:**

* Public teaser view: Asset class, plot size, `BeforeAfterSlider` (Slide 1).
* `InvestmentGateModal` triggered by "Unlock Financial Data" CTA.
* Gated view: Full interior gallery, unblurred financial table, "Speak With Investment Team" CTA.

**Logic:**

* `GET /api/opportunities/gated-assets` endpoint implemented.
* Validate Supabase session/lead status before returning high-res Cloudinary URLs and pricing data.

### 11 Lead Routing & Protection

Secure the funnel and notify stakeholders.

**Logic:**

* Integrate `Arcjet` bot protection on all lead `POST` routes.
* Integrate `Resend` to dispatch two emails upon Supabase insertion: User Confirmation and Heri Homes Sales Notification.

---

## Phase 6 — Analytics & Hardening

### 12 Telemetry

Instrument the platform to measure the business funnel.

**Logic:**

* Initialize `PostHog` provider.
* Fire strictly defined events (e.g., `opportunity_view`, `investment_pack_unlock`, `consultation_submit`).

### 13 SEO & Accessibility

Finalize production readiness.

**Logic:**

* Implement `generateMetadata` for dynamic Open Graph tags on Zone and Opportunity routes.
* Verify `Tab` navigation and `Escape` key hooks on all Modals and Drawers.
* Run Core Web Vitals audit (Target: LCP < 2.5s).

---

## Feature & Unit Count

| Phase | Focus Area | Features |
| --- | --- | --- |
| Phase 1 | Vertical Slice Foundation | 3 |
| Phase 2 | Design System & UI Primitives | 2 |
| Phase 3 | Core Marketing Pages | 2 |
| Phase 4 | Spatial & Immersive Experiences | 2 |
| Phase 5 | Conversion & Lead Engine | 2 |
| Phase 6 | Analytics & Hardening | 2 |
| **Total** | **End-to-End Build** | **13** |
