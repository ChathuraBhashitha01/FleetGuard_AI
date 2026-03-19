# Quality Plan — FleetGuard AI

**Document owner:** Quality Manager — Iruwan Tharaka
**Version:** 2.0 (Final)
**Date:** March 2026

---

## 1. Quality Policy

FleetGuard AI is used by drivers and managers in real field conditions. An inspection report that misclassifies damage severity, a PDF that fails to generate, or a login that rejects a valid credential directly harms users and undermines trust. The quality standard for this project is:

> Every critical user path must work correctly under normal conditions, fail gracefully under error conditions, and produce accurate, traceable output at all times.

The Quality Manager is responsible for defining acceptance criteria, executing integration tests, tracking defects, and issuing the final QA sign-off before submission.

---

## 2. Quality Objectives

| # | Objective | Acceptance Criterion |
| --- | --- | --- |
| Q1 | Authentication is secure and reliable | Register, login, Google OAuth, and password reset all succeed; invalid credentials are rejected |
| Q2 | Inspection workflow completes without error | All 8 steps navigate correctly; photos, signatures, and AI results are stored; PDF generates |
| Q3 | AI service is resilient | Damage detections returned for valid images; STUB_MODE returns valid JSON if model unavailable |
| Q4 | Manager dashboard reflects live data | KPI cards, inspection list, and analytics return accurate counts from the database |
| Q5 | Smart assignment returns ranked results | Scoring (health + distance + tier) produces a ranked list in < 500ms |
| Q6 | Multi-language UI is complete | All 526 translation keys are present in EN, SI, and TA; language switching works instantly |
| Q7 | GPS tracking records correctly | Location updates stored in `gps_logs`; vehicle coordinates update on map |
| Q8 | PDF report is correct | Report contains customer info, vehicle details, damage summary, and both signatures |
| Q9 | Role-based access control is enforced | Drivers cannot access manager routes; managers cannot modify driver inspections |
| Q10 | Database integrity is maintained | Foreign key constraints hold; cascading deletes remove related records correctly |

---

## 3. Quality Assurance (Process Quality)

QA activities prevent defects from being introduced. The following processes are mandatory across all sprints.

### 3.1 Code Review

- All pull requests require at least one peer review before merge.
- The reviewer checks: correctness, edge case handling, parameterised SQL (no string interpolation), and presence of an author header.
- PRs are not merged with unresolved review comments.

### 3.2 Parameterised Database Queries

All SQL queries must use parameterised inputs. No user-supplied data may be concatenated into a SQL string. This is enforced during code review for every model file.

**Accepted:**

```javascript
pool.query('SELECT * FROM users WHERE email = $1', [email])
```

**Rejected:**

```javascript
pool.query(`SELECT * FROM users WHERE email = '${email}'`)
```

### 3.3 Error Handling Standards

All controller functions are wrapped in `try/catch`. Errors are passed to `next(err)` for the global error handler. No unhandled promise rejections are permitted in the backend. All API errors return a structured JSON body with an `error` field.

### 3.4 Translation Completeness

Any new UI string must be added to all three locale files (`en.json`, `si.json`, `ta.json`) in the same commit. A new key in one file without the others is a defect.

### 3.5 Environment Variable Documentation

Any new environment variable introduced must be documented in `README.md` and the relevant `.env.example` file in the same PR.

---

## 4. Quality Control (Output Verification)

QC activities verify that deliverables meet the acceptance criteria.

### 4.1 Backend Integration Test Suite

Tests are written in Jest and run with `npm run test` from the `backend/` directory. Tests connect to a real PostgreSQL test database — no mocked database calls.

| Test Area | File | Coverage |
| --- | --- | --- |
| Authentication | `auth.test.js` | Register, login, duplicate email, invalid password, Google OAuth |
| Inspections | `inspections.test.js` | Create, get own, get all (manager), complete, AI trigger, review |
| Vehicles | `vehicles.test.js` | List, get by ID, create, update, filter by status |
| Photos | `photos.test.js` | Upload single, upload batch, upload signature |
| Middleware | `middleware.test.js` | Missing token, expired token, wrong role |
| Notifications | `notifications.test.js` | Get, mark as read |

**Acceptance criterion:** All tests pass with `0 failures`. Coverage report must show > 70% on controller files.

### 4.2 Frontend Component Tests

Tests are written in Vitest with React Testing Library and run with `npm run test` from the project root.

| Component | Test Scenario |
| --- | --- |
| DriverLogin | Renders form; submits with valid credentials; shows error on invalid |
| InspectionContext | State persists across step transitions |
| LanguageSwitcher | Switching language updates all visible strings |
| ManagerDashboard | KPI cards render with mocked API data |
| PhotoCapture | Camera capture UI mounts without errors |

**Acceptance criterion:** All component tests pass.

### 4.3 Manual QA Test Cases

The Quality Manager executes the following manual tests before the final submission sign-off.

#### Authentication

| ID | Test | Expected Result | Pass / Fail |
| --- | --- | --- | --- |
| A01 | Register new driver with valid data | Account created; JWT returned; driver dashboard loads | Pass |
| A02 | Register with duplicate email | 409 Conflict returned; descriptive error message shown | Pass |
| A03 | Login with wrong password | 401 returned; error message shown | Pass |
| A04 | Access manager route as driver | 403 Forbidden returned | Pass |
| A05 | Google OAuth sign-in | Token returned; dashboard loads | Pass |
| A06 | Password reset email | Email received; reset link works; new password accepted | Pass |

#### Driver Inspection Workflow

