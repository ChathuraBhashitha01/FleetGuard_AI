# Communication Plan and Meeting Minutes — FleetGuard AI

**Document owner:** Scheduling Manager — Kalindu Tharanga
**Version:** 2.0 (Final)
**Date:** March 2026

---

## 1. Communication Plan

### 1.1 Purpose

This document defines how the FleetGuard AI team communicates, who is responsible for what, and records all formal meeting decisions and action items across the project lifecycle.

### 1.2 Team Directory

| Name | Role | Contact |
| --- | --- | --- |
| Bethmi Jayamila | Start-up Manager | `bethmij@gmail.com` |
| Chathura Bhashitha | Project Manager | `chathurabhashitha01@gmail.com` |
| Kalindu Tharanga | Scheduling & Risk Manager | `kalindu.th@gmail.com` |
| Iruwan Tharaka | Quality Manager | — |

### 1.3 Communication Channels

| Channel | Purpose | Audience | Frequency |
| --- | --- | --- | --- |
| Team chat (WhatsApp) | Daily status, quick questions, blockers | All team | Daily |
| GitHub Pull Requests | Code review, technical discussion | All team | Per PR |
| GitHub Issues | Bug tracking, feature requests | All team | As needed |
| Video call (Google Meet) | Sprint planning, sprint review, unblocking sessions | All team | Per sprint + ad hoc |
| Email | Formal decisions, external communication | All team | As needed |

### 1.4 Response Time SLAs

| Priority | Channel | Response SLA |
| --- | --- | --- |
| P0 — Blocker | Team chat | Within 1 hour |
| P1 — High | Team chat | Within 2 hours during working hours |
| Code review request | GitHub PR | Within 1 working day |
| General question | Team chat | Within 4 hours |
| Formal decisions | Email | Within 4 hours |

### 1.5 Meeting Schedule

| Meeting | Frequency | Duration | Owner | Participants |
| --- | --- | --- | --- | --- |
| Sprint Planning | Start of each sprint | 45 minutes | Scheduling Manager | All team |
| Sprint Review / Retrospective | End of each sprint | 30 minutes | Project Manager | All team |
| Daily Standup | Daily (async) | 5 minutes (text) | Self-reported | All team |
| Unblocking Session | Ad hoc — when P0/P1 blocker logged | 30 minutes max | Risk Manager | Affected members |
| QA Sign-Off | End of Sprint 6 | 30 minutes | Quality Manager | All team |

### 1.6 Daily Standup Format (Async Text)

Each team member posts the following in team chat each working day:

```text
DONE: [What was completed yesterday]
TODAY: [What will be worked on today]
BLOCKER: [Anything preventing progress — or "None"]
```

### 1.7 Escalation Matrix

| Tier | Trigger | Action | Escalates To |
| --- | --- | --- | --- |
| Tier 1 | Technical blocker | Log in team chat; 4 hours to resolve | Risk Manager |
| Tier 2 | Blocker unresolved after 4 hours | Unblocking call scheduled | Start-up Manager |
| Tier 3 | Sprint goal at risk | Sprint plan adjusted; scope reprioritised | Start-up Manager + Project Manager |

---

## 2. Meeting Minutes

---

### Meeting 01 — Project Kickoff and Architecture Decision

**Date:** Week 1, Monday (Sprint 1 start)
**Attendees:** Bethmi Jayamila, Chathura Bhashitha, Kalindu Tharanga, Iruwan Tharaka
**Chair:** Bethmi Jayamila (Start-up Manager)
**Minutes by:** Kalindu Tharanga

#### M01 Agenda Item 1: Project Scope and Objectives

The team reviewed the project brief. FleetGuard AI is a vehicle inspection and fleet management system for Sri Lankan travel agencies. The problem is paper-based inspection forms that produce no audit trail and no real-time fleet visibility.

*Decision:* Build a three-tier application — React SPA (driver + manager portals), Node.js/Express backend API, Python Flask AI microservice — with PostgreSQL as the database.

#### M01 Agenda Item 2: Role and Responsibility Assignment

*Decision:* Ownership split as follows:

- Bethmi: All frontend (both portals), AI microservice, project coordination
- Chathura: Client-facing backend (auth, inspections, photos, email)
- Kalindu: Admin backend (vehicles, manager dashboard, GPS, analytics, smart assignment)
- Iruwan: QA — test planning, execution, defect tracking

#### M01 Agenda Item 3: Technology Stack Confirmation

*Decision:* React 18 + TypeScript + Vite (frontend), Node.js 18 + Express 4 (backend), PostgreSQL 15 (database), Python 3.8 + Flask + YOLOv8 (AI service). Google Maps API for map view and geocoding.

#### M01 Agenda Item 4: Repository and Branch Strategy

