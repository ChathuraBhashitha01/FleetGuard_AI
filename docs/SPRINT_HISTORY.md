# Sprint History — FleetGuard AI

**Project:** FleetGuard AI
**Team:** Bethmi Jayamila, Chathura Bhashitha, Kalindu Tharanga, Iruwan Tharaka
**Methodology:** Agile Scrum — 2-week sprints

---

## Sprint 1 — Foundation & Authentication

**Duration:** Weeks 1–2
**Theme:** Project scaffold, database schema, user authentication

### Goals

- Establish the three-tier architecture (React SPA, Node.js API, PostgreSQL)
- Implement role-based user authentication
- Create the full database schema

### Deliverables

#### Backend (Chathura Bhashitha)

- Express app scaffold with middleware stack (helmet, CORS, body-parser)
- PostgreSQL connection pool configuration
- Complete `database/schema.sql` covering all planned tables
- User model: `findByEmail`, `createUser`, `updateProfile`
- Auth controller: `register`, `login`, `getMe`
- Google OAuth2 sign-in via `google-auth-library` ID token verification
- JWT middleware (`verifyToken`) and role middleware (`requireRole`)
- Password hashing with bcryptjs (cost factor 10)
- Health check endpoint: `GET /api/health`

#### Frontend (Bethmi Jayamila)

- Vite + React 18 + TypeScript project setup
- Tailwind CSS and Radix UI integration
- Landing page
- Driver login and signup pages
- Manager login page
- Axios instance with JWT interceptor and 401 redirect
- AuthService module
- Google OAuth button integration (`@react-oauth/google`)

#### Database

- Full schema deployed: `users`, `drivers`, `managers`, `vehicles`, `inspections`, `inspection_photos`, `damage_detections`, `digital_signatures`, `inspection_reviews`, `notifications`, `password_reset_tokens`, `gps_logs`
- UUID primary keys via `gen_random_uuid()`
- All foreign key constraints and indexes created

### Sprint Outcomes

- Users can register and log in as `driver`, `manager`, or `admin`
- Google Sign-In works for both roles
- Protected routes reject unauthenticated requests with `401`
- Role-protected routes reject insufficient roles with `403`

---

## Sprint 2 — Core Resource APIs

**Duration:** Weeks 3–4
**Theme:** Vehicle management, inspection lifecycle, photo upload, password reset

### Goals

- Build the core vehicle and inspection APIs
- Enable photo upload for inspection records
- Implement email-based password reset

### Deliverables

#### Backend (Chathura Bhashitha)

- Inspections controller: `create`, `getAll`, `getMine`, `getOne`, `update`, `complete`
- Photos controller: `uploadPhoto` (single), `uploadBatch` (8 photos), `uploadSignature`, `getPhotos`
- Multer configuration for disk storage with MIME type filtering
- Password reset flow: `forgotPassword` (token generation + email), `resetPassword` (token consumption)
- Email service via nodemailer (Gmail SMTP)
- `password_reset_tokens` model with SHA-256 token hashing

#### Backend (Kalindu Tharanga)

- Vehicles controller: `findAll`, `findById`, `create`, `update`, `updateStatus`
- Vehicle filtering by `status` and `type` query parameters
- Vehicle photo upload via multer

#### Frontend (Bethmi Jayamila)

- VehicleService API module
- InspectionService API module (photo upload, inspection CRUD)
- Driver forgot password and password reset pages

### Sprint Outcomes

- Full CRUD for vehicles and inspections via REST API
- 8-photo batch upload working for inspection records
- Digital signature upload working for driver and customer
- Password reset emails deliver successfully via Gmail App Password
- `001_inspection_reviews_unique.sql` migration applied

---

## Sprint 3 — Driver Inspection Workflow

**Duration:** Weeks 5–6
**Theme:** Driver-facing inspection UI, AI integration, PDF generation, digital signatures

### Goals

- Build the complete 8-step driver inspection workflow
- Integrate AI damage detection into the workflow
- Generate signed PDF inspection reports