| ID | Test | Expected Result | Pass / Fail |
| --- | --- | --- | --- |
| I01 | Select vehicle and enter customer details | Step 2 submits; inspection record created in DB | Pass |
| I02 | Capture all 8 photos | Photos stored in `uploads/inspections/`; thumbnails visible | Pass |
| I03 | Trigger AI analysis | Loading screen shown; damage cards displayed with severity | Pass |
| I04 | Capture driver and customer signatures | Signatures saved as PNG in `uploads/signatures/` | Pass |
| I05 | Generate PDF report | PDF opens correctly; contains customer name, damage summary, both signatures | Pass |
| I06 | Download PDF | File downloads successfully | Pass |

#### Manager Portal

| ID | Test | Expected Result | Pass / Fail |
| --- | --- | --- | --- |
| M01 | Manager dashboard KPI cards | Correct counts for total, available, in-use, maintenance | Pass |
| M02 | Review an inspection (approve) | Status updates to `reviewed`; review record created in DB | Pass |
| M03 | Flag an inspection | Review status shows `flagged`; notes saved | Pass |
| M04 | Add a new vehicle | Vehicle appears in fleet list; health score defaults to 100 | Pass |
| M05 | Smart assignment | Ranked vehicle list returned; scores visible; distance shown | Pass |
| M06 | Map view | Google Maps renders; vehicle markers appear at correct coordinates | Pass |
| M07 | Analytics — health trend | Chart renders for 7, 30, and 90-day windows | Pass |
| M08 | Analytics — damage types | Donut chart shows correct distribution | Pass |

#### Language Switching

| ID | Test | Expected Result | Pass / Fail |
| --- | --- | --- | --- |
| L01 | Switch to Sinhala | All navigation, dashboard labels, and form labels change | Pass |
| L02 | Switch to Tamil | All navigation, dashboard labels, and form labels change | Pass |
| L03 | Language persists after logout/login | Same language selected on next login | Pass |

#### Security

| ID | Test | Expected Result | Pass / Fail |
| --- | --- | --- | --- |
| S01 | Request with no JWT | 401 returned | Pass |
| S02 | Request with expired JWT | 401 returned | Pass |
| S03 | Upload a non-image file as photo | 400 returned; file not saved | Pass |
| S04 | Driver accesses `/api/manager/*` route | 403 returned | Pass |

### 4.4 AI Service QC

| ID | Test | Expected Result |
| --- | --- | --- |
| AI01 | POST valid JPEG to `/api/detect` | JSON returned with `damages`, `health_score`, `analysis_complete: true` |
| AI02 | POST with model weights missing | STUB_MODE response returned with `stub_mode: true`; HTTP 200 |
| AI03 | POST non-JPEG file | 400 returned; no crash |
| AI04 | POST 8 images simultaneously | All 8 processed; `total_damages` accurate |

---

## 5. Defect Tracking

All defects are logged with the following attributes:

| Attribute | Description |
| --- | --- |
| ID | Sequential: DEF-001, DEF-002, etc. |
| Severity | P0 (blocker), P1 (high), P2 (medium), P3 (low) |
| Description | What failed, what was expected |
| Steps to reproduce | Exact steps to trigger the defect |
| Assigned to | Team member responsible for the fix |
| Status | Open, In Progress, Fixed, Verified, Closed |

### Severity Definitions

| Level | Definition | Resolution SLA |
| --- | --- | --- |
| P0 — Blocker | Application crash; data loss; security breach; feature completely non-functional | Fix within 4 hours |
| P1 — High | Feature partially broken; incorrect data displayed; login failure | Fix within 24 hours |
| P2 — Medium | Minor visual error; edge case failure; incorrect label | Fix within current sprint |
| P3 — Low | Cosmetic issue; documentation error | Fix at discretion |

---

## 6. Defect Log (Final Sprint)

| ID | Severity | Description | Assigned To | Status |
| --- | --- | --- | --- | --- |
| DEF-001 | P0 | AI service fails to start on macOS (port 5000 conflict) | Bethmi | Closed — changed to port 5001 |
| DEF-002 | P1 | PDF missing customer signature when generated immediately after signing | Chathura | Closed — added 500ms delay before PDF capture |
| DEF-003 | P1 | Smart assignment returns 0 results when no GPS coordinates stored | Kalindu | Closed — fallback to all available vehicles when no GPS data |
| DEF-004 | P2 | Sinhala translation missing for inspection type labels | Bethmi | Closed — keys added to `si.json` |
| DEF-005 | P2 | Manager dashboard alert count includes reviewed inspections | Kalindu | Closed — query updated to filter `status = completed AND review IS NULL` |
| DEF-006 | P3 | Typo in `ta.json` for the "Vehicle Details" label | Bethmi | Closed |

---

## 7. QA Sign-Off Checklist

The Quality Manager must verify the following before final submission:

- [ ] All Jest backend tests pass — `npm run test` exits with `0 failures`
- [ ] All Vitest frontend tests pass — `npm run test` exits with `0 failures`
- [ ] All manual QA test cases above are executed and pass
- [ ] All P0 and P1 defects are closed
- [ ] PDF report generates correctly with both signatures
- [ ] Language switching works for EN, SI, and TA
- [ ] STUB_MODE confirmed working (model weights temporarily removed, endpoint returns HTTP 200)
- [ ] Role-based access control verified (driver cannot access manager routes)
- [ ] Demo data loads successfully via `npm run demo`
- [ ] All environment variables documented in `README.md` and `.env.example`

**QA Sign-Off:** Iruwan Tharaka — Quality Manager
**Date:** March 2026
