# Sanctus Gardens City (SGC)

## Technical SEO & Metadata Strategy (Phase 1 MVP)

### Purpose

This document defines the strict Next.js 14 App Router metadata generation protocols, Open Graph (OG) dynamic routing, and search crawler directives for the Sanctus Gardens City Investment Discovery Platform. Content SEO (blog writing) is out of scope. This is a technical engineering specification.

---

### 1. Global Metadata Configuration

The root `app/layout.tsx` must define the absolute fallback metadata. Do not hardcode these values in individual page files.

* **Base URL:** Must utilize the `metadataBase` property in Next.js 14 to ensure all relative URLs resolve to the absolute production domain.
* **Global Robots Directive:** `index, follow` (overridden conditionally on gated routes).
* **Site Name Template:** `%s | Sanctus Gardens City`

### 2. Programmatic Metadata Generation (`generateMetadata`)

Static `<head>` tags are prohibited on dynamic routes. Metadata for `/zones/[slug]` and `/opportunities/[slug]` must be generated programmatically using the Next.js `generateMetadata` API, querying the Sanity CMS schema.

#### 2.1 Opportunity Entity Mapping

When a user shares an Opportunity link (e.g., "Lush Beam Apartments" or "Lapis Lazuli Aquatic Centre"), the OG tags must dynamically extract financial and spatial parameters from the database.

* **`og:title`**: `{Opportunity.title} | {Zone.nomenclature}`
* **`og:description`**: Extracted strictly from the Opportunity `summary` field (max 155 characters).
* **`og:image`**: Must pull the optimized Cloudinary URL from `hero_image_url`. Do not use default site logos for specific entity routes.

#### Example Implementation Constraint

```typescript
// app/opportunities/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const opportunity = await getOpportunityBySlug(params.slug);
  
  return {
    title: opportunity.title,
    description: opportunity.summary,
    openGraph: {
      images: [{ url: opportunity.hero_image_url, width: 1200, height: 630 }],
    },
  };
}

```

### 3. Canonicalization & Gated Content Rules

The platform partitions high-value financial data behind the `Investment Gate`. This creates indexing risks if state changes alter the URL.

* **Single URL Rule:** The unlocked state of an Opportunity must **not** generate a new URL or append query parameters (e.g., no `?unlocked=true`). The `/opportunities/[slug]` route must serve as the strict canonical URL regardless of the user's lead state.
* **Crawler Visibility:** Search engine crawlers (Googlebot) must only index the public-facing DOM elements (Title, Asset Class, Overview, Before/After teaser). The React components housing the gated financial dossier (`total_project_cost`, interior galleries) must not render into the server-side DOM until the Supabase lead capture validation passes on the client.
* **Noindex Exclusions:** The `/thank-you` route and any raw Cloudinary PDF brochure links must strictly implement `<meta name="robots" content="noindex, nofollow">`.

### 4. Schema.org Structured Data (JSON-LD)

JSON-LD structured data must be injected into the `<head>` of entity pages to provide semantic context to search engines.

* **Homepage (`/`):** Use the `RealEstateAgent` and `Organization` schemas defining Heri Homes and Properties Limited, mapping the exact Port Harcourt physical address.
* **Opportunities (`/opportunities/[slug]`):** Use the `InvestmentOrDeposit` or `RealEstateListing` schema (depending on the `asset_class`). Must include the spatial coordinates inherited from the `Zone`.
