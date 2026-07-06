# Sanctus Gardens City (SGC)

## Content & Asset Inventory Specification (Phase 1 MVP)

### Purpose

## Content & Asset Inventory Specification

This document catalogs the exact media, geospatial, and documentary assets required to construct the Sanctus Gardens City Investment Discovery Platform (Phase 1 MVP). It defines what content must be ingested into the Sanity CMS, processed via Cloudinary, and delivered to the Next.js frontend.

Coding agents must use this inventory to understand the expected data structures, placeholder requirements, and asset associations for Business Town One (BT-1).

---

### 1. Geospatial & Topographical Assets (Leaflet Engine)

These assets feed the `MasterplanMap` component. They dictate the mathematical rendering of the city layout.

* **Base Topography Tiles:** Custom-styled vector map tiles covering the Ogbogoro community and the Bight of Bonny tributary.
* **Zone Polygons:**
* `bt1-zone-polygon.geojson`: The primary MVP bounding box (Months 0-36).
* *(Future Phases)*: `eden-marina-polygon.geojson`, `bt2-zone-polygon.geojson`, `still-waters-polygon.geojson`.

* **Infrastructure Polylines:**
* `bt1-pedestrian-pathways.geojson`
* `bt1-bicycle-lanes.geojson`
* `bt1-smart-grids.geojson`

* **Entity Marker Iconography (SVG):** Custom vector map pins for each asset class (Macro-Infrastructure, Commercial, Residential, Civic). Default mapping pins are prohibited.

---

### 2. High-Fidelity Architectural Renders

These assets feed the `OpportunityCard` and `OpportunityDetail` components. All structural renders must be formatted as optimized WebP or AVIF files.

#### 2.1 Macro-Infrastructure Nodes

* **Lapis Lazuli Aquatic Centre:** Exterior renders, water park overview, aquarium layout.
* **The Table (Medical Centre):** Exterior campus flow, architectural massing.
* **PS Ninety9 (Technical Institute):** Campus overview, research facility exteriors.
* **4 Rivers (Utilities):** Smart grid infrastructure representations.
* **Help Stone (City Service Hub):** Operational center exterior.

#### 2.2 Commercial & Mixed-Use Vehicles

* **Brews 132:** Mixed-use nodes a, b, c, d, and e (incorporating residences and hotels).
* **US-25:** 5 distinct nodes blending office space and residential units.
* **Deutey-Eight 18:** Office and hospitality hybrid renders.

#### 2.3 Residential Investment Portfolios

* **Lush Beam Apartments:** Facade, lobby, and amenity renders covering the 8-building portfolio (Studios and 2-bedroom configurations).
* **Floating Gardens:** Exterior renders of the 10 terraced houses and 5 4-bedroom duplexes.
* **Halcyon Villas:** Exterior architecture and landscaping.

#### 2.4 Civic, Retail, and Leisure Nodes

* **Educational:** Creation (Primary School), Uchechukwu (Secondary School).
* **Retail & Lifestyle:** Fat Things on Lees (Supermarket), Pause Play (Indoor Gaming Centre).
* **Civic & Wellness:** Stormless (Civic Centre), The Citadel (Worship Centre), Children's Bread (City Clinic), Meadow (Public Park).
* **Logistics:** Shadow (Parking Building).

#### 2.5 Skyline Anchors (Background / Skybox Assets)

* **Sanctus Tower:** 325-meter skyscraper renders.
* **The Conservatory:** Mangrove and ecosystem preservation structures.
* *Note:* These must appear in background compositions to establish macro-economic scale, even if their specific investment gates are deferred to later phases.

---

### 3. Immersive Panoramic Media (Pannellum Engine)

These assets drive the 360-degree interactive viewer. Raw equirectangular JPGs must be processed into multiresolution tiles via `generate-panorama.py`.

* **BT-1 Aerial Skybox (MVP Requirement):** One ultra-high-resolution (8K minimum) spherical panorama. Must be positioned at a high altitude offering a sweeping 360-degree view of the Bight of Bonny tributary and the overlaid architectural massing of Business Town One.
* **Interior Nodes (Post-MVP):** Ground-level spherical renders for gated interior galleries (e.g., Lapis Lazuli interior, Lush Beam unit walkthroughs).

---

### 4. Transformation Media (Before / After Slider)

These assets drive the visual transformation storytelling component.

* **Constraint:** The Before and After image pairs must possess identical pixel dimensions and a strict `16:9` aspect ratio. The component will not auto-crop mismatched files.
* **Before Image:** High-resolution drone photography of the current, undeveloped Ogbogoro marshland/terrain.
* **After Image:** Pixel-perfect, mathematically aligned architectural overlay of the finalized BT-1 infrastructure from the exact same camera coordinate and focal length.

---

### 5. Documentary & Corporate Narrative Assets

These assets feed the `/about-city` and `/about-heri-homes` editorial pages to establish developer credibility.

* **Executive Leadership Profiles:**
* High-resolution portraiture of Managing Director Uchechukwu Vivian Ajukwu (M.Phil).
* High-resolution portraiture of Chairman Professor Eric Nyarko-Sampson (PhD).

* **Corporate Operations Documentation:**
* High-quality imagery/video of Heri Homes and Properties Limited operational facilities (16c Sani Abacha Road, Port Harcourt) to prove physical presence and vertical integration capability.

* **Cinematic Video (Optional for MVP):** Adaptive bitrate streaming video (MP4/WebM) demonstrating the corporate track record and the Sanctus Gardens City physical site.
