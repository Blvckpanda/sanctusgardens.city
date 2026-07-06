# Sanctus Gardens City (SGC)

## Engineering Launch Checklist & CI/CD Blockers (Phase 1 MVP)

### Purpose

This document establishes the deterministic engineering milestones and hard failure conditions that must be resolved before the SGC Investment Discovery Platform is deployed to the production environment.

**Directive:** Do not deploy to production if a single checkbox remains unmarked. "We will fix it post-launch" is an unacceptable engineering standard.

---

### 1. Performance & Core Web Vitals

Performance degrades trust. The following metrics are absolute launch blockers.

* [ ] **LCP Threshold:** Largest Contentful Paint (LCP) must register at `< 2.5s` on mobile 3G/4G simulated networks.
* [ ] **Panorama Resolution:** The Pannellum `first-tile-load` must resolve and replace the branded loading screen in `< 2.0s`.
* [ ] **Image Optimization:** Verify all Next.js `<Image />` tags utilize the `sizes` attribute correctly and are serving `WebP`/`AVIF` formats via the Cloudinary CDN.
* [ ] **Bundle Size:** Verify no heavy, unauthorized GIS libraries (Cesium, MapLibre) have leaked into the production bundle. `Leaflet` must be the sole mapping engine.

### 2. Security & Data Integrity

The lead generation funnel and API routes must be secured against hostile actors.

* [ ] **Environment Variables:** Confirm all production secrets (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_ANON_KEY`, Sanity tokens, Resend keys) are securely configured in Vercel and excluded from `.env.local` commits.
* [ ] **Supabase RLS:** Confirm Row Level Security is active on the `consultation_leads` table. Verify the policy permits anonymous `INSERT` operations but strictly denies anonymous `SELECT` operations.
* [ ] **Bot Protection:** Verify `Arcjet` is actively monitoring the `InvestmentGateModal` and `ConsultationForm` server actions to intercept script-based spam submissions.
* [ ] **Sanity 2FA:** Verify Two-Factor Authentication is enforced for all Heri Homes staff accessing the Sanity Studio.

### 3. Core Functionality & Conversion Funnel

The primary conversion sequence must be manually verified end-to-end.

* [ ] **Zod Boundary:** Submit intentionally malformed data (invalid email, missing name) to the Investment Gate. Confirm Zod intercepts the payload and renders accessible, inline error text.
* [ ] **Lead Persistence:** Submit a valid test lead. Confirm the payload is successfully written to the Supabase `consultation_leads` table with the correct `opportunity_id` or `zone_id` reference.
* [ ] **Transactional Routing:** Confirm the Resend API successfully dispatches the notification payload to the Heri Homes Sales Team email inbox.
* [ ] **Map Interaction:** Verify clicking the Business Town One (BT-1) polygon on `/masterplan` successfully triggers the Zone Drawer without a full page reload.

### 4. Accessibility (WCAG AA)

The platform must be fully operable without a mouse.

* [ ] **Keyboard Trap:** Verify that opening the `InvestmentGateModal` or `ZoneDrawer` traps the `Tab` key focus strictly within the component.
* [ ] **Escape Hook:** Verify pressing the `Escape` key immediately closes active modals/drawers and returns focus to the triggering element.
* [ ] **Pannellum Bypass:** Verify a "Skip 360 Panorama" screen-reader link exists immediately before the `<canvas>` element to prevent focus entrapment.
* [ ] **Color Contrast:** Verify all text layered over primary (`#0F3D2E`) and accent (`#C8A44D`) backgrounds passes WCAG AA contrast ratios.

### 5. Technical SEO & Indexing

Search crawlers must properly index the dynamic business entities.

* [ ] **Dynamic Open Graph:** Verify `/opportunities/[slug]` routes successfully generate dynamic `og:title`, `og:description`, and `og:image` tags based on Sanity CMS data.
* [ ] **Canonicalization:** Confirm that unlocking the Investment Gate does not append URL parameters or generate duplicate indexable routes.
* [ ] **Noindex Directives:** Confirm `<meta name="robots" content="noindex, nofollow">` is active on `/thank-you` and any direct PDF asset URLs.
