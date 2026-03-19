# API Reference — FleetGuard AI

**Base URL:** `http://localhost:3001/api`
**Authentication:** All protected endpoints require `Authorization: Bearer <jwt_token>`
**Content-Type:** `application/json` unless noted as `multipart/form-data`

---

## Table of Contents

- [Authentication](#authentication)
- [Inspections](#inspections)
- [Photos](#photos)
- [Vehicles](#vehicles)
- [Manager](#manager)
- [Driver](#driver)
- [Users](#users)
- [Notifications](#notifications)
- [Health](#health)
- [Error Responses](#error-responses)

---

## Authentication

### POST /auth/register

Create a new user account.

**Body:**

```json
{
  "name": "Kasun Perera",
  "email": "kasun@example.com",
  "password": "SecurePass1!",
  "role": "driver"
}
```

`role` accepts: `driver`, `manager`, `admin`

**Response 201:**

```json
{
  "token": "<jwt>",
  "user": {
    "id": "uuid",
    "name": "Kasun Perera",
    "email": "kasun@example.com",
    "role": "driver"
  }
}
```

---

### POST /auth/login

Authenticate with email and password.

**Body:**

```json
{
  "email": "kasun@example.com",
  "password": "SecurePass1!"
}
```

**Response 200:**

```json
{
  "token": "<jwt>",
  "user": {
    "id": "uuid",
    "name": "Kasun Perera",
    "email": "kasun@example.com",
    "role": "driver"
  }
}
```

---

### POST /auth/google

Sign in with a Google ID token.

**Body:**

```json
{
  "idToken": "<google_id_token>"
}
```

**Response 200:** Same as login response.

---

### POST /auth/forgot-password

Request a password reset email.

**Body:**

```json
{
  "email": "kasun@example.com"
}
```

**Response 200:**

```json
{
  "message": "Password reset email sent"
}
```

---

### POST /auth/reset-password

Reset password using a token from the reset email.

**Body:**

```json
{
  "token": "<reset_token>",
  "password": "NewSecurePass1!"
}
```

**Response 200:**

```json
{
  "message": "Password reset successful"
}
```

---

### GET /auth/me

Return the currently authenticated user.

**Auth:** Required

**Response 200:**

```json
{
  "id": "uuid",
  "name": "Kasun Perera",
  "email": "kasun@example.com",
  "role": "driver",
  "avatar_url": null,
  "created_at": "2026-01-15T08:00:00Z"
}
```

---

## Inspections

### POST /inspections

Create a new inspection. Returns the inspection record that the driver will add photos to.

**Auth:** Required | **Role:** `driver`

**Body:**

```json
{
  "vehicle_id": "uuid",
  "customer_name": "Amal Fernando",
  "customer_nic": "199012345678",
  "customer_phone": "+94771234567",
  "rental_start": "2026-03-20",
  "rental_end": "2026-03-25",
  "inspection_type": "pre"
}
```

`inspection_type` accepts: `pre`, `post`

**Response 201:**

```json
{
  "id": "uuid",
  "vehicle_id": "uuid",
  "driver_id": "uuid",
  "customer_name": "Amal Fernando",
  "status": "in_progress",
  "created_at": "2026-03-20T09:00:00Z"
}
```

---

### GET /inspections

List all inspections (paginated).

**Auth:** Required | **Role:** `manager`, `admin`

**Query params:** `?page=1&limit=20&status=completed&vehicle_id=uuid&driver_id=uuid`

**Response 200:**

```json
{
  "inspections": [...],
  "total": 142,
  "page": 1,
  "limit": 20
}
```

---

### GET /inspections/my

List inspections for the authenticated driver.

**Auth:** Required | **Role:** `driver`

**Response 200:**

```json
{
  "inspections": [
    {
      "id": "uuid",
      "vehicle_id": "uuid",
      "number_plate": "CAA-1234",
      "make": "Toyota",
      "model": "KDH",
      "inspection_type": "pre",
      "status": "completed",
      "created_at": "2026-03-20T09:00:00Z"
    }
  ]
}
```

---

### GET /inspections/:id

Get full inspection detail including photos and damage detections.

**Auth:** Required

**Response 200:**

```json
{
  "id": "uuid",
  "vehicle_id": "uuid",
  "driver_id": "uuid",
  "customer_name": "Amal Fernando",
  "customer_nic": "199012345678",
  "customer_phone": "+94771234567",
  "rental_start": "2026-03-20",
  "rental_end": "2026-03-25",
  "inspection_type": "pre",
  "status": "completed",
  "overall_notes": "Minor scratch on rear bumper",
  "pdf_url": "/uploads/reports/uuid.pdf",
  "photos": [
    {
      "id": "uuid",
      "photo_type": "front",
      "file_url": "/uploads/inspections/uuid/front.jpg",
      "captured_at": "2026-03-20T09:05:00Z"
    }
  ],
  "damage_detections": [
    {
      "id": "uuid",
      "photo_id": "uuid",
      "damage_type": "scratch",
      "severity": "medium",
      "confidence": 0.84,
      "bbox_json": { "x": 120, "y": 45, "width": 200, "height": 150 }
    }
  ],
  "signatures": [
    {
      "signer_type": "driver",
      "signature_url": "/uploads/signatures/uuid_driver.png",
      "signed_at": "2026-03-20T09:20:00Z"
    }
  ],
  "review": {
    "review_status": "approved",
    "notes": "All good",
    "reviewed_at": "2026-03-20T11:00:00Z"
  }
}
```

---

### PUT /inspections/:id

Update inspection notes.

**Auth:** Required | **Role:** `driver`

**Body:**

```json
{
  "overall_notes": "Existing scratch on rear bumper noted by driver."
}
```

**Response 200:** Updated inspection object.

---

### POST /inspections/:id/complete

Mark an inspection as completed. Validates that all 8 photos and both signatures exist.

**Auth:** Required | **Role:** `driver`

**Response 200:**

```json
{
  "message": "Inspection completed",
  "status": "completed"
}
```

---

### POST /inspections/:id/analyze

Trigger AI damage detection. Sends all uploaded photos to the AI microservice and stores results.

**Auth:** Required | **Role:** `driver`

**Response 200:**

```json
{
  "health_score": 80,
  "damages": [
    {
      "damage_type": "scratch",
      "severity": "medium",
      "confidence": 0.84,
      "photo_type": "front"
    }
  ],
  "total_damages": 1
}
```

---

### POST /inspections/:id/generate-pdf

Generate the PDF inspection report. Stores the PDF in `uploads/reports/` and saves the URL.

**Auth:** Required | **Role:** `driver`

**Response 200:**

```json
{
  "pdf_url": "/uploads/reports/uuid.pdf",
  "message": "PDF generated successfully"
}
```

---

### GET /inspections/:id/pdf

Download the inspection PDF report.

**Auth:** Not required (public URL with opaque ID)

**Response 200:** `Content-Type: application/pdf` binary stream.

---

### POST /inspections/:id/review

Manager review of a completed inspection.

**Auth:** Required | **Role:** `manager`, `admin`

**Body:**

```json
{
  "review_status": "approved",
  "notes": "Damage noted. Pre-existing scratch documented."
}
```

`review_status` accepts: `approved`, `flagged`

**Response 200:** Updated review object.

---

## Photos

### POST /photos/upload/:inspectionId

Upload a single photo for an inspection.

**Auth:** Required | **Role:** `driver`
**Content-Type:** `multipart/form-data`

**Form fields:**

| Field | Type | Description |
| --- | --- | --- |
| `photo` | File | JPEG/PNG image file |
| `photo_type` | String | One of: `front`, `rear`, `left`, `right`, `interior`, `dashboard`, `damage`, `odometer` |

**Response 201:**

```json
{
  "id": "uuid",
  "inspection_id": "uuid",
  "photo_type": "front",
  "file_url": "/uploads/inspections/uuid/front.jpg",
  "captured_at": "2026-03-20T09:05:00Z"
}
```

---

### POST /photos/upload-batch/:inspectionId

Upload all 8 photos at once.

**Auth:** Required | **Role:** `driver`
**Content-Type:** `multipart/form-data`

**Form fields:** `photos[]` — array of up to 8 files. Each file field name must correspond to the photo type.

**Response 201:** Array of photo objects.

---

### POST /photos/signature/:inspectionId

Upload a digital signature image.

**Auth:** Required
**Content-Type:** `multipart/form-data`

**Form fields:**

| Field | Type | Description |
| --- | --- | --- |
| `signature` | File | PNG image from canvas |
| `signer_type` | String | `driver` or `customer` |

**Response 201:** Signature object.

---

### GET /photos/:inspectionId

Retrieve all photos for an inspection.

**Auth:** Required

**Response 200:** Array of photo objects with `file_url`, `photo_type`, `captured_at`.

---

## Vehicles

### GET /vehicles

List all vehicles.

**Auth:** Required

**Query params:** `?status=available&type=van`

`status` accepts: `available`, `in-use`, `maintenance`

**Response 200:**

```json
{
  "vehicles": [
    {
      "id": "uuid",
      "number_plate": "CAA-1234",
      "make": "Toyota",
      "model": "KDH",
      "year": 2022,
      "color": "White",
      "vehicle_type": "van",
      "health_score": 92,
      "status": "available",
      "photo_url": "/uploads/vehicles/uuid.jpg"
    }
  ]
}
```

---

### GET /vehicles/:id

Get vehicle detail including recent inspections and GPS location.

**Auth:** Required

**Response 200:** Full vehicle object with `last_latitude`, `last_longitude`, and recent inspection summary.

---

### POST /vehicles

Create a new vehicle.

**Auth:** Required | **Role:** `manager`, `admin`
**Content-Type:** `multipart/form-data`

**Form fields:**

| Field | Required | Description |
| --- | --- | --- |
| `number_plate` | Yes | Unique registration plate |
| `make` | Yes | Vehicle manufacturer |
| `model` | Yes | Vehicle model |
| `year` | Yes | Manufacturing year |
| `color` | No | Vehicle colour |
| `vehicle_type` | Yes | `car`, `van`, `suv`, `other` |
| `notes` | No | Free-text notes |
| `photo` | No | Vehicle photo (JPEG/PNG) |

**Response 201:** Created vehicle object.

---

### PUT /vehicles/:id

Update vehicle details.

**Auth:** Required | **Role:** `manager`, `admin`

**Body:** Same fields as POST (all optional).

**Response 200:** Updated vehicle object.

---

## Manager

### GET /manager/dashboard/stats

Fleet summary metrics for the manager dashboard.

**Auth:** Required | **Role:** `manager`, `admin`

**Response 200:**

```json
{
  "total_vehicles": 24,
  "available": 18,
  "in_use": 4,
  "maintenance": 2,
  "fleet_health_score": 87,
  "inspections_today": 6,
  "pending_reviews": 3
}
```

---

### GET /manager/dashboard/activity

Recent inspection activity feed.

**Auth:** Required | **Role:** `manager`, `admin`

**Query params:** `?limit=10`

**Response 200:** Array of recent inspections with driver name, vehicle plate, status, and timestamp.

---

### GET /manager/dashboard/health-distribution

Vehicle health score distribution (for dashboard chart).

**Auth:** Required | **Role:** `manager`, `admin`

**Response 200:**

```json
{
  "excellent": 12,
  "good": 7,
  "fair": 3,
  "poor": 2
}
```

---

### GET /manager/dashboard/alerts

Recent damage alerts requiring attention.

**Auth:** Required | **Role:** `manager`, `admin`

**Response 200:** Array of high-severity damage detections with vehicle and inspection links.

---

### POST /manager/smart-assignment

Get AI-powered vehicle recommendations for a rental request.

**Auth:** Required | **Role:** `manager`, `admin`

**Body:**

```json
{
  "pickup_latitude": 6.9271,
  "pickup_longitude": 79.8612,
  "customer_tier": "VIP",
  "rental_start": "2026-03-25",
  "rental_end": "2026-03-30"
}
```

`customer_tier` accepts: `VIP`, `Standard`, `Budget`

**Response 200:**

```json
{
  "recommendations": [
    {
      "vehicle_id": "uuid",
      "number_plate": "CAA-1234",
      "make": "Toyota",
      "model": "Alphard",
      "health_score": 95,
      "distance_km": 2.4,
      "score": 97,
      "score_breakdown": {
        "health_points": 47.5,
        "distance_points": 28,
        "tier_points": 20
      }
    }
  ]
}
```

---

### GET /manager/vehicles/locations

All vehicle GPS locations for the map view.

**Auth:** Required | **Role:** `manager`, `admin`

**Response 200:**

```json
{
  "vehicles": [
    {
      "id": "uuid",
      "number_plate": "CAA-1234",
      "make": "Toyota",
      "model": "KDH",
      "status": "in-use",
      "latitude": 6.9271,
      "longitude": 79.8612,
      "last_location_update": "2026-03-20T09:30:00Z",
      "driver_name": "Kasun Perera"
    }
  ]
}
```

---

### GET /manager/analytics/health-trend

Fleet health score over time.

**Auth:** Required | **Role:** `manager`, `admin`

**Query params:** `?days=30` (accepts: `7`, `30`, `90`)

**Response 200:** Array of `{ date, avg_health_score }` data points.

---

### GET /manager/analytics/damage-types

Damage type distribution across all inspections.

**Auth:** Required | **Role:** `manager`, `admin`

**Response 200:**

```json
{
  "damage_types": [
    { "type": "scratch", "count": 34 },
    { "type": "dent", "count": 19 },
    { "type": "crack", "count": 8 }
  ]
}
```

---

### GET /manager/analytics/top-damaged-vehicles

Top 5 vehicles by damage frequency.

**Auth:** Required | **Role:** `manager`, `admin`

**Response 200:** Array of vehicles with `number_plate`, `make`, `model`, and `damage_count`.

---

## Driver

### POST /driver/update-location

Update the authenticated driver's GPS location. Also updates the vehicle's `last_latitude` / `last_longitude`.

**Auth:** Required | **Role:** `driver`

**Body:**

```json
{
  "latitude": 6.9271,
  "longitude": 79.8612,
  "vehicle_id": "uuid"
}
```

**Response 200:**

```json
{
  "message": "Location updated"
}
```

---

### GET /driver/stats

Driver-specific metrics for the driver dashboard.

**Auth:** Required | **Role:** `driver`

**Response 200:**

```json
{
  "total_inspections": 47,
  "this_month": 8,
  "completed": 45,
  "pending": 2
}
```

---

## Users

### GET /users/drivers

List all drivers.

**Auth:** Required | **Role:** `manager`, `admin`

**Response 200:** Array of driver objects with inspection count.

---

### POST /users/drivers

Create a new driver account.

**Auth:** Required | **Role:** `manager`, `admin`

**Body:**

```json
{
  "name": "Nimal Silva",
  "email": "nimal@fleet.com",
  "password": "TempPass1!",
  "phone": "+94712345678",
  "license_number": "B1234567"
}
```

**Response 201:** Created driver object.

---

### GET /users/drivers/:id

Get driver detail with inspection history.

**Auth:** Required | **Role:** `manager`, `admin`

**Response 200:** Driver object with recent inspections.

---

### PUT /users/profile

Update the authenticated user's profile.

**Auth:** Required

**Body:** `name`, `phone`, `avatar_url` (any subset).

**Response 200:** Updated user object.

---

### POST /users/change-password

Change the authenticated user's password.

**Auth:** Required

**Body:**

```json
{
  "current_password": "OldPass1!",
  "new_password": "NewPass1!"
}
```

**Response 200:**

```json
{
  "message": "Password changed successfully"
}
```

---

### GET /users/preferences

Get the authenticated user's preferences.

**Auth:** Required

**Response 200:**

```json
{
  "language": "si",
  "theme": "dark",
  "notifications_enabled": true
}
```

---

### PUT /users/preferences

Update user preferences.

**Auth:** Required

**Body:** `language` (`en`/`si`/`ta`), `theme` (`dark`/`light`), `notifications_enabled` (boolean).

**Response 200:** Updated preferences object.

---

## Notifications

### GET /notifications

Get notifications for the authenticated user.

**Auth:** Required

**Query params:** `?unread=true`

**Response 200:**

```json
{
  "notifications": [
    {
      "id": "uuid",
      "type": "damage_alert",
      "message": "High severity damage detected on CAA-1234",
      "is_read": false,
      "created_at": "2026-03-20T09:45:00Z"
    }
  ],
  "unread_count": 3
}
```

---

### PUT /notifications/:id/read

Mark a notification as read.

**Auth:** Required

**Response 200:**

```json
{
  "message": "Notification marked as read"
}
```

---

## Health

### GET /health

Service health check. Does not require authentication or database access.

**Response 200:**

```json
{
  "status": "ok",
  "service": "FleetGuard AI API",
  "version": "1.0.0",
  "timestamp": "2026-03-20T09:00:00Z"
}
```

---

## Error Responses

All error responses follow this structure:

```json
{
  "error": "Human-readable error message",
  "code": "ERROR_CODE"
}
```

### HTTP Status Codes

| Status | Meaning |
| --- | --- |
| 200 | OK |
| 201 | Created |
| 400 | Bad Request — invalid body or missing required field |
| 401 | Unauthorised — missing or invalid JWT |
| 403 | Forbidden — valid JWT but insufficient role |
| 404 | Not Found — resource does not exist |
| 409 | Conflict — duplicate unique constraint (e.g. email already registered) |
| 413 | Payload Too Large — file upload exceeds size limit |
| 422 | Unprocessable Entity — validation failure |
| 500 | Internal Server Error — unexpected server error |
| 503 | Service Unavailable — AI service or database unreachable |

### Common Error Codes

| Code | Description |
| --- | --- |
| `AUTH_MISSING_TOKEN` | No Authorization header provided |
| `AUTH_INVALID_TOKEN` | JWT is malformed or expired |
| `AUTH_INSUFFICIENT_ROLE` | User role does not meet route requirement |
| `USER_NOT_FOUND` | No user with the given ID or email |
| `USER_ALREADY_EXISTS` | Email address already registered |
| `INSPECTION_NOT_FOUND` | Inspection ID does not exist |
| `VEHICLE_NOT_FOUND` | Vehicle ID does not exist |
| `AI_SERVICE_UNAVAILABLE` | AI microservice did not respond |
| `UPLOAD_INVALID_TYPE` | File type not accepted (only JPEG/PNG) |
| `UPLOAD_TOO_LARGE` | File exceeds 10 MB limit |
