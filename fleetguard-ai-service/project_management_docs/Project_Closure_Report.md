# Project Closure Report — FleetGuard AI

**Document owner:** Chathura Bhashitha — Project Manager
**Prepared by:** Bethmi Jayamila — Start-up Manager
**Version:** 1.0 (Final)
**Date:** 28 March 2026
**Project duration:** 12 weeks — 6 × 2-week sprints (February 2026 – March 2026)

---

## 1. Project Overview

| Field | Detail |
| --- | --- |
| Project name | FleetGuard AI — AI-Powered Vehicle Inspection and Fleet Management System |
| Client / Sponsor | University Module Assessment — Level 6 Software Engineering |
| Start date | 02 February 2026 |
| End date | 28 March 2026 |
| Project Manager | Chathura Bhashitha |
| Start-up Manager | Bethmi Jayamila |
| Final submission | Friday, 28 March 2026 |

### 1.1 Project Description

FleetGuard AI is a full-stack, AI-powered vehicle inspection and fleet management platform built for Sri Lankan travel agencies. It replaces manual, paper-based vehicle inspection processes with a guided 8-step digital workflow, AI-driven damage detection using YOLOv8, GPS-based fleet tracking, automated PDF report generation with digital signatures, and a three-language UI (English, Sinhala, Tamil).

The system is composed of three tiers:

- **React 18 SPA** (port 5173) — driver and manager portals
- **Node.js / Express API** (port 3001) — authentication, inspections, vehicles, GPS, notifications
- **Python / Flask AI microservice** (port 5001) — YOLOv8 damage detection with STUB_MODE fallback

---

## 2. Project Objectives vs Final Outcomes

| # | Objective | Target | Final Outcome | Result |
| --- | --- | --- | --- | --- |
| O1 | Digitalise the vehicle inspection workflow | 100% digital, 8-step guided process | 8-step workflow delivered end-to-end with photo capture, AI analysis, digital signatures, and PDF | Achieved |
| O2 | AI-powered damage detection | YOLOv8 model running on all inspections | YOLOv8 inference operational; STUB_MODE for graceful degradation without model weights | Achieved |
| O3 | Manager real-time fleet visibility | Dashboard load under 3 seconds | Dashboard loads under 2 seconds on local network | Achieved |
| O4 | Signed PDF report per inspection | PDF with both signatures generated per inspection | PDFKit server report + html2canvas client-side generation with signatures working | Achieved |
| O5 | Three-language UI | EN, SI, TA fully translated | 526 translation keys complete in all three languages; language preference stored server-side | Achieved |
| O6 | GPS fleet tracking | Live vehicle locations on map | GPS coordinates stored in gps_logs; Google Maps renders vehicle markers | Achieved |
| O7 | Smart vehicle assignment | Ranked recommendations returned in under 500ms | Haversine + scoring algorithm returns ranked results in under 200ms | Achieved |
| O8 | Role-based access control | Drivers and managers have separate, enforced permissions | JWT role middleware enforces driver/manager separation on all routes; verified by integration tests | Achieved |
| O9 | Integration test coverage | All critical user paths tested | Auth, inspections, vehicles, photos, middleware, notifications covered by Jest test suite | Achieved |
| O10 | Project delivery on deadline | Friday, 28 March 2026 | Delivered on time with all planned features | Achieved |

**All 10 project objectives achieved.**

---

## 3. Deliverables Acceptance

### 3.1 Software Deliverables

