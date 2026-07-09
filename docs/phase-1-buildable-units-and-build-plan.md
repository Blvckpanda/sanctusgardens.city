# Sanctus Gardens City (SGC)
## Phase 1 — Buildable Unit Specification & Build Plan

**Stack:** Next.js + TypeScript + Tailwind v4 + shadcn/ui + Sanity + Supabase + Leaflet + Pannellum + PostHog + Arcjet + Resend + Sentry + Vercel

**Source:** This document breaks down every task in the Phase 1 Progress Tracker (Tasks 01–62) into fully specified buildable units, then sequences them into a six-month build plan. It does not replace the original progress-tracker.md — that file remains your live status board (`[x]`, `⏳`, `🚫`). This document is the specification each unit's checkbox refers to.

**No application code is included below.** This is a planning document only. Code begins when Unit 01 is executed.

---

### Core User Journey (North Star for Every Unit)

> **Homepage → Masterplan → Zone → Opportunity → Request Investment Information → Speak With Our Investment Team**

Every unit in this document exists to build one link in this chain, or to support the infrastructure that makes the chain reliable. If a piece of work doesn't serve this journey, it doesn't belong in Phase 1.

---

## PART 1 — THE 62 BUILDABLE UNITS

Each unit follows the same template:

- **Objective** — why this unit exists
- **Build** — what gets configured, written, or run
- **Depends on** — which prior units must be complete first
- **Done when** — the binary condition that proves the unit is finished

---

### STAGE A — VERTICAL SLICE (Month 1)

The purpose of Stage A is singular: prove the entire chain — CMS to database to frontend to production — works end to end with one real Zone and one real Opportunity, before any content, styling, or scale is added. Nothing in later stages should require re-architecting what's built here.

---

**Unit 01 — Initialize Next.js + TypeScript + Tailwind v4 + shadcn/ui**
- *Objective:* Establish the application shell every other unit builds on top of.
- *Build:* Scaffold a new Next.js project using the App Router (not Pages Router), with TypeScript and Tailwind v4 enabled at creation. Initialize shadcn/ui's CLI against the Tailwind v4 configuration. Configure path aliases (`@/components`, `@/lib`, `@/features`) in `tsconfig.json`.
- *Depends on:* Nothing — this is the entry point.
- *Done when:* `npm run dev` boots without error. One shadcn/ui component (e.g., Button) installs and renders correctly on the default page.

---

**Unit 02 — Implement app/globals.css utilizing @theme tokens (no fixed pixels, use rem)**
- *Objective:* Lock the design token system before any component is built against it, so nothing downstream hardcodes a value.
- *Build:* Define the full `@theme` block in `globals.css` — color tokens, spacing scale, typography scale, z-index scale, motion durations — all in `rem`, following Tailwind v4's CSS-first token conventions (`--color-*`, `--spacing-*`, `--text-*`, `--font-*`).
- *Depends on:* Unit 01.
- *Done when:* No `px` values exist anywhere in the token definitions. Utility classes generated from the theme (e.g., `bg-primary`, `text-h1`) render the correct SGC brand values, not Tailwind defaults.

---

**Unit 03 — Provision Sanity project: Zone, Opportunity, Landmark, InfrastructureItem, PanoramaScene, ConsultationLead schemas**
- *Objective:* Give the CMS a structural model of every core business entity before any content can exist.
- *Build:* Initialize a Sanity Studio instance (embedded or standalone). Define six schema files using `defineType`/`defineField`, matching the business-data-model.md field definitions for each entity — including references between them (Opportunity → Zone, PanoramaScene → Zone, etc.).
- *Depends on:* Unit 01 (if the Studio is embedded in the Next.js app).
- *Done when:* All six schemas are registered in `sanity.config.ts` and visible as document types in Sanity Studio's sidebar with zero validation errors.

---

**Unit 04 — Provision Supabase project: consultation_leads table with RLS**
- *Objective:* Create a secure operational data store for lead capture, separate from the CMS.
- *Build:* Create the `consultation_leads` table with columns matching the ConsultationLead entity (id, name, email, phone, organization, inquiry_type, opportunity_id, zone_id, notes, created_at). Enable Row Level Security. Write a policy permitting `INSERT` from the anonymous role and denying `SELECT` to anything but the service role.
- *Depends on:* Nothing — can run in parallel with Units 01–03.
- *Done when:* A test insert via the Supabase anon key succeeds. A test `SELECT` via the anon key is blocked or returns empty.

---

**Unit 05 — Seed one real Zone entity (Business Town One) in Sanity Studio**
- *Objective:* Populate the first real content record so subsequent units have something genuine to query, not placeholder text.
- *Build:* In Sanity Studio, manually create one Zone document — name "Business Town One (BT-1)", correct slug, real description, status set to an approved lifecycle value.
- *Depends on:* Unit 03.
- *Done when:* One Zone document exists in the dataset with every required field populated with real content.

