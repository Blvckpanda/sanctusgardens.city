# Sanctus Gardens City (SGC)

## Navigation & Routing Map

### Purpose

This document defines the strict navigational pathways, menus, and interaction flows for the user interface. It ensures the user is continuously guided toward the `ConsultationLead` conversion goal without marketplace-style distractions.

### 1. Global Navigation (Header)

The primary navigation bar must remain minimal, sophisticated, and sticky (on scroll-up). Dropdown mega-menus are prohibited.

**Desktop & Mobile Structure:**

* **** -> routes to `/`
* **Masterplan** -> routes to `/masterplan`
* **Infrastructure** -> routes to `/infrastructure`
* **The City** -> routes to `/about-city`
* **The Developer** -> routes to `/about-heri-homes`
* **** "Speak With Our Investment Team" -> routes to `/contact`

*Constraint:* Do not include "Districts" or "Opportunities" in the global header. Users must discover Opportunities by first exploring the Masterplan or District pages, enforcing the "City Before Property" strategy.

### 2. Global Footer

The footer provides secondary routing and legal compliance.

**Structure:**

* **Exploration:**
* Interactive Masterplan -> `/masterplan`
* City Infrastructure -> `/infrastructure`

* **Corporate:**
* About Sanctus Gardens City -> `/about-city`
* About Heri Homes -> `/about-heri-homes`
* Contact Us -> `/contact`

* **Legal:** Privacy Policy, Terms of Service.
* **Contact Data:** 16c Sani Abacha Road, Port Harcourt, Rivers State, Nigeria.

### 3. The Core Conversion Funnel (In-Page Flow)

This is the deterministic, step-by-step pathway hardcoded into the component logic.

**Step 1: Homepage to Masterplan**

* Trigger: "Explore the City" CTA on `/`
* Action: Routes to `/masterplan`

**Step 2: Masterplan to District**

* Trigger: User clicks a pulsing map polygon on `/masterplan`
* Action: Opens the `District Drawer` (frosted cream side-drawer/bottom-sheet).
* Trigger: User clicks "View District Details" inside the drawer.
* Action: Routes to `/zones/[slug]`

**Step 3: District to Opportunity**

* Trigger: User clicks an Opportunity Card on `/zones/[slug]`
* Action: Routes to `/opportunities/[slug]`

**Step 4: Opportunity to Investment Gate**

* Trigger: User clicks Secondary CTA "Unlock Investment Information" on the blurred financial table.
* Action: Triggers `InvestmentGateModal` overlay. Focus is trapped.

**Step 5: Investment Gate to Gated Content**

* Trigger: User submits Name, Email, and Phone number.
* Action: Closes Modal, updates React state, reveals the financial dossier in place.

**Step 6: Ultimate Conversion**

* Trigger: User clicks Primary CTA "Speak With Our Investment Team" inside the newly unlocked dossier.
* Action: Routes to `/contact` with URL parameter `?ref=[opportunity-slug]` to carry context to the Heri Homes sales team.

### 4. Immersive Navigation (Pannellum to Next.js)

Navigation within the 360-panorama operates under strict bidirectional sync rules.

* **Within Scene:** Clicking a gold `Navigation Hotspot` triggers a Pannellum `loadScene` event to move to a new vantage point.
* **Data Reveal:** Clicking a green `Information Hotspot` triggers a UI pop-up over the canvas with infrastructure details.
* **Exit Scene:** The viewer must include a clear "Exit 360 View" overlay button that unmounts the component and returns the user to the standard DOM flow of the parent page.

### 5. Prohibited Navigation Patterns

* **No Breadcrumbs:** Given the shallow architecture, breadcrumbs add visual clutter. Use clear "Back to Masterplan" or "Back to District" text links instead.
* **No Infinite Scroll:** The footer must be reachable on all pages.
* **No Standalone "News" or "Sustainability" in Main Nav:** These are integrated into the core pages for Phase 1 to maintain focus on the investment funnel.