| Deliverable | Description | Status | Accepted By |
| --- | --- | --- | --- |
| Driver Portal | React SPA — registration, login, 8-step inspection workflow, profile, inspection history, notifications | Complete | Bethmi Jayamila |
| Manager Portal | React SPA — dashboard KPIs, fleet management, inspection review, analytics, smart assignment, map view | Complete | Bethmi Jayamila |
| Client-Side Backend | Node.js/Express — auth, inspections, photos, user profiles, notifications | Complete | Chathura Bhashitha |
| Admin-Side Backend | Node.js/Express — vehicles, GPS, manager dashboard, analytics, smart assignment | Complete | Kalindu Tharanga |
| AI Microservice | Flask/YOLOv8 — damage detection endpoint, STUB_MODE fallback, health scoring | Complete | Bethmi Jayamila |
| PostgreSQL Database | 11 tables, UUID PKs, migrations, seed script, demo data script | Complete | Chathura Bhashitha |
| PDF Report Generator | html2canvas + jsPDF client-side PDF with signatures and damage summary | Complete | Bethmi Jayamila |
| Multi-Language Support | i18next with EN/SI/TA locale files (526 keys), server-side preference persistence | Complete | Iruwan Tharaka |
| Demo Seed Script | `npm run demo` — downloads real images, seeds full dataset for demonstrations | Complete | Kalindu Tharanga |
| Integration Test Suite | Jest backend tests — auth, inspections, vehicles, photos, middleware, notifications | Complete | Iruwan Tharaka |

### 3.2 Documentation Deliverables

| Document | Owner | Status |
| --- | --- | --- |
| Project Plan | Bethmi Jayamila (Start-up Manager) | Complete |
| Code of Conduct | Bethmi Jayamila (Start-up Manager) | Complete |
| Lessons Learned Report | Chathura Bhashitha (Project Manager) | Complete |
| Quality Plan | Iruwan Tharaka (Quality Manager) | Complete |
| Risk Plan and Log | Kalindu Tharanga (Risk Manager) | Complete |
| Communication Plan and Meeting Minutes | Kalindu Tharanga (Scheduling Manager) | Complete |
| Test Cases (Full) | Iruwan Tharaka (Quality Manager) | Complete |
| README | Bethmi Jayamila | Complete |
| Implementation Plan | Bethmi Jayamila | Complete |
| API Reference | Chathura Bhashitha | Complete |
| Database Schema | Chathura Bhashitha | Complete |
| Sprint History | Bethmi Jayamila | Complete |
| Deployment Guide | Kalindu Tharanga | Complete |

---

## 4. Final Sprint Summary

| Sprint | Duration | Theme | Status |
| --- | --- | --- | --- |
| Sprint 1 | 02 Feb – 15 Feb 2026 | Authentication and project setup | Complete |
| Sprint 2 | 16 Feb – 01 Mar 2026 | Core inspection and vehicle APIs | Complete |
| Sprint 3 | 02 Mar – 08 Mar 2026 | Driver inspection workflow, AI service, PDF | Complete |
| Sprint 4 | 09 Mar – 15 Mar 2026 | Manager dashboard, analytics, inspection review | Complete |
| Sprint 5 | 16 Mar – 22 Mar 2026 | GPS tracking, map view, smart assignment | Complete |
| Sprint 6 | 23 Mar – 28 Mar 2026 | i18n, user preferences, testing, polish, documentation | Complete |

---

## 5. Team Contributions

| Team Member | Role | Key Contributions |
| --- | --- | --- |
| Bethmi Jayamila | Start-up Manager, Frontend, AI Service | React SPA (all pages), AI Flask microservice, STUB_MODE, PDF generation, i18n, digital signatures, project leadership |
| Chathura Bhashitha | Project Manager, Client-Side Backend | Auth API (register, login, Google OAuth, password reset), inspections API, photos API, user profiles, PostgreSQL schema |
| Kalindu Tharanga | Risk/Scheduling Manager, Admin-Side Backend | Vehicles API, GPS tracking, manager dashboard, analytics, smart assignment algorithm, demo seed script |
| Iruwan Tharaka | Quality Manager, QA | Integration tests, manual QA execution, defect tracking and closure, translation validation, final sign-off |

---

## 6. Defect Summary at Project Close