---

**Unit 06 — Seed one real Opportunity (e.g., Lapis Lazuli) and one Before/After image pair**
- *Objective:* Create the second core content record and prove the asset pipeline for interior/exterior comparison imagery works.
- *Build:* Create one Opportunity document referencing the Zone from Unit 05, using real figures from project documentation. Upload one technical-drawing/AI-render image pair to the asset pipeline and link it to the Opportunity.
- *Depends on:* Unit 05, Unit 03.
- *Done when:* The Opportunity document exists with a valid Zone reference, real financial data, and one correctly linked image pair.

---

**Unit 07 — Execute FFmpeg frame extraction from source drone footage**
- *Objective:* Produce the raw material the panorama pipeline depends on.
- *Build:* Run FFmpeg against the actual drone video at 1fps (or 2fps for higher overlap), outputting high-quality JPEG stills to a working directory.
- *Depends on:* Nothing structurally, but requires the actual drone footage file to be on disk.
- *Done when:* A frames directory exists with extracted stills, manually reviewed and confirmed free of motion blur for at least one usable viewpoint group.

---

**Unit 08 — Execute Hugin panorama stitch for the first real geographic panorama**
- *Objective:* Convert extracted stills into one usable equirectangular panorama.
- *Build:* Import the best frame group from Unit 07 into Hugin, set lens type to Rectilinear, run control point detection, correct roll/pitch/yaw, export as a 2:1 equirectangular JPEG.
- *Depends on:* Unit 07.
- *Done when:* One equirectangular JPEG exists, correct aspect ratio, level horizon, no visible stitching seams.

---

