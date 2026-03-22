# Technical Architecture — FleetGuard AI

**Document version:** 1.0
**Date:** March 2026

---

## 1. System Overview

FleetGuard AI is a three-tier web application:

```text
┌──────────────────────────────────────────────────────────────┐
│  PRESENTATION TIER                                           │
│  React 18 + TypeScript SPA (Vite, port 5173)                │
│  Driver Portal  ·  Manager Portal  ·  Landing Page          │
└────────────────────────┬─────────────────────────────────────┘
                         │ REST / JSON  (Axios + JWT Bearer)
┌────────────────────────▼─────────────────────────────────────┐
│  APPLICATION TIER                                            │
│  Node.js 18 + Express 4  (port 3001)                        │
│  Auth · Inspections · Photos · Vehicles · Manager · GPS     │
└─────────┬────────────────────────────┬────────────────────────┘
          │ pg pool (TCP 5432)         │ HTTP multipart (port 5001)
┌─────────▼──────────┐      ┌──────────▼────────────────────────┐
│  DATA TIER         │      │  AI MICROSERVICE                  │
│  PostgreSQL 15+    │      │  Python 3.8 + Flask               │
│  fleetguard_db     │      │  YOLOv8 damage detection          │
└────────────────────┘      └───────────────────────────────────┘
```

---

## 2. Frontend Architecture

### 2.1 Technology Choices

| Concern | Choice | Rationale |
| --- | --- | --- |
| Framework | React 18 | Mature ecosystem, concurrent rendering |
| Language | TypeScript | Type safety across API contracts |
| Build tool | Vite | Fast HMR, ESM-first, small bundles |
| Styling | Tailwind CSS 4 | Utility-first; consistent dark theme |
| Components | Radix UI + shadcn/ui | Accessible, headless; customisable |
| Routing | React Router v7 | File-structure routing, nested layouts |
| Forms | React Hook Form | Uncontrolled inputs; minimal re-renders |
| HTTP | Axios | Interceptor-based JWT injection |
| Maps | Google Maps JS API | Sri Lanka map data quality |
| i18n | i18next | Runtime language switching; plural rules |
| PDF/Canvas | html2canvas + jsPDF | Client-side PDF without server roundtrip |
| Signatures | signature_pad | Canvas-based signature capture |
| Animations | Framer Motion | Inspection step transitions |
| Toasts | Sonner | Lightweight notification system |

### 2.2 Application Structure

```text
src/
├── app/
│   ├── App.tsx                 # Root router; GoogleOAuthProvider wrapper
│   ├── components/
│   │   ├── ui/                 # 50+ Radix/shadcn primitives
│   │   ├── layout/             # DriverLayout, ManagerLayout (sidebar + header)
│   │   └── common/             # LanguageSwitcher, shared widgets
│   └── pages/
│       ├── landing/            # Public landing page
│       ├── driver/
│       │   ├── auth/           # Login, Signup, ForgotPassword
│       │   ├── inspection/     # 8-step workflow (see §2.3)
│       │   ├── DriverDashboard.tsx
│       │   ├── InspectionHistory.tsx
│       │   └── DriverProfile.tsx
│       └── manager/
│           ├── ManagerDashboard.tsx
│           ├── FleetManagement.tsx
│           ├── SmartAssignment.tsx
│           ├── MapView.tsx
│           ├── AnalyticsDashboard.tsx
│           └── DriverManagement.tsx
├── contexts/
│   └── InspectionContext.tsx   # Shared inspection state across workflow steps
├── services/                   # One module per backend domain
│   ├── authService.js
│   ├── inspectionService.js    # Includes photo upload + AI trigger
│   ├── vehicleService.js
│   ├── managerService.js
│   ├── gpsService.js
│   └── userService.js
├── api/
│   └── api.js                  # Axios instance; JWT interceptor; 401 redirect
├── i18n/
│   └── locales/
│       ├── en.json             # ~526 English keys
│       ├── si.json             # ~526 Sinhala keys
│       └── ta.json             # ~526 Tamil keys
├── types/index.ts              # Shared TypeScript interfaces
└── utils/time.js               # Date formatting helpers
```

### 2.3 Inspection Workflow (8 Steps)

```text
VehicleSelection → CustomerDetails → PhotoCapture → PhotoReview
       → AIProcessing → InspectionResults → DigitalSignatures → ReportGenerated
```

State is held in `InspectionContext` and passed through all steps. Each step is a separate page route. The AI processing step calls `POST /api/inspections/:id/analyze`, polls for completion, and transitions automatically.

### 2.4 Authentication Flow

```text
User submits credentials
        │
        ▼
POST /api/auth/login  ──→  JWT token (8h expiry)
        │
        ▼
Token stored in localStorage
        │
        ▼
Axios interceptor injects  Authorization: Bearer <token>  on every request
        │
        ▼
401 response  ──→  Clear localStorage → redirect /login
```