| ID | Severity | Description | Status |
| --- | --- | --- | --- |
| DEF-001 | P0 | AI service fails to start on macOS — port 5000 conflict with AirPlay Receiver | Closed — port changed to 5001 |
| DEF-002 | P1 | PDF missing customer signature when generated immediately after signing | Closed — 500ms delay added before html2canvas capture |
| DEF-003 | P1 | Smart assignment returns 0 results when no GPS coordinates stored | Closed — fallback to all available vehicles when GPS data absent |
| DEF-004 | P2 | Sinhala translation missing for inspection type labels | Closed — keys added to si.json |
| DEF-005 | P2 | Manager dashboard alert count included already-reviewed inspections | Closed — query updated to filter status = completed AND review IS NULL |
| DEF-006 | P3 | Typo in ta.json for the Vehicle Details label | Closed |

**All P0 and P1 defects closed before final submission. 0 open defects.**

---

## 7. Risk Closure Summary

| Risk ID | Description | Final Status |
| --- | --- | --- |
| R01 | AI service port conflict on macOS | Closed — port changed to 5001 in Sprint 3 |
| R02 | YOLOv8 model weights not available on all machines | Closed — STUB_MODE delivered in Sprint 3 |
| R03 | Google Maps API key absent | Documented — non-critical; fallback UI message in place |
| R04 | PostgreSQL not running on developer machine | Documented — setup guide and error reference complete |
| R05 | Database migration not applied | Documented — `npm run db:migrate` runs all migrations |
| R06 | PDF missing signature on fast completion | Closed — 500ms delay resolved race condition in Sprint 6 |
| R07 | Smart assignment returns empty results | Closed — GPS fallback logic delivered in Sprint 5 |
| R08 | PDPA 2022 GPS log retention not automated | Documented — purge command and crontab template in DEPLOYMENT_GUIDE.md |
| R09 | Key team member unavailable near deadline | Monitored — no incident occurred; all code committed and documented |
| R10 | Translation key missing in one language file | Closed — DEF-004 caught and fixed in Sprint 6 QA pass |

**5 risks closed. 3 documented with operational workarounds. 2 monitored with no incident.**

---

## 8. Quality Sign-Off

| QA Checkpoint | Result |
| --- | --- |
| All Jest backend tests pass — 0 failures | Pass |
| All manual QA test cases executed and passed | Pass |
| All P0 and P1 defects closed | Pass |
| PDF report generates with both signatures | Pass |
| Language switching works for EN, SI, and TA | Pass |
| STUB_MODE confirmed working without model weights | Pass |
| Role-based access control verified | Pass |
| Demo data loads via `npm run demo` | Pass |
| All environment variables documented in README and .env.example | Pass |

**QA Sign-Off:** Iruwan Tharaka — Quality Manager
**Sign-Off Date:** 28 March 2026

---

## 9. Outstanding Items at Project Close

The following items are identified as residual and documented for any future production deployment. None are blockers for submission.

| Item | Description | Action Required |
| --- | --- | --- |
| GPS log purge automation | PDPA 2022 requires GPS records older than 90 days to be deleted. Purge is not automated within the application. | Configure the cron job in `docs/DEPLOYMENT_GUIDE.md` before production deployment |
| Google Maps API key | Map View and Smart Assignment geocoding require `VITE_GOOGLE_MAPS_API_KEY` to be set. Features degrade gracefully without it. | Obtain API key from Google Cloud Console and set in root `.env` |
| Production deployment | The system is currently configured for local development only. No production hosting has been set up. | Follow `docs/DEPLOYMENT_GUIDE.md` for Ubuntu VPS or Docker Compose deployment |
| Demo video | A 5-minute project demonstration video is required as part of the Project Manager's submission. | Chathura Bhashitha to record and submit by 28 March 2026 |

---

## 10. Lessons Learned Summary

The following are the highest-impact lessons from the project. Full analysis is in `Lessons_Learned_Report.md`.

