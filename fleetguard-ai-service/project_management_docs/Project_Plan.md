# Project Plan — FleetGuard AI

**Document owner:** Start-up Manager — Bethmi Jayamila
**Version:** 2.0 (Final)
**Project deadline:** Friday, 28 March 2026
**Status:** Delivered

---

## 1. Project Overview

### 1.1 Project Name

**FleetGuard AI** — AI-Powered Vehicle Inspection and Fleet Management System

### 1.2 Problem Statement

Sri Lankan travel agencies manage large vehicle fleets using paper-based inspection forms. This results in inconsistent damage reporting, no photographic audit trail, no real-time fleet visibility for managers, and lengthy dispute resolution when rental customers contest damage charges. The manual process averages 45–60 minutes per vehicle handover.

### 1.3 Solution

A three-tier web application:

| Tier | Technology | Purpose |
| --- | --- | --- |
| Frontend SPA | React 18 + TypeScript + Vite | Driver inspection portal and manager dashboard |
| Backend API | Node.js + Express + PostgreSQL | Business logic, authentication, data persistence |
| AI Microservice | Python + Flask + YOLOv8 | Computer vision damage detection from inspection photos |

---

## 2. Team and Role Assignments

| Name | Project Role | Technical Responsibility |
| --- | --- | --- |
| Bethmi Jayamila | Start-up Manager | AI microservice, admin frontend, project governance |
| Chathura Bhashitha | Project Manager | Client backend (auth, inspections, photos, email) |
| Kalindu Tharanga | Risk & Scheduling Manager | Admin backend (vehicles, manager dashboard, GPS, analytics, smart assignment) |
| Iruwan Tharaka | Quality Manager | Test planning, execution, defect tracking, QA sign-off |

---

## 3. Objectives and KPIs

| # | Objective | KPI | Target |
| --- | --- | --- | --- |
| O1 | Digitalise pre/post rental inspection | Inspections captured digitally | 100% |
| O2 | AI damage detection from photos | AI analysis available for all inspections | Yes |
| O3 | Manager real-time fleet visibility | Dashboard load time | < 3 seconds |
| O4 | Legally defensible inspection reports | Signed PDF generated per inspection | Yes |
| O5 | Multi-language support | UI translated in EN, SI, TA | 100% of strings |
| O6 | GPS fleet tracking | Live vehicle locations on map | < 30s refresh |
| O7 | Smart vehicle assignment | AI-scored recommendations returned | < 500ms |

---

## 4. Scope

### 4.1 In Scope

- Driver portal: registration, login, 8-step inspection workflow, GPS, profile
- Manager portal: fleet management, inspection review, driver management, analytics, smart assignment, map view, notifications
- AI microservice: YOLOv8 damage classification, health score calculation, STUB_MODE fallback
- PostgreSQL database: role-based schema, full audit trail
- JWT + Google OAuth2 authentication
- PDF report generation with digital signatures
- Three-language UI (English, Sinhala, Tamil)
- Email-based password reset
- PDPA 2022 GPS data compliance (90-day retention)

### 4.2 Out of Scope

- Native iOS or Android applications (web only)
- Billing, invoicing, or payment processing
- Integration with external ERP or telematics hardware
- Offline-first / service worker PWA
- Real-time push notifications (WebSocket)
- Multi-tenant SaaS billing infrastructure

---

## 5. Work Breakdown Structure (WBS)

### Phase 1 — Foundation (Sprint 1, Weeks 1–2)

| Task | Owner | Deliverable |
| --- | --- | --- |
| 1.1 React + TypeScript + Vite project scaffold | Bethmi | Frontend running on port 5173 |
| 1.2 Node.js + Express app scaffold | Chathura | Backend running on port 3001 |
| 1.3 Full PostgreSQL schema design and deployment | Chathura | `schema.sql` with 11 tables |
| 1.4 JWT authentication (register/login/me) | Chathura | Auth endpoints working |
| 1.5 Google OAuth2 sign-in | Chathura | Google login working |
| 1.6 Role-based middleware (driver/manager/admin) | Chathura | Protected routes enforced |
| 1.7 Landing page and login/signup UI | Bethmi | Public pages accessible |
| 1.8 Python Flask AI service scaffold | Bethmi | Port 5001 health check responding |

### Phase 2 — Core Resource APIs (Sprint 2, Weeks 3–4)

| Task | Owner | Deliverable |
| --- | --- | --- |
| 2.1 Vehicle CRUD API | Kalindu | GET/POST/PUT vehicles |
| 2.2 Inspection lifecycle (create/complete) | Chathura | Inspection endpoints |
| 2.3 Photo upload (single + batch) | Chathura | Multer upload working |
| 2.4 Digital signature upload | Chathura | Signature storage |
| 2.5 Email password reset flow | Chathura | Reset emails delivered |
| 2.6 Vehicle and inspection service modules (frontend) | Bethmi | API calls working |

### Phase 3 — Driver Inspection Workflow (Sprint 3, Weeks 5–6)

| Task | Owner | Deliverable |
| --- | --- | --- |
| 3.1 InspectionContext state management | Bethmi | Shared state across 8 steps |
| 3.2 8-step inspection UI (VehicleSelection → ReportGenerated) | Bethmi | Full workflow navigable |
| 3.3 Camera interface with 8-angle guide | Bethmi | Photos captured correctly |
| 3.4 AI processing screen and results display | Bethmi | Damage cards shown |
| 3.5 Digital signature canvas (driver + customer) | Bethmi | Signatures saved |
| 3.6 AI trigger endpoint (backend → AI service) | Chathura | Damage detections stored |
| 3.7 PDF report generation (pdfkit) | Chathura | PDF downloadable |
| 3.8 YOLOv8 inference + STUB_MODE | Bethmi | AI service returning results |

