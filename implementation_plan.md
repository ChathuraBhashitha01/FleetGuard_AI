# Implementation Plan — FleetGuard AI

**Purpose:** End-to-end runbook for starting all three services and verifying a healthy system state.

---

## Prerequisites

Before starting, confirm the following are installed and accessible:

| Tool | Check Command | Expected Output |
| --- | --- | --- |
| Node.js 18+ | `node --version` | `v18.x.x` or higher |
| npm 9+ | `npm --version` | `9.x.x` or higher |
| PostgreSQL 15+ | `psql --version` | `psql (PostgreSQL) 15.x` |
| Python 3.8+ | `python3 --version` | `Python 3.8.x` or higher |

---

## First-Time Setup

### Step 1 — Install dependencies

```bash
# Frontend
npm install

# Backend
cd backend && npm install && cd ..

# AI service (Python virtual environment)
cd fleetguard-ai-service
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install flask flask-cors ultralytics
cd ..
```

### Step 2 — Configure environment files

```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

Edit `backend/.env` — set `DB_PASSWORD` to your PostgreSQL password and generate a JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Paste the output as the value of `JWT_SECRET` in `backend/.env`.

### Step 3 — Initialise the database

```bash
cd backend
npm run db:init      # create fleetguard_db and apply schema.sql
npm run db:migrate   # run all sprint migrations
npm run db:seed      # seed reference data
cd ..
```

Optional — load realistic demo data (recommended for first-time use):

```bash
cd backend
npm run demo         # downloads vehicle images, seeds users/vehicles/inspections
cd ..
```

Demo credentials after seeding:

| Role | Email | Password |
| --- | --- | --- |
| Driver | `driver1@demo.fleetguard.com` | `Demo123!` |
| Manager | `manager1@demo.fleetguard.com` | `Demo123!` |
| Admin | `admin@demo.fleetguard.com` | `Demo123!` |

---

## Starting the Full Stack

Open **three separate terminal windows** and run one service per terminal.

### Terminal 1 — Backend API

```bash
cd backend
npm run dev
```

Expected output:

```text
[nodemon] starting server...
Server running on port 3001
Database pool initialised
```

Verify:

```bash
curl http://localhost:3001/api/health
# → {"status":"ok","service":"FleetGuard AI API"}
```

### Terminal 2 — AI Service

```bash
cd fleetguard-ai-service
source venv/bin/activate        # Windows: venv\Scripts\activate
python app.py
```

Expected output:

```text
 * Running on http://0.0.0.0:5001
 * Model loaded: fleetguard_damage_model4   (or: STUB_MODE active)
```

Verify:

```bash
curl http://localhost:5001/api/health
# → {"status":"ok","mode":"inference"}
```

If `"mode":"stub"` appears, the trained model weights are missing. The application still works end-to-end using stub detections.

### Terminal 3 — Frontend

```bash
npm run dev
```

Expected output:

```text
  VITE v5.x  ready in XXX ms
  ➜  Local:   http://localhost:5173/
```

Open <http://localhost:5173> in a browser.

---

## Verification Checklist

Run through these checks after starting all services:

### Authentication

- [ ] Open <http://localhost:5173> — landing page loads
- [ ] Sign up as a new driver — form submits, JWT returned, dashboard loads
- [ ] Sign in as `driver1@demo.fleetguard.com` / `Demo123!` — driver dashboard loads
- [ ] Sign in as `manager1@demo.fleetguard.com` / `Demo123!` — manager dashboard loads

### Driver Inspection Workflow

- [ ] Click "New Inspection" — vehicle selection screen appears
- [ ] Select a vehicle and enter customer details — proceeds to photo capture
- [ ] Capture or upload 8 photos — photo review screen appears
- [ ] Proceed to AI processing — analysis runs and results appear
- [ ] Digital signatures — both driver and customer signature pads work
- [ ] Report generated — PDF download link appears and file opens correctly

### Manager Dashboard

- [ ] Fleet stats cards show correct counts (total, available, in-use, maintenance)
- [ ] Inspection list loads with status filters
- [ ] Map view displays vehicle markers at GPS positions
- [ ] Smart assignment returns ranked vehicle recommendations
- [ ] Analytics charts render for 7/30/90-day windows

### AI Service

- [ ] `POST http://localhost:5001/api/detect` with a test image returns a JSON response with `damages` and `health_score`

---

## Stopping the Services

Press `Ctrl+C` in each terminal window.

---

## Troubleshooting Quick Reference

| Symptom | Cause | Fix |
| --- | --- | --- |
| Backend fails to start | PostgreSQL not running | `brew services start postgresql@15` (macOS) |
| `relation "users" does not exist` | Schema not applied | `cd backend && npm run db:init` |
| AI service returns stub mode | Model weights missing | Run `python train.py` or copy weights file |
| Map view blank | Google Maps API key missing | Add `VITE_GOOGLE_MAPS_API_KEY` to root `.env` |
| `401 Unauthorized` on all requests | JWT secret mismatch after restart | Ensure `JWT_SECRET` unchanged in `backend/.env` |
| Photo upload fails | `uploads/` not writable | `chmod 755 backend/uploads` |

For detailed troubleshooting, see [DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md) and [DATABASE_CONNECTION.md](docs/DATABASE_CONNECTION.md).
