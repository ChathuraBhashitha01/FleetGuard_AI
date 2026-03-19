# FleetGuard AI

> AI-powered vehicle inspection and fleet management platform for Sri Lankan travel agencies.

FleetGuard AI automates the vehicle inspection process using computer vision (YOLOv8), provides real-time GPS fleet tracking, and gives managers complete oversight of driver activity, vehicle health, and damage history — all in a multi-language web interface.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Demo Credentials](#demo-credentials)
- [Project Structure](#project-structure)
- [Team](#team)
- [Documentation](#documentation)

---

## Features

### Driver Portal

- Email/password and Google OAuth2 sign-in
- Guided 8-step inspection workflow (vehicle → customer → photos → AI analysis → results → signatures → PDF)
- Camera capture of 8 standardised photo angles
- Real-time AI damage detection with severity scoring
- Digital signature capture for driver and customer
- PDF inspection report generation and download
- Inspection history with full detail view
- Automatic GPS location tracking
- Profile management with password reset via email

### Manager Portal

- Fleet dashboard: total vehicles, availability, health score, recent alerts
- Fleet management: add/edit/archive vehicles with photo upload
- Inspection review: approve or flag completed inspections
- Driver management: add/edit drivers, view inspection stats
- AI-powered smart vehicle assignment (customer tier + health score + proximity)
- Real-time map view of all vehicle GPS locations
- Analytics: health trend (7/30/90 days), damage type distribution, top damaged vehicles
- Notifications centre

### System

- Role-based access control (driver / manager / admin)
- JWT authentication with 8-hour expiry
- Google OAuth2 integration
- Three-language UI: English, Sinhala (සිංහල), Tamil (தமிழ்)
- PDPA 2022-compliant GPS log retention (90-day auto-purge)
- Dark-mode first design

---

## Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                        Browser / Mobile                      │
│                  React 18 + TypeScript + Vite                │
│                        (port 5173)                           │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST (Axios + JWT)
┌─────────────────────▼───────────────────────────────────────┐
│                    Node.js / Express API                     │
│                        (port 3001)                           │
│   Auth · Inspections · Photos · Vehicles · Manager · GPS    │
└────────────┬────────────────────────┬───────────────────────┘
             │ pg (connection pool)   │ HTTP multipart
┌────────────▼──────────┐  ┌─────────▼───────────────────────┐
│   PostgreSQL 15+      │  │   Python / Flask AI Service      │
│   fleetguard_db       │  │   YOLOv8 damage detection        │
│   (port 5432)         │  │        (port 5001)               │
└───────────────────────┘  └─────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, Radix UI |
| Routing | React Router v7 |
| State | React Context (InspectionContext) |
| Mapping | Google Maps JavaScript API |
| i18n | i18next (en / si / ta) |
| Backend | Node.js, Express 4, JWT, bcryptjs |
| Database | PostgreSQL 15, `pg` connection pool |
| File store | Local `uploads/` directory (multer) |
| Email | Nodemailer (Gmail SMTP) |
| PDF | PDFKit |
| AI service | Python 3.8+, Flask, YOLOv8 (ultralytics) |
| Testing | Vitest (frontend), Jest + supertest (backend) |

---

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Python 3.8+ (for AI service)

### 1 — Install dependencies

```bash
npm install
cd backend && npm install
```

### 2 — Configure environment

```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

Fill in values as described in [Environment Variables](#environment-variables).

### 3 — Initialise the database

```bash
cd backend
npm run db:init      # creates fleetguard_db + runs schema.sql
npm run db:migrate   # runs all sprint migrations
npm run db:seed      # seeds reference data
```

Load a full demo dataset with realistic vehicles, inspections and images (optional):

```bash
npm run demo
```

### 4 — Start all services

Open three terminal tabs:

```bash
# Terminal 1 — Backend (port 3001)
cd backend && npm run dev

# Terminal 2 — AI Service (port 5001)
cd fleetguard-ai-service
source venv/bin/activate
python app.py

# Terminal 3 — Frontend (port 5173)
npm run dev
```

Visit <http://localhost:5173>

---

## Environment Variables

### Root `.env` (frontend)

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_URL` | Yes | Backend base URL (`http://localhost:3001/api`) |
| `VITE_GOOGLE_MAPS_API_KEY` | Map View | Enable Maps JS API + Geocoding API in Google Cloud |
| `VITE_GOOGLE_CLIENT_ID` | OAuth | Google OAuth client ID |

### `backend/.env`

| Variable | Required | Description |
| --- | --- | --- |
| `DB_HOST` | Yes | PostgreSQL host (`localhost`) |
| `DB_PORT` | Yes | PostgreSQL port (`5432`) |
| `DB_NAME` | Yes | Database name (`fleetguard_db`) |
| `DB_USER` | Yes | PostgreSQL user (`postgres`) |
| `DB_PASSWORD` | Yes | PostgreSQL password |
| `JWT_SECRET` | Yes | Any long random string |
| `JWT_EXPIRES_IN` | No | Token lifetime (default `8h`) |
| `GOOGLE_CLIENT_ID` | OAuth | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | OAuth | Google OAuth client secret |
| `EMAIL_USER` | Email | Gmail address for password-reset emails |
| `EMAIL_PASS` | Email | Gmail App Password |
| `FRONTEND_URL` | Email | `http://localhost:5173` |

**Minimum to run:** PostgreSQL credentials + `JWT_SECRET`.

---

## Demo Credentials

Available after running `npm run demo`:

| Role | Email | Password |
| --- | --- | --- |
| Driver | `driver1@demo.fleetguard.com` | `Demo123!` |
| Driver | `driver2@demo.fleetguard.com` | `Demo123!` |
| Driver | `driver3@demo.fleetguard.com` | `Demo123!` |
| Manager | `manager1@demo.fleetguard.com` | `Demo123!` |
| Manager | `manager2@demo.fleetguard.com` | `Demo123!` |
| Admin | `admin@demo.fleetguard.com` | `Demo123!` |

---

## Project Structure

```text
FleetGuard_AI/
├── src/                        # React/TypeScript frontend
│   ├── app/
│   │   ├── components/         # UI components and layouts
│   │   └── pages/
│   │       ├── driver/         # Driver portal + inspection workflow
│   │       ├── manager/        # Manager portal pages
│   │       └── landing/        # Public landing page
│   ├── contexts/               # InspectionContext
│   ├── services/               # Axios API service modules
│   ├── i18n/locales/           # en / si / ta translation files
│   └── utils/                  # Shared utilities
│
├── backend/                    # Node.js/Express API
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── routes/             # Express route definitions
│   │   ├── models/             # PostgreSQL query models
│   │   ├── middleware/         # Auth, roles, upload, error handler
│   │   ├── services/           # Email service
│   │   └── config/             # Database connection pool
│   ├── scripts/                # DB init, migrate, seed scripts
│   └── uploads/                # Uploaded photos and signatures
│
├── fleetguard-ai-service/      # Python Flask AI microservice
│   ├── app.py                  # YOLOv8 inference server
│   ├── train.py                # Model training script
│   └── runs/                   # Trained model weights
│
├── database/
│   ├── schema.sql              # Full database schema
│   └── migrations/             # Sprint migration files
│
└── docs/                       # Project documentation
    ├── PROJECT_CHARTER.md
    ├── TECHNICAL_ARCHITECTURE.md
    ├── API_REFERENCE.md
    ├── DATABASE_SCHEMA.md
    ├── DEVELOPMENT_GUIDE.md
    ├── SPRINT_HISTORY.md
    └── DEPLOYMENT_GUIDE.md
```

---

## Team

| Name | Role | Contact |
| --- | --- | --- |
| Bethmi Jayamila | AI Service + Admin Frontend | `bethmij@gmail.com` |
| Chathura Bhashitha | Client Backend (Auth, Inspections, Photos) | `chathurabhashitha01@gmail.com` |
| Kalindu Tharanga | Admin Backend (Vehicles, Manager, Analytics) | `kalindu.th@gmail.com` |
| Iruwan Tharaka | Testing & QA | — |

---

## Documentation

| Document | Description |
| --- | --- |
| [Project Charter](docs/PROJECT_CHARTER.md) | Vision, scope, milestones, success criteria |
| [Technical Architecture](docs/TECHNICAL_ARCHITECTURE.md) | System design, data flow, security model |
| [API Reference](docs/API_REFERENCE.md) | All endpoints with request/response examples |
| [Database Schema](docs/DATABASE_SCHEMA.md) | ERD, table definitions, indexes, migration history |
| [Development Guide](docs/DEVELOPMENT_GUIDE.md) | Onboarding, coding standards, git workflow |
| [Sprint History](docs/SPRINT_HISTORY.md) | Delivery history across all sprints |
| [Deployment Guide](docs/DEPLOYMENT_GUIDE.md) | Production setup and environment configuration |
| [Database Connection](docs/DATABASE_CONNECTION.md) | Local DB setup and troubleshooting |
