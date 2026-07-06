# Sanctus Gardens City (SGC)

## Content & Data Models Specification

### Purpose

This document defines the strict programmatic data structures for the Sanctus Gardens City MVP. It provides the definitive TypeScript interfaces, Sanity CMS schema configurations, and Supabase table definitions for the six core business entities: `Zone`, `Opportunity`, `Landmark`, `InfrastructureItem`, `PanoramaScene`, and `ConsultationLead`.

**Directive:** AI coding agents must use these exact interfaces. Do not invent new fields, rename properties, or flatten relational structures.

---

### Part 1: TypeScript Domain Interfaces

Place these definitions in `src/types/domain.ts`.

```typescript
// -----------------------------------------------------------------------------
// Shared Enums & Types
// -----------------------------------------------------------------------------
export type GeoPoint = { lat: number; lng: number };
export type GeoPolygon = GeoPoint; // Simplified for frontend Leaflet rendering

export type LifecycleState = 
  | 'Draft' 
  | 'Conceptual' 
  | 'Planned' 
  | 'Active Funding' 
  | 'Featured' 
  | 'In-Development' 
  | 'Operational' 
  | 'Archived' 
  | 'Retired';

// -----------------------------------------------------------------------------
// Core Business Entities
// -----------------------------------------------------------------------------

export interface Zone {
  _id: string; // Sanity Document ID
  nomenclature: string; // e.g., "Business Town One"
  slug: string;
  geographic_boundary: GeoPolygon;
  total_hectares: number;
  development_timeline: { start_month: number; end_month: number };
  projected_population: number;
  marketing_abstractions: ('Residential' | 'Commercial' | 'Leisure' | 'Innovation');
  lifecycle_state: LifecycleState;
}

export interface Opportunity {
  _id: string;
  zone_id: string; // Reference to Zone._id
  title: string; // e.g., "Lapis Lazuli Aquatic Centre"
  slug: string;
  asset_class: 'Macro-Infrastructure' | 'Commercial' | 'Residential' | 'Civic';
  total_project_cost: number; // Stored as strict numeric value (e.g., 70715825.00)
  spatial_coordinates: GeoPoint;
  leed_edge_target: boolean;
  gated_access: boolean; // If true, triggers the Investment Gate modal
  lifecycle_state: LifecycleState;
  hero_image_url: string; // Cloudinary Path
}

export interface Landmark {
  _id: string;
  zone_id: string;
  title: string; // e.g., "Sanctus Tower"
  architectural_height_m: number; // e.g., 325
  footprint_sqm: number;
  spatial_coordinates: GeoPoint;
  lifecycle_state: LifecycleState;
}

export interface InfrastructureItem {
  _id: string;
  category: 'Transportation' | 'Marine' | 'Technology' | 'Sustainability' | 'Utilities';
  title: string; // e.g., "Monorail System"
  description: string;
  iot_enabled: boolean;
  carbon_offset_metric: number;
  zone_references: string; // Array of Zone._ids
  lifecycle_state: LifecycleState;
}

export interface PanoramaScene {
  _id: string;
  zone_id: string;
  opportunity_id?: string; // Optional: Only if it's an interior view of an Opportunity
  scene_identifier: string; // Maps to Cloudinary folder (e.g., 'bt1-macro-01')
  pitch_yaw_default: { pitch: number; yaw: number; hfov: number };
  hotspots: Array<{
    id: string;
    type: 'navigation' | 'information';
    pitch: number;
    yaw: number;
    target_scene_id?: string; // For navigation
    content_payload?: string; // For information
  }>;
  lifecycle_state: LifecycleState;
}

// -----------------------------------------------------------------------------
// Transactional Entities (Supabase)
// -----------------------------------------------------------------------------

export interface ConsultationLead {
  lead_id: string; // UUID
  opportunity_id: string | null; // Nullable if general inquiry
  capture_timestamp: string; // ISO 8601
  investor_profile: 'Institutional Fund' | 'Corporate Real Estate' | 'High-Net-Worth Individual' | 'Strategic Partner';
  inquiry_type: 'Full Acquisition' | 'Floor Lease' | 'Joint Venture' | 'General Inquiry';
  contact_payload: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    organization: string;
    consent_granted: boolean;
  };
}

```

