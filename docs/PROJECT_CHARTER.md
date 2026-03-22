# Project Charter — FleetGuard AI

**Document version:** 1.0
**Date:** March 2026
**Status:** Active

---

## 1. Project Overview

### 1.1 Project Name

FleetGuard AI — AI-Powered Vehicle Inspection and Fleet Management System

### 1.2 Executive Summary

FleetGuard AI is a full-stack web application built for Sri Lankan travel agencies to digitalise and automate their vehicle inspection process. The system replaces manual paper-based pre/post rental inspection forms with an AI-assisted digital workflow, providing managers with real-time fleet visibility, damage history, and data-driven vehicle assignment decisions.

### 1.3 Problem Statement

Sri Lankan travel agencies currently rely on paper-based vehicle inspection sheets that are:

- **Inconsistent** — Inspector judgment varies; damage is subjective and under-reported.
- **Slow** — Paper forms require manual filing, scanning, and reconciliation.
- **Unverifiable** — No photographic audit trail for damage disputes.
- **Unactionable** — Managers cannot see fleet health or driver activity in real time.
- **Legally exposed** — Disputes over pre-existing damage are resolved without evidence.

### 1.4 Proposed Solution

A three-tier web application comprising:

1. **Driver mobile web portal** — Guided inspection workflow with camera capture, AI damage detection, digital signatures, and PDF report generation.
2. **Manager web dashboard** — Fleet health monitoring, inspection review, driver management, smart vehicle assignment, GPS tracking, and analytics.
3. **Python AI microservice** — YOLOv8 computer vision model trained on the VehiDE dataset to detect and classify vehicle damage from inspection photos.

---

## 2. Objectives

### 2.1 Primary Objectives

| # | Objective | Success Metric |
| --- | --- | --- |
| O1 | Digitalise the pre/post rental inspection workflow | 100% of inspections captured digitally |
| O2 | Detect vehicle damage automatically from photos | AI analysis available for all 8-photo sets |
| O3 | Provide managers real-time fleet visibility | Dashboard load time < 3 s; GPS refresh < 30 s |
| O4 | Generate legally defensible inspection reports | Signed PDF produced at inspection completion |
| O5 | Support multi-language use (EN / SI / TA) | All UI strings translated; language persists across sessions |

### 2.2 Secondary Objectives

- Reduce inspection completion time by ≥ 50% compared to paper process.
- Maintain 90-day GPS log retention in compliance with Sri Lanka PDPA 2022.
- Provide managers with 7/30/90-day fleet health trend analytics.
- Enable AI-powered vehicle assignment based on customer tier, vehicle health, and proximity.

---

## 3. Scope

### 3.1 In Scope

- Driver portal: authentication, inspection workflow, GPS, profile management
- Manager portal: fleet management, inspection review, driver management, smart assignment, map view, analytics, notifications
- AI microservice: YOLOv8 damage detection, health score calculation
- PostgreSQL database with role-based data access
- JWT + Google OAuth2 authentication
- PDF report generation with digital signatures
- Three-language UI (English, Sinhala, Tamil)
- Email-based password reset
- PDPA 2022 GPS data compliance

### 3.2 Out of Scope

- Native iOS/Android applications (web-only)
- Billing, invoicing, or payment processing
- Integration with third-party ERP or fleet telematics hardware
- Offline-first / service worker support
- Real-time push notifications (WebSocket/SSE)
- Custom AI model retraining UI
- Multi-tenant SaaS infrastructure

---

## 4. Stakeholders

| Stakeholder | Role | Responsibilities |
| --- | --- | --- |
| Travel agency managers | Primary end user (manager) | Fleet oversight, inspection approval, driver management |
| Vehicle drivers | Primary end user (driver) | Conduct inspections, capture photos, generate reports |
| Rental customers | Indirect user | Sign digital inspection at handover |
| System administrators | Platform admin | User management, system configuration |
| Development team | Delivery | Design, build, test, deploy |

---

## 5. Team

| Name | Role | Sprint Responsibility |
| --- | --- | --- |
| Bethmi Jayamila | Lead — AI & Admin Frontend | AI microservice, admin portal UI, project coordination |
| Chathura Bhashitha | Backend Engineer | Authentication, inspections, photos, driver endpoints |
| Kalindu Tharanga | Backend Engineer | Vehicles, manager dashboard, smart assignment, analytics, GPS |
| Iruwan Tharaka | QA Engineer | Test planning, test execution, defect reporting |

---

## 6. Delivery Milestones

| Sprint | Period | Deliverables |
| --- | --- | --- |
| Sprint 1 | Week 1–2 | Project setup, PostgreSQL schema, JWT auth (register/login/Google OAuth), role middleware |
| Sprint 2 | Week 3–4 | Vehicle CRUD, inspection lifecycle (create/complete), photo upload (single + batch), password reset |
| Sprint 3 | Week 5–6 | Driver inspection UI workflow (8 steps), AI processing screen, digital signatures, PDF generation |
| Sprint 4 | Week 7–8 | Manager dashboard (stats, activity), inspection review (approve/flag), driver management UI |
| Sprint 5 | Week 9–10 | GPS location tracking, real-time map view, smart vehicle assignment, analytics dashboard |
| Sprint 6 | Week 11–12 | User preferences (language/theme), full i18n (EN/SI/TA), notifications, demo data, testing |

---

## 7. Constraints

| Constraint | Detail |
| --- | --- |
| Language support | Must support English, Sinhala, and Tamil (Sri Lanka official languages) |
| Legal compliance | GPS logs must not be retained beyond 90 days (PDPA 2022) |
| Connectivity | Designed for mobile web use in areas with intermittent connectivity |
| AI fallback | System must operate gracefully if AI service is unavailable (STUB_MODE) |
| Authentication | Password minimum: 8 characters, mixed case + number + symbol |

---

## 8. Assumptions

- Users have access to a modern mobile browser with camera permission.
- Travel agencies operate in Sri Lanka with local network infrastructure.
- PostgreSQL 15+ is available in the target deployment environment.
- Google Cloud credentials (Maps API, OAuth) are provisioned by the agency.
- The AI model (YOLOv8) is pre-trained and weights are included in the repository.

---

## 9. Risks

| Risk | Probability | Impact | Mitigation |
| --- | --- | --- | --- |
| AI service unavailable | Medium | High | STUB_MODE returns pseudo-detections; system continues operating |
| Poor photo quality in field | High | Medium | UI provides framing guide for each of the 8 photo angles |
| GPS inaccuracy on mobile | Medium | Low | GPS is informational only; not used for enforcement |
| Database migration failure | Low | High | All migrations are idempotent and versioned; rollback scripts maintained |
| Google API key expiry | Low | Medium | Maps/OAuth are optional features; core inspection works without them |

---

## 10. Success Criteria

The project is considered successful when:

1. A driver can complete a full pre-rental inspection (8 photos → AI analysis → signatures → PDF) in under 5 minutes.
2. A manager can log in and see fleet health, recent inspections, and vehicle locations from a single dashboard.
3. AI damage detection returns results with ≥ 80% precision on the held-out VehiDE test set.
4. All UI elements are available in English, Sinhala, and Tamil with language selection persisted per user.
5. The system passes all integration tests with a real PostgreSQL database (no mocked DB calls).
6. GPS log entries older than 90 days are automatically purged per PDPA 2022 requirements.
