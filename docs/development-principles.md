# Sanctus Gardens City (SGC)

## Engineering Principles & Coding Constitution

### Purpose

This document defines the strict engineering rules governing the Sanctus Gardens City (SGC) codebase. All contributors—including human developers and AI coding agents (Codex, Claude, Cursor, Gemini)—must adhere to these principles.

If a generated implementation violates these principles, the implementation is incorrect, regardless of whether it functions.

---

### Core Philosophy

The platform exists to support business goals. Technology is a tool, not an end goal. Every technical decision must directly improve maintainability, clarity, reliability, user experience, and business outcomes.

### The 20 Engineering Principles

**Principle 1: Business First**
Code must reflect business concepts. Structure the application around entities (`Zone`, `Opportunity`, `Landmark`, `InfrastructureItem`, `PanoramaScene`, `ConsultationLead`). Never structure the application around technical conveniences.

* **Avoid:** `/components`, `/helpers`, `/utils`
* **Enforce:** `/features/zones`, `/features/opportunities`, `/features/panoramas`

**Principle 2: Feature-First Architecture**
The primary organizational model is feature-first. Each feature directory owns its specific components, hooks, validation schemas, services, types, and tests. Avoid monolithic global directories.

**Principle 3: Server Components By Default**
Use React Server Components as the strict default. Only convert to Client Components (`"use client"`) when interaction explicitly requires it.

* **Client Component Use-Cases:** Leaflet maps, Pannellum viewers, GSAP animations, Forms, Drawers, Sliders.

**Principle 4: Mobile First**
Every feature must be designed for mobile screens first (minimum supported width: `320px`). Desktop enhancements are applied secondarily.

**Principle 5: Accessibility Is Required**
Accessibility is a launch blocker. All components must support:

* Keyboard navigation
* Semantic HTML
* Explicit focus states
* Proper ARIA labels
* Sufficient color contrast and screen-reader support

**Principle 6: Type Safety First**
Use TypeScript strictly. The use of `any` is prohibited. Rely on strict `interfaces`, `types`, and validation schemas. All business entities must be rigorously typed.

**Principle 7: Validation At Boundaries**
Never trust user or external input. Validation must occur before any business logic executes. Prefer **Zod** for schema validation. Ensure strict validation at all boundaries: Forms, URL parameters, API requests, CMS payloads, and Database writes.

**Principle 8: No Business Logic In UI**
React components are strictly for rendering. They do not decide business rules. Do not place complex conditionals (e.g., `if (investmentValue > 1000000)`) inside component files. Route business logic to `/services` or `/use-cases`.

**Principle 9: Design System Compliance**
Never hardcode raw pixel values or hex colors within components. Always reference CSS variables defined in the design token architecture.

* **Avoid:** `color: #0F3D2E;`
* **Enforce:** `color: var(--color-primary);`

**Principle 10: Performance Is A Feature**
Minimize JavaScript execution, network requests, and bundle size. Favor server rendering, progressive loading, and lazy loading. Do not import unnecessary third-party libraries.

**Principle 11: Progressive Enhancement**
Core business functionality must function before heavy enhancements load. The site must remain usable if GSAP, Analytics, or Monitoring scripts fail.

**Principle 12: Media Must Be Optimized**
Large assets must never be shipped unoptimized. Utilize Cloudinary transformations, responsive image delivery, and modern formats (`WebP`, `AVIF`).

**Principle 13: Panorama Performance First**
Never load full-resolution 8K panoramas directly in production. All panoramas must be processed via the `generate.py` script into multiresolution tile sets. Enforce progressive, tile-based delivery optimized for mobile bandwidth.

**Principle 14: Maps Must Remain Lightweight**
The Phase 1 mapping stack is exclusively **Leaflet**. Do not introduce heavy GIS engines (Cesium, MapLibre) without a formal architecture review. Leaflet is sufficient for the MVP.

**Principle 15: Keep MVP Lean**
Before adding any new dependency, ask: *What specific business problem does this solve?* If there is no clear answer, reject the dependency.

**Principle 16: Analytics Must Be Intentional**
Track events only if they answer specific business questions (e.g., `zone_view`, `investment_gate_open`, `consultation_submit`). Do not track vanity metrics like `button_clicked` or random scroll depth.

**Principle 17: Monitoring Must Not Block Delivery**
Telemetry and monitoring tools (PostHog, Sentry, Arcjet) are enhancements. They must not become blockers for the MVP launch.

**Principle 18: Secure By Default**
Assume all public inputs are hostile. Validate all submissions. Use environment variables exclusively. Never expose service keys, secrets, or internal endpoints to the client bundle.

**Principle 19: Documentation Is Part Of The Product**
Undocumented work is incomplete work. Every completed feature requires a corresponding update to the `progress-tracker.md`, architectural documentation, and relevant specifications.

**Principle 20: Simplicity Wins**
Prefer simple, clear, and maintainable code over clever, complex, and over-engineered abstractions. Future developers must be able to understand the system instantly.

---

### Definition Of Success

A successful implementation is:

* Easy to understand
* Easy to extend
* Easy to debug
* Fast on mobile networks
* Aligned directly with business conversion goals

A successful implementation is **not**:

* Technically "clever" or impressive for the sake of it
* Overly abstract
* Chasing architectural fashion

**Final Rule:** When faced with multiple solutions, choose the simplest solution that fully satisfies the business requirement. Complexity must be earned, never assumed.