Google OAuth uses `@react-oauth/google` on the frontend and `google-auth-library` on the backend to verify the ID token.

---

## 3. Backend Architecture

### 3.1 Technology Choices

| Concern | Choice | Rationale |
| --- | --- | --- |
| Runtime | Node.js 18 | Non-blocking I/O; same language as frontend |
| Framework | Express 4 | Minimal, composable; large middleware ecosystem |
| Database driver | `pg` (node-postgres) | Raw SQL control; connection pooling |
| Auth | jsonwebtoken + bcryptjs | Industry standard; no external auth service dependency |
| File upload | multer | Streaming multipart; configurable storage |
| Email | nodemailer + Gmail SMTP | Simple SMTP; no external service fee |
| PDF | pdfkit | Server-side PDF; no browser dependency |
| Security | helmet + cors | Standard HTTP security headers |

### 3.2 Layer Responsibilities

```text
routes/          ← URL binding, HTTP method, middleware chain
controllers/     ← Request parsing, business logic orchestration, response formatting
models/          ← All SQL queries (no ORM; raw pg queries)
middleware/      ← Cross-cutting concerns (auth, roles, upload, errors)
services/        ← Stateless side-effect operations (email sending)
config/          ← Infrastructure connections (database pool)
```

### 3.3 Request Lifecycle

```text
HTTP Request
    │
    ▼
express router  ──→  auth middleware (verifyToken)
                          │
                          ▼
                     role middleware (requireRole)
                          │
                          ▼
                     upload middleware (multer, if applicable)
                          │
                          ▼
                     controller  ──→  model (pg query)  ──→  PostgreSQL
                          │
                          ▼
                     JSON response
                          │
                          ▼ (on error)
                     errorHandler middleware
```

### 3.4 Controller Inventory

| Controller | Responsibilities |
| --- | --- |
| `auth.controller.js` | Register, login, Google OAuth, forgot/reset password, get current user |
| `inspections.controller.js` | Inspection CRUD, AI trigger, PDF generation, manager review |
| `photos.controller.js` | Single upload, batch 8-photo upload, signature storage, photo retrieval |
| `vehicles.controller.js` | Vehicle CRUD, status transitions |
| `manager.controller.js` | Dashboard stats, activity feed, health distribution, alerts |
| `smartAssignment.controller.js` | Scoring algorithm: health (50pt) + distance (30pt) + tier (20pt) |
| `analytics.controller.js` | Health trend, damage type distribution, top damaged vehicles |
| `gps.controller.js` | Driver location update, all vehicle locations for map |
| `dashboard.controller.js` | High-level fleet metrics |
| `notifications.controller.js` | Create and retrieve notifications |
| `profile.controller.js` | Profile updates |
| `preferences.controller.js` | Language, theme, notification preferences |

### 3.5 Smart Assignment Algorithm

The smart assignment endpoint scores all available vehicles for a given pickup request:

```text
Score = health_score_points + distance_points + tier_points

health_score_points  = (vehicle.health_score / 100) × 50   [0–50]
distance_points      = max(0, 30 - (distance_km / max_km) × 30)  [0–30]
tier_points          = 20 if tier matches vehicle category, else 0  [0 or 20]
```

Vehicle tier mapping:

| Customer Tier | Preferred Vehicle Types |
| --- | --- |
| VIP | SUV, luxury van |
| Standard | Car, standard van |
| Budget | Any available |

Distance is calculated using the Haversine formula from the customer pickup GPS coordinates to the vehicle's `last_latitude`/`last_longitude`.

---

## 4. AI Microservice Architecture

### 4.1 Overview

```text
Node.js backend
      │
      │  POST http://localhost:5001/api/detect
      │  Content-Type: multipart/form-data
      │  Body: images[] (up to 8 JPEG files)
      │
      ▼
Flask server (app.py)
      │
      ├─ Save uploaded images to temp directory
      ├─ Run YOLOv8 classification inference
      │     model: runs/classify/fleetguard_damage_model4/weights/best.pt
      │     classes: ["00-damage", "01-whole"]
      ├─ For each damaged image:
      │     severity = low (conf < 0.7) | medium (0.7–0.9) | high (> 0.9)
      ├─ health_score = 100 − (damage_count × severity_deduction)
      │     deductions: low=5, medium=10, high=20
      └─ Return structured JSON
```

### 4.2 Response Format

```json
{
  "health_score": 75,
  "damages": [
    {
      "photo_type": "front",
      "damage_type": "scratch",
      "severity": "medium",
      "confidence": 0.84,
      "bbox": { "x": 120, "y": 45, "width": 200, "height": 150 }
    }
  ],
  "total_damages": 2,
  "analysis_complete": true
}
```

