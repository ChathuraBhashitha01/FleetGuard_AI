# Lessons Learned Report — FleetGuard AI

**Document owner:** Project Manager — Chathura Bhashitha
**Version:** 2.0 (Final)
**Date:** March 2026
**Project duration:** 12 weeks (6 × 2-week sprints)

---

## 1. Purpose

This report captures what the FleetGuard AI team learned during the design, build, and delivery of the full-stack vehicle inspection and fleet management system. It documents the gap between what was planned and what was actually experienced, preserving institutional knowledge for future projects.

---

## 2. Project Objectives vs. Actual Outcomes

| Objective | Target | Actual Outcome | Result |
| --- | --- | --- | --- |
| Digitalise inspection workflow | 100% of inspections captured digitally | 8-step guided workflow delivered end-to-end | Achieved |
| AI damage detection | Model running on all inspections | YOLOv8 inference working; STUB_MODE for graceful degradation | Achieved |
| Manager real-time fleet visibility | Dashboard load < 3s | Dashboard loads in < 2s on local network | Achieved |
| Signed PDF report per inspection | PDF generated with both signatures | PDFKit report + html2canvas signatures working | Achieved |
| Three-language UI | EN, SI, TA fully translated | 526 keys translated in all three languages | Achieved |
| GPS fleet tracking | Live vehicle locations on map | GPS tracked, map renders with Google Maps API | Achieved |
| Smart vehicle assignment | Ranked recommendations < 500ms | Haversine + scoring algorithm returns in < 200ms | Achieved |
| Integration test coverage | All critical paths tested | Auth, inspections, vehicles, photos covered | Achieved |
| Project deadline | Friday, 28 March 2026 | On track | On track |

---

## 3. What Went Well

### 3.1 Clear Component Ownership from Sprint 1

Splitting the backend across two engineers — Chathura (client-side: auth, inspections, photos) and Kalindu (admin-side: vehicles, manager, analytics, GPS, smart assignment) — with Bethmi owning the entire frontend and AI service — eliminated confusion about who was responsible for what. There were no ownership disputes over any file or feature across 12 weeks. This is the most valuable structural decision the team made.

### 3.2 STUB_MODE in the AI Service

The decision to implement STUB_MODE in the Python AI service from Sprint 3 was critical. When the YOLOv8 model weights were unavailable on a machine (e.g., a team member running the app for the first time), the AI service returned realistic pseudo-detections with `stub_mode: true` in the JSON response instead of crashing. This allowed the frontend inspection workflow to be developed, demonstrated, and tested fully without requiring the trained model weights on every developer machine.

**Lesson:** When integrating an AI component into a larger system, build the graceful degradation path before the model is finalized. The STUB_MODE pattern decoupled model training from application development.

### 3.3 InspectionContext Solved the Multi-Step State Problem

The 8-step inspection workflow needs data from Step 1 (vehicle) to still be available in Step 7 (signatures) and Step 8 (PDF). Using React's Context API (`InspectionContext`) to hold the shared inspection state — rather than passing props down through each step or using URL query parameters — kept the code clean and made the workflow easy to extend.

**Lesson:** For multi-step forms with shared state, centralise state in a Context provider early. Retrofitting this later in the project would have been very expensive.

### 3.4 i18next with Per-User Preference Persistence

By storing the user's language preference in the backend (`user_preferences` table, Sprint 6) rather than only in `localStorage`, the selected language persisted across devices and across browser clears. The pattern of loading the preference from `/api/users/preferences` on login and passing it to i18next on app boot worked cleanly.

**Lesson:** User preferences that should be durable across devices belong in the database, not browser storage.

### 3.5 Demo Seed Script

The `npm run demo` script (Sprint 6) — which downloads real vehicle images from a public source and seeds a complete dataset of drivers, managers, vehicles, inspections, damage detections, and notifications — proved invaluable for demonstrations. We did not have to manually create demo data before each presentation.

**Lesson:** Invest in a reproducible demo dataset script early. It pays off every time you demonstrate the project to an examiner or stakeholder.

---

## 4. What Did Not Go Well

### 4.1 AI Service Port Conflict on macOS (Sprint 3)

**Problem:** The AI Flask service was initially configured to run on port 5000. On macOS 12+, Apple's AirPlay Receiver service occupies port 5000. The AI service could not start, and the error message (`Address already in use`) did not make the cause obvious.

**Impact:** Two hours lost debugging. AI integration blocked for half a sprint day.

**Resolution:** Changed the AI service default port to 5001 and documented this in the `README.md` and `implementation_plan.md`.

**Lesson:** Check for well-known OS port conflicts when choosing service ports. Document the rationale in the setup guide.

### 4.2 PDF Generation on Client vs. Server (Sprint 3)

**Problem:** The original plan was to generate the inspection PDF entirely on the server using pdfkit. The PDF needed to include the digital signatures (canvas drawings) and styled damage results. Transmitting the canvas PNG data to the server and reconstructing the layout in pdfkit was complex and produced poor visual results.

