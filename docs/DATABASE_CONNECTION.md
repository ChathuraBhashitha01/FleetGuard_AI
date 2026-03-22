# Database Connection — FleetGuard AI

**Audience:** Developers setting up the project for the first time

---

## How the Backend Connects

The backend uses the `pg` Node.js driver with a connection pool (up to 20 connections).

Configuration is read from `backend/.env` by `backend/src/config/database.js`. The pool connects on the first incoming API request. If PostgreSQL is unreachable, those requests fail with a `500` or connection error — the health check endpoint (`GET /api/health`) does not touch the database and will still return `200`.

---

## Environment Variables

Add these to `backend/.env`:

```text
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fleetguard_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
```

Alternatively, use a single connection string for hosted databases (Neon, Supabase, etc.):

```text
DATABASE_URL=postgresql://user:password@host:5432/fleetguard_db?sslmode=require
```

---

## Setup Steps

### 1. Install and start PostgreSQL

**macOS (Homebrew):**

```bash
brew install postgresql@15
brew services start postgresql@15
```

**Ubuntu/Debian:**

```bash
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Windows:**

Download and run the installer from <https://www.postgresql.org/download/windows/>.

### 2. Set the database password

```bash
# Open the psql prompt as the postgres superuser
psql -U postgres

# Inside psql — set a password for the postgres user
ALTER USER postgres WITH PASSWORD 'your_password';
\q
```

Update `DB_PASSWORD` in `backend/.env` to match.

### 3. Create the database and schema

```bash
cd backend
npm run db:init
```

This script:

1. Connects as `DB_USER` to the `postgres` system database
2. Creates `fleetguard_db` if it does not exist
3. Runs `database/schema.sql` to create all tables, indexes, and constraints

### 4. Run migrations

```bash
npm run db:migrate   # runs all sprint migrations in sequence
```

Individual sprint migrations if needed:

```bash
npm run db:sprint5   # GPS columns + gps_logs table
npm run db:sprint6   # user_preferences table
```

### 5. Seed reference data

```bash
npm run db:seed      # minimal reference data
npm run demo         # full demo dataset (users, vehicles, inspections, images)
```

### 6. Start the backend

```bash
npm run dev
```

---

## Verify the Connection

The fastest verification is a register request:

```bash
curl -s -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@verify.com","password":"Password123!","role":"driver"}'
```

A response containing `"token"` and user data confirms the database is connected. A `500` response or connection timeout means PostgreSQL is unreachable.

---

## Inspect the Database Directly

```bash
# Connect
psql -U postgres -d fleetguard_db

# List tables
\dt

# Check users
SELECT id, name, email, role, created_at FROM users LIMIT 10;

# Check vehicles
SELECT number_plate, make, model, status, health_score FROM vehicles;

# Exit
\q
```

---

## Common Connection Errors

### `ECONNREFUSED 127.0.0.1:5432`

PostgreSQL is not running.

```bash
brew services start postgresql@15   # macOS
sudo systemctl start postgresql     # Linux
```

### `password authentication failed for user "postgres"`

The password in `backend/.env` does not match the database user's password.

```bash
psql -U postgres -c "ALTER USER postgres WITH PASSWORD 'new_password';"
```

### `database "fleetguard_db" does not exist`

Run `npm run db:init` from the `backend/` directory.

### `relation "users" does not exist`

The schema has not been applied. Run `npm run db:init`.

### `column "last_latitude" of relation "vehicles" does not exist`

Sprint 5 migration has not been run. Run `npm run db:sprint5`.

### `relation "user_preferences" does not exist`

Sprint 6 migration has not been run. Run `npm run db:sprint6`.

---

## Full Reset

To wipe and rebuild the database from scratch:

```bash
# Drop the database
psql -U postgres -c "DROP DATABASE IF EXISTS fleetguard_db;"

# Recreate
cd backend
npm run db:init
npm run db:migrate
npm run db:seed
```