*Decision:* Single monorepo on GitHub. All work via pull requests. Branch naming: `feature/`, `fix/`, `chore/`. No direct push to `main`.

#### M01 Agenda Item 5: Sprint 1 Commitments

- Bethmi: React scaffold, landing page, login/signup UI, AI service scaffold
- Chathura: Express scaffold, PostgreSQL full schema, JWT auth (register/login/me), Google OAuth
- Kalindu: Environment setup documentation
- Iruwan: Test plan draft

#### M01 Action Items

| # | Action | Owner | Due |
| --- | --- | --- | --- |
| A01 | Create GitHub repository and add all team members | Bethmi | Monday EOD |
| A02 | Write `database/schema.sql` covering all 11 tables | Chathura | Wednesday |
| A03 | Set up `.env.example` files for frontend and backend | Kalindu | Tuesday |
| A04 | Draft QA test plan for Sprint 1 deliverables | Iruwan | Thursday |

---

### Meeting 02 — Sprint 1 Review and Sprint 2 Planning

**Date:** Week 2, Friday (Sprint 1 end)
**Attendees:** All team
**Chair:** Chathura Bhashitha (Project Manager)
**Minutes by:** Kalindu Tharanga

#### M02 Sprint 1 Review

Items delivered:

- JWT authentication (register, login, Google OAuth, getMe) — Delivered
- Role-based middleware (`verifyToken`, `requireRole`) — Delivered
- Full `schema.sql` (11 tables, UUID PKs, all indexes) — Delivered
- React scaffold with Tailwind CSS and Radix UI — Delivered
- Landing page, driver login, driver signup, manager login — Delivered
- Flask AI service health check endpoint — Delivered
- Axios instance with JWT interceptor and 401 redirect — Delivered

#### M02 Discussion

The database schema was completed in one pass covering all planned tables, including `gps_logs`, `damage_detections`, and `user_preferences` needed in later sprints. This was praised as forward-thinking — no schema surprises are expected in subsequent sprints.

#### M02 Sprint 2 Commitments

- Chathura: Inspection lifecycle (create/complete), photo upload (single + batch), signature upload, email password reset
- Kalindu: Vehicle CRUD API (list, get, create, update, status filter)
- Bethmi: Frontend service modules for vehicles and inspections, forgot password UI
- Iruwan: Test cases for auth and vehicle endpoints

#### M02 Action Items

| # | Action | Owner | Due |
| --- | --- | --- | --- |
| A05 | Implement `vehicles` controller and routes | Kalindu | Wednesday Week 3 |
| A06 | Implement inspection create/complete and photo upload | Chathura | Thursday Week 3 |
| A07 | Configure Gmail App Password for nodemailer | Chathura | Tuesday Week 3 |
| A08 | Write Jest tests for auth register/login | Iruwan | Friday Week 4 |

---

### Meeting 03 — Sprint 2 Review and Sprint 3 Planning

**Date:** Week 4, Friday (Sprint 2 end)
**Attendees:** All team
**Chair:** Chathura Bhashitha
**Minutes by:** Kalindu Tharanga

#### M03 Sprint 2 Review

Items delivered:

- Vehicle CRUD (list, get, create, update) — Delivered
- Inspection create/complete endpoints — Delivered
- Single photo upload and 8-photo batch upload — Delivered
- Digital signature upload — Delivered
- Email password reset (forgot-password + reset-password) — Delivered
- Frontend vehicle service and inspection service modules — Delivered
- Forgot password and reset password UI — Delivered

#### M03 Discussion

Kalindu noted that vehicle status filtering (`?status=available`) was added beyond the original scope at the request of the frontend team. Approved as a minimal addition that benefits the Smart Assignment feature planned for Sprint 5.

Iruwan completed the first set of Jest tests covering auth routes — all 8 tests pass.

#### M03 Key Risk — R02 (AI Model Weights)

The model weights (`best.pt`) cannot be committed to Git. The AI service will be unavailable for any team member without the weights file, blocking inspection workflow testing.

*Decision:* STUB_MODE to be built alongside real inference in Sprint 3.

#### M03 Sprint 3 Commitments

- Bethmi: 8-step inspection UI (VehicleSelection → ReportGenerated), InspectionContext, camera interface, digital signature canvas, AI processing screen, YOLOv8 inference + STUB_MODE in Flask
- Chathura: AI trigger endpoint (proxies photos to Flask), PDF generation (pdfkit), damage_detections insertion

#### M03 Action Items

