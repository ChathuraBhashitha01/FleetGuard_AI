# Risk Plan and Log — FleetGuard AI

**Document owner:** Risk Manager — Kalindu Tharanga
**Version:** 2.0 (Final)
**Date:** March 2026
**Review frequency:** At the start of each sprint

---

## 1. Risk Management Approach

Risk management for FleetGuard AI is proactive. Risks are identified at project initiation and continuously updated as new threats emerge. Each risk is assessed by probability and impact, assigned a risk score, and given a designated owner responsible for monitoring and executing the mitigation strategy.

The Risk Manager (Kalindu Tharanga) reviews the register at the start of each sprint and presents updates at the sprint planning meeting.

---

## 2. Risk Scoring Matrix

### Probability Scale

| Score | Label | Definition |
| --- | --- | --- |
| 1 | Very Low | Less than 15% chance of occurring |
| 2 | Low | 15–30% chance |
| 3 | Medium | 30–60% chance |
| 4 | High | 60–80% chance |
| 5 | Very High | Greater than 80% chance |

### Impact Scale

| Score | Label | Definition |
| --- | --- | --- |
| 1 | Negligible | No meaningful effect on delivery |
| 2 | Minor | Short delay; workaround available |
| 3 | Moderate | A sprint deliverable delayed by 1–2 days |
| 4 | Major | A core feature blocked; sprint goal at risk |
| 5 | Critical | Project delivery fails; data lost; security breach |

### Risk Score = Probability × Impact

| Score Range | Risk Level | Action Required |
| --- | --- | --- |
| 1–4 | Low | Monitor; no immediate action |
| 5–9 | Medium | Active mitigation plan in place |
| 10–16 | High | Immediate escalation to Start-up Manager |
| 17–25 | Critical | Sprint halted; all hands on resolution |

---

## 3. Risk Response Strategies

| Strategy | Description |
| --- | --- |
| **Avoid** | Change the plan to eliminate the risk entirely |
| **Mitigate** | Reduce probability or impact through proactive action |
| **Transfer** | Assign the risk to another party (e.g. vendor SLA) |
| **Accept** | Acknowledge the risk; have a contingency plan ready |

---

## 4. Risk Register

### R01 — AI Service Port Conflict on macOS

| Field | Detail |
| --- | --- |
| Category | Technical — Infrastructure |
| Description | Flask's default port (5000) is occupied by Apple's AirPlay Receiver on macOS 12+. The AI service fails to start with `Address already in use`. |
| Probability | 4 (High — all team members use macOS) |
| Impact | 4 (Major — AI integration blocked) |
| Risk Score | 16 (High) |
| Strategy | Avoid |
| Mitigation | Change AI service default port to 5001. Document in `README.md` and `implementation_plan.md`. |
| Owner | Bethmi Jayamila |
| Status | **Closed** — Resolved in Sprint 3 |

---

### R02 — YOLOv8 Model Not Available on Developer Machines

| Field | Detail |
| --- | --- |
| Category | Technical — AI/ML |
| Description | Trained model weights (`best.pt`) are large binary files that cannot be committed to Git. A developer without the weights cannot run the real AI inference, blocking inspection workflow testing. |
| Probability | 5 (Very High — first-time setup on any machine) |
| Impact | 4 (Major — inspection workflow AI step blocked) |
| Risk Score | 20 (Critical) |
| Strategy | Mitigate |
| Mitigation | Implement STUB_MODE in the AI service. If `best.pt` is missing, return a realistic mock response with `stub_mode: true`. The full application runs end-to-end without the model. |
| Owner | Bethmi Jayamila |
| Status | **Closed** — STUB_MODE delivered in Sprint 3 |

---

### R03 — Google Maps API Key Absent

| Field | Detail |
| --- | --- |
| Category | Technical — External Dependency |
| Description | Map View and Smart Assignment geocoding require `VITE_GOOGLE_MAPS_API_KEY`. Without it, the map renders blank and address lookup silently fails, making two major features non-functional. |
| Probability | 3 (Medium — key is optional and easy to miss) |
| Impact | 3 (Moderate — Map View and Smart Assignment unusable) |
| Risk Score | 9 (Medium) |
| Strategy | Mitigate |
| Mitigation | Document the API key requirement prominently in `README.md` with an explicit note that Map View and Smart Assignment require it. Add a UI fallback message when the key is absent. |
| Owner | Kalindu Tharanga |
| Status | **Active — Documented** |

---

### R04 — PostgreSQL Not Running on Developer Machine

| Field | Detail |
| --- | --- |
| Category | Technical — Database |
| Description | The backend fails entirely if PostgreSQL is not running or `backend/.env` has incorrect credentials. Error messages are not always self-explanatory. |
| Probability | 4 (High — common on first-time setup) |
| Impact | 4 (Major — entire backend non-functional) |
| Risk Score | 16 (High) |
| Strategy | Mitigate |
| Mitigation | Document all common connection errors with exact fix commands in `docs/DATABASE_CONNECTION.md`. Include a verification step in `implementation_plan.md`. |
| Owner | Chathura Bhashitha |
| Status | **Active — Documented** |

---

### R05 — Database Migration Not Applied