### Deliverables

#### Frontend — Inspection Workflow (Bethmi Jayamila)

- `InspectionContext` — shared state across all 8 steps
- Step 1: `VehicleSelection` — searchable vehicle picker
- Step 2: `CustomerDetails` — customer name, NIC, phone, rental dates
- Step 3: `PhotoCapture` — camera interface with 8-angle guide overlay
- Step 4: `PhotoReview` — thumbnail grid with retake option
- Step 5: `AIProcessing` — animated processing screen with progress indicator
- Step 6: `InspectionResults` — damage cards with severity badges and confidence scores
- Step 7: `DigitalSignatures` — canvas-based signature pad for driver and customer
- Step 8: `ReportGenerated` — PDF download button and inspection summary

#### Backend (Chathura Bhashitha)

- `inspections.controller.js`: `triggerAI` — proxies photos to Python AI service
- `inspections.controller.js`: `generatePdf` — creates inspection PDF via pdfkit
- `inspections.controller.js`: `downloadPdf` — serves PDF from `uploads/reports/`
- AI service integration: multipart POST to `http://localhost:5001/api/detect`
- `damage_detections` insertion from AI response

#### AI Service (Bethmi Jayamila)

- Flask server (`app.py`) with `/api/detect` endpoint
- YOLOv8 classification model inference
- `STUB_MODE` fallback for graceful degradation
- Severity mapping (low/medium/high) from confidence scores
- Health score calculation with per-severity deductions
- Node.js TensorFlow.js wrapper (`app.js`) as alternative inference path

### Sprint Outcomes

- Driver can complete a full inspection end-to-end in the browser
- AI analysis runs on uploaded photos and returns damage classifications
- PDF report is generated with customer info, damage summary, and both signatures
- STUB_MODE allows workflow testing without trained model weights

---

## Sprint 4 — Manager Dashboard & Oversight

**Duration:** Weeks 7–8
**Theme:** Manager portal, inspection review, driver management

### Goals

- Give managers a real-time dashboard with fleet metrics
- Enable inspection approval and flagging workflow
- Build driver management UI

### Deliverables

#### Backend (Kalindu Tharanga)

- Manager controller: `getDashboardStats`, `getDashboardActivity`, `getHealthDistribution`, `getRecentAlerts`
- Manager controller: `getManagerInspections`, `getInspectionsSummary`
- Inspection controller: `reviewInspection` (approve/flag with notes)
- Analytics controller: `getHealthTrend`, `getDamageTypes`, `getTopDamagedVehicles`
- `002_sprint4_manager_fields.sql` migration for dashboard query optimisations

#### Frontend (Bethmi Jayamila)

- `ManagerDashboard` — KPI cards (total, available, in-use, maintenance, health score)
- `ManagerInspections` — paginated inspection list with filters
- `ManagerInspectionDetail` — full inspection view with review form
- `DriverManagement` — driver list with stats
- `AddEditDriver` — driver create/edit form
- `ManagerSettings` and `ManagerProfile` pages
- `AnalyticsDashboard` — fleet health trend chart, damage type donut, top damaged vehicles table

### Sprint Outcomes

- Manager dashboard loads fleet metrics from live database
- Managers can approve or flag inspections with notes
- `002_sprint4_manager_fields.sql` applied to production DB
- Analytics charts render correctly for 7/30/90-day windows

---

## Sprint 5 — GPS Tracking, Map View & Smart Assignment

**Duration:** Weeks 9–10
**Theme:** Real-time GPS, fleet map, AI-powered vehicle assignment

### Goals

- Track driver GPS locations in real time
- Display vehicle locations on a Google Maps view
- Implement smart vehicle assignment scoring algorithm

### Deliverables

#### Backend (Kalindu Tharanga)

