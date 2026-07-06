# Sanctus Gardens City (SGC)

## Phase 1 Progress Tracker: Investment Discovery Platform MVP

### Purpose and Directives

This document tracks the deterministic engineering execution for the Sanctus Gardens City Investment Discovery Platform MVP.

* Do not mark a task as complete (`[x]`) unless the code is implemented, manually verified, committed to version control, and documented.
* If work is partially complete, mark it as ``.
* If work is blocked, mark it as `` and explain why.

### Core User Journey

The MVP is complete when the following end-to-end flow is fully functional using real data:
**Homepage → Masterplan → Zone → Opportunity → Request Investment Information → Speak With Our Investment Team**

---

### Stage A: Vertical Slice (Month 1)

* [ ] **01.** Initialize Next.js + TypeScript + Tailwind v4 + shadcn/ui.
* [ ] **02.** Implement `app/globals.css` utilizing `@theme` tokens (no fixed pixels, use `rem`).
* [ ] **03.** Provision Sanity project: create `Zone`, `Opportunity`, `Landmark`, `InfrastructureItem`, `PanoramaScene`, and `ConsultationLead` schemas.
* [ ] **04.** Provision Supabase project: initialize `consultation_leads` table with Row Level Security (RLS).
* [ ] **05.** Seed one real Zone entity (Business Town One) in Sanity Studio.
* [ ] **06.** Seed one real Opportunity (e.g., Lapis Lazuli) and one Before/After image pair in Sanity.
* [ ] **07.** Execute FFmpeg frame extraction from source drone footage.
* [ ] **08.** Execute Hugin panorama stitch for the first real geographic panorama.
* [ ] **09.** Run `generate-panorama.py`; commit resulting multiresolution tiles to `public/panoramas/`.
* [ ] **10.** Link the generated panorama document to the Zone entity in Sanity.
* [ ] **11.** Build `/zones/[slug]` route — unstyled, fetching real Sanity data via GROQ.
* [ ] **12.** Build `/opportunities/[slug]` route — unstyled, Before/After slider functionally rendering.
* [ ] **13.** Build Investment Pack Form — successfully submitting to Supabase.
* [ ] **14.** Deploy application shell to Vercel; verify the full database and CMS chain in production.

### Phase 1: Content & Data Model Completion

* [ ] **15.** Add remaining secondary schemas to Sanity (`news-post`, `team-member`).
* [ ] **16.** Extend the `Phase` lifecycle field across all relevant schemas (Conceptual, Active Funding, In-Development, Operational).
* [ ] **17.** Write and type-generate the complete GROQ query set.
* [ ] **18.** Grant Heri Homes marketing/sales team explicit access to Sanity Studio.
* [ ] **19.** Finalize all Phase 1 content entry (all Zones, Opportunities, Panoramas, and Infrastructure Items).

### Phase 2: Design System & Component Library

* [ ] **20.** Wire Cormorant Garamond (Display) and Inter (Sans) via `next/font/google` into the root layout.
* [ ] **21.** Extend `shadcn/ui` components strictly adhering to SGC token values in `ui-tokens.md`.
* [ ] **22.** Implement global navigation (`navbar.tsx`) and footer (`footer.tsx`).
* [ ] **23.** Configure Framer Motion variants (fade, slide, scale, count-up) mapped to SGC easing/duration tokens.
* [ ] **24.** Refine and stress-test `before-after-slider.tsx` across multiple viewport widths and image pairs.
* [ ] **25.** Build the Zone Drawer component (desktop right-side panel / mobile bottom-sheet).

### Phase 3: Homepage & Marketing Pages

* [ ] **26.** Build Homepage: Hero, scroll narrative, statistics count-up, and city tour teaser.
* [ ] **27.** Build About SGC & Heri Homes Page: Leadership team, development story, and track record.
* [ ] **28.** Build Azure Palm Lands / Core property focus page.
* [ ] **29.** Build News architecture: Listing index and individual dynamic post pages.
* [ ] **30.** Build Contact Page: Wire direct inquiries to Supabase and Resend.
* [ ] **31.** Install and configure architectural dependencies: PostHog, Arcjet, and Sentry.

