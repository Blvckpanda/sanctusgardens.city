# Sanctus Gardens City (SGC)

## Information Architecture Specification

### Purpose

This document dictates the structural organization of content, data, and routes for the Sanctus Gardens City Phase 1 MVP. It maps the strategic business goals and Sanity CMS entities directly to the Next.js App Router topology.

### 1. Architectural Principles

* **Funnel-Driven Hierarchy:** The architecture is intentionally shallow. The site exists to push users down a singular, linear path: `Homepage → Masterplan → Zone (District) → Opportunity → Investment Gate → Consultation`.
* **Embedded Experiences Over Pages:** Interactive elements (Panoramas, District Drawers, Investment Gates) are embedded directly within their parent routes to maintain context. They do not have standalone URLs.
* **Integrated Sustainability:** Sustainability is a core pillar. It must not be isolated on a standalone `/sustainability` page. It must be woven into the Homepage, Infrastructure, and Zone details.
* **Gated Financials:** High-value opportunity data is structurally partitioned behind an `Investment Gate` component.
* **No Marketplace Structures:** Search bars, property filtering grids, dashboards, and "Add to Favorites" architectures are strictly prohibited.

### 2. Next.js Route Topology

The application utilizes the Next.js App Router (`/app` directory). The URL structure maps directly to the required pages from the website strategy.

/ (Homepage)
├── /masterplan                 # Interactive Leaflet interface
├── /zones                      # Note: Marketed as "Districts" on the frontend
│   └── /[slug]                 # e.g., /zones/residential-district
├── /opportunities
│   └── /[slug]                 # e.g., /opportunities/waterfront-villa-plot
├── /infrastructure             # Aggregated view of city-wide systems
├── /about-city                 # Vision, philosophy, and masterplan narrative
├── /about-heri-homes           # Developer track record and leadership
├── /contact                    # Primary Consultation capture
└── /thank-you                  # Deterministic conversion terminus

### 3. Page-to-Entity Mapping

#### 3.1 `app/page.tsx` (Homepage)

* **Purpose:** Establish scale, vision, and funnel entry.
* **Data Sources:** CMS aggregates (Featured Zones, Featured Opportunities, City Stats).
* **Core Components:** Cinematic Hero, Vision Statement, Scale Metrics Band, Masterplan Teaser, Opportunity Preview, Integrated Sustainability Highlights.

#### 3.2 `app/masterplan/page.tsx` (Interactive Masterplan)

* **Purpose:** The primary spatial exploration interface.
* **Data Sources:** Local `geojson` files; CMS `Zone` and `Landmark` entities.
* **Core Components:** Custom Leaflet Map (pan/zoom/hover engine), pulsing SVG landmark pins, District Drawer. No advanced GIS libraries permitted.

#### 3.3 `app/zones/[slug]/page.tsx` (District Detail Page)

* **Purpose:** Present the functional zone (Residential, Commercial, Leisure, etc.).
* **Data Sources:** Fetches `Zone` by slug; associated `Opportunity`, `InfrastructureItem`, and `PanoramaScene` entities.
* **Core Components:** Offset asymmetrical grid layout, embedded 360-panorama viewer, infrastructure icon grid, gated opportunity cards.

#### 3.4 `app/opportunities/[slug]/page.tsx` (Opportunity Detail Page)

* **Purpose:** The commercial conversion node.
* **Data Sources:** Fetches `Opportunity` by slug.
* **Public View Components:** Apple-inspired meta bar (Asset Class, Plot Size, Zoning), strategic benefits, Before/After Slider, blurred financial ROI table.
* **Gated View Components (Requires Unlock):** Unblurred financial dossier, detailed unit pricing, explicit "Speak With Our Investment Team" CTA.

#### 3.5 `app/infrastructure/page.tsx` (Infrastructure Page)

* **Purpose:** Demonstrate systems supporting long-term value.
* **Data Sources:** Fetches all `InfrastructureItem` and `Landmark` entities.
* **Core Categories:** Transportation, Smart Tech, Marine Assets, Landmarks (Sanctus Tower, The Conservatory).

#### 3.6 Corporate Pages (`/about-city` & `/about-heri-homes`)

* **Purpose:** Establish credibility, long-term vision, and developer track record.
* **Components:** Editorial text layouts (utilizing `container-narrow` for optimal reading), cinematic imagery, leadership profiles.

---