- GPS controller: `updateLocation` (driver location update + vehicle coordinates sync)
- GPS controller: `getVehicleLocations` (all vehicle positions for map)
- `vehicles` table: `last_latitude`, `last_longitude`, `last_location_update` columns
- `gps_logs` table with 90-day retention requirement (PDPA 2022)
- Smart assignment controller: Haversine distance calculation, health + distance + tier scoring
- `003_sprint5_gps_columns.sql` migration
- `003_sprint5_seed_gps.sql` — GPS seed data for demo vehicles

#### Frontend (Bethmi Jayamila)

- `gpsService.js` — polls and posts GPS coordinates on app load (driver portal)
- `MapView` page — Google Maps with vehicle marker overlays and info windows
- `SmartAssignment` page — pickup location input, customer tier selector, ranked vehicle recommendations
- Google Maps API integration (`@react-google-maps/api`)

### Sprint Outcomes

- Driver location updates automatically on app open
- Manager map view shows all vehicle positions with status icons
- Smart assignment returns ranked vehicle list in under 500 ms
- GPS log data is indexed on `driver_id` and `captured_at` for efficient time-range queries

---

## Sprint 6 — Internationalisation, Preferences & Polish

**Duration:** Weeks 11–12
**Theme:** Multi-language support, user preferences, notifications, demo data, final testing

### Goals

- Full three-language UI (English, Sinhala, Tamil)
- Persist user language and theme preferences
- Build notifications centre
- Create realistic demo dataset
- Final QA and test coverage pass

### Deliverables

#### Backend (Chathura Bhashitha + Kalindu Tharanga)

- `user_preferences` table and model
- Preferences controller: `getPreferences`, `updatePreferences`
- Notifications controller: `getNotifications`, `markAsRead`
- `004_sprint6_user_preferences.sql` migration
- Demo seed script (`seed-demo.js`) — creates 3 drivers, 2 managers, 1 admin, 12 vehicles, inspections, damage records, notifications
- `download-demo-images.js` — downloads real car photos for demo

#### Frontend (Bethmi Jayamila)

- `i18next` setup with browser language detection and localStorage persistence
- Full English translation file (`en.json`, ~526 keys)
- Full Sinhala translation file (`si.json`, ~526 keys)
- Full Tamil translation file (`ta.json`, ~526 keys)
- `LanguageSwitcher` component in both portal layouts
- Language preference saved to backend on change
- `Notifications` page with unread badge and mark-as-read
- `UserPreferences` / `ManagerSettings` — language and theme controls

#### QA (Iruwan Tharaka)

- Test plan covering all critical user flows
- Backend integration tests (auth, inspections, vehicles)
- Frontend component tests (inspection workflow, forms)
- Edge case testing: expired JWT, missing photos, AI service down

### Sprint Outcomes

- All UI text is translatable; Sinhala and Tamil render correctly
- Language preference persists across sessions (stored in backend)
- Demo data populates in under 2 minutes via `npm run demo`
- Author attribution headers added to all source files
- All major features pass integration test suite

---

## Cumulative Feature Matrix

| Feature | Sprint 1 | Sprint 2 | Sprint 3 | Sprint 4 | Sprint 5 | Sprint 6 |
| --- | --- | --- | --- | --- | --- | --- |
| User auth (JWT) | Done | | | | | |
| Google OAuth | Done | | | | | |
| Vehicle CRUD | | Done | | | | |
| Inspection lifecycle | | Done | | | | |
| Photo upload | | Done | | | | |
| Password reset (email) | | Done | | | | |
| 8-step inspection UI | | | Done | | | |
| AI damage detection | | | Done | | | |
| PDF report generation | | | Done | | | |
| Digital signatures | | | Done | | | |
| Manager dashboard | | | | Done | | |
| Inspection review | | | | Done | | |
| Analytics charts | | | | Done | | |
| GPS tracking | | | | | Done | |
| Map view | | | | | Done | |
| Smart assignment | | | | | Done | |
| i18n (EN/SI/TA) | | | | | | Done |
| User preferences | | | | | | Done |
| Notifications | | | | | | Done |
| Demo dataset | | | | | | Done |
