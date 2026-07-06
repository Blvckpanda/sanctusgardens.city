# Sanctus Gardens City (SGC)

## Engineering Architecture Blueprint

### Purpose and Scope

This document defines the high-level engineering architecture for the Sanctus Gardens City Investment Discovery Platform (Phase 1 MVP). It dictates system boundaries, service ownership, data flow, and deployment strategies.

**It does not define:**

* Folder structures (See `development-principles.md`)
* Database schemas (See `content-models.md`)
* UI/UX constraints (See `design-system.md`)

---

### Core Architecture Principles

1. **Simplicity Over Complexity:** Favor the simplest architecture that delivers the business outcome. Complexity must be earned by demonstrated product needs.
2. **Content-First Delivery:** The infrastructure exists to serve high-fidelity media and spatial data instantaneously.
3. **Mobile-First Execution:** Performance budgets and interaction patterns prioritize mobile devices on 3G/4G networks.

---

### System Architecture & The Tech Stack

The platform utilizes a decoupled, serverless architecture optimized for edge delivery and headless content management.

#### 1. Frontend Layer

* **Framework:** Next.js (App Router)
* **Language:** TypeScript (Strict Mode)
* **Styling:** Tailwind CSS v4 + shadcn/ui
* **Motion:** Framer Motion & GSAP
* **Rendering Strategy:** React Server Components (RSC) by default. Client Components (`"use client"`) are strictly reserved for interactive leaves (Leaflet, Pannellum, Drawers, Forms).

#### 2. Backend & Data Layer

* **Primary Database:** Supabase (PostgreSQL)
* **Scope:** Owns business logic, data persistence, and validation for Consultation Leads and Investment Requests.
* **Security:** Row Level Security (RLS) enforces strict write-only policies for public lead capture forms.

#### 3. Content Management Layer

* **CMS:** Sanity Studio
* **Scope:** Owns all relational business entities (Zones, Opportunities, Landmarks, Infrastructure Items, Panorama Scenes).
* **Delivery:** Content is fetched server-side via GROQ queries during Next.js build and revalidation phases.

#### 4. Media & Asset Layer

* **Platform:** Cloudinary
* **Scope:** Owns all heavy visual assets (Renders, Drone Imagery, Panorama Equirectangular images).
* **Constraint:** The `/public/uploads` directory is strictly banned for production media. All media must utilize Cloudinary transformations and responsive delivery (`WebP`, `AVIF`).

#### 5. Spatial & Immersive Layer

* **2D Mapping:** Leaflet (Client-side rendering via GeoJSON). Banned alternatives for Phase 1: Cesium, MapLibre, heavy GIS engines.
* **3D Panoramas:** Pannellum. Banned approach: Loading raw 8K images. All panoramas must be processed into multiresolution tile sets via `generate-panorama.py`.

---

### Data Flow & Lead Capture Routing

The platform operates as a secure funnel designed to capture qualified investor leads.

**The Routing Sequence:**

1. **Visitor Interaction:** Visitor views gated Opportunity data or requests a consultation.
2. **Security Check:** Form payload is validated client-side via Zod and screened for bot activity via **Arcjet**.
3. **Data Persistence:** Sanitized payload is securely written to the Supabase `consultation_leads` table via server actions.
4. **Notification Routing:** Supabase edge functions or Next.js server actions trigger **Resend** to dispatch transactional emails to the Heri Homes Sales Team.
5. **Client Response:** Visitor is routed to a deterministic Success/Thank You state.

---

### Telemetry, Analytics & Security

* **Analytics (PostHog):** Deployed strictly for funnel conversion tracking (e.g., `masterplan_view` -> `opportunity_view` -> `consultation_submit`). Vanity metrics (scroll depth, generic clicks) are banned.
* **Monitoring (Sentry):** Captures runtime errors and frontend bundle failures.
* **Security (Arcjet):** Provides rate limiting, abuse prevention, and bot protection on all exposed lead capture endpoints.

---

### Hosting, CI/CD, and Environments

#### Hosting Infrastructure

* **Frontend / Edge:** Vercel
* **Database / Backend:** Supabase Cloud
* **Media CDN:** Cloudinary

#### Deployment Pipeline

1. Branch created from `main`.
2. Pull Request submitted.
3. Automated checks (ESLint, Prettier, TypeScript compilation) execute.
4. Vercel generates a secure Preview Deployment.
5. Upon approval, PR merges into `main`.
6. Vercel automatically deploys to Production.

#### Environment Strategy

* `Local`: Developer machines.
* `Preview`: Vercel branch deployments (staging).
* `Production`: Live SGC platform.
* *Constraint: Avoid provisioning additional staging environments until operational scale mandates it.*

---

### Performance Targets

The following metrics are launch-blockers. Failure to meet these thresholds during MVP hardening will prevent deployment.

* **Largest Contentful Paint (LCP):** `< 2.5s`
* **Initial Page Load:** `< 3.0s` on simulated mobile networks.
* **Panorama Tile Load:** First-tile resolution in `< 2.0s` on 4G connections.

---

### Architectural Non-Goals (Out of Scope for Phase 1)

The following architectures and paradigms are strictly prohibited in the MVP build to prevent scope creep:

* Microservices or Kubernetes clusters
* Event-driven message brokers (Kafka, RabbitMQ)
* Real-time smart city IoT telemetry integrations
* Fully operational Digital Twin simulations
* Advanced GIS analytics platforms
* Investor portals with user authentication
* Payment gateways or financial transaction processing