### Phase 4 — Manager Dashboard and Oversight (Sprint 4, Weeks 7–8)

| Task | Owner | Deliverable |
| --- | --- | --- |
| 4.1 Manager dashboard stats API | Kalindu | Fleet KPIs returned |
| 4.2 Inspection review (approve/flag) | Kalindu | Review endpoint working |
| 4.3 Analytics API (health trend, damage types) | Kalindu | Chart data returned |
| 4.4 Manager dashboard UI | Bethmi | KPI cards + activity feed |
| 4.5 Manager inspection review UI | Bethmi | Review form working |
| 4.6 Driver management UI | Bethmi | Driver CRUD in portal |
| 4.7 Analytics dashboard UI | Bethmi | Charts rendering |

### Phase 5 — GPS, Map View, Smart Assignment (Sprint 5, Weeks 9–10)

| Task | Owner | Deliverable |
| --- | --- | --- |
| 5.1 GPS location update endpoint | Kalindu | Driver coordinates stored |
| 5.2 Fleet vehicle locations endpoint | Kalindu | All GPS positions returned |
| 5.3 Smart assignment scoring algorithm | Kalindu | Ranked recommendations |
| 5.4 GPS auto-update on driver app load | Bethmi | Location posted on login |
| 5.5 Google Maps view with vehicle markers | Bethmi | Map renders with vehicles |
| 5.6 Smart assignment UI | Bethmi | Form + ranked results |

### Phase 6 — i18n, Preferences, Polish, Testing (Sprint 6, Weeks 11–12)

| Task | Owner | Deliverable |
| --- | --- | --- |
| 6.1 i18next setup + language detection | Bethmi | Language switching works |
| 6.2 English translation file (526 keys) | Bethmi | `en.json` complete |
| 6.3 Sinhala translation file (526 keys) | Bethmi | `si.json` complete |
| 6.4 Tamil translation file (526 keys) | Bethmi | `ta.json` complete |
| 6.5 User preferences table + API | Kalindu / Chathura | Language persists across sessions |
| 6.6 Notifications endpoint + UI | Kalindu | Notification centre working |
| 6.7 Demo dataset (users, vehicles, inspections, images) | Chathura | `npm run demo` working |
| 6.8 Backend integration tests | Chathura | Jest tests passing |
| 6.9 Frontend component tests | Iruwan | Vitest tests passing |
| 6.10 QA final sign-off | Iruwan | All critical paths verified |
| 6.11 Author attribution headers | All | All source files attributed |
| 6.12 Project management documents finalized | All | 6 documents submitted |

---

## 6. Project Schedule

| Sprint | Weeks | Theme | Key Milestone |
| --- | --- | --- | --- |
| Sprint 1 | 1–2 | Foundation & Auth | Database schema live; users can register and log in |
| Sprint 2 | 3–4 | Core Resource APIs | Vehicles, inspections, photos, password reset |
| Sprint 3 | 5–6 | Driver Inspection Workflow | End-to-end inspection with AI + PDF + signatures |
| Sprint 4 | 7–8 | Manager Dashboard | Fleet metrics, inspection review, analytics |
| Sprint 5 | 9–10 | GPS & Smart Assignment | Live map view, ranked vehicle recommendations |
| Sprint 6 | 11–12 | i18n, Polish & Testing | 3-language UI, demo data, QA sign-off, submission |

**Project End Date:** Friday, 28 March 2026

---

## 7. Resource Allocation

| Resource | Type | Usage |
| --- | --- | --- |
| React 18 + TypeScript + Vite | Frontend framework | Driver + manager portal UI |
| Node.js 18 + Express 4 | Backend runtime | REST API server |
| PostgreSQL 15 | Database | All persistent data |
| Python 3.8 + Flask | AI service | YOLOv8 inference |
| YOLOv8 (ultralytics) | ML model | Damage classification |
| Google Maps API | External API | Map view + geocoding |
| Google OAuth2 | External API | Sign-in |
| GitHub | Version control | Source code, PRs, issues |
| Gmail SMTP | External service | Password reset emails |

---

## 8. Change Control

Any change to the agreed sprint scope must follow this process:

1. **Proposal** — Engineer raises a Change Request (CR) in the team chat with impact assessment.
2. **Review** — Project Manager evaluates impact on the Friday deadline.
3. **Decision** — Start-up Manager approves or rejects within 4 hours.
4. **Log** — Decision is recorded in the Communication Plan minutes.

---

## 9. Deliverables Summary

| Deliverable | Owner | Status |
| --- | --- | --- |
| Frontend web application | Bethmi | Delivered |
| Backend REST API | Chathura + Kalindu | Delivered |
| AI microservice | Bethmi | Delivered |
| PostgreSQL schema + migrations | Chathura | Delivered |
| Demo dataset (`npm run demo`) | Chathura | Delivered |
| Project Plan | Bethmi | This document |
| Code of Conduct | Bethmi | Delivered |
| Lessons Learned Report | Chathura | Delivered |
| Quality Plan | Iruwan | Delivered |
| Risk Plan and Log | Kalindu | Delivered |
| Communication Plan and Meeting Minutes | Kalindu | Delivered |
| < 5 minute demo video | Chathura | To be recorded |
