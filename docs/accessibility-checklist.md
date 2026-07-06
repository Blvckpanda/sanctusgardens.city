# Sanctus Gardens City (SGC)

## Component-Specific Accessibility (A11y) Checklist

### Purpose

This document establishes the strict WCAG 2.1 AA compliance rules required for the highly interactive, non-standard components of the SGC platform. Generic accessibility advice is omitted in favor of component-specific ARIA engineering directives.

---

### 1. Interactive Masterplan (Leaflet Integration)

Standard map libraries are inherently hostile to keyboard users. The Leaflet implementation must be augmented.

* **Keyboard Focus:** Every interactive `Zone` polygon (e.g., Business Town One) and `Landmark` SVG marker must receive a `tabindex="0"`.
* **ARIA Labels:** Polygons cannot be read by screen readers. Each interactive map path must contain an `aria-label` dynamically populated by the Sanity entity title (e.g., `aria-label="Explore Business Town One Zone"`).
* **Interaction Event:** Pressing the `Enter` or `Space` key while a polygon is focused must trigger the exact same `onClick` event that opens the Zone Drawer.

### 2. Immersive Panoramas (Pannellum Viewer)

3D `<canvas>` elements cannot be parsed by screen readers and trap keyboard focus.

* **Bypass Link:** A visually hidden "Skip 360 Panorama" link must be placed immediately before the Pannellum container, allowing screen-reader and keyboard users to bypass the canvas trap.
* **Hotspot Focus:** If Pannellum SVG hotspots are utilized, they must be injected into the DOM overlay (not flattened into the WebGL canvas) with explicit `button` roles, `tabindex="0"`, and `aria-label` attributes denoting their destination (e.g., `aria-label="Navigate to Lush Beam Exterior"`).

### 3. Modals, Drawers, and Gated Flows

The `Zone Drawer` and `Investment Gate` modal govern the primary conversion path. Their accessibility implementation is a launch blocker.

* **Focus Trapping:** When the Investment Gate or Zone Drawer opens, a React focus lock mechanism must trap the `Tab` key iteration strictly within the modal. Focus must not leak to the underlying page.
* **ARIA Roles:** The container must possess `role="dialog"` and `aria-modal="true"`.
* **Background Obfuscation:** The underlying `<main>` document must receive `aria-hidden="true"` while the modal/drawer is active so screen readers do not read the background content.
* **Escape Hook:** Pressing the `Escape` key must immediately unmount the drawer/modal and return the cursor focus to the exact button that originally triggered the opening event.

### 4. Forms and Consultation Leads

* **Programmatic Association:** Every `<input>` must possess a unique `id` that is strictly bound to its corresponding `<label>` via the `htmlFor` attribute. Implicit wrapping (e.g., `<label><input/></label>`) is not sufficient.
* **Error State Feedback:** If Zod validation fails, the input must dynamically receive `aria-invalid="true"`.
* **Error Description:** Error text (e.g., "A valid corporate email is required") must be linked to the input via `aria-describedby` to ensure screen readers announce the exact reason for the validation failure. Do not rely exclusively on the `--color-error` red border.
