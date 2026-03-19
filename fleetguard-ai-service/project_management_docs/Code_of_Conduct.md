# Code of Conduct — FleetGuard AI

**Document owner:** Start-up Manager — Bethmi Jayamila
**Version:** 2.0 (Final)
**Applies to:** All team members — Bethmi Jayamila, Chathura Bhashitha, Kalindu Tharanga, Iruwan Tharaka

---

## 1. Purpose

The FleetGuard AI team is building a production-grade system used by real drivers, managers, and rental customers in Sri Lanka. Our software directly influences vehicle damage records, rental dispute outcomes, and fleet safety decisions. The quality of our teamwork determines the quality of what we ship. This Code of Conduct defines the standards of behaviour, engineering practice, and collaboration that every team member commits to for the duration of the project.

---

## 2. Core Values

### 2.1 Shared Ownership

Every team member owns the outcome, not just their assigned component. If the AI service breaks the driver workflow, that is everyone's problem. If the database migration causes the manager dashboard to fail, we solve it together. Blame culture is prohibited.

### 2.2 Transparency

Work is visible by default. Progress, blockers, and pivots are communicated promptly — not at the next scheduled meeting, but as soon as they are known. No one on this team should be surprised by a missed commitment.

### 2.3 Quality Over Speed

The system is used by real people in real field conditions. A rushed feature that breaks in production is worse than a delayed feature that works. We do not merge code without testing. We do not bypass review to hit a milestone.

### 2.4 Respect for Each Other's Time

Every meeting has an agenda. Every commit has a message. Every PR has a description. We do not waste time through poor preparation.

### 2.5 Inclusive Communication

Team members bring different areas of expertise. Bethmi leads AI and frontend, Chathura leads client-side backend, Kalindu leads admin backend, Iruwan leads quality. We respect each other's domain knowledge and ask before overriding another person's technical decision.

---

## 3. Engineering Standards

### 3.1 Code Reviews

- Every pull request requires at least one review before merge.
- Review the code, not the person. Feedback must be specific and constructive.
- If you disagree with a design decision, raise it in PR comments with reasoning. If unresolved after one working day, escalate to a team call.
- No self-merge of your own PR without review, except for documentation-only changes with time pressure.

### 3.2 Branching and Commits

- Branch from `main` using the convention: `feature/<description>`, `fix/<description>`, `chore/<description>`.
- Write meaningful commit messages using Conventional Commits format: `feat(auth): add Google OAuth sign-in`.
- Do not commit directly to `main`. All changes go through a pull request.

### 3.3 File and Secret Hygiene

- Never commit secret files: `.env`, `kaggle.json`, API keys, or database passwords.
- The `.gitignore` must be respected at all times.
- Never commit `node_modules/`, `venv/`, `*.pt` model weights over 100 MB, or dataset zip files.
- If you accidentally expose a credential, rotate it immediately and notify the Start-up Manager.

### 3.4 Author Attribution

All source files must include an author header:

```javascript
/**
 * @file Brief description of the file
 * @author Your Name <your.email@example.com>
 */
```

### 3.5 Testing Responsibility

- The author of a feature is responsible for writing its initial tests.
- No feature is considered complete without at least one passing test covering the happy path.
- The Quality Manager (Iruwan) performs integration-level QA sign-off before submission.

### 3.6 Documentation

- New API endpoints must be documented in `docs/API_REFERENCE.md` before the PR is merged.
- New database tables must be documented in `docs/DATABASE_SCHEMA.md`.
- Any migration step required for a new feature must be captured in the sprint delivery notes.

---

## 4. Meeting Conduct

- Arrive on time. If you cannot attend, notify the Scheduling Manager (Kalindu) at least 30 minutes before the meeting.
- The Scheduling Manager maintains the agenda and distributes it before each meeting.
- One person speaks at a time. Decisions are documented in the Communication Plan.
- Action items are assigned a specific owner and deadline before the meeting ends.

---

## 5. Communication Standards

| Channel | Purpose | Response SLA |
| --- | --- | --- |
| Team chat (WhatsApp/Slack) | Daily status updates, quick questions | Within 2 hours during working hours |
| GitHub PR comments | Code review feedback | Within 1 working day |
| Email | Formal decisions, milestone sign-offs | Within 4 hours |
| Video call | Blockers, design decisions, sprint reviews | Scheduled same day for P0 blockers |

### 5.1 Blocker Escalation

A **blocker** is any issue that prevents you from completing your current task.

- Notify the team chat immediately — do not wait for the next scheduled meeting.
- Describe: what you are trying to do, what is failing, what you have already tried.
- The Risk Manager (Kalindu) logs the blocker in the Risk Plan and coordinates resolution.

---

## 6. Unacceptable Behaviours

The following are strictly prohibited and will be escalated to the Start-up Manager immediately:

1. **Harassment or intimidation** — of any form, in any channel.
2. **Knowledge hoarding** — withholding technical context to create dependency or appear indispensable.
3. **Silent failure** — knowing that a deliverable will be missed and not informing the team in advance.
4. **Deliberate sabotage** — introducing code that breaks the work of another team member intentionally.
5. **Ignoring code review feedback** — merging a PR after feedback has been provided and before it has been addressed.
6. **Security negligence** — committing secrets, credentials, or private keys to the repository.

---

## 7. Conflict Resolution

### Step 1 — Direct Discussion (Technical Disagreements)

Raise the disagreement in the relevant PR thread or team chat with evidence (documentation, benchmarks, test results). Allow 24 hours for asynchronous resolution.

### Step 2 — Team Vote

If unresolved, bring the issue to the next team sync. Both positions are presented in three minutes each. The team votes on the path forward. Majority wins; the outcome is logged.

### Step 3 — Start-up Manager Decision

If the conflict is interpersonal, or if the team is deadlocked on a decision that blocks progress, the Start-up Manager (Bethmi) makes the final call.

---

## 8. Acknowledgement

By contributing to this repository, each team member acknowledges they have read and will abide by this Code of Conduct for the full duration of the FleetGuard AI project.

| Name | Role | Signature |
| --- | --- | --- |
| Bethmi Jayamila | Start-up Manager | Bethmi Jayamila |
| Chathura Bhashitha | Project Manager | Chathura Bhashitha |
| Kalindu Tharanga | Risk & Scheduling Manager | Kalindu Tharanga |
| Iruwan Tharaka | Quality Manager | Iruwan Tharaka |

**Date agreed:** Beginning of Sprint 1