**Unit 09 — Run generate-panorama.py; commit resulting tiles to public/panoramas/**
- *Objective:* Make the panorama safe to load in a browser without crashing mobile memory.
- *Build:* Run the tiling script against the Unit 08 output. Commit the resulting multiresolution tile directory into the Next.js `public/panoramas/` folder.
- *Depends on:* Unit 08, Unit 01.
- *Done when:* A tile directory exists under `public/panoramas/[scene-name]/` with multiple zoom levels present and committed to version control.

---

**Unit 10 — Link the generated panorama document to the Zone entity in Sanity**
- *Objective:* Connect the technical asset to the content model so the frontend can query it.
- *Build:* Create a PanoramaScene document referencing the Unit 05 Zone, with `tilesBasePath` pointing to the Unit 09 output path.
- *Depends on:* Unit 09, Unit 05, Unit 03.
- *Done when:* The PanoramaScene document exists in Sanity with a correct Zone reference and a correct, non-broken tile path.

---

**Unit 11 — Build /zones/[slug] route — unstyled, fetching real Sanity data via GROQ**
- *Objective:* Prove the CMS-to-frontend data chain works before any design is applied.
- *Build:* Create `app/zones/[slug]/page.tsx` as a Server Component. Write a GROQ query fetching a single Zone by slug. Render the raw data with no styling.
- *Depends on:* Unit 05, Unit 01.
- *Done when:* Navigating to the live route in-browser displays the real Sanity content for that Zone, matching what's visible in Sanity Studio.

---

**Unit 12 — Build /opportunities/[slug] route — unstyled, Before/After slider functionally rendering**
- *Objective:* Prove the second content type renders correctly and that the comparison-slider interaction works mechanically before it's designed.
- *Build:* Create `app/opportunities/[slug]/page.tsx`. Fetch Opportunity data including the image pair. Render a minimal, unstyled slider where dragging reveals one image over the other.
- *Depends on:* Unit 06, Unit 11 (pattern reused).
- *Done when:* The route renders real Opportunity data and the drag interaction functionally works with the seeded image pair, regardless of visual polish.

---

**Unit 13 — Build Investment Pack Form — successfully submitting to Supabase**
- *Objective:* Prove the frontend-to-database write path works before adding email or bot protection.
- *Build:* Build a Client Component form (name, email, phone) using a Server Action or API route that inserts a row into `consultation_leads`.
- *Depends on:* Unit 04, Unit 12.
- *Done when:* Submitting test data creates a verifiable row in the Supabase Table Editor.

---

**Unit 14 — Deploy application shell to Vercel; verify the full chain in production**
- *Objective:* Confirm the vertical slice works in a real production environment, not just localhost — this is the integration checkpoint for the entire month.
- *Build:* Connect the GitHub repository to Vercel. Configure Sanity and Supabase environment variables in the Vercel dashboard. Trigger a production deploy.
- *Depends on:* Units 01–13, all functioning locally.
- *Done when:* The live URL reproduces every local behavior — Zone page renders real data, Opportunity page renders the slider, form submission creates a real Supabase row — all in production.

---

### PHASE 1 — CONTENT & DATA MODEL COMPLETION

Purpose: expand the single-example content model from Stage A into a complete, production-ready schema and dataset, and hand editorial control to the people who'll actually maintain it after SIWES ends.

---

**Unit 15 — Add remaining secondary schemas to Sanity (news-post, team-member)**
- *Objective:* Support the marketing pages planned for Phase 3.
- *Build:* Define `newsPost` (title, slug, Portable Text body, publishedAt, coverImage) and `teamMember` (name, role, photo, bio) schemas.
- *Depends on:* Unit 03.
- *Done when:* Both schemas are registered and a test document can be created in each without validation errors.

---

**Unit 16 — Extend the Phase lifecycle field across all relevant schemas**
- *Objective:* Enable every content entity to carry its correct business state (Conceptual, Active Funding, In-Development, Operational).
- *Build:* Add the lifecycle enum field to Zone, Opportunity, Landmark, and InfrastructureItem schemas if not already present from Unit 03.
- *Depends on:* Unit 03.
- *Done when:* Every relevant schema has the field, and the Units 05/06 seeded documents have it populated with a valid state.

---

**Unit 17 — Write and type-generate the complete GROQ query set**
- *Objective:* Give every future page a typed, reusable data-fetching layer.
- *Build:* Write query functions for every fetch need (`getZones`, `getZoneBySlug`, `getOpportunities`, `getOpportunityBySlug`, `getPanoramaByZone`, `getInfrastructureItems`, `getNewsPosts`, etc.). Run Sanity's TypeGen to produce matching TypeScript types.
- *Depends on:* Unit 15, Unit 16.
- *Done when:* A queries module exists covering every planned fetch; TypeGen runs with zero errors; fetched data is fully typed, not `any`.

---

**Unit 18 — Grant Heri Homes marketing/sales team access to Sanity Studio**
- *Objective:* Enable non-technical content ownership ahead of full content entry.
- *Build:* Invite the relevant Heri Homes stakeholder emails via the Sanity manage dashboard with Editor (not Administrator) roles.
- *Depends on:* Unit 01.
- *Done when:* At least one Heri Homes team member has logged in and confirmed access.

---

**Unit 19 — Finalize all Phase 1 content entry**
- *Objective:* Move from one example of each entity to the complete real dataset for launch.
- *Build:* Populate every planned Zone, Opportunity, Panorama, and Infrastructure Item with real content, ideally with Heri Homes participating directly via Unit 18 access.
- *Depends on:* Unit 17, Unit 18.
- *Done when:* The content inventory checklist shows 100% of planned items created and reviewed, with zero placeholder text remaining.

---

### PHASE 2 — DESIGN SYSTEM & COMPONENT LIBRARY

Purpose: turn the token system from Unit 02 into an actual, reusable, on-brand component library so every subsequent page is assembled, not designed from scratch.

---

**Unit 20 — Wire Cormorant Garamond and Inter via next/font/google into the root layout**
- *Objective:* Establish typography as a self-hosted, performant, zero-layout-shift system.
- *Build:* Import both fonts in `app/layout.tsx` using Next.js's built-in font optimization, expose them as CSS variables, map them into the `@theme` font tokens from Unit 02.
- *Depends on:* Unit 02.
- *Done when:* Rendered HTML shows self-hosted font files (not a Google Fonts CDN request). CLS attributable to font loading is negligible.

---

**Unit 21 — Extend shadcn/ui components to strictly adhere to SGC token values**
- *Objective:* Ensure every base UI primitive reflects the brand by default, with no manual override needed at point of use.
- *Build:* For every installed shadcn/ui component (Button, Input, Dialog, Sheet, Card), replace default Tailwind classes with references to the SGC `@theme` tokens.
- *Depends on:* Unit 01, Unit 02, Unit 20.
- *Done when:* Every installed component visually reflects SGC brand color and typography without per-instance overrides.

---

**Unit 22 — Implement global navigation (navbar.tsx) and footer (footer.tsx)**
- *Objective:* Establish the persistent shell every page lives inside.
- *Build:* Build both as shared components (not feature-specific), wired into the root layout.
- *Depends on:* Unit 21.
- *Done when:* Both render on every page, links function (even toward not-yet-built routes), fully responsive across breakpoints.

---

**Unit 23 — Configure Framer Motion variants mapped to SGC easing/duration tokens**
- *Objective:* Ensure motion is consistent site-wide and centrally controlled, not hardcoded per component.
- *Build:* Create a shared animation variants module (fade, slide, scale, count-up) referencing duration/easing values from the design token system.
- *Depends on:* Unit 02.
- *Done when:* At least one live component visibly uses a variant; changing the underlying token changes the animation without touching component code.

---

**Unit 24 — Refine and stress-test before-after-slider.tsx**
- *Objective:* Take the functional-but-unstyled Unit 12 slider to production quality.
- *Build:* Apply full visual design — handle styling, smooth drag physics, aspect-ratio locking so mismatched image pairs don't break layout.
- *Depends on:* Unit 12, Unit 21.
- *Done when:* Tested manually across at least three viewport widths and two different image pairs with zero layout breakage, functioning via both mouse and touch.

---

**Unit 25 — Build the Zone Drawer component**
- *Objective:* Create the UI surface the masterplan map will eventually trigger.
- *Build:* A single component rendering as a right-side panel on desktop and a bottom sheet on mobile, showing zone summary, opportunity count, and a CTA.
- *Depends on:* Unit 21, Unit 17.
- *Done when:* Renders correctly in both desktop and mobile viewport simulations, opens/closes via state toggle, even with a placeholder trigger since the map doesn't exist yet.

---

### PHASE 3 — HOMEPAGE & MARKETING PAGES

Purpose: build the public-facing pages that establish first impressions and credibility before the interactive core experience is reached.

---

**Unit 26 — Build Homepage: Hero, scroll narrative, statistics count-up, city tour teaser**
- *Objective:* Create the entry point that converts a visitor into an explorer.
- *Build:* Hero with real imagery/footage, headline in Cormorant Garamond, scroll-triggered narrative sections using Unit 23 variants, animated statistics, a teaser CTA toward the masterplan.
- *Depends on:* Unit 22, Unit 23, ideally Unit 19 for accurate figures.
- *Done when:* Fully responsive, statistics animate on scroll-into-view, all copy is real, CTA correctly links toward the masterplan route.

---

**Unit 27 — Build About SGC & Heri Homes Page**
- *Objective:* Establish credibility through leadership and company narrative.
- *Build:* Fetch `teamMember` documents via GROQ, render leadership profiles with photos and bios, include company narrative content.
- *Depends on:* Unit 15, Unit 17.
- *Done when:* Page renders real leadership data fetched from Sanity, not hardcoded.

---

**Unit 28 — Build Azure Palm Lands / core property focus page**
- *Objective:* Give this specific development focus its own dedicated presentation.
- *Build:* A route rendering this entity's content, fetched via the relevant GROQ query.
- *Depends on:* Unit 17, content entered in Sanity for this entity.
- *Done when:* Route renders correctly with real content, following the same styling conventions as other content pages.

---

**Unit 29 — Build News architecture: listing index and dynamic post pages**
- *Objective:* Give Heri Homes an ongoing content channel independent of developer involvement.
- *Build:* A listing page and an individual post page rendering Portable Text body content.
- *Depends on:* Unit 15, Unit 17.
- *Done when:* At least one real post is visible on the listing and renders correctly on its individual page, including correct Portable Text rendering.

---

**Unit 30 — Build Contact Page: wire to Supabase and Resend**
- *Objective:* Capture general inquiries distinct from investment-specific leads.
- *Build:* A contact form using the Unit 13 submission pattern, with a Resend email trigger added.
- *Depends on:* Unit 04, a Resend account provisioned.
- *Done when:* Submitting the form creates a Supabase record and triggers a real email delivered to a test inbox.

---

**Unit 31 — Install and configure PostHog, Arcjet, and Sentry**
- *Objective:* Establish the observability and security layer before it's needed for gated flows.
- *Build:* PostHog via a provider wrapper with pageview tracking; Arcjet configured at the middleware or route level; Sentry initialized for both client and server, with source maps uploading on Vercel builds.
- *Depends on:* Unit 14.
- *Done when:* PostHog dashboard shows real pageview events from the live site; a deliberate test error appears in Sentry with a readable stack trace; Arcjet's dashboard shows at least one processed request.

---

### PHASE 4 — MASTERPLAN MAP & ZONE EXPERIENCE

Purpose: build the platform's most distinctive feature — the spatially accurate, interactive site map — and connect it to the Zone content model.

---

**Unit 32 — Geo-register CAD files in QGIS; export bt1-zone-polygon.geojson**
- *Objective:* Convert proprietary architectural data into a web-usable spatial format.
- *Build:* Open the real CAD files in QGIS, identify the BT-1 boundary layer, verify or assign a WGS84 coordinate reference system, export as GeoJSON.
- *Depends on:* Nothing structurally — can start in parallel with Stage A.
- *Done when:* The GeoJSON file, pasted into a validator like geojson.io, renders at the correct real-world Ogbogoro, Port Harcourt location.

---

**Unit 33 — Implement MasterplanMap.tsx using Leaflet**
- *Objective:* Bring the spatial data into the application as an interactive map.
- *Build:* A Client Component (dynamically imported with SSR disabled, since Leaflet requires browser globals) that loads the Unit 32 GeoJSON and renders base polygons.
- *Depends on:* Unit 32, Unit 01.
- *Done when:* The map renders without hydration errors; all polygons appear at correct real-world coordinates.

---

**Unit 34 — Program hover and active states for map polygons**
- *Objective:* Give the map tactile, on-brand interactivity without obscuring the underlying geography.
- *Build:* Leaflet `mouseover`/`mouseout` handlers calling `setStyle()`, using opacity-based fills from the design tokens rather than solid hex colors.
- *Depends on:* Unit 33.
- *Done when:* Hovering visibly changes a polygon's style; clicking sets a distinct active style; underlying map detail remains visible in both states.

---

**Unit 35 — Wire map polygon click events to open the Zone Drawer**
- *Objective:* Connect the map to the content layer.
- *Build:* On polygon click, fetch the corresponding Zone data via the Unit 17 query and pass it into the Unit 25 drawer component.
- *Depends on:* Unit 25, Unit 34, Unit 17.
- *Done when:* Clicking any polygon opens the drawer with that exact zone's real data — never a placeholder or the wrong zone.

---

**Unit 36 — Complete styling for all /zones/[slug] detail pages**
- *Objective:* Bring the Unit 11 functional route to full visual quality.
- *Build:* Apply the full design system — hero, infrastructure grid, opportunities list, panorama entry CTA.
- *Depends on:* Unit 11, Units 21–25.
- *Done when:* Every entered Zone (Unit 19) renders a fully styled, responsive page with zero unstyled sections remaining.

---

**Unit 37 — Instrument PostHog telemetry: masterplan_view, zone_select, zone_view**
- *Objective:* Begin measuring the top of the conversion funnel.
- *Build:* Add `posthog.capture()` calls at the correct trigger points for each named event.
- *Depends on:* Unit 31, Units 33–36.
- *Done when:* Triggering each action in a live session produces the corresponding event in the PostHog Activity dashboard.

---

### PHASE 5 — FULL PANORAMA EXPERIENCE

Purpose: scale the single-scene proof from Stage A into the complete, multi-scene immersive experience with full spatial synchronization.

---

**Unit 38 — Process all remaining raw panoramas through the FFmpeg → Hugin → generate.py pipeline**
- *Objective:* Produce every panorama scene needed for full MVP scope.
- *Build:* Repeat the Units 07–09 pipeline for every remaining planned scene.
- *Depends on:* Unit 09 (pipeline proven once already).
- *Done when:* Every planned scene has a corresponding tile directory under `public/panoramas/`, each verified to load in isolation before integration.

---

**Unit 39 — Assemble the definitive Pannellum JSON configuration mapping**
- *Objective:* Give the viewer a single, complete map of every scene and how they connect.
- *Build:* Build the full scene configuration covering every processed scene — `firstScene`, per-scene `multiRes` paths, default pitch/yaw — ideally generated dynamically from the PanoramaScene Sanity documents via the Unit 17 queries.
- *Depends on:* Unit 38.
- *Done when:* The assembled config references every processed scene correctly with no broken paths.

---

**Unit 40 — Inject Navigation and Information SVG hotspots across all scenes**
- *Objective:* Make the tour navigable and informative, not just a static panorama.
- *Build:* Add scene-type and info-type hotspots to every scene's config, using custom brand-gold SVG icons via Pannellum's `cssClass` parameter — no default markers.
- *Depends on:* Unit 39, custom SVG assets designed.
- *Done when:* Every scene has at least one working navigation hotspot and one working info hotspot, both using custom icon styling.

---

**Unit 41 — Implement use-scenechange-sync.ts**
- *Objective:* Build the platform's signature feature — the panorama and map moving together as one system.
- *Build:* A hook listening to Pannellum's `scenechange` event, which pans the Leaflet map and highlights the matching zone polygon via a shared state mechanism between the two client components.
- *Depends on:* Unit 33, Unit 40.
- *Done when:* Clicking a navigation hotspot inside the panorama causes the map (elsewhere on the same page) to visibly pan and highlight the correct zone, verified as a live browser interaction.

---

**Unit 42 — Build branded loading state with deterministic tile loading progress**
- *Objective:* Ensure the luxury brand experience never shows a blank canvas.
- *Build:* Replace Pannellum's default loading behavior with a custom overlay showing the SGC logo and a progress indicator tied to actual tile loading state.
- *Depends on:* Unit 39.
- *Done when:* Under 3G network throttling, the branded overlay is visible during the load window and cleanly disappears once interactive.

---

**Unit 43 — Implement "Drag to Explore" mobile onboarding overlay**
- *Objective:* Reduce first-time confusion for mobile users unfamiliar with 360° interaction.
- *Build:* A one-time overlay on first scene load, auto-dismissing on either a timeout or the first drag interaction.
- *Depends on:* Unit 42.
- *Done when:* On a mobile viewport, the overlay appears on first load and disappears correctly on interaction, without reappearing on subsequent scene changes in the same session.

---

**Unit 44 — Instrument PostHog telemetry: panorama_open, scene_change, hotspot_click**
- *Objective:* Measure engagement with the immersive core of the platform.
- *Build:* Add capture calls at Pannellum's `load`, `scenechange`, and hotspot interaction points.
- *Depends on:* Unit 31, Units 40–41.
- *Done when:* All three events verified in PostHog during a manual test covering scene navigation and hotspot clicks.

---

### PHASE 6 — OPPORTUNITY PAGES & INVESTMENT GATE

Purpose: convert engagement into qualified leads by building the gated financial information flow.

---

**Unit 45 — Complete styling for all /opportunities/[slug] detail pages**
- *Objective:* Bring the Unit 12 functional route to full visual quality.
- *Build:* Apply full design — investment narrative, gallery, infrastructure links, the Unit 24 refined slider.
- *Depends on:* Unit 12, Unit 24, Units 21–23.
- *Done when:* Every seeded Opportunity renders a fully styled page with zero unstyled sections.

---

**Unit 46 — Build full Interior Space Gallery, gated behind submission state**
- *Objective:* Use the before/after feature as a conversion lever, not a fully open asset.
- *Build:* A gallery showing all image pairs for an Opportunity, with only the first pair publicly visible and the remainder locked until the gate is unlocked.
- *Depends on:* Unit 45, a defined unlock-state mechanism.
- *Done when:* On first load, only one pair is visible with the rest visibly locked; after successful form submission, all pairs become visible without a page reload.

---

**Unit 47 — Upgrade Investment Pack Form: Arcjet + Resend integration**
- *Objective:* Make the Unit 13 form production-safe and commercially functional.
- *Build:* Layer Arcjet rate-limiting/bot-detection onto the submission handler, and add a Resend call firing an investor confirmation and a Heri Homes sales notification after a successful Supabase insert.
- *Depends on:* Unit 13, Unit 31, a Resend account.
- *Done when:* A deliberately excessive rapid submission is blocked by Arcjet; a normal single submission triggers both emails, confirmed received.

---

**Unit 48 — Render secure financial data conditionally upon gate unlock**
- *Objective:* Ensure gated pricing data is genuinely protected, not just visually hidden.
- *Build:* Build pricing/availability/payment-plan components, rendered only after unlock, ideally fetched via a protected call rather than present in the initial page payload at all.
- *Depends on:* Unit 46, Unit 47.
- *Done when:* Viewing page source before submission shows no financial figures anywhere in the HTML; after submission, data renders correctly client-side.

---

**Unit 49 — Instrument PostHog telemetry: opportunity_view, investment_gate_open, investment_request_submit**
- *Objective:* Measure the middle of the conversion funnel.
- *Build:* Add capture calls at each of the three trigger points.
- *Depends on:* Unit 31, Units 45–48.
- *Done when:* All three events verified in PostHog during a manual walkthrough of viewing, gating, and submitting.

---

### PHASE 7 — CONSULTATION & LEAD ENGINE

Purpose: build the macro-conversion path that turns a qualified lead into a scheduled conversation.

---

**Unit 50 — Complete the Consultation Form UI; wire to Supabase + Resend + Arcjet**
- *Objective:* Build the highest-intent conversion action on the platform.
- *Build:* Build the consultation form (distinct from the investment pack form, including an investment-interest field), applying the same protection and notification pattern proven in Unit 47.
- *Depends on:* Unit 47 (pattern proven).
- *Done when:* Submitting the form creates a Supabase record, is protected by Arcjet, and triggers both confirmation and sales notification emails.

---

**Unit 51 — Confirm end-to-end sales team notification routing**
- *Objective:* Ensure leads reach a real human at Heri Homes, not just a test inbox.
- *Build:* Verify with the actual MD, Sales Director, and BDM that notification emails route to inboxes they monitor daily.
- *Depends on:* Unit 50, Unit 47.
- *Done when:* A real Heri Homes team member confirms receipt of a test lead notification in their working inbox.

---

**Unit 52 — Instrument PostHog telemetry: consultation_start, consultation_submit, thank_you_view**
- *Objective:* Measure the bottom of the conversion funnel.
- *Build:* Add capture calls at form-open, successful submission, and thank-you-state render.
- *Depends on:* Unit 31, Unit 50.
- *Done when:* All three events verified in PostHog during a manual test of the complete flow.

---

### PHASE 8 — ANALYTICS & BUSINESS DASHBOARD

Purpose: turn scattered events into a decision-making tool Heri Homes can actually use.

---

**Unit 53 — Configure the Masterplan-to-Lead conversion funnel dashboard**
- *Objective:* Give Heri Homes a single view of the entire journey's performance.
- *Build:* In PostHog, build a Funnel insight spanning `homepage_view` through `consultation_submit`, saved as a shared dashboard.
- *Depends on:* Units 37, 44, 49, 52 — every telemetry unit must exist.
- *Done when:* The funnel exists, shows real conversion data from at least one full test session, and is accessible or exportable to a Heri Homes stakeholder.

---

**Unit 54 — Manually verify the full 14-event tracking chain**
- *Objective:* Confirm the entire analytics system is trustworthy before relying on it for decisions.
- *Build:* Perform one deliberate, complete walkthrough of the user journey while watching the PostHog live events feed.
- *Depends on:* Unit 53, all telemetry units.
- *Done when:* A documented test session log shows all 14 expected events firing in correct sequence with no missing or duplicate events.

---

### PHASE 9 — MVP HARDENING & LAUNCH READINESS

Purpose: convert a feature-complete platform into a production-grade, defensible, well-documented product ready for real investor traffic and formal handoff.

---

**Unit 55 — Execute Core Web Vitals audit on simulated 3G**
- *Objective:* Confirm the platform is usable for the local Nigerian mobile audience under real-world network conditions.
- *Build:* Run Lighthouse (mobile profile) against production. Manually walk the full journey under Chrome DevTools "Slow 3G" throttling.
- *Depends on:* Feature-complete state.
- *Done when:* Lighthouse report generated and saved; 3G walkthrough completed with no broken states, only acceptable slowness, documented.

---

**Unit 56 — Confirm panorama first-tile-load resolves in under 2.0s on 4G**
- *Objective:* Validate the platform's most important performance commitment.
- *Build:* Measure first-tile-render time under "Fast 4G" throttling using the Network or Performance tab.
- *Depends on:* Units 38–39.
- *Done when:* Measured time is documented under 2.0 seconds; if not initially met, the optimization applied to reach it is documented.

---

**Unit 57 — Implement Technical SEO: generateMetadata, schema markup, dynamic Open Graph**
- *Objective:* Ensure every shared link and search result reflects the platform's real content and premium positioning.
- *Build:* Implement `generateMetadata` for every dynamic route, sourcing title/description/OG image from the actual Sanity content. Add JSON-LD structured data for Organization and relevant content types.
- *Depends on:* Unit 17, Units 36 and 45.
- *Done when:* At least one Zone and one Opportunity page show unique, content-derived meta tags, validated via a social preview tool; JSON-LD validates with zero errors in a structured data testing tool.

---

**Unit 58 — Execute Security Audit**
- *Objective:* Close every exposure risk before real investor traffic and real Heri Homes credentials are in play.
- *Build:* Review every Vercel environment variable to confirm no secret keys carry the client-exposing prefix. Review Arcjet rule adequacy against real forms. Confirm 2FA is enabled on every Sanity account with write access.
- *Depends on:* Unit 14, Unit 18, Units 47/50.
- *Done when:* A documented checklist confirms zero secret keys are exposed in the built client bundle, Arcjet rules are tested against at least one abuse scenario per form, and 2FA is confirmed on all relevant Sanity accounts.

---

**Unit 59 — Perform cross-browser and cross-device QA**
- *Objective:* Guarantee a consistent experience regardless of how an investor accesses the platform.
- *Build:* Manually test the full core journey on Chrome, Safari, and Firefox, and on at least one real or emulated iOS and Android device.
- *Depends on:* Feature-complete state (essentially all prior phases).
- *Done when:* A QA log documents the journey tested per browser/device combination, with any issues either fixed or logged in the Known Issues table with an owner.

---

**Unit 60 — Finalize technical handoff documentation**
- *Objective:* Ensure the platform has value to Heri Homes beyond your SIWES placement.
- *Build:* Write a non-technical Sanity content-editing guide, a technical guide for adding a new panorama scene, a system architecture overview, and an environment variable reference.
- *Depends on:* Feature-complete state, Unit 58.
- *Done when:* A Heri Homes team member successfully completes one content-editing task using only the non-technical guide, with zero direct assistance.

---

**Unit 61 — Generate SIWES final evaluation report**
- *Objective:* Fulfill the academic requirement and formalize the six months of work.
- *Build:* Compile the build log, architecture decisions, and outcomes into the university's required report format.
- *Depends on:* All prior units.
- *Done when:* The report is drafted, covers the full technical scope of the build, and is ready for supervisor submission.

---

**Unit 62 — Deliver live MVP presentation to Heri Homes stakeholders**
- *Objective:* Formally close the project with the client.
- *Build:* A live walkthrough from homepage through consultation submission, presented to the MD and team.
- *Depends on:* All prior units.
- *Done when:* The presentation is delivered, stakeholder feedback is documented, and formal handoff is acknowledged by Heri Homes.

---

## PART 2 — THE BUILD PLAN

---

### Six-Month Sequencing Map

| Month | Stage / Phases | Units | Count | Focus |
|---|---|---|---|---|
| 1 — May | Stage A | 01–14 | 14 | Foundation + vertical slice proof |
| 2 — June | Phase 1 + Phase 2 | 15–25 | 11 | Content completion + design system |
| 3 — July | Phase 3 | 26–31 | 6 | Homepage + marketing pages |
| 4 — August | Phase 4 + Phase 5 | 32–44 | 13 | Masterplan map + panorama experience |
| 5 — September | Phase 6 + 7 + 8 | 45–54 | 10 | Investment gate + lead engine + analytics |
| 6 — October | Phase 9 | 55–62 | 8 | Hardening + handoff |

This distribution isn't even by task count because it doesn't need to be — it's even by *effort*. Month 3's six tasks each require real-world content coordination with Heri Homes (leadership bios, news copy, property narratives) that takes longer in practice than the task count suggests. Month 4's thirteen tasks are the technical core of the entire platform and carry the highest schedule risk in the project — this is the same warning raised earlier in planning that Phase 6-equivalent work "could consume 5–6 weeks, not 4." Build in slack around Month 4 specifically.

---

### Dependency Logic and Critical Path

Some units are true bottlenecks — if they slip, everything downstream slips with them. These are the tasks to protect above all others:

**Unit 01** blocks the entire project. Nothing else can begin until the application shell exists.

**Unit 03** (Sanity schemas) blocks Units 05, 06, 10, 11, 12, 15, 16, and 17 — eight downstream units depend directly on this one decision being correct. Get the schema right the first time; a schema change after content exists means re-entering data.

**Units 07–09** (the panorama pipeline) block Unit 10 and, at scale, Unit 38 and everything panorama-related in Phase 5. This pipeline should be proven working on one scene before Stage A is considered anywhere near complete — if FFmpeg or Hugin produces unusable output, you need to know that in Week 2 of Month 1, not in Month 4 when you're trying to process a dozen scenes under deadline pressure.

**Unit 14** (Vercel deployment) is the Stage A capstone — it's the single checkpoint that proves the CMS-to-database-to-frontend chain works outside your local machine. Treat this as non-negotiable before moving into Phase 1.

**Unit 17** (GROQ query set) blocks nearly every content-driven page built afterward — Units 26 through 30, 36, 45, and the metadata work in 57. This is worth over-investing in during Month 2, because a missing or poorly typed query surfaces as a bug in five different pages simultaneously rather than one.

**Unit 32** (GIS export) blocks Units 33, 34, 35, and 41. It has zero code dependencies and can realistically start in Month 1 alongside Stage A if the CAD files are ready before the drone footage pipeline is proven — don't wait for Month 4 to touch this if the asset is already available.

**Unit 39** (Pannellum config assembly) blocks Units 40, 41, 42, and 44, and directly determines whether Unit 56's performance target is achievable.

---

### Parallel Work Opportunities

Because this is solo development, "parallel" doesn't mean two people working simultaneously — it means recognizing which units don't actually depend on the current month's primary focus, so you can pull them forward if an external dependency (an asset from Heri Homes, a piece of content, a stakeholder meeting) makes one path temporarily unavailable.

**Unit 32 (GIS/CAD export)** has no dependency on anything in Stage A. If CAD files are ready before drone footage is fully processed, start this in Month 1.

**Unit 04 (Supabase provisioning)** has no dependency on the Sanity work in Units 03, 05, 06. These two branches — CMS and database — can be built in either order or interleaved.

**Units 27–30 (About, Azure Palm, News, Contact)** don't depend on each other. If Heri Homes delivers leadership bios before news content, build Unit 27 first regardless of the numbered order.

**Unit 18 (Sanity access for Heri Homes)** can happen as early as Month 1, immediately after Unit 01 — there's no reason to wait until Phase 1 to grant this access, and doing it earlier means Heri Homes can begin reviewing seeded content from Stage A itself.

---

### Stage Transition Gates

Before leaving Stage A for Phase 1, confirm: Unit 14's production deployment reproduces every local behavior with zero discrepancy. If the live site behaves differently from localhost in any way, do not proceed — this gap will only widen as more units are added on top of it.

Before leaving Phase 2 for Phase 3, confirm: every shadcn/ui component in use reflects SGC tokens with zero manual per-instance overrides anywhere in the codebase. If you find yourself overriding a button's color inline on a specific page, Unit 21 wasn't actually finished.

Before leaving Phase 5 for Phase 6, confirm: Unit 41's Pannellum-Leaflet sync works reliably across every scene, not just the scene it was originally built and tested against. This is the platform's signature feature — a sync that works on one scene and silently fails on another is worse than no sync at all, because it will fail in front of an investor unpredictably.

Before leaving Phase 6 for Phase 7, confirm: Unit 48's financial data gating has been verified by actually viewing page source before and after unlock, not just by confirming the UI visually hides the data. CSS-only hiding is not gating.

Before leaving Phase 9 — before Unit 62's presentation — confirm: Unit 60's documentation has been tested against a real person completing a real task with zero assistance from you. If you have to help them, the documentation isn't done, regardless of how much you wrote.

---

### How This Document Relates to the Original Tracker

The progress-tracker.md file you're already maintaining stays exactly as it is — a live checklist you mark `[x]`, `⏳`, or `🚫` as you work. This document is what each of those 62 checkboxes actually means when you sit down to execute it. When a task's status in the tracker is unclear, this is the file that resolves the ambiguity: what exactly counts as done, what has to exist first, and what happens next.
