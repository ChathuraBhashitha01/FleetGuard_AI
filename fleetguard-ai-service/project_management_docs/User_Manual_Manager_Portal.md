# User Manual — Manager Portal
## FleetGuard AI — AI-Powered Vehicle Inspection System

**Version:** 1.0
**Date:** March 2026
**Prepared by:** Bethmi Jayamila — Start-up Manager

> **How to use this manual:** Replace every `[IMAGE: ...]` placeholder with an actual screenshot of the application. Each placeholder describes exactly what the screenshot should show.

---

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Login](#2-login)
3. [Manager Dashboard](#3-manager-dashboard)
4. [Fleet Management — Vehicles](#4-fleet-management--vehicles)
   - [Viewing the Vehicle List](#41-viewing-the-vehicle-list)
   - [Adding a New Vehicle](#42-adding-a-new-vehicle)
   - [Editing a Vehicle](#43-editing-a-vehicle)
   - [Vehicle Detail View](#44-vehicle-detail-view)
5. [Inspection Management](#5-inspection-management)
   - [Viewing All Inspections](#51-viewing-all-inspections)
   - [Reviewing an Inspection — Approve](#52-reviewing-an-inspection--approve)
   - [Reviewing an Inspection — Flag](#53-reviewing-an-inspection--flag)
   - [Inspection Detail View](#54-inspection-detail-view)
6. [Analytics](#6-analytics)
7. [Smart Assignment](#7-smart-assignment)
8. [Map View — GPS Tracking](#8-map-view--gps-tracking)
9. [Notifications](#9-notifications)
10. [Manager Profile](#10-manager-profile)
11. [Language Switching](#11-language-switching)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. Getting Started

### 1.1 System Requirements

| Item | Requirement |
| --- | --- |
| Device | Desktop, laptop, or tablet (recommended: desktop for analytics) |
| Browser | Google Chrome 110+, Safari 16+, Firefox 110+ |
| Internet | Required — all data is fetched live from the server |
| Google Maps | Required for Map View and Smart Assignment geocoding |
| Application URL | Provided by your system administrator |

### 1.2 Manager vs Driver Access

As a manager, you have access to all features that drivers cannot access:

| Feature | Driver | Manager |
| --- | --- | --- |
| Start and complete inspections | Yes | No |
| View own inspections only | Yes | — |
| View all inspections from all drivers | No | Yes |
| Review and approve inspections | No | Yes |
| Add, edit, and manage vehicles | No | Yes |
| Access analytics and KPI dashboard | No | Yes |
| Use Smart Assignment | No | Yes |
| View GPS Map | No | Yes |

---

## 2. Login

**Step 1:** Open the application URL and click **Login**.

```
[IMAGE: Login page with Email and Password fields, Login button, Forgot Password link, and Sign in with Google button.]
```

**Step 2:** Enter your registered manager email and password. Click **Login**.

```
[IMAGE: Login page with email and password filled in. The Login button is highlighted.]
```

**Step 3:** You will be redirected to the **Manager Dashboard**.

```
[IMAGE: Manager Dashboard page immediately after login. Shows KPI cards at the top, recent inspections, and the manager's name in the top navigation bar.]
```

> **Role enforcement:** If you attempt to log in as a manager using a driver account, you will be redirected to the Driver Dashboard. Manager-only pages return HTTP 403 Forbidden if accessed by a driver.

---

## 3. Manager Dashboard

The Manager Dashboard is your central overview of the entire fleet's status and recent activity.

```
[IMAGE: Full Manager Dashboard page showing: top navigation bar with logo, manager name, notification bell, language switcher; four KPI cards in a row (Total Vehicles, Available, In Use, Maintenance); a Recent Inspections panel with the latest inspection cards; a Pending Reviews alert panel; and the sidebar navigation.]
```

### 3.1 KPI Cards

At the top of the dashboard, four cards show the live fleet status.

```
[IMAGE: Close-up of the four KPI cards showing: Total Vehicles: 24, Available: 16, In Use: 5, Maintenance: 3. Each card has a coloured icon.]
```

| Card | Description |
| --- | --- |
| Total Vehicles | Total number of vehicles registered in the system |
| Available | Vehicles currently available to assign to drivers |
| In Use | Vehicles currently on active rental |
| Maintenance | Vehicles taken out of service for maintenance |

### 3.2 Pending Reviews Panel

```
[IMAGE: Pending Reviews panel on the dashboard showing a list of inspections awaiting review. Each item shows driver name, vehicle plate, and date. A View button takes the manager to the inspection detail.]
```

This panel shows inspections with status **Completed** that have not yet been reviewed. Click any item to open the inspection review page.

> **Alert badge:** The number on this panel matches the badge on the Inspections menu item in the sidebar.

### 3.3 Manager Navigation Sidebar

```
[IMAGE: Manager sidebar navigation expanded, showing menu items: Dashboard, Fleet Management, Inspections, Analytics, Smart Assignment, Map View, Notifications, Profile.]
```

| Menu Item | Description |
| --- | --- |
| Dashboard | Returns to the main overview |
| Fleet Management | View, add, and manage vehicles |
| Inspections | View and review all driver inspections |
| Analytics | Fleet health trends and damage charts |
| Smart Assignment | Find the best vehicle for a customer |
| Map View | Live GPS locations of the fleet on Google Maps |
| Notifications | View your alerts |
| Profile | View and edit your account details |

---

## 4. Fleet Management — Vehicles

### 4.1 Viewing the Vehicle List

Navigate to **Fleet Management** from the sidebar.

```
[IMAGE: Fleet Management page showing a table or card list of all vehicles. Columns/fields visible: Number Plate, Make, Model, Year, Status badge (Available / In Use / Maintenance), Health Score bar (0-100). A filter bar at the top shows dropdowns for Status and Type. An Add Vehicle button is at the top right.]
```

**Filtering vehicles:**

Use the status filter to narrow down the list.

```
[IMAGE: Status filter dropdown open showing options: All, Available, In Use, Maintenance. Currently selected: Available.]
```

| Filter | Shows |
| --- | --- |
| All | All registered vehicles |
| Available | Vehicles ready for assignment |
| In Use | Vehicles on active rental |
| Maintenance | Vehicles out of service |

**Health Score:** Each vehicle shows a health score from 0 to 100. This score is automatically updated after each inspection based on AI-detected damage severity.

```
[IMAGE: Vehicle card or row showing the health score as a coloured progress bar: green for 80-100, yellow for 50-79, red for below 50.]
```

---

### 4.2 Adding a New Vehicle

**Step 1:** Click the **Add Vehicle** button at the top right of the Fleet Management page.

```
[IMAGE: Add Vehicle button at the top right of the Fleet Management page — a blue button with a plus icon.]
```

**Step 2:** The Add Vehicle form opens.

```
[IMAGE: Add Vehicle form/modal showing fields: Number Plate, Make, Model, Year, Color, Vehicle Type (dropdown: car, van, bus, truck), Notes (optional textarea), and Vehicle Photo upload area. Save and Cancel buttons at the bottom.]
```

**Step 3:** Fill in all required fields.

| Field | Description | Example |
| --- | --- | --- |
| Number Plate | Unique vehicle registration number | CAA-1234 |
| Make | Vehicle manufacturer | Toyota |
| Model | Specific model name | KDH |
| Year | Year of manufacture | 2022 |
| Color | Vehicle exterior colour | White |
| Vehicle Type | Category of vehicle | Van |
| Notes | Optional maintenance or usage notes | AC serviced March 2026 |
| Vehicle Photo | Upload a JPEG or PNG photo of the vehicle | vehicle_kdh.jpg |

**Step 4:** Click the photo upload area to upload a photo of the vehicle.

```
[IMAGE: Vehicle photo upload area showing a drag-and-drop zone with a camera icon and text: Click to upload or drag a photo here. JPEG, PNG. Max 10 MB.]
```

**Step 5:** Click **Save**. The vehicle is added to the fleet.

```
[IMAGE: Fleet Management page after adding a vehicle. The new vehicle appears at the top of the list with status: Available and health score: 100.]
```

**Add Vehicle Errors:**

| Error | Cause | Fix |
| --- | --- | --- |
| A vehicle with this number plate already exists | Duplicate plate number | Check the existing fleet list for the plate |
| Please fill in all required fields | A required field was left empty | Complete all required fields |
| Invalid file type | Uploaded a non-image file | Upload JPEG or PNG only |

---

### 4.3 Editing a Vehicle

**Step 1:** Click on a vehicle in the Fleet Management list to open its detail view.

**Step 2:** Click the **Edit** button.

```
[IMAGE: Vehicle detail view with an Edit button in the top right corner.]
```

**Step 3:** The Edit Vehicle form opens, pre-filled with the current values.

```
[IMAGE: Edit Vehicle form with all fields pre-filled. Fields: Number Plate (read-only), Make, Model, Year, Color, Type, Status (dropdown), Notes, and photo upload. Save and Cancel buttons.]
```

**Step 4:** Update the fields you want to change.

**Changing vehicle status:**

Use the **Status** dropdown to change the vehicle's availability.

```
[IMAGE: Status dropdown in the Edit Vehicle form open, showing three options: Available, In Use, Maintenance. Maintenance is being selected.]
```

| Status | When to Use |
| --- | --- |
| Available | Vehicle is ready for assignment |
| In Use | Vehicle is on an active rental (usually set automatically) |
| Maintenance | Vehicle is taken offline for repairs |

**Step 5:** Click **Save**. Changes are reflected immediately in the fleet list and on the map.

---

### 4.4 Vehicle Detail View

Click on any vehicle in the fleet list to see its full detail view.

```
[IMAGE: Vehicle detail page showing: vehicle photo at the top, number plate, make, model, year, color, type, current status badge, current health score (with progress bar), last GPS location (latitude and longitude), last location update timestamp, and a list of recent inspections for this vehicle.]
```

The detail view shows:

| Section | Content |
| --- | --- |
| Vehicle Photo | The uploaded photo of the vehicle |
| Basic Details | Plate, make, model, year, color, type |
| Status | Current availability status |
| Health Score | Current health score (0–100) updated after each inspection |
| Last GPS Location | Latitude, longitude, and timestamp of last known location |
| Inspection History | List of past inspections for this specific vehicle |

---

## 5. Inspection Management

### 5.1 Viewing All Inspections

Navigate to **Inspections** from the sidebar.

```
[IMAGE: Inspections page showing a table list of all inspections from all drivers. Columns: Vehicle Plate, Driver Name, Customer Name, Date, Status (Completed / Reviewed / Flagged / In Progress), Review Status (Pending / Approved / Flagged). A filter bar at the top with dropdowns for Status. A search field for vehicle plate or driver name.]
```

**Filtering inspections:**

```
[IMAGE: Inspection filter bar showing Status dropdown open with options: All, Completed, Reviewed, Flagged, In Progress.]
```

| Status | Meaning |
| --- | --- |
| In Progress | Driver has started but not yet completed the inspection |
| Completed | Driver has completed all 8 steps; awaiting manager review |
| Reviewed | Manager has submitted a review (Approved or Flagged) |

---

### 5.2 Reviewing an Inspection — Approve

When a driver completes an inspection, you will receive a notification and the inspection will appear in your Pending Reviews list.

**Step 1:** Open the inspection from the Inspections list or Pending Reviews panel.

```
[IMAGE: Inspection detail view showing all inspection data: vehicle details, customer details, 8 photo thumbnails in a grid, AI damage detection results (damage cards with type, severity, confidence), and both digital signatures at the bottom. A Review Panel is visible on the right or below.]
```

**Step 2:** Review all sections carefully:

- **Vehicle and customer details** — confirm correctness
- **Photos** — click each thumbnail to view full size
- **Damage detections** — check severity and confidence scores
- **Signatures** — confirm both driver and customer have signed

```
[IMAGE: One of the 8 inspection photos opened full-size in a lightbox/overlay. The photo shows the right side of a vehicle. Close button at the top right.]
```

**Step 3:** In the Review Panel, select **Approved** as the review status.

```
[IMAGE: Review Panel showing a Status dropdown set to Approved (green), a Notes textarea, and a Submit Review button.]
```

**Step 4:** Add any optional review notes in the **Notes** field.

**Step 5:** Click **Submit Review**.

```
[IMAGE: Inspections list after submitting an approval. The reviewed inspection now shows a green Reviewed badge and Approved sub-badge. The pending review count decrements by 1.]
```

> **Result:** The inspection status changes to **Reviewed — Approved**. The driver receives a notification that their inspection has been approved.

---

### 5.3 Reviewing an Inspection — Flag

If you find an issue with an inspection (e.g. missing photos, undisclosed damage, incorrect customer information), flag it.

**Step 1:** Open the inspection detail view.

**Step 2:** In the Review Panel, select **Flagged** as the review status.

```
[IMAGE: Review Panel showing Status dropdown set to Flagged (red/orange). The Notes field is highlighted to indicate notes are required when flagging.]
```

**Step 3:** Add detailed notes explaining the issue in the **Notes** field.

```
[IMAGE: Review Panel with notes filled in: The right-side damage close-up photo is blurry and does not show the full extent of the dent near the door. Please retake and resubmit.]
```

**Step 4:** Click **Submit Review**.

```
[IMAGE: Inspections list showing the flagged inspection with a red Flagged badge. The driver's name is visible.]
```

> **Result:** The inspection is flagged. The driver receives a notification with your notes. Follow up with the driver as needed.

---

### 5.4 Inspection Detail View

Click on any inspection to open its full detail view.

```
[IMAGE: Full inspection detail page with all sections visible: Header bar showing vehicle plate, driver name, inspection date, and status badges. Below: three panels side by side (or stacked) for Vehicle Details, Customer Details, and Inspection Info. Then: 8 photo grid. Then: damage detection results as cards. Then: signatures section with both images. Then: manager review section at the bottom showing review status, manager name, review date, and notes.]
```

**Damage Detection Cards:**

```
[IMAGE: A damage detection card showing: photo thumbnail (left side of vehicle), damage type: Dent, severity: High (red badge), confidence: 89%, and the bounding box coordinates. Three such cards are shown in a horizontal row.]
```

**Signatures Section:**

```
[IMAGE: Signatures section showing two signature images side by side. Left: Driver Signature with name Amal Fernando and timestamp. Right: Customer Signature with name Kumara Perera and timestamp.]
```

---

## 6. Analytics

Navigate to **Analytics** from the sidebar. The analytics page provides graphical insights into fleet health trends and damage patterns.

```
[IMAGE: Full Analytics page showing: two main charts. Top chart: Fleet Health Trend — a line chart showing average fleet health score over time. Bottom chart: Damage Type Distribution — a donut/pie chart showing damage types with legend. Time range selector (7 Days, 30 Days, 90 Days) buttons at the top right.]
```

### 6.1 Fleet Health Trend Chart

```
[IMAGE: Fleet Health Trend line chart in detail. X-axis shows dates. Y-axis shows health score (0-100). The line shows the average fleet health declining slightly after a period of inspections. Currently set to 30-day view.]
```

This chart shows the **average health score** of the fleet over the selected time period.

- A declining trend indicates increasing damage across the fleet.
- A sudden drop may indicate a high-severity inspection event.

**Time range options:**

| Range | Shows |
| --- | --- |
| 7 Days | Health score trend for the past week |
| 30 Days | Health score trend for the past month |
| 90 Days | Health score trend for the past quarter |

**Step:** Click the **7 Days**, **30 Days**, or **90 Days** button to change the range.

```
[IMAGE: Time range buttons (7 Days / 30 Days / 90 Days) with 30 Days currently selected/highlighted.]
```

---

### 6.2 Damage Type Distribution Chart

```
[IMAGE: Damage Type Distribution donut chart. Segments are colour-coded: Scratch (blue 38%), Dent (orange 25%), Crack (yellow 18%), Broken (red 12%), Rust (green 7%). Legend is shown to the right of the chart.]
```

This chart shows the **distribution of detected damage types** across all inspections in the fleet.

| Damage Type | Description |
| --- | --- |
| Scratch | Surface scratches detected on the vehicle body |
| Dent | Dents or depressions on panels |
| Crack | Cracks on glass, bumpers, or body panels |
| Broken | Broken components (lights, mirrors, handles) |
| Rust | Corrosion detected on vehicle surface |

---

## 7. Smart Assignment

Smart Assignment helps you recommend the best available vehicle for a customer based on proximity, vehicle health, and customer tier.

Navigate to **Smart Assignment** from the sidebar.

```
[IMAGE: Smart Assignment page with an input form on the left/top and results panel on the right/bottom. Form fields: Customer Address (text input with geocoding), Customer Tier (dropdown: Standard / Premium / VIP), Find Best Vehicle button.]
```

### 7.1 Finding the Best Vehicle

**Step 1:** Enter the customer's pickup address in the **Customer Address** field.

```
[IMAGE: Customer Address field with a value entered: No. 45, Galle Road, Colombo 03. A dropdown suggestion list appears below the field showing matching addresses from the Google Maps geocoder.]
```

**Step 2:** Select the customer tier from the **Customer Tier** dropdown.

```
[IMAGE: Customer Tier dropdown open showing three options: Standard, Premium, VIP.]
```

| Tier | Description |
| --- | --- |
| Standard | Regular customer |
| Premium | Higher-priority customer — prefers newer or higher-health vehicles |
| VIP | Highest-priority customer — best available vehicle assigned |

**Step 3:** Click **Find Best Vehicle**.

```
[IMAGE: Find Best Vehicle button — a prominent blue button below the form fields.]
```

**Step 4:** The ranked vehicle list appears.

```
[IMAGE: Smart Assignment results panel showing a ranked list of 5 vehicles. Each vehicle card shows: rank number (1st, 2nd, 3rd...), vehicle photo thumbnail, number plate, make, model, health score bar, distance from customer (e.g. 2.4 km), and a Score Breakdown section showing three score components.]
```

### 7.2 Understanding the Score Breakdown

Each vehicle is scored on three components:

```
[IMAGE: Score breakdown panel for the top-ranked vehicle showing three rows: Health Score: 46/50, Distance Score: 28/30, Tier Score: 20/20. Total Score: 94/100 displayed prominently at the top.]
```

| Component | Max Points | How It Is Calculated |
| --- | --- | --- |
| Health Score | 50 | Based on the vehicle's current health score (0–100) |
| Distance Score | 30 | Based on how close the vehicle is to the customer address (closer = higher score) |
| Tier Score | 20 | Based on whether the vehicle matches the customer tier requirement |
| **Total Score** | **100** | Sum of all three components |

> **Note:** If no GPS coordinates are available for the vehicles (e.g. on a new installation), the Distance Score defaults to 0 for all vehicles and results are ranked by Health and Tier scores only. A notice is shown in the UI.

### 7.3 Assigning a Vehicle

After reviewing the ranked list, note the top-ranked vehicle's number plate and communicate the assignment to the relevant driver.

> **Smart Assignment does not automatically notify a driver.** It is a recommendation tool. The manager manually communicates the assignment.

---

## 8. Map View — GPS Tracking

The Map View shows the live last-known GPS location of all vehicles on a Google Map.

Navigate to **Map View** from the sidebar.

```
[IMAGE: Map View page showing a Google Map centred on Sri Lanka. Multiple coloured vehicle markers are visible on the map at various locations. A sidebar or legend on the left shows the list of vehicles with their plates and status badges. Clicking a marker shows a popup with vehicle details.]
```

> **Prerequisite:** The Map View requires a valid Google Maps API key set in the application environment. If the key is missing, a message is displayed instead of the map.

### 8.1 Vehicle Markers

Each marker on the map represents a vehicle's last known location.

```
[IMAGE: Close-up of a vehicle marker on the map. A popup/tooltip is open showing: Number Plate: CAA-1234, Make/Model: Toyota KDH, Status: Available, Health Score: 87, Last Updated: 2026-03-19 14:32.]
```

| Marker Colour | Vehicle Status |
| --- | --- |
| Green | Available |
| Blue | In Use |
| Orange | Maintenance |

**Clicking a marker:** Click any marker to see the vehicle's details including plate, model, status, health score, and the timestamp of the last GPS update.

### 8.2 Map Controls

- **Zoom:** Use the + and – buttons or scroll wheel to zoom in and out.
- **Pan:** Click and drag the map to move around.
- **Vehicle list sidebar:** Click a vehicle in the sidebar list to centre the map on that vehicle's marker.

```
[IMAGE: Vehicle list sidebar on the left of the Map View showing each vehicle as a list item with its plate, model, and a small coloured status dot.]
```

### 8.3 GPS Update Frequency

GPS locations are updated when a driver's device sends a location update to the system. The timestamp next to each vehicle shows when the location was last recorded.

> **Note:** GPS tracking is updated when drivers are actively using the application. Overnight or parked vehicles may show stale timestamps.

---

## 9. Notifications

The Notifications page shows all alerts and system messages for your manager account.

```
[IMAGE: Manager Notifications page showing a list of notification items. Types visible: Inspection Completed (a driver submitted an inspection for review), Damage Alert (high-severity damage detected), Inspection Flagged (flagged by system). Each item shows notification text, type icon, and timestamp. A Mark All as Read button is at the top.]
```

### 9.1 Manager Notification Types

| Type | When You Receive It |
| --- | --- |
| Inspection Completed | A driver has completed an inspection and it is ready for your review |
| Damage Alert | AI detected high-severity damage in a completed inspection |
| System Notification | System updates or administrative messages |

### 9.2 Acting on Notifications

- Click on an **Inspection Completed** or **Damage Alert** notification to go directly to that inspection's review page.

```
[IMAGE: Notification item for an Inspection Completed alert. The notification text reads: Driver Amal Fernando has completed an inspection for vehicle CAA-1234. Click to review. The timestamp shows 2026-03-19 09:15.]
```

### 9.3 Marking Notifications as Read

- Click on a notification to mark it as read.
- Click **Mark All as Read** to clear all unread notifications.
- The badge count on the notification bell updates accordingly.

```
[IMAGE: Notification bell before and after: Before shows badge with 5. After clicking Mark All as Read, no badge is shown.]
```

---

## 10. Manager Profile

Navigate to **Profile** from the sidebar.

```
[IMAGE: Manager Profile page showing profile photo or avatar, full name, email address, phone number, and a Manager role badge. An Edit Profile button is visible.]
```

### 10.1 Viewing Your Profile

Your profile shows your name, email, role (Manager), and phone number.

### 10.2 Editing Your Profile

**Step 1:** Click **Edit Profile**.

```
[IMAGE: Edit Profile form for a manager showing editable fields: Full Name and Phone Number. Email is read-only. Save Changes and Cancel buttons.]
```

**Step 2:** Update your name or phone number.

**Step 3:** Click **Save Changes**.

```
[IMAGE: Manager profile page after saving with a success toast: Profile updated successfully.]
```

---

## 11. Language Switching

The Manager Portal supports English, Sinhala, and Tamil.

```
[IMAGE: Manager top navigation bar showing the language switcher dropdown open with three options: English (EN), Sinhala (SI), Tamil (TA).]
```

**How to switch:**

1. Click the language switcher in the top navigation bar.
2. Select the desired language.
3. All labels, headings, buttons, and messages switch immediately.

```
[IMAGE: Manager Dashboard shown in Sinhala language. All navigation labels, KPI card labels, and button text are displayed in Sinhala characters.]
```

```
[IMAGE: Manager Dashboard shown in Tamil language. All navigation labels, KPI card labels, and button text are displayed in Tamil characters.]
```

> **Preference is saved server-side.** Your language choice persists across devices and browser sessions.

---

## 12. Troubleshooting

### Common Issues and Fixes

| Problem | Likely Cause | Fix |
| --- | --- | --- |
| Map View shows a blank screen or error message | Google Maps API key is missing or invalid | Contact your system administrator to set the VITE_GOOGLE_MAPS_API_KEY |
| Smart Assignment shows no distance (all 0 km) | No GPS coordinates have been recorded for vehicles | GPS data will appear after drivers use the app. Results are still ranked by health and tier. |
| Inspection review Submit button is disabled | Inspection has already been reviewed | Each inspection can only be reviewed once |
| KPI card counts seem wrong | Page data is cached | Refresh the browser page to reload live data from the server |
| Cannot access the Manager Dashboard (redirected) | Logged in with a driver account | Log out and log in with your manager account credentials |
| Analytics charts are empty | No inspections have been completed yet | Charts populate as inspections are completed by drivers |
| A vehicle does not appear in Smart Assignment | Vehicle is set to In Use or Maintenance | Change the vehicle status to Available in Fleet Management |
| Notification bell badge keeps showing after reading | Page needs to refresh | Reload the page; the badge updates from the server |
| Application shows a translation key instead of text | Translation loading issue | Refresh the browser. If it persists, contact your system administrator. |

### Accessing System Logs

If you need to investigate a technical issue, the following information is useful when contacting your system administrator:

- Your manager account email
- The inspection ID or vehicle plate number involved
- The exact error message shown on screen
- The time the issue occurred

### System Administrator Contact

For system-level issues (server downtime, database errors, configuration changes), contact your designated system administrator with the FleetGuard AI deployment team.

---

*FleetGuard AI Manager Portal User Manual — Version 1.0 — March 2026*
*Prepared by Bethmi Jayamila — Start-up Manager*
