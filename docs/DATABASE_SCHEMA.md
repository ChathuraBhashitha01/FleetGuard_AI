# Database Schema — FleetGuard AI

**Database:** PostgreSQL 15+
**Database name:** `fleetguard_db`
**Schema version:** Sprint 6 (current)

---

## Entity Relationship Overview

```text
users (1) ──────────── (0..1) drivers
users (1) ──────────── (0..1) managers
users (1) ──────────── (N)    password_reset_tokens
users (1) ──────────── (N)    notifications
users (1) ──────────── (1)    user_preferences
users (1) ──────────── (N)    gps_logs              [as driver]
users (1) ──────────── (N)    inspections           [as driver]
users (1) ──────────── (N)    inspection_reviews    [as manager]

vehicles (1) ─────────── (N) inspections
vehicles (1) ─────────── (N) gps_logs
vehicles (1) ─────────── (0..1) users               [current_driver_id]

inspections (1) ─────── (N) inspection_photos
inspections (1) ─────── (N) damage_detections
inspections (1) ─────── (N) digital_signatures
inspections (1) ─────── (0..1) inspection_reviews

inspection_photos (1) ── (N) damage_detections
```

---

## Tables

### `users`

Core identity table for all roles. Role determines portal access.

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | UUID | PK, default `gen_random_uuid()` | Unique user identifier |
| `name` | VARCHAR(255) | NOT NULL | Full display name |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE | Login email address |
| `password_hash` | VARCHAR(255) | NULL | bcryptjs hash (null for Google-only users) |
| `role` | VARCHAR(50) | NOT NULL | `driver`, `manager`, `admin` |
| `google_id` | VARCHAR(255) | UNIQUE, NULL | Google OAuth subject identifier |
| `avatar_url` | TEXT | NULL | Profile photo URL |
| `is_active` | BOOLEAN | NOT NULL, default TRUE | Soft-delete flag |
| `created_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Account creation timestamp |
| `updated_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Last modification timestamp |

---

### `drivers`

Driver-specific profile data, extending `users`.

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | UUID | PK | Unique driver profile ID |
| `user_id` | UUID | FK → `users.id`, CASCADE DELETE | Associated user account |
| `phone` | VARCHAR(20) | NULL | Mobile phone number |
| `license_number` | VARCHAR(50) | NULL | Driving licence number |
| `created_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Profile creation timestamp |

---

### `managers`

Manager-specific profile data, extending `users`.

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | UUID | PK | Unique manager profile ID |
| `user_id` | UUID | FK → `users.id`, CASCADE DELETE | Associated user account |
| `department` | VARCHAR(100) | NULL | Department or branch name |
| `created_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Profile creation timestamp |

---

### `vehicles`

Fleet vehicle registry.

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | UUID | PK, default `gen_random_uuid()` | Unique vehicle ID |
| `number_plate` | VARCHAR(20) | NOT NULL, UNIQUE | Vehicle registration plate |
| `make` | VARCHAR(100) | NOT NULL | Manufacturer (e.g. `Toyota`) |
| `model` | VARCHAR(100) | NOT NULL | Model name (e.g. `KDH`) |
| `year` | INTEGER | NOT NULL | Manufacturing year |
| `color` | VARCHAR(50) | NULL | Vehicle colour |
| `vehicle_type` | VARCHAR(50) | NOT NULL | `car`, `van`, `suv`, `other` |
| `health_score` | INTEGER | NOT NULL, default 100 | Current health 0–100 |
| `status` | VARCHAR(50) | NOT NULL, default `available` | `available`, `in-use`, `maintenance` |
| `current_driver_id` | UUID | FK → `users.id`, NULL | Driver currently using the vehicle |
| `last_latitude` | DECIMAL(10,8) | NULL | Most recent GPS latitude |
| `last_longitude` | DECIMAL(11,8) | NULL | Most recent GPS longitude |
| `last_location_update` | TIMESTAMPTZ | NULL | Timestamp of last GPS fix |
| `photo_url` | TEXT | NULL | Vehicle photo path |
| `notes` | TEXT | NULL | Manager notes |
| `created_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Record creation timestamp |
| `updated_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Last modification timestamp |

