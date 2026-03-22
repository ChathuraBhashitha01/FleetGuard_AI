# Development Guide — FleetGuard AI

**Audience:** Contributing developers
**Date:** March 2026

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Git Workflow](#git-workflow)
- [Testing](#testing)
- [Adding New Features](#adding-new-features)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

| Tool | Version | Purpose |
| --- | --- | --- |
| Node.js | 18+ | Frontend and backend runtime |
| npm | 9+ | Package management |
| PostgreSQL | 15+ | Primary database |
| Python | 3.8+ | AI microservice |
| Git | 2.38+ | Version control |
| VS Code | Latest | Recommended IDE |

### Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- PostgreSQL (by Chris Kolkman)
- Python (Microsoft)

---

## Initial Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd FleetGuard_AI
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Install AI service dependencies

```bash
cd fleetguard-ai-service
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install flask flask-cors ultralytics
```

### 5. Set up environment files

```bash
# Root (frontend)
cp .env.example .env

# Backend
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your PostgreSQL credentials and a generated `JWT_SECRET`:

```bash
# Generate a JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 6. Initialise the database

```bash
cd backend
npm run db:init
npm run db:migrate
npm run db:seed
```

### 7. (Optional) Load demo data

```bash
npm run demo
```

This creates realistic users, vehicles, inspections, and downloads sample images.

---

## Running the Project

You need three terminal sessions running concurrently:

```bash
# Terminal 1 — Backend API (port 3001)
cd backend
npm run dev

# Terminal 2 — AI Service (port 5001)
cd fleetguard-ai-service
source venv/bin/activate
python app.py

# Terminal 3 — Frontend (port 5173)
npm run dev
```

The frontend at <http://localhost:5173> proxies API requests to the backend at <http://localhost:3001>.

---

## Project Structure

### Frontend (`src/`)

```text
src/
├── app/
│   ├── App.tsx                 # Root router; protected route HOC
│   ├── components/
│   │   ├── ui/                 # Radix/shadcn UI primitives — do not edit directly
│   │   ├── layout/             # Sidebar + header layouts per role
│   │   └── common/             # Shared widgets (LanguageSwitcher, etc.)
│   └── pages/
│       ├── driver/             # Driver-facing pages
│       │   └── inspection/     # 8-step inspection workflow
│       └── manager/            # Manager-facing pages
├── contexts/
│   └── InspectionContext.tsx   # Inspection state shared across workflow
├── services/                   # API client modules (one per domain)
├── api/
│   └── api.js                  # Axios instance with JWT interceptor
├── i18n/
│   └── locales/                # Translation JSON files
├── types/index.ts              # TypeScript interfaces
└── utils/time.js               # Date helpers
```

### Backend (`backend/src/`)

```text
backend/src/
├── app.js                      # Express app setup (middleware + routes)
├── server.js                   # Server entry point (listen)
├── config/database.js          # PostgreSQL connection pool
├── middleware/
│   ├── auth.js                 # verifyToken — reads JWT from Authorization header
│   ├── roles.js                # requireRole(...roles) — route-level RBAC
│   ├── upload.js               # multer configuration
│   └── errorHandler.js         # Global error handler (last middleware)
├── models/                     # SQL query functions — all DB access goes here
├── controllers/                # Business logic + HTTP request/response handling
├── routes/                     # Route definitions (URL + middleware chain)
└── services/
    └── email.service.js        # Nodemailer email sending
```

---

## Coding Standards

### TypeScript (Frontend)

- Use `interface` for object shapes; `type` for unions and primitives.
- Prefer explicit return types on exported functions.
- No `any` — use `unknown` and narrow, or define the type.
- Import order: external libs → internal modules → relative imports.

### JavaScript (Backend)

- Use `async/await` throughout; never mix callbacks with promises.
- Wrap all controller logic in `try/catch` and pass errors to `next(err)`.
- All database access goes through model functions — no raw SQL in controllers.
- Use `const` by default; `let` only when reassignment is necessary.

### SQL

- All queries live in `backend/src/models/`.
- Use parameterised queries exclusively — never string-interpolate user input.
- Prefer explicit column lists over `SELECT *`.
- Name all constraints and indexes with descriptive prefixes (`idx_`, `fk_`, `uq_`).

### Naming Conventions

| Context | Convention | Example |
| --- | --- | --- |
| React components | PascalCase | `DriverDashboard.tsx` |
| Hooks | camelCase with `use` prefix | `useInspection()` |
| Services / utilities | camelCase | `inspectionService.js` |
| Database tables | snake_case | `inspection_photos` |
| DB columns | snake_case | `created_at` |
| API routes | kebab-case | `/api/smart-assignment` |
| Environment vars | SCREAMING_SNAKE_CASE | `JWT_SECRET` |

### File Size

- Keep component files under 300 lines. Split into sub-components if larger.
- Keep controller functions focused on one resource action.

---

## Git Workflow

### Branch Naming

```text
feature/<short-description>     # New feature
fix/<short-description>         # Bug fix
chore/<short-description>       # Non-functional change (deps, docs)
hotfix/<short-description>      # Urgent production fix
```

Examples:

```text
feature/smart-assignment-ui
fix/gps-location-null-check
chore/update-dependencies
```

### Commit Messages

Follow the Conventional Commits format:

```text
<type>(<scope>): <short description>

[optional body]
[optional footer]
```

Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`

Examples:

```text
feat(inspections): add batch photo upload endpoint
fix(auth): handle expired Google OAuth token gracefully
chore(deps): upgrade React Router to v7.13
docs(api): add smart assignment endpoint documentation
```

### Pull Request Process

1. Branch off `main` using the naming convention above.
2. Write or update tests for any changed behaviour.
3. Ensure all existing tests pass locally.
4. Open a PR against `main` with a description covering:
   - What changed and why
   - How to test it
   - Any migration steps required
5. Request review from at least one other team member.
6. Squash merge after approval.

### Author Headers

All source files must include an author header comment block:

```javascript
/**
 * @file Description of what this file does
 * @author Your Name <your.email@example.com>
 */
```

---

## Testing

### Frontend Tests (Vitest)

```bash
# Run all frontend tests
npm run test

# Run with coverage report
npm run test:coverage

# Run in watch mode
npm run test -- --watch
```

Tests live in `src/**/__tests__/` or alongside components as `*.test.tsx`.

### Backend Tests (Jest)

```bash
# From backend/
npm run test

# With coverage
npm run test -- --coverage

# Specific test file
npm run test -- auth.test.js
```

Tests live in `backend/src/__tests__/`.

### Testing Philosophy

- **Integration over unit tests for the backend.** Tests hit a real PostgreSQL test database — no mocked DB calls. This prevents hidden mock/production divergence.
- **Use a separate test database.** Set `DB_NAME=fleetguard_test` in the test environment.
- **AI service tests** use STUB_MODE — do not require model weights.
- **Frontend tests** cover user flows, not implementation details.

### Test Database Setup

```bash
# Create test DB
psql -U postgres -c "CREATE DATABASE fleetguard_test;"

# Run schema on test DB
DB_NAME=fleetguard_test npm run db:init
```

---

## Adding New Features

### New API Endpoint

1. Create or update a route file in `backend/src/routes/`.
2. Create a controller function in `backend/src/controllers/`.
3. Create query functions in `backend/src/models/` (if new DB tables/queries needed).
4. Apply `verifyToken` and `requireRole` middleware as appropriate.
5. Register the route in `backend/src/app.js`.
6. Document the endpoint in [API_REFERENCE.md](API_REFERENCE.md).

### New Frontend Page

1. Create the page component in the appropriate portal directory (`pages/driver/` or `pages/manager/`).
2. Add the route in `src/app/App.tsx`.
3. Add navigation links in the sidebar layout.
4. Add all UI strings to `src/i18n/locales/{en,si,ta}.json`.
5. Create or update the service function in `src/services/`.

### New Database Table

1. Add the `CREATE TABLE` statement to `database/schema.sql`.
2. Create a migration file: `database/migrations/00N_description.sql`.
3. Add a migration script entry in `backend/package.json` if needed.
4. Add query functions in `backend/src/models/`.
5. Update [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md).

### New Translation Key

Add to **all three** locale files simultaneously:

```bash
# en.json
"my_new_key": "English text"

# si.json
"my_new_key": "සිංහල පෙළ"

# ta.json
"my_new_key": "தமிழ் உரை"
```

Use in components:

```tsx
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();
<span>{t('my_new_key')}</span>
```

---

## Common Tasks

### Reset the development database

```bash
cd backend
psql -U postgres -c "DROP DATABASE IF EXISTS fleetguard_db;"
npm run db:init
npm run db:migrate
npm run db:seed
```

### View database tables

```bash
psql -U postgres -d fleetguard_db -c "\dt"
```

### Check API health

```bash
curl http://localhost:3001/api/health
```

### Test AI service

```bash
curl http://localhost:5001/api/health
```

### Generate a test JWT (for API testing)

```bash
cd backend
node -e "
const jwt = require('jsonwebtoken');
const token = jwt.sign({ id: 'test', role: 'manager' }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '8h' });
console.log(token);
"
```

---

## Troubleshooting

### `ECONNREFUSED 5432` — PostgreSQL not running

```bash
# macOS
brew services start postgresql@15

# Linux
sudo systemctl start postgresql
```

### `ECONNREFUSED 3001` — Backend not started

```bash
cd backend && npm run dev
```

### `ECONNREFUSED 5001` — AI service not started

```bash
cd fleetguard-ai-service
source venv/bin/activate
python app.py
```

### JWT `invalid signature` error

Ensure `JWT_SECRET` in `backend/.env` matches the value used to generate the token. Restarting the backend after changing the secret is required.

### Google Maps not loading

Ensure `VITE_GOOGLE_MAPS_API_KEY` is set in the root `.env` and the Maps JavaScript API and Geocoding API are enabled in Google Cloud Console.

### AI returns stub detections

The AI service is running in `STUB_MODE` because the model weights (`runs/classify/fleetguard_damage_model4/weights/best.pt`) are missing. Run `python train.py` to train the model, or copy the weights file into the expected location.

### Multer file size error

The default upload limit is 10 MB per file. Compress inspection photos before upload, or increase the limit in `backend/src/middleware/upload.js`.