### 4.3 STUB_MODE

If the trained model weights are unavailable (e.g., first-time setup), the service enters `STUB_MODE` and returns deterministic pseudo-detections. This allows the full application to run end-to-end without a trained model.

### 4.4 Model Training

```text
Dataset: VehiDE (Kaggle) — vehicle damage/no-damage classification
Architecture: YOLOv8n (nano) — classification head
Training script: train.py
Output: runs/classify/fleetguard_damage_model4/weights/best.pt
```

---

## 5. Database Architecture

See [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) for the complete ERD and table definitions.

### 5.1 Design Principles

- **No ORM** — All queries are raw SQL via `pg`. This gives full control over query plans and avoids N+1 generation.
- **UUIDs** — All primary keys use `gen_random_uuid()` for global uniqueness.
- **Soft deletes** — Users have `is_active` flag; records are never hard-deleted.
- **JSONB** — Bounding box data (`bbox_json`) stored as JSONB for schema flexibility.
- **Indexes** — Composite indexes on all foreign key + filter columns used in hot query paths.

### 5.2 Connection Pool

```javascript
// backend/src/config/database.js
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,            // max pool connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})
```

---

## 6. Security Architecture

### 6.1 Authentication

- Passwords hashed with `bcryptjs` (cost factor 10).
- JWT tokens signed with `HS256` and expire after 8 hours.
- Google OAuth ID tokens verified server-side via `google-auth-library`.
- Password reset tokens are hashed before DB storage and expire in 1 hour.

### 6.2 Authorisation

Three roles enforced at the route level via `requireRole` middleware:

| Role | Accessible Areas |
| --- | --- |
| `driver` | Own inspections, photos, GPS update, profile |
| `manager` | All inspections, vehicles, drivers, analytics, smart assignment |
| `admin` | Full access including user management |

### 6.3 HTTP Security

- `helmet` sets security headers (CSP, HSTS, X-Frame-Options, etc.).
- CORS configured to allow only the frontend origin.
- File upload restricted by MIME type and size via multer.

### 6.4 Data Privacy (PDPA 2022)

- GPS coordinates stored only in `gps_logs` table.
- A database-level trigger or scheduled job purges records older than 90 days.
- Inspection photos stored in the local `uploads/` directory, not in the database.

---

## 7. Internationalisation

```text
i18next + react-i18next
      │
      ├─ Language detection: browser preference → stored preference → fallback en
      ├─ Translation files: src/i18n/locales/{en,si,ta}.json
      ├─ ~526 keys per locale covering all UI strings
      └─ User preference persisted in user_preferences table (Sprint 6)
```

Language switcher is available in both Driver and Manager layouts. The selected language is saved to the backend and restored on next login.

---

## 8. File Storage

Uploaded files are stored on the local filesystem under `backend/uploads/`:

```text
uploads/
├── inspections/          # Inspection photos (JPEG)
│   └── {inspection_id}/
├── signatures/           # Digital signatures (PNG)
├── vehicles/             # Vehicle photos
├── reports/              # Generated PDF reports
└── demo/                 # Demo dataset images
```

`file_url` stored in the database is a relative path served by Express static middleware. In production, this directory should be replaced with an object storage service (e.g., AWS S3, DigitalOcean Spaces).

---

## 9. Key Architectural Decisions

### ADR-001: No ORM

**Decision:** Use raw `pg` queries instead of Prisma or Sequelize.

**Rationale:** The team has strong SQL knowledge. Raw queries give full visibility into query plans, avoid migration drift, and eliminate the ORM abstraction overhead for a project of this scope.

### ADR-002: AI as a Separate Microservice

**Decision:** Run the AI model in a Python Flask process, separate from the Node.js API.

**Rationale:** Python has the best ecosystem for YOLOv8/ultralytics. Decoupling the AI service allows independent scaling, version updates, and graceful degradation (STUB_MODE) without impacting the main API.

### ADR-003: Client-Side PDF Generation

**Decision:** Generate inspection PDFs on the client using html2canvas + jsPDF.

**Rationale:** Reduces server load and allows the PDF to include styled HTML/canvas elements (including the rendered signature and damage overlays) without re-implementing the rendering on the server.

### ADR-004: LocalStorage for JWT

**Decision:** Store JWT in `localStorage` rather than `httpOnly` cookies.

**Rationale:** The application is a same-origin SPA; the backend and frontend share a domain in deployment. `localStorage` simplifies mobile browser compatibility. XSS risk is mitigated by CSP headers via `helmet`.

### ADR-005: Forced Dark Theme

**Decision:** The UI uses dark theme only (no light mode toggle) in the driver/manager portals.

**Rationale:** Field use in bright sunlight benefits from consistent dark UI. Reduces CSS complexity and ensures brand consistency.