**Indexes:** `idx_veh_status` on `(status)`

---

### `inspections`

Core inspection record. One per rental handover event.

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | UUID | PK, default `gen_random_uuid()` | Unique inspection ID |
| `vehicle_id` | UUID | FK → `vehicles.id`, NOT NULL | Inspected vehicle |
| `driver_id` | UUID | FK → `users.id`, NOT NULL | Driver conducting inspection |
| `customer_name` | VARCHAR(255) | NOT NULL | Renter full name |
| `customer_nic` | VARCHAR(20) | NOT NULL | Renter NIC number |
| `customer_phone` | VARCHAR(20) | NOT NULL | Renter phone number |
| `rental_start` | DATE | NOT NULL | Rental period start |
| `rental_end` | DATE | NOT NULL | Rental period end |
| `inspection_type` | VARCHAR(10) | NOT NULL | `pre` or `post` |
| `status` | VARCHAR(20) | NOT NULL, default `in_progress` | `in_progress`, `completed`, `reviewed` |
| `overall_notes` | TEXT | NULL | Driver free-text observations |
| `pdf_url` | TEXT | NULL | Generated PDF report path |
| `created_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Inspection start timestamp |
| `updated_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Last modification timestamp |

**Indexes:**

- `idx_insp_driver` on `(driver_id)`
- `idx_insp_vehicle` on `(vehicle_id)`
- `idx_insp_status` on `(status)`

---

### `inspection_photos`

Photos captured during an inspection. Maximum 8 per inspection (one per angle).

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | UUID | PK, default `gen_random_uuid()` | Unique photo ID |
| `inspection_id` | UUID | FK → `inspections.id`, CASCADE DELETE | Parent inspection |
| `photo_type` | VARCHAR(50) | NOT NULL | `front`, `rear`, `left`, `right`, `interior`, `dashboard`, `damage`, `odometer` |
| `file_url` | TEXT | NOT NULL | Relative path to stored file |
| `file_name` | VARCHAR(255) | NOT NULL | Original filename |
| `captured_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Photo capture timestamp |

**Indexes:** `idx_photos_insp` on `(inspection_id)`

---

### `damage_detections`

AI-generated damage classifications per photo.

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | UUID | PK, default `gen_random_uuid()` | Unique detection ID |
| `inspection_id` | UUID | FK → `inspections.id`, CASCADE DELETE | Parent inspection |
| `photo_id` | UUID | FK → `inspection_photos.id`, CASCADE DELETE | Source photo |
| `damage_type` | VARCHAR(100) | NOT NULL | Damage category (e.g. `scratch`, `dent`, `crack`) |
| `severity` | VARCHAR(20) | NOT NULL | `low`, `medium`, `high` |
| `confidence` | DECIMAL(4,3) | NOT NULL | Model confidence 0.000–1.000 |
| `bbox_json` | JSONB | NULL | Bounding box `{x, y, width, height}` |
| `created_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Detection timestamp |

---

### `digital_signatures`

Canvas-captured signatures for driver and customer.

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | UUID | PK, default `gen_random_uuid()` | Unique signature ID |
| `inspection_id` | UUID | FK → `inspections.id`, CASCADE DELETE | Parent inspection |
| `signer_type` | VARCHAR(20) | NOT NULL | `driver` or `customer` |
| `signature_url` | TEXT | NOT NULL | Relative path to PNG signature file |
| `signed_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Signature capture timestamp |

---

### `inspection_reviews`

Manager review records for completed inspections. One per inspection (unique constraint).

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | UUID | PK, default `gen_random_uuid()` | Unique review ID |
| `inspection_id` | UUID | FK → `inspections.id`, UNIQUE | Reviewed inspection |
| `manager_id` | UUID | FK → `users.id`, NOT NULL | Reviewing manager |
| `review_status` | VARCHAR(20) | NOT NULL | `pending`, `approved`, `flagged` |
| `notes` | TEXT | NULL | Manager observations |
| `reviewed_at` | TIMESTAMPTZ | NULL | Review completion timestamp |
| `created_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Review record creation timestamp |

---

### `gps_logs`

