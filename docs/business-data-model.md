# Sanctus Gardens City (SGC)

## Business Data Model Specification

### Purpose

This document defines the definitive business entities for the Sanctus Gardens City Investment Discovery Platform. It establishes the ontological architecture that governs the Supabase database schema, Sanity CMS models, and TypeScript interfaces.

All technical systems, UI components, and API routes must map directly to these six core entities.

---

### Modeling Principles

1. **Spatial Truth Over Marketing Fluff:** The system models strict physical geography ("Zone"). Marketing labels ("Commercial", "Residential") are applied as metadata abstractions, not as structural geographic boundaries.
2. **Opportunities as Financial Nodes:** An "Opportunity" is a structured financial vehicle targeting capital acquisition, not a generic property listing.
3. **Data-Driven Presentation:** Visual rendering (e.g., Map Leaflet polygons, UI colors) derives dynamically from the database state, never from hardcoded frontend logic.

---

### Core Business Entities

#### 1. Zone (The Spatial Container)

The macro-level spatial bounding box governing a specific development phase of the city. It organizes all other entities into a coherent geographic location.

* **Database Key:** `zone_id` (UUID)
* **Attributes:**
* `nomenclature` (String): Official title (e.g., "Business Town One", "Eden Marina").
* `geographic_boundary` (GeoJSON Polygon): Mathematical perimeter consumed by Leaflet to render the map layer.
* `total_hectares` (Float): Precise land allocation.
* `development_timeline` (IntegerRange): Month spread for development (e.g., 0-36).
* `projected_population` (Integer): Aggregated demographic target.
* `marketing_abstraction` (String Array): Presentation tags (e.g., `["Commercial", "Innovation"]`) used for frontend filtering.

* **Relationships:**
* Contains `[0..n]` Opportunities
* Contains `[0..n]` Landmarks
* Contains `[0..n]` InfrastructureItems
* Contains `[1..n]` PanoramaScenes

* **Lifecycle States:** `Draft` → `Planned` → `Featured` → `Archived`

#### 2. Opportunity (The Commercial Node)

A discrete physical structure, portfolio, or infrastructural project actively positioned for capital acquisition, partnership, or commercial deployment.

* **Database Key:** `opportunity_id` (UUID)
* **Attributes:**
* `zone_id` (UUID - Foreign Key): Strict spatial assignment.
* `title` (String): Commercial name (e.g., "Lapis Lazuli Aquatic Centre", "Lush Beam Apartments").
* `asset_class` (Enum): `Macro-Infrastructure`, `Commercial`, `Residential`, `Civic`.
* `total_project_cost` (Decimal): Capitalization requirement (e.g., 70715825.00).
* `spatial_coordinates` (Point): Precise geographic centroid for map marker placement.
* `leed_edge_target` (Boolean): Flags contribution to Platinum sustainability certification.
* `gated_access` (Boolean): Dictates if detailed financial matrices require passing the Investment Gate.

* **Relationships:**
* Belongs to exactly `[1]` Zone.
* Generates `[0..n]` ConsultationLeads.

* **Lifecycle States:** `Conceptual` → `Active Funding` → `In-Development` → `Operational`

#### 3. Landmark (The Navigational Anchor)

Iconic structures defining the city skyline and establishing geographic permanence. They anchor the digital map and orient the user's psychological geography without explicitly seeking direct capital acquisition.

* **Database Key:** `landmark_id` (UUID)
* **Attributes:**
* `zone_id` (UUID - Foreign Key)
* `title` (String): e.g., "Sanctus Tower", "The Conservatory".
* `architectural_height` (Integer): Vertical scale in meters (e.g., 325).
* `footprint_sqm` (Integer): Land consumption.
* `spatial_coordinates` (Point): Geographic centroid.

* **Relationships:**
* Exists within `[1]` Zone.

* **Lifecycle States:** `Planned` → `Featured` → `Archived`

#### 4. InfrastructureItem (The Functional Artery)

The foundational technological and ecological systems enabling the city's operation. Documented as discrete entities to support the investment narrative with quantified data.

* **Database Key:** `infrastructure_id` (UUID)
* **Attributes:**
* `category` (Enum): `Transportation`, `Marine`, `Technology`, `Sustainability`, `Utilities`.
* `title` (String): e.g., "Monorail System", "Smart Grid".
* `description` (Text): Engineering and capability description.
* `iot_enabled` (Boolean): System integration with city-wide telemetry.
* `carbon_offset` (Decimal): Metric tracking contribution to net-zero status.

* **Relationships:**
* Linked to `[1..n]` Zones (Many-to-Many architecture permitted for infrastructure spanning multiple zones).

* **Lifecycle States:** `Planned` → `Active` → `Retired`

#### 5. PanoramaScene (The Experiential Interface)

A mathematically defined 360-degree viewpoint tied to a location within the project, utilizing the Pannellum renderer to influence investment psychology.

* **Database Key:** `scene_id` (UUID)
* **Attributes:**
* `zone_id` (UUID - Foreign Key)
* `opportunity_id` (UUID - Foreign Key): Nullable. Used only if the panorama is an interior view of a specific opportunity.
* `pitch_yaw_default` (JSON): Strict Cartesian coordinates (angle/tilt) for initial camera load.
* `hotspots` (JSONB Array): Dynamic injection points for SVG navigation and information markers.

* **Relationships:**
* Belongs to `[1]` Zone.

* **Lifecycle States:** `Draft` → `Published` → `Archived`

#### 6. ConsultationLead (The Conversion Mechanism)

The ultimate, measurable conversion goal of the platform. A secured record of an entity expressing active financial interest, tethered directly to their navigational context at the moment of inquiry.

* **Database Key:** `lead_id` (UUID)
* **Attributes:**
* `opportunity_id` (UUID - Foreign Key): Nullable. Indicates the exact node that triggered the conversion.
* `capture_timestamp` (DateTime): UTC server timestamp.
* `investor_profile` (Enum): `Institutional Fund`, `Corporate Real Estate`, `High-Net-Worth Individual`, `Strategic Partner`.
* `inquiry_type` (Enum): `Full Acquisition`, `Floor Lease`, `Joint Venture`, `General Inquiry`.
* `contact_payload` (JSONB): Encrypted data packet containing Name, Email, Phone, Organization, and explicit consent tracking.

* **Relationships:**
* References `[0..1]` Opportunity.
* References `[0..1]` Zone.

* **Lifecycle States:** `Created` → `Qualified` → `Contacted` → `Converted` → `Closed`

---

### Strict Business Rules (System Invariants)

* **BR-001:** Every Opportunity MUST belong to exactly one Zone. Orphaned opportunities are prohibited.
* **BR-002:** Every PanoramaScene MUST belong to exactly one Zone.
* **BR-003:** A ConsultationLead CAN exist without an Opportunity reference (e.g., generated from the global Contact page), but MUST include the `investor_profile` and `inquiry_type`.
* **BR-004:** Leaflet GeoJSON polygons are exclusively tied to the `Zone` entity. Individual `Opportunity` elements rely strictly on `Point` coordinates for marker generation.

---

### Excluded Entities (Future Scope)

The following data models are strictly out of bounds for Phase 1. Attempting to architect them during the MVP build will result in pull request rejection:

* `UserAccount` / `InvestorProfile` (Authentication)
* `PaymentTransaction` (E-commerce/Financial Ledgers)
* `IoT_Device` / `TelemetryLog` (Live Smart City Data)
* `NewsArticle` (General content marketing blogs)