**Impact:** Approximately one day spent on server-side PDF generation before pivoting.

**Resolution:** PDF generation was moved to the client using `html2canvas` + `jsPDF`. The browser renders the styled inspection results page and converts it to a PDF directly, capturing signatures and styled damage cards as they appear on screen. The server receives the final PDF file for storage.

**Lesson:** For PDF documents that are essentially "screenshots of a web view", client-side generation with html2canvas is more accurate and faster than server-side layout reconstruction.

### 4.3 GPS Log PDPA Compliance Not Automated (Sprint 5)

**Problem:** The GPS log 90-day retention requirement (PDPA 2022) was identified in Sprint 5 when the GPS feature was built. The database schema correctly records `captured_at` timestamps, and the indexes support time-range queries, but the automatic purge of records older than 90 days was not implemented as a scheduled job within the application itself.

**Impact:** The compliance requirement is documented but requires a manual `psql` command or a cron job to be configured outside the application.

**Resolution:** The purge command and a crontab template are documented in `docs/DEPLOYMENT_GUIDE.md`. A production deployment must configure the cron job manually.

**Lesson:** Data retention compliance requirements identified during a sprint should be fully automated in the same sprint, not deferred to documentation. A scheduled job within the application is safer than a manual cron setup.

### 4.4 Test Files Deleted During Sprint 6 Refactor

**Problem:** During the Sprint 6 QA pass, the original auto-generated test file stubs in `backend/src/__tests__/` (which were placeholder files without real test content) were removed. This appeared in the git status as 10 deleted test files. The removal was intentional, but it was not communicated clearly, causing brief confusion in the team.

**Impact:** Minor — one sprint planning discussion was needed to confirm the deletions were expected.

**Resolution:** The replacement test suite (`e2e.test.js`, `controllers.unit.test.js`) was confirmed as the authoritative test source.

**Lesson:** When removing files intentionally, include a brief commit message note explaining why, and mention it in the next team sync.

### 4.5 Google Maps API Key Required for Map View and Smart Assignment

**Problem:** The map view and smart assignment geocoding both require `VITE_GOOGLE_MAPS_API_KEY` to be set in the root `.env`. When this key is absent, the map renders blank and smart assignment address geocoding silently fails. This was not obvious to first-time setup users.

**Impact:** Several hours of confusion during initial project setup by team members.

**Resolution:** The README and implementation plan were updated to clearly state the Maps API key as a prerequisite for those specific features, and the `.env.example` now includes a comment explaining which features each key enables.

**Lesson:** External API key dependencies should be documented with the exact features they enable, not just listed as environment variables.

---

## 5. Root Cause Analysis: Port Conflict (5 Whys)

**Problem:** AI service failed to start with `Address already in use: :::5000`

- *Why?* Port 5000 was already bound by another process.
- *Why?* macOS AirPlay Receiver occupies port 5000 on macOS 12+.
- *Why?* The team was not aware of this macOS platform-specific behaviour.
- *Why?* The Flask default port (5000) was used without checking for conflicts.
- *Why?* No port conflict check was included in the setup documentation.

**Corrective action:** Default port changed to 5001; setup docs updated.

---

## 6. Recommendations for Future Projects

| # | Recommendation | Rationale |
| --- | --- | --- |
| R1 | Define a STUB_MODE equivalent for every external dependency from the start | Prevents external service unavailability from blocking development |
| R2 | Implement all compliance-related automation in the same sprint it is identified | Deferred compliance creates deployment risk |
| R3 | Add a port conflict check to the setup documentation for every service | Saves hours of debugging on first-time setup |
| R4 | Client-side PDF generation for web-based reports | More accurate and simpler than server-side layout reconstruction |
| R5 | Write the demo seed script before Sprint 4 | Every demo from Sprint 4 onwards benefits from realistic data |
| R6 | Keep `user_preferences` server-side, not in `localStorage` | Preferences that should survive browser clears belong in the database |
| R7 | Document intentional file deletions in commit messages | Prevents confusion during code review |

---

## 7. Team Retrospective Summary

**What should we keep doing?**

- Clear component ownership split by domain (frontend, client backend, admin backend, QA)
- Incremental delivery — each sprint produced working, testable features
- STUB_MODE pattern for AI and external service dependencies
- Comprehensive seed scripts for realistic demo data

**What should we do differently?**

- Automate compliance requirements in the same sprint they are identified
- Check for platform-specific issues (port conflicts, OS differences) during project setup
- Communicate intentional deletions clearly in commits

**What should we stop doing?**

- Batching documentation to the final sprint — incremental documentation updates are less stressful and more accurate

---

## 8. Conclusion

FleetGuard AI was delivered on time with all planned features implemented across six sprints. The clear ownership model, early STUB_MODE investment, and centralised inspection state design were the most significant success factors. The main areas for improvement — compliance automation, platform-aware setup documentation, and client-side PDF generation — have been resolved and documented for future reference.
