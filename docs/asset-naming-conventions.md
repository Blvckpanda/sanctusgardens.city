# Sanctus Gardens City (SGC)

## Content & Asset Inventory Specification (Phase 1 MVP)

### Purpose

This document defines the strict asset requirements, media processing pipelines, and programmatic storage taxonomy for the Sanctus Gardens City MVP. It ensures all visual, spatial, and documentary assets are formatted, optimized, and mapped precisely to the business data model prior to frontend integration.

---

### 1. Programmatic Cloudinary Taxonomy

All media assets must be stored centrally in Cloudinary using deterministic folder structures linked to Supabase/Sanity database IDs. The `public/` directory in the Next.js repository is strictly reserved for static system assets (e.g., favicons, manifest files) and locally generated panorama tiles.

| Asset Category | Cloudinary Path Structure | Permitted Formats | Optimization Strategy |
| --- | --- | --- | --- |
| **Zone Overlays** | `sgc/zones/{zone_id}/overlays/` | WebP, SVG | Lossless vector compression, Next.js auto-format |
| **Opportunity Renders** | `sgc/opportunities/{opportunity_id}/renders/` | WebP, AVIF | High-fidelity, responsive breakpoint sizing (`next/image`) |
| **Immersive Panoramas** | `sgc/panoramas/{scene_id}/equirect/` | JPG (Equirectangular) | Deep zoom tiling for Pannellum rendering |
| **Before/After Sliders** | `sgc/components/slider/{node_id}/` | WebP | Exact pixel dimension matching, strict aspect ratio |
| **Corporate Media** | `sgc/brand/documentary/` | MP4, WebM | Adaptive bitrate streaming, optimized delivery |

---

### 2. Media Processing Pipelines

The frontend architecture explicitly prohibits loading raw, massive assets directly into the browser.

#### 2.1 Panorama Processing Pipeline (Strict Rule)

Never load full-resolution 8K panoramas directly. They must pass through the following tile-generation pipeline:

1. **Extraction/Stitching:** Raw drone footage is processed via FFmpeg and Hugin into an equirectangular image.
2. **Tiling:** Execute `generate-panorama.py` locally against the equirectangular source.
3. **Output:** The script generates a multiresolution folder of square tiles (e.g., `/1/f/1/1.jpg`).
4. **Deployment:** The resulting tile directory is uploaded to `public/panoramas/{scene_id}/` (or the CDN) for Pannellum consumption.

#### 2.2 Before/After Slider Pipeline

The Before/After component relies on exact image alignment.

1. **Constraint:** The "Before" (Ogbogoro marshland/terrain) and "After" (architectural render) images MUST share identical pixel dimensions and a `16:9` aspect ratio.
2. **Rejection:** The frontend component is not responsible for cropping or aligning mismatched images. Mismatched pairs must be rejected at the CMS level before publishing.

---

### 3. MVP Asset Requirements

The following specific assets must be procured, processed, and mapped for the **Business Town One (BT-1)** vertical slice.

#### 3.1 Geospatial & Topographical Data

Required for the `MasterplanMap.tsx` component.

* **Base Topography:** Custom-styled vector tiles for the Ogbogoro community and Bight of Bonny tributary.
* **Zone Polygon:** `bt1-zone-polygon.geojson` (Extracted mathematically via QGIS).
* **Infrastructure Polylines:** GeoJSON linestrings for BT-1 pedestrian pathways, dedicated bicycle lanes, and smart energy grids.
* **Entity Markers (SVG):** Custom SVG iconography for Macro-Infrastructure, Commercial nodes, Residential portfolios, and Civic institutions. Default map pins are banned.

#### 3.2 High-Fidelity Architectural Renders

Required for Opportunity Detail and Zone pages. Must be uploaded to `sgc/opportunities/{opportunity_id}/renders/`.

* **Macro-Infrastructure:** Lapis Lazuli Aquatic Centre, The Table (Medical Centre), PS Ninety9 (Technical Institute), 4 Rivers (Utilities), Help Stone (City Service Hub).
* **Mixed-Use/Commercial:** US-25, Brews 132, Deutey-Eight 18.
* **Residential Portfolios:** Lush Beam Apartments (exterior/interior), Floating Gardens (terraces/duplexes), Halcyon Villas.
* **Civic/Retail:** Fat Things on Lees (Supermarket), Stormless (Civic Centre), The Citadel (Worship Centre), Meadow (Public Park).
* **Skyline Anchors:** 325m Sanctus Tower and The Conservatory. Even if slated for future phases, these must be present in backgrounds/skyboxes to establish macroeconomic scale.

#### 3.3 Immersive Panoramas

Required for the `Pannellum` viewer components.

* **BT-1 Aerial Skybox:** Minimum 1x 8K equirectangular image positioned at a high altitude over the BT-1 footprint, encompassing the tributary and architectural massing.
* **Interior Nodes (Optional for MVP):** Ground-level spherical renders for gated interior galleries (e.g., Lapis Lazuli interior or Lush Beam unit).

#### 3.4 Documentary & Corporate Narrative

Required for the `/about` corporate routing. Must be uploaded to `sgc/brand/documentary/`.

* **Executive Profiles:** High-resolution portraiture and video interviews with Managing Director Uchechukwu Vivian Ajukwu and Chairman Prof. Eric Nyarko-Sampson.
* **Corporate Documentation:** Heri Homes operational facility imagery (16c Sani Abacha Road, Port Harcourt) to establish physical corporate presence and track record.

---

### 4. Content State & Governance Protocol

All assets must clear a validation check before being attached to a `Zone` or `Opportunity` entity in the Sanity CMS.

* **Validation Check 1 (Format):** Are standard images WebP/AVIF? Are vectors SVG? Are panoramas mathematically tiled?
* **Validation Check 2 (Weight):** Do Opportunity renders exceed 500KB? If yes, re-compress via Cloudinary edge transformations.
* **Validation Check 3 (Metadata):** Are descriptive `alt` tags and EXIF data (where applicable) populated for SEO and Accessibility (WCAG AA) compliance?