### Phase 4: Masterplan Map & Zone Experience

* [ ] **32.** Geo-register architectural CAD files in QGIS; export precise `bt1-zone-polygon.geojson`.
* [ ] **33.** Implement `MasterplanMap.tsx` using Leaflet (Client Component).
* [ ] **34.** Program hover and active states for map polygons utilizing SGC opacity tokens (must preserve underlying map visibility).
* [ ] **35.** Wire map polygon click events to open the corresponding Zone Drawer.
* [ ] **36.** Complete styling for all `/zones/[slug]` detail pages.
* [ ] **37.** Instrument PostHog telemetry: `masterplan_view`, `zone_select`, `zone_view`.

### Phase 5: Full Panorama Experience

* [ ] **38.** Process all remaining raw panoramas through the `FFmpeg -> Hugin -> generate.py` pipeline.
* [ ] **39.** Assemble the definitive Pannellum JSON configuration mapping.
* [ ] **40.** Inject Navigation and Information SVG hotspots across all 3D scenes.
* [ ] **41.** Implement `use-scenechange-sync.ts` to sync Pannellum viewport orientation with the Leaflet map state.
* [ ] **42.** Build branded loading state utilizing the SGC logo and deterministic tile loading progress.
* [ ] **43.** Implement "Drag to Explore" mobile onboarding overlay (auto-dismissing on interaction).
* [ ] **44.** Instrument PostHog telemetry: `panorama_open`, `scene_change`, `hotspot_click`.

### Phase 6: Opportunity Pages & Investment Gate

* [ ] **45.** Complete styling for all `/opportunities/[slug]` detail pages.
* [ ] **46.** Build full Interior Space Gallery; ensure rendering remains locked behind the gated submission state.
* [ ] **47.** Upgrade Investment Pack Form: Integrate Arcjet bot protection and Resend automated email delivery.
* [ ] **48.** Render secure financial data components (Pricing, availability, payment plans) conditionally upon gate unlock.
* [ ] **49.** Instrument PostHog telemetry: `opportunity_view`, `investment_gate_open`, `investment_request_submit`.

### Phase 7: Consultation & Lead Engine

* [ ] **50.** Complete the final Consultation Form UI; wire to Supabase + Resend + Arcjet.
* [ ] **51.** Confirm end-to-end sales team notification routing via email on lead generation.
* [ ] **52.** Instrument PostHog telemetry: `consultation_start`, `consultation_submit`, `thank_you_view`.

### Phase 8: Analytics & Business Dashboard

* [ ] **53.** Configure the primary Masterplan-to-Lead conversion funnel dashboard in PostHog for the Heri Homes team.
* [ ] **54.** Manually verify the full 14-event tracking chain using real sessions.

### Phase 9: MVP Hardening & Launch Readiness

* [ ] **55.** Execute Core Web Vitals audit; ensure functional parity on simulated 3G mobile networks.
* [ ] **56.** Confirm Pannellum panorama first-tile-load resolves in `< 2.0s` on 4G connections.
* [ ] **57.** Implement Technical SEO: `generateMetadata`, schema markup, and dynamic Open Graph tags.
* [ ] **58.** Execute Security Audit: verify Vercel environment variables, Arcjet rule rigor, and Sanity 2FA compliance.
* [ ] **59.** Perform comprehensive cross-browser (Chrome, Safari, Firefox) and cross-device (iOS, Android) QA.
* [ ] **60.** Finalize all technical handoff documentation for Heri Homes internal teams.
* [ ] **61.** Generate SIWES final evaluation report.
* [ ] **62.** Deliver live MVP presentation to Heri Homes stakeholders.

---

### Architecture Decisions Log

*Record important implementation decisions made during development to maintain context for future developers.*

| Date | Decision | Reason | Impact |
| --- | --- | --- | --- |
|  |  |  |  |

### Known Issues

*Record unresolved bugs, blocked tasks, or technical debt incurred during the MVP build.*

| Date | Issue | Status | Owner |
| --- | --- | --- | --- |
|  |  |  | [Name] |