| # | Action | Owner | Due |
| --- | --- | --- | --- |
| A09 | Build InspectionContext and 8-step routing | Bethmi | Wednesday Week 5 |
| A10 | Build `/api/inspections/:id/analyze` endpoint | Chathura | Thursday Week 5 |
| A11 | Implement STUB_MODE in Flask AI service | Bethmi | Tuesday Week 5 |
| A12 | PDF generation with pdfkit | Chathura | Friday Week 6 |

---

### Meeting 04 — Sprint 3 Review and Sprint 4 Planning

**Date:** Week 6, Friday (Sprint 3 end)
**Attendees:** All team
**Chair:** Chathura Bhashitha
**Minutes by:** Kalindu Tharanga

#### M04 Sprint 3 Review

Items delivered:

- Complete 8-step driver inspection workflow — Delivered
- InspectionContext (shared state across all steps) — Delivered
- Camera interface with 8-angle guide overlay — Delivered
- AI processing screen with loading animation — Delivered
- InspectionResults page with damage severity cards — Delivered
- Digital signature canvas (driver + customer) — Delivered
- PDF report generation — Delivered *(pivoted to client-side html2canvas + jsPDF)*
- YOLOv8 inference + STUB_MODE — Delivered

#### M04 Discussion

PDF generation was initially implemented server-side with pdfkit. The layout could not accurately reproduce the styled damage cards and canvas signatures. Decision made to move PDF generation to the client (html2canvas + jsPDF). The server receives the final PDF blob for storage. Captured as a lesson learned.

DEF-001 logged and resolved: AI service port conflict on macOS (port 5000 occupied by AirPlay Receiver). Changed to port 5001.

#### M04 Sprint 4 Commitments

- Kalindu: Manager dashboard stats/activity/alerts APIs, inspection review endpoint, analytics API (health trend, damage types, top damaged vehicles)
- Bethmi: Manager dashboard UI, manager inspection review UI, driver management UI, analytics charts
- Iruwan: Integration tests for inspection endpoints, manual QA of full inspection workflow

#### M04 Action Items

| # | Action | Owner | Due |
| --- | --- | --- | --- |
| A13 | Implement manager dashboard stats/activity/alerts | Kalindu | Wednesday Week 7 |
| A14 | Implement inspection review endpoint | Kalindu | Thursday Week 7 |
| A15 | Build manager dashboard UI with KPI cards | Bethmi | Thursday Week 8 |
| A16 | Manual QA of complete inspection workflow end-to-end | Iruwan | Friday Week 8 |

---

### Meeting 05 — Sprint 4 Review and Sprint 5 Planning

**Date:** Week 8, Friday (Sprint 4 end)
**Attendees:** All team
**Chair:** Chathura Bhashitha
**Minutes by:** Kalindu Tharanga

#### M05 Sprint 4 Review

Items delivered:

- Manager dashboard KPI cards (total, available, in-use, maintenance, health score) — Delivered
- Inspection review (approve/flag with notes) — Delivered
- Analytics: health trend, damage type distribution, top damaged vehicles — Delivered
- Manager inspection list with status filters — Delivered
- Driver management UI (list, add, edit) — Delivered
- Manager analytics dashboard UI with charts — Delivered
- `002_sprint4_manager_fields.sql` migration applied — Delivered

#### M05 Discussion

Iruwan completed manual QA of the full inspection workflow. Two defects found and resolved within Sprint 4:

- DEF-002: PDF missing customer signature on fast completion (race condition) — fixed with 500ms delay before html2canvas capture.
- DEF-005: Manager dashboard alert count including already-reviewed inspections — fixed with updated SQL filter (`status = completed AND review IS NULL`).

#### M05 Sprint 5 Commitments

- Kalindu: GPS update endpoint, vehicle locations endpoint, smart assignment scoring algorithm, Sprint 5 migration (`003_sprint5_gps_columns.sql`)
- Bethmi: GPS auto-update on driver app load, Google Maps view with vehicle markers, smart assignment UI
- Chathura: GPS seed data for demo vehicles
- Iruwan: Tests for smart assignment endpoint and GPS update

#### M05 Action Items

| # | Action | Owner | Due |
| --- | --- | --- | --- |
| A17 | Write and apply `003_sprint5_gps_columns.sql` | Kalindu | Tuesday Week 9 |
| A18 | Implement smart assignment Haversine scoring | Kalindu | Thursday Week 9 |
| A19 | Integrate Google Maps with vehicle marker overlays | Bethmi | Friday Week 10 |
| A20 | Test smart assignment with and without GPS data | Iruwan | Friday Week 10 |

---

### Meeting 06 — Sprint 5 Review and Sprint 6 Planning

**Date:** Week 10, Friday (Sprint 5 end)
**Attendees:** All team
**Chair:** Chathura Bhashitha
**Minutes by:** Kalindu Tharanga

#### M06 Sprint 5 Review

Items delivered:

- GPS driver location update endpoint — Delivered
- All vehicle GPS locations endpoint (for map view) — Delivered
- Smart assignment algorithm (health + distance + tier scoring) — Delivered
- GPS auto-update on driver portal login — Delivered
- Google Maps view with vehicle markers and info windows — Delivered
- Smart assignment UI (pickup input, tier selector, ranked results) — Delivered
- DEF-003 resolved: Smart assignment fallback when no GPS coordinates available

#### M06 Discussion

R08 (PDPA 2022 GPS retention) reviewed. The schema supports 90-day purge via indexed `captured_at`, but the scheduled purge job must be configured manually on the deployment server. Documented in `docs/DEPLOYMENT_GUIDE.md`. Accepted as a residual operational risk.

#### M06 Sprint 6 Commitments

- Bethmi: i18next setup, 526-key translations in EN/SI/TA, language switcher component in both portal layouts
- Chathura: `user_preferences` table + API, notifications endpoints, demo seed script (`npm run demo`)
- Kalindu: Notifications UI wiring, Sprint 6 migration (`004_sprint6_user_preferences.sql`), author attribution headers
- Iruwan: Final QA sign-off — all manual test cases, all Jest + Vitest tests
- All: Project management documents finalised

#### M06 Action Items

| # | Action | Owner | Due |
| --- | --- | --- | --- |
| A21 | Complete all three locale files (EN/SI/TA, 526 keys each) | Bethmi | Wednesday Week 12 |
| A22 | Write demo seed script with image downloads | Chathura | Thursday Week 11 |
| A23 | Apply `004_sprint6_user_preferences.sql` migration | Chathura | Tuesday Week 11 |
| A24 | Execute all manual QA test cases | Iruwan | Wednesday Week 12 |
| A25 | Add author attribution headers to all source files | All | Thursday Week 12 |
| A26 | Finalise all 6 project management documents | All | Thursday Week 12 |
| A27 | Record < 5 minute demo video | Chathura | Friday Week 12 |

---

### Meeting 07 — Final QA Sign-Off and Submission Checklist

**Date:** Week 12, Thursday (day before deadline)
**Attendees:** All team
**Chair:** Bethmi Jayamila (Start-up Manager)
**Minutes by:** Kalindu Tharanga

#### M07 Agenda Item 1: QA Sign-Off Status

Iruwan presented QA results:

- All manual test cases A01–S04 executed and passed
- All Jest backend tests: 0 failures
- All Vitest frontend tests: 0 failures
- DEF-004 (Sinhala translation missing) — closed
- DEF-006 (Tamil label typo) — closed
- All P0 and P1 defects closed

*Decision:* Quality Manager issues formal QA sign-off.

#### M07 Agenda Item 2: Project Management Documents Review

Start-up Manager reviewed all 6 documents in `project_management_docs/`:

- `Project_Plan.md` — Complete
- `Code_of_Conduct.md` — Complete
- `Lessons_Learned_Report.md` — Complete
- `Quality_Plan.md` — Complete
- `Risk_Plan_and_Log.md` — Complete
- `Communication_Plan_and_Minutes.md` — This document; complete

*Decision:* All documents approved for submission.

#### M07 Agenda Item 3: Repository Final State

- `main` branch frozen — no further PRs without Start-up Manager approval
- Author attribution headers confirmed on all source files
- `npm run demo` tested on a clean machine — completes successfully
- `README.md`, `implementation_plan.md`, and all `docs/` updated and complete

#### M07 Agenda Item 4: Demo Video Plan

Chathura to record the < 5 minute demo video covering:

- Driver inspection workflow (vehicle selection → PDF download)
- Manager dashboard (fleet KPIs, inspection review)
- Smart assignment (pickup location → ranked vehicles)
- Map view (live vehicle locations)
- Language switching (EN → SI → TA)

#### M07 Action Items

| # | Action | Owner | Due |
| --- | --- | --- | --- |
| A28 | Record and export demo video | Chathura | Friday morning |
| A29 | Final repository push and submission | Bethmi | Friday EOD |

---

## 3. Decision Log

| # | Decision | Made in | Week |
| --- | --- | --- | --- |
| D01 | Three-tier architecture (React + Node.js + Python Flask) | Meeting 01 | Week 1 |
| D02 | Single monorepo; all changes via pull requests | Meeting 01 | Week 1 |
| D03 | STUB_MODE to allow full app without model weights | Meeting 03 | Week 4 |
| D04 | PDF generation moved to client (html2canvas + jsPDF) | Meeting 04 | Week 6 |
| D05 | GPS 90-day purge documented but not automated in-app | Meeting 06 | Week 10 |
| D06 | Main branch frozen after QA sign-off | Meeting 07 | Week 12 |