Driver GPS location history. Retained for 90 days per PDPA 2022.

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | UUID | PK, default `gen_random_uuid()` | Unique log entry ID |
| `driver_id` | UUID | FK → `users.id`, NOT NULL | Driver whose location was recorded |
| `vehicle_id` | UUID | FK → `vehicles.id`, NULL | Vehicle in use at time of capture |
| `latitude` | DECIMAL(10,8) | NOT NULL | GPS latitude |
| `longitude` | DECIMAL(11,8) | NOT NULL | GPS longitude |
| `captured_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Location fix timestamp |

**Indexes:**

- `idx_gps_driver` on `(driver_id)`
- `idx_gps_time` on `(captured_at)`

**Retention:** Records with `captured_at < NOW() - INTERVAL '90 days'` must be purged.

---

### `notifications`

In-app notifications per user.

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | UUID | PK, default `gen_random_uuid()` | Unique notification ID |
| `user_id` | UUID | FK → `users.id`, CASCADE DELETE | Notification recipient |
| `type` | VARCHAR(50) | NOT NULL | `damage_alert`, `inspection_complete`, `review_required`, `system` |
| `message` | TEXT | NOT NULL | Notification body text |
| `is_read` | BOOLEAN | NOT NULL, default FALSE | Read state |
| `created_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Notification creation timestamp |

---

### `password_reset_tokens`

Short-lived tokens for email-based password reset.

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | UUID | PK, default `gen_random_uuid()` | Unique token ID |
| `user_id` | UUID | FK → `users.id`, CASCADE DELETE | Account to reset |
| `token_hash` | VARCHAR(255) | NOT NULL | SHA-256 hash of the emailed token |
| `expires_at` | TIMESTAMPTZ | NOT NULL | Expiry (1 hour after creation) |
| `used` | BOOLEAN | NOT NULL, default FALSE | Consumed flag (single-use) |
| `created_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Token creation timestamp |

---

### `user_preferences`

Per-user application settings introduced in Sprint 6.

| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | UUID | PK, default `gen_random_uuid()` | Unique preference record ID |
| `user_id` | UUID | FK → `users.id`, UNIQUE, CASCADE DELETE | Associated user |
| `language` | VARCHAR(10) | NOT NULL, default `en` | `en`, `si`, `ta` |
| `theme` | VARCHAR(20) | NOT NULL, default `dark` | `dark`, `light` |
| `notifications_enabled` | BOOLEAN | NOT NULL, default TRUE | Notification preference |
| `created_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Record creation timestamp |
| `updated_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Last modification timestamp |

---

## Migration History

| File | Sprint | Description |
| --- | --- | --- |
| `schema.sql` | Sprint 1 | Base schema: users, vehicles, inspections, photos, damage_detections, signatures, reviews, notifications, reset_tokens |
| `000_seed_vehicles.sql` | Sprint 1 | Reference vehicle records for development |
| `001_inspection_reviews_unique.sql` | Sprint 2 | Unique constraint on `inspection_reviews.inspection_id` |
| `002_sprint4_manager_fields.sql` | Sprint 4 | Manager dashboard query optimisations, additional index |
| `003_sprint5_gps_columns.sql` | Sprint 5 | `last_latitude`, `last_longitude`, `last_location_update` on `vehicles`; `gps_logs` table |
| `003_sprint5_seed_gps.sql` | Sprint 5 | Seed GPS positions for demo vehicles |
| `004_sprint6_user_preferences.sql` | Sprint 6 | `user_preferences` table |

---

## Database Commands

```bash
# Initialise database and run base schema
npm run db:init

# Run all sprint migrations in sequence
npm run db:migrate

# Sprint-specific migrations
npm run db:sprint5
npm run db:sprint6

# Seed reference data
npm run db:seed

# Full demo dataset (vehicles + inspections + GPS + images)
npm run demo
```

---

## Connection Configuration

The backend reads connection parameters from environment variables:

```text
DB_HOST     = localhost
DB_PORT     = 5432
DB_NAME     = fleetguard_db
DB_USER     = postgres
DB_PASSWORD = <your password>
```

Alternatively, a single `DATABASE_URL` connection string is supported for hosted PostgreSQL services (e.g. Neon, Supabase):

```text
DATABASE_URL = postgresql://user:password@host:5432/fleetguard_db
```