| # | Lesson | Impact |
| --- | --- | --- |
| L1 | Build STUB_MODE for every external dependency before the model or service is finalised | Decoupled AI development from frontend development across 4 sprints |
| L2 | Use React Context API for multi-step form state from the start | Prevented expensive refactoring of the 8-step inspection workflow |
| L3 | Store user preferences server-side, not in localStorage | Language preference persists across devices and browser clears |
| L4 | Client-side PDF generation (html2canvas + jsPDF) is more accurate than server-side layout reconstruction | Saved approximately one day of failed server-side PDF work in Sprint 3 |
| L5 | Compliance-related automation (GPS log purge) must be implemented in the same sprint it is identified | Deferred to documentation; requires manual setup in production |
| L6 | Check for OS-specific port conflicts before selecting service ports | macOS AirPlay on port 5000 blocked AI service startup for two hours |
| L7 | Invest in a reproducible demo seed script before Sprint 4 | Every demonstration from Sprint 4 onwards used realistic, consistent data |

---

## 11. Post-Project Recommendations

If FleetGuard AI were to continue as a production product, the following improvements are recommended.

| Priority | Recommendation | Rationale |
| --- | --- | --- |
| High | Automate the PDPA 2022 GPS log purge as a scheduled job within the application | Removes dependency on manual cron setup; eliminates compliance risk |
| High | Add real-time GPS updates using WebSockets or Server-Sent Events | Current GPS updates require manual POST calls; live tracking would require push-based updates |
| High | Add rate limiting to the authentication endpoints | Prevents brute-force attacks on the login endpoint |
| Medium | Integrate with a production email provider (SendGrid or AWS SES) | Current Gmail SMTP is not suitable for high-volume production use |
| Medium | Add automated end-to-end tests using Playwright or Cypress | Current test suite covers backend integration; no automated browser tests exist |
| Medium | Containerise all three services with Docker Compose for consistent deployment | Reduces environment-specific setup issues |
| Low | Add a mobile-native driver application using React Native | Drivers currently use a mobile browser; a native app would improve camera and GPS access |
| Low | Train the YOLOv8 model on a larger Sri Lanka-specific vehicle damage dataset | Current model trained on a general dataset; local vehicle types and damage patterns differ |

---

## 12. Project Sign-Off

By signing below, each team member confirms that:

- All assigned deliverables have been completed to the agreed standard.
- All defects of P0 and P1 severity have been resolved and verified.
- All project documentation has been reviewed and is accurate.
- The project is formally closed as of 28 March 2026.

| Role | Name | Signature | Date |
| --- | --- | --- | --- |
| Start-up Manager | Bethmi Jayamila | | 28 March 2026 |
| Project Manager | Chathura Bhashitha | | 28 March 2026 |
| Quality Manager | Iruwan Tharaka | | 28 March 2026 |
| Risk / Scheduling Manager | Kalindu Tharanga | | 28 March 2026 |

---

## 13. Document Index — Final Submission

| Document | Location |
| --- | --- |
| Project Plan | `project_management_docs/Project_Plan.md` |
| Code of Conduct | `project_management_docs/Code_of_Conduct.md` |
| Lessons Learned Report | `project_management_docs/Lessons_Learned_Report.md` |
| Quality Plan | `project_management_docs/Quality_Plan.md` |
| Risk Plan and Log | `project_management_docs/Risk_Plan_and_Log.md` |
| Communication Plan and Minutes | `project_management_docs/Communication_Plan_and_Minutes.md` |
| Test Cases (Full) | `project_management_docs/Test_Cases_Full.md` |
| Project Closure Report | `project_management_docs/Project_Closure_Report.md` |
| README | `README.md` |
| Implementation Plan | `implementation_plan.md` |
| API Reference | `docs/API_REFERENCE.md` |
| Database Schema | `docs/DATABASE_SCHEMA.md` |
| Sprint History | `docs/SPRINT_HISTORY.md` |
| Deployment Guide | `docs/DEPLOYMENT_GUIDE.md` |
| Technical Architecture | `docs/TECHNICAL_ARCHITECTURE.md` |

---

*This document marks the formal close of the FleetGuard AI project.*
*All source code is available in the shared Git repository with full commit history.*
