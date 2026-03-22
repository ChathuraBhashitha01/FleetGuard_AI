# FleetGuard AI — Backend

Node.js + Express + PostgreSQL REST API for all FleetGuard AI services.

**Port:** 3001
**Database:** PostgreSQL 15+ (`fleetguard_db`)

---

## Quick Start

### Option A — Local PostgreSQL

```bash
# Install dependencies
npm install

# Set up .env (copy example and fill in your DB password + JWT secret)
cp .env.example .env

# Create database, apply schema, run migrations
npm run db:init
npm run db:migrate
npm run db:seed

# Start development server (auto-reload)
npm run dev
```

### Option B — Docker

From the repository root:

```bash
docker compose up -d
```

Wait ~5 seconds for PostgreSQL, then:

```bash
cd backend && npm install && npm run db:init
```

---

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start with nodemon auto-reload |
| `npm start` | Start without auto-reload (production) |
| `npm run test` | Run Jest test suite |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run db:init` | Create database and apply `schema.sql` |
| `npm run db:migrate` | Run all sprint migrations in sequence |
| `npm run db:sprint5` | Sprint 5 migration (GPS columns + `gps_logs` table) |
| `npm run db:sprint6` | Sprint 6 migration (`user_preferences` table) |
| `npm run db:seed` | Seed reference data |
| `npm run demo` | Download demo images and seed full demo dataset |

---

## Environment Variables

Create `backend/.env` with the following:

```text
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fleetguard_db
DB_USER=postgres
DB_PASSWORD=your_password

# Authentication
JWT_SECRET=your_64_char_random_hex_string
JWT_EXPIRES_IN=8h

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

# Email — password reset (optional)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
FRONTEND_URL=http://localhost:5173
```

**Minimum to run:** `DB_*` variables + `JWT_SECRET`.

---

## API Endpoints

See the full [API Reference](../docs/API_REFERENCE.md) for request/response documentation.

### Auth

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/google
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/me
```

### Inspections

```text
POST   /api/inspections
GET    /api/inspections          (manager/admin)
GET    /api/inspections/my       (driver)
GET    /api/inspections/:id
PUT    /api/inspections/:id
POST   /api/inspections/:id/complete
POST   /api/inspections/:id/analyze
POST   /api/inspections/:id/generate-pdf
GET    /api/inspections/:id/pdf
POST   /api/inspections/:id/review
```

### Photos

```text
POST   /api/photos/upload/:inspectionId
POST   /api/photos/upload-batch/:inspectionId
POST   /api/photos/signature/:inspectionId
GET    /api/photos/:inspectionId
```

### Vehicles

```text
GET    /api/vehicles
GET    /api/vehicles/:id
POST   /api/vehicles
PUT    /api/vehicles/:id
```

### Manager

```text
GET    /api/manager/dashboard/stats
GET    /api/manager/dashboard/activity
GET    /api/manager/dashboard/health-distribution
GET    /api/manager/dashboard/alerts
POST   /api/manager/smart-assignment
GET    /api/manager/vehicles/locations
GET    /api/manager/analytics/health-trend
GET    /api/manager/analytics/damage-types
GET    /api/manager/analytics/top-damaged-vehicles
```

### Driver

```text
POST   /api/driver/update-location
GET    /api/driver/stats
```

### Users

```text
GET    /api/users/drivers
POST   /api/users/drivers
GET    /api/users/drivers/:id
PUT    /api/users/profile
POST   /api/users/change-password
GET    /api/users/preferences
PUT    /api/users/preferences
```

### Health

```text
GET    /api/health
```

---

## Project Structure

```text
backend/
├── src/
│   ├── app.js                  # Express app (middleware + routes)
│   ├── server.js               # Entry point (listen)
│   ├── config/
│   │   └── database.js         # pg connection pool
│   ├── middleware/
│   │   ├── auth.js             # verifyToken
│   │   ├── roles.js            # requireRole
│   │   ├── upload.js           # multer configuration
│   │   └── errorHandler.js     # global error handler
│   ├── models/                 # SQL query functions
│   ├── controllers/            # Request handlers
│   ├── routes/                 # Route definitions
│   └── services/
│       └── email.service.js    # Nodemailer
├── scripts/                    # DB init, migrate, seed, demo scripts
├── uploads/                    # Uploaded files (photos, signatures, PDFs)
├── jest.config.js
├── jest.setup.js
└── package.json
```

---

## Testing

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage
```

Tests live in `src/__tests__/`. Integration tests connect to a real PostgreSQL database — set `DB_NAME=fleetguard_test` in the test environment to avoid touching development data.

---

## Health Check

```bash
curl http://localhost:3001/api/health
```

Expected:

```json
{
  "status": "ok",
  "service": "FleetGuard AI API"
}
```