| Field | Detail |
| --- | --- |
| Category | Technical — Database |
| Description | Sprint 5 added `last_latitude`, `last_longitude`, `last_location_update` to `vehicles` and created the `gps_logs` table. Sprint 6 added `user_preferences`. Any developer who ran `db:init` before these migrations will get runtime errors on GPS and preferences endpoints. |
| Probability | 3 (Medium) |
| Impact | 3 (Moderate — GPS and preferences broken) |
| Risk Score | 9 (Medium) |
| Strategy | Mitigate |
| Mitigation | `npm run db:migrate` runs all migrations in sequence. Documented in `README.md`. Error messages include the missing column/table name, which maps to a specific migration script. |
| Owner | Chathura Bhashitha |
| Status | **Active — Documented** |

---

### R06 — PDF Missing Signature on Fast Completion

| Field | Detail |
| --- | --- |
| Category | Technical — Frontend |
| Description | When the driver completes the digital signature and immediately triggers PDF generation, the canvas is sometimes not fully rendered before `html2canvas` captures it, resulting in a blank signature area in the PDF. |
| Probability | 3 (Medium — race condition on slow devices) |
| Impact | 3 (Moderate — PDF is legally incomplete without signatures) |
| Risk Score | 9 (Medium) |
| Strategy | Mitigate |
| Mitigation | Added a 500ms delay after signature confirmation before initiating `html2canvas` capture. Validated on both fast and slow devices. |
| Owner | Bethmi Jayamila |
| Status | **Closed** — Resolved in Sprint 6 |

---

### R07 — Smart Assignment Returns Empty Results

| Field | Detail |
| --- | --- |
| Category | Technical — Backend |
| Description | The smart assignment algorithm calculates distance using `last_latitude`/`last_longitude` on vehicles. If no vehicles have GPS coordinates yet (new deployment), all vehicles score 0 on the distance component and the result could appear empty or identical. |
| Probability | 3 (Medium — guaranteed on fresh installation) |
| Impact | 2 (Minor — feature appears broken on first use) |
| Risk Score | 6 (Medium) |
| Strategy | Mitigate |
| Mitigation | When no GPS coordinates are present, the distance component defaults to 0 for all vehicles (equal weight). Results are still returned based on health score and tier. A note is shown in the UI when coordinates are unavailable. |
| Owner | Kalindu Tharanga |
| Status | **Closed** — Resolved in Sprint 5 |

---

### R08 — PDPA 2022 GPS Log Retention Not Automated

| Field | Detail |
| --- | --- |
| Category | Legal/Compliance |
| Description | Sri Lanka's PDPA 2022 requires GPS location data not to be retained beyond 90 days. The database schema supports this (indexed `captured_at`), but the automated purge is not implemented inside the application — it requires a manually configured cron job on the deployment server. |
| Probability | 2 (Low — only a risk if production deployment is set up without the cron) |
| Impact | 4 (Major — legal non-compliance) |
| Risk Score | 8 (Medium) |
| Strategy | Mitigate |
| Mitigation | Purge command and crontab template documented in `docs/DEPLOYMENT_GUIDE.md`. A production deployment checklist item requires confirming the cron job is active. |
| Owner | Kalindu Tharanga |
| Status | **Active — Documented; requires deployment configuration** |

---

### R09 — Key Team Member Unavailable Near Deadline

| Field | Detail |
| --- | --- |
| Category | Operational |
| Description | If any team member is unable to contribute during the final week (illness, personal emergency), their area of responsibility may be incomplete at submission. |
| Probability | 2 (Low) |
| Impact | 5 (Critical — if the unavailable member holds a unique critical path) |
| Risk Score | 10 (High) |
| Strategy | Mitigate |
| Mitigation | All source code is in a shared repository with full commit history. Each feature area has clear documentation. Sprint 6 was deliberately loaded with polish and testing rather than new core features, giving the team buffer time. Project management documents are completed early and pushed incrementally. |
| Owner | Bethmi Jayamila (Start-up Manager) |
| Status | **Active — Monitored** |

---

### R10 — Translation Key Missing in One Language File

| Field | Detail |
| --- | --- |
| Category | Quality |
| Description | If a new UI string is added to `en.json` but not to `si.json` or `ta.json`, i18next falls back to the key name (e.g., `inspection.title`) instead of the translated text. This is a silent defect that only appears when the UI is viewed in Sinhala or Tamil. |
| Probability | 3 (Medium — easy to forget when adding new features) |
| Impact | 2 (Minor — text falls back to key name; not a crash) |
| Risk Score | 6 (Medium) |
| Strategy | Mitigate |
| Mitigation | Code review checklist includes verifying that all three locale files are updated in the same commit. Quality Manager checks for fallback key strings during the final QA pass. |
| Owner | Iruwan Tharaka |
| Status | **Closed** — DEF-004 (Sinhala inspection type label) caught and fixed in Sprint 6 |

---

## 5. Risk Summary by Status

| Status | Count |
| --- | --- |
| Closed | 5 (R01, R02, R06, R07, R10) |
| Active — Documented | 3 (R03, R04, R05) |
| Active — Monitored | 2 (R08, R09) |
| **Total** | **10** |

---

## 6. Residual Risks at Project Close

| Risk ID | Description | Residual Action |
| --- | --- | --- |
| R03 | Google Maps API key required for Map/Smart Assignment | Documented; non-critical features remain functional without it |
| R08 | GPS log purge requires manual cron setup | Deployment checklist item; purge command documented |
| R09 | Key member unavailability | All code committed and documented; no single point of failure at project end |