---

### Part 2: Sanity CMS Schema Architecture

All relational data (Zones, Opportunities, Landmarks, Panoramas, Infrastructure) is authored in Sanity Studio. Use the modern `defineType` and `defineField` APIs.

#### Example: Opportunity Schema (`schemas/opportunity.ts`)

```javascript
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'opportunity',
  title: 'Opportunity',
  type: 'document',
  fields:,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'asset_class',
      title: 'Asset Class',
      type: 'string',
      options: {
        list:,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'total_project_cost',
      title: 'Total Project Cost (USD)',
      type: 'number',
      description: 'Exact capital requirement (e.g., 70715825 for Lapis Lazuli)',
    }),
    defineField({
      name: 'leed_edge_target',
      title: 'LEED/EDGE Platinum Target',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'gated_access',
      title: 'Gated Financial Data',
      type: 'boolean',
      description: 'Requires user to pass the Investment Gate to view details.',
      initialValue: true,
    }),
    defineField({
      name: 'lifecycle_state',
      title: 'Lifecycle State',
      type: 'string',
      options: {
        list:,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'asset_class',
    },
  },
});

```

---

### Part 3: Supabase Database Schema

The `consultation_leads` table is the only transactional table required for Phase 1. Do not sync CMS data (Zones/Opportunities) into Supabase.

#### Migration Script: `001_create_consultation_leads.sql`

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Lead Table
CREATE TABLE public.consultation_leads (
    lead_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    opportunity_id VARCHAR(255), -- References Sanity Document ID, not a Supabase FK
    zone_id VARCHAR(255),
    capture_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    investor_profile VARCHAR(50) NOT NULL,
    inquiry_type VARCHAR(50) NOT NULL,
    contact_payload JSONB NOT NULL,
    
    -- Constraint Checks
    CONSTRAINT valid_investor_profile CHECK (investor_profile IN ('Institutional Fund', 'Corporate Real Estate', 'High-Net-Worth Individual', 'Strategic Partner')),
    CONSTRAINT valid_inquiry_type CHECK (inquiry_type IN ('Full Acquisition', 'Floor Lease', 'Joint Venture', 'General Inquiry'))
);

-- Row Level Security (RLS)
ALTER TABLE public.consultation_leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous web clients to insert (Capture Form)
CREATE POLICY "Allow public insert to leads" 
ON public.consultation_leads 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Policy: Prevent anonymous web clients from reading leads
CREATE POLICY "Deny public read access" 
ON public.consultation_leads 
FOR SELECT 
TO anon 
USING (false);

```

---

### Part 4: Data Validation Rules (Zod)

Before data is written to Supabase, it must pass through a strict Zod schema on the Next.js Server Action boundary to prevent payload injection.

```typescript
// src/lib/validations/lead.ts
import { z } from 'zod';

export const ConsultationLeadSchema = z.object({
  opportunity_id: z.string().optional().nullable(),
  investor_profile: z.enum(),
  inquiry_type: z.enum(['Full Acquisition', 'Floor Lease', 'Joint Venture', 'General Inquiry']),
  contact_payload: z.object({
    first_name: z.string().min(2, "First name is required").max(50),
    last_name: z.string().min(2, "Last name is required").max(50),
    email: z.string().email("Invalid corporate email format"),
    phone: z.string().min(7, "Valid phone number required").max(20),
    organization: z.string().min(2, "Organization name is required").max(100),
    consent_granted: z.literal(true, { errorMap: () => ({ message: "You must agree to the privacy policy" }) })
  })
});

```
