# Test Cases — FleetGuard AI

**Project:** FleetGuard AI — AI-Powered Vehicle Inspection and Fleet Management System
**Prepared by:** Iruwan Tharaka (Quality Manager)
**Date:** 13/02/2026
**Version:** 2.0 (Final)

---

## Columns

| Column | Description |
| --- | --- |
| Test Scenario | The feature area being tested |
| Test Case ID | TC-001, TC-002 … (resets per scenario) |
| Test Case | Name of the test |å
| Test Steps | Numbered steps to execute |
| Test Data | Input data used |
| Expected Result | What should happen |
| Actual Result | Fill in during execution |
| Status | Pass / Fail |
| Priority | High / Medium / Low |

---

## MODULE 1 — AUTHENTICATION

### Scenario: Validate Register Page

| TC ID | Test Case | Test Steps | Test Data | Expected Result | Actual Result | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify Register Button | 1. Open the application URL. 2. Click the Register button. | App URL | User is redirected to the Register page. | | | High |
| TC-002 | Verify Default State of Input Fields | 1. Open the Register page. 2. Observe all input fields. | — | Name, Email, Password fields are all empty by default. | | | High |
| TC-003 | Verify Input Field Placeholders | 1. Open the Register page. 2. Click each field. 3. Observe placeholder text. | — | Placeholder text is visible when field is empty and disappears when typing begins. | | | Medium |
| TC-004 | Verify Sign Up with Valid Driver Credentials | 1. Enter full name. 2. Enter valid email. 3. Enter password (min 8 chars, uppercase, number, symbol). 4. Select role Driver. 5. Click Continue. | Name: Amal Fernando, Email: amal@test.com, Password: Test@1234, Role: driver | Account is created. JWT token returned. Driver is redirected to the Driver Dashboard. | | | High |
| TC-005 | Verify Sign Up with Valid Manager Credentials | 1. Enter full name. 2. Enter valid email. 3. Enter valid password. 4. Select role Manager. 5. Click Continue. | Name: Kamal Silva, Email: kamal@test.com, Password: Test@1234, Role: manager | Account is created. Manager is redirected to the Manager Dashboard. | | | High |
| TC-006 | Verify Sign Up with Invalid Email Format | 1. Enter name. 2. Enter an invalid email (no @ symbol). 3. Enter password. 4. Click Continue. | Email: amaltestcom | Validation error shown: Please enter a valid email address. Registration does not proceed. | | | High |
| TC-007 | Verify Sign Up with Weak Password | 1. Enter name. 2. Enter valid email. 3. Enter password shorter than 8 characters. 4. Click Continue. | Password: pass | Validation error shown: Password must be at least 8 characters. Registration does not proceed. | | | High |
| TC-008 | Verify Error Message for Missing Fields | 1. Leave all fields empty. 2. Click Continue. | — | Error message shown prompting the user to fill in all required fields. | | | High |
| TC-009 | Verify Duplicate Email Registration | 1. Enter an email already registered in the system. 2. Enter valid password. 3. Click Continue. | Email: existing@test.com | HTTP 409 Conflict returned. Error message: Email address already registered. | | | High |

---

### Scenario: Validate Login Page

| TC ID | Test Case | Test Steps | Test Data | Expected Result | Actual Result | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify Login Button | 1. Open the application URL. 2. Click the Login button. | App URL | User is redirected to the Login page. | | | High |
| TC-002 | Verify Default State of Input Fields | 1. Open the Login page. 2. Observe Email and Password fields. | — | Both fields are empty by default. | | | High |
| TC-003 | Verify Input Field Placeholders | 1. Open the Login page. 2. Click each field and check placeholder text. | — | Placeholder text visible when empty, disappears on typing. | | | Medium |
| TC-004 | Verify Login with Valid Driver Credentials | 1. Enter registered driver email. 2. Enter correct password. 3. Click Login. | Email: driver@test.com, Password: Test@1234 | Login succeeds. JWT token stored in localStorage. Driver redirected to Driver Dashboard. | | | High |
| TC-005 | Verify Login with Valid Manager Credentials | 1. Enter registered manager email. 2. Enter correct password. 3. Click Login. | Email: manager@test.com, Password: Test@1234 | Login succeeds. Manager redirected to Manager Dashboard. | | | High |
| TC-006 | Verify Login with Wrong Password | 1. Enter valid registered email. 2. Enter incorrect password. 3. Click Login. | Email: driver@test.com, Password: WrongPass | HTTP 401 returned. Error message: Invalid credentials. | | | High |
| TC-007 | Verify Login with Unregistered Email | 1. Enter an email not in the system. 2. Enter any password. 3. Click Login. | Email: nobody@test.com | HTTP 401 returned. Error message: Invalid credentials. | | | High |
| TC-008 | Verify Error Message for Missing Fields | 1. Leave both fields empty. 2. Click Login. | — | Validation error shown prompting user to fill in required fields. | | | High |
| TC-009 | Verify Forgot Password Link | 1. Click the Forgot Password link on the login page. | — | User is redirected to the Forgot Password page. | | | Medium |
| TC-010 | Verify JWT Token Issued on Successful Login | 1. Log in with valid credentials. 2. Open browser DevTools > Application > localStorage. | Valid credentials | JWT token is stored under the auth key in localStorage after successful login. | | | High |
| TC-011 | Verify Role-Based Redirect on Login | 1. Log in as driver. 2. Log out. 3. Log in as manager. | Driver credentials, Manager credentials | Driver is redirected to /driver/dashboard. Manager is redirected to /manager/dashboard. | | | High |

---

### Scenario: Validate Forgot Password

| TC ID | Test Case | Test Steps | Test Data | Expected Result | Actual Result | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify Forgot Password Navigation | 1. Click Forgot Password on the login page. | — | User is redirected to the Forgot Password page with an email input field. | | | High |
| TC-002 | Verify Reset Email Sent for Registered Email | 1. Enter a registered email on the Forgot Password page. 2. Click Send Reset Link. | Registered email: driver@test.com | Success message displayed: Password reset email sent. Email received with a clickable reset link. | | | High |
| TC-003 | Verify No Email Sent for Unregistered Address | 1. Enter an email not in the system. 2. Click Send Reset Link. | Email: unknown@test.com | Error message displayed. No email is sent. | | | High |
| TC-004 | Verify Password Reset with Valid Token | 1. Open the reset link from the email. 2. Enter a new valid password. 3. Click Reset Password. 4. Log in with the new password. | Valid reset token, New password: NewPass@123 | Password updated. Login with new password succeeds. | | | High |
| TC-005 | Verify Expired Reset Token is Rejected | 1. Open a password reset link older than 1 hour. 2. Enter new password and submit. | Expired reset token | Error shown: Reset link has expired. Please request a new one. Password is not changed. | | | High |
| TC-006 | Verify Empty Email Field on Forgot Password | 1. Leave the email field empty on the Forgot Password page. 2. Click Send Reset Link. | — | Validation error: Please enter your email address. Form does not submit. | | | Medium |

---

### Scenario: Validate Google OAuth

| TC ID | Test Case | Test Steps | Test Data | Expected Result | Actual Result | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify Google Sign-In Button is Visible | 1. Open the Login page. 2. Open the Register page. | — | Sign in with Google button is visible on both pages. | | | Medium |
| TC-002 | Verify Successful Google OAuth Login | 1. Click Sign in with Google. 2. Select a valid Google account. 3. Grant permissions. | Valid Google account | User is authenticated. JWT returned. User redirected to appropriate dashboard based on role. | | | High |
| TC-003 | Verify Google OAuth Creates Account if Not Exists | 1. Click Sign in with Google using an email not previously registered. | New Google account | New user account is created with the Google profile data. User redirected to dashboard. | | | High |

---

### Scenario: Validate Logout

| TC ID | Test Case | Test Steps | Test Data | Expected Result | Actual Result | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify Logout Clears JWT Token | 1. Log in as driver. 2. Click Logout. 3. Inspect localStorage. | Driver credentials | JWT token is removed from localStorage after logout. | | | High |
| TC-002 | Verify Logout Redirects to Login Page | 1. Log in as manager. 2. Click Logout. | Manager credentials | User is redirected to the Login page after logout. | | | High |
| TC-003 | Verify Accessing Protected Route After Logout | 1. Log in and note the dashboard URL. 2. Log out. 3. Navigate directly to the dashboard URL. | — | User is redirected to the Login page. Protected content is not shown. | | | High |

---

### Scenario: Validate User Profile

| TC ID | Test Case | Test Steps | Test Data | Expected Result | Actual Result | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify Driver Can View Own Profile | 1. Log in as driver. 2. Navigate to the Profile page. | Driver credentials | Profile page shows full name, email, phone, role, and profile photo. | | | High |
| TC-002 | Verify Driver Can Update Profile Name and Phone | 1. Open Profile page. 2. Click Edit. 3. Change name and phone. 4. Click Save. | New name: Amal Perera, New phone: +94771234567 | Profile updated. Changes reflected immediately on the profile page. | | | High |
| TC-003 | Verify Language Preference Persists After Re-Login | 1. Log in. 2. Switch language to Sinhala. 3. Log out. 4. Log in again. | Language: Sinhala | Application loads in Sinhala after re-login. Preference was saved server-side. | | | High |

---

## MODULE 2 — VEHICLES

### Scenario: Validate Vehicle List

| TC ID | Test Case | Test Steps | Test Data | Expected Result | Actual Result | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify Vehicle List Loads for Manager | 1. Log in as manager. 2. Navigate to Fleet Management. | Manager credentials | All registered vehicles listed with number plate, make, model, status, and health score. | | | High |
| TC-002 | Verify Vehicle Filter by Status — Available | 1. On Fleet Management, select Available from the status filter. | status=available | Only vehicles with status available are shown. | | | High |
| TC-003 | Verify Vehicle Filter by Status — In Use | 1. Select In Use from the status filter. | status=in-use | Only vehicles with status in-use are shown. | | | High |
| TC-004 | Verify Vehicle Filter by Status — Maintenance | 1. Select Maintenance from the status filter. | status=maintenance | Only vehicles with status maintenance are shown. | | | Medium |
| TC-005 | Verify Driver Cannot Access Fleet Management | 1. Log in as driver. 2. Navigate directly to the Fleet Management URL. | Driver credentials | HTTP 403 returned or user redirected to driver dashboard. Fleet list is not shown. | | | High |
| TC-006 | Verify KPI Cards Show Correct Vehicle Counts | 1. Log in as manager. 2. View the Dashboard. | Manager credentials | KPI cards show correct counts: Total, Available, In-Use, and Maintenance vehicles matching the database. | | | High |
| TC-007 | Verify Vehicle Search by Number Plate | 1. On Fleet Management, type a known plate number in the search field. | Plate: CAA-1234 | Only the matching vehicle is shown in the list. | | | Medium |

---

### Scenario: Validate Add Vehicle

| TC ID | Test Case | Test Steps | Test Data | Expected Result | Actual Result | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify Add Vehicle Form Opens | 1. Log in as manager. 2. Click Add Vehicle on Fleet Management. | — | Form displays with fields: Number Plate, Make, Model, Year, Color, Type, Notes, Photo. | | | High |
| TC-002 | Verify Add Vehicle with Valid Data | 1. Fill all required fields. 2. Upload a vehicle photo. 3. Click Save. | Plate: CAA-1234, Make: Toyota, Model: KDH, Year: 2022, Type: van | Vehicle created. Appears in fleet list with health score 100 and status available. | | | High |
| TC-003 | Verify Duplicate Number Plate is Rejected | 1. Enter a plate number already in the system. 2. Click Save. | Plate: CAA-1234 (existing) | HTTP 409 returned. Error: A vehicle with this number plate already exists. | | | High |
| TC-004 | Verify Add Vehicle with Missing Required Fields | 1. Leave Number Plate empty. 2. Click Save. | — | Validation error shown. Form does not submit. | | | High |
| TC-005 | Verify Vehicle Photo Uploads Successfully | 1. In Add Vehicle form, upload a JPEG photo. 2. Submit the form. | JPEG image, max 10 MB | Photo saved to server. Vehicle record created with photo URL populated. | | | High |
| TC-006 | Verify Non-Image File Rejected in Vehicle Photo | 1. Attempt to upload a PDF as vehicle photo. | document.pdf | HTTP 400 returned. Error: Invalid file type. Only JPEG and PNG accepted. File not saved. | | | High |

---

### Scenario: Validate Edit Vehicle

| TC ID | Test Case | Test Steps | Test Data | Expected Result | Actual Result | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify Vehicle Details Can Be Updated | 1. Open a vehicle. 2. Click Edit. 3. Change the model name. 4. Click Save. | New model: HiAce | Vehicle record updated. Changes reflect in the detail view and fleet list. | | | High |
| TC-002 | Verify Vehicle Status Changed to Maintenance | 1. Open an available vehicle. 2. Change status to maintenance. 3. Save. | status=maintenance | Status updated. Vehicle disappears from smart assignment results. | | | High |
| TC-003 | Verify Vehicle Status Changed Back to Available | 1. Open a maintenance vehicle. 2. Change status to available. 3. Save. | status=available | Status updated. Vehicle reappears in smart assignment results. | | | High |
| TC-004 | Verify Vehicle Health Score Reflects After Inspection | 1. Complete an inspection with damage detected. 2. Check the vehicle health score in Fleet Management. | Inspection with AI-detected damage | Vehicle health score is reduced based on damage severity detected in the inspection. | | | High |

---

### Scenario: Validate Smart Assignment

| TC ID | Test Case | Test Steps | Test Data | Expected Result | Actual Result | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify Smart Assignment Page Loads | 1. Log in as manager. 2. Navigate to Smart Assignment. | Manager credentials | Smart Assignment page loads with input fields for customer address and tier. | | | High |
| TC-002 | Verify Smart Assignment Returns Ranked Vehicles | 1. Enter a customer address. 2. Select a customer tier. 3. Click Find Best Vehicle. | Address: Colombo, Tier: Premium | Ranked list of available vehicles returned showing score, health, distance, and tier. | | | High |
| TC-003 | Verify Only Available Vehicles Appear | 1. Run smart assignment. 2. Check the result list. | — | Vehicles with status in-use or maintenance do not appear in results. | | | High |
| TC-004 | Verify Smart Assignment Responds in Under 500ms | 1. Run smart assignment and measure response time. | — | Results returned in under 500ms. | | | High |
| TC-005 | Verify Score Breakdown is Shown | 1. View a vehicle in smart assignment results. | — | Each vehicle shows breakdown: health score (50pt), distance score (30pt), tier score (20pt), and total. | | | Medium |
| TC-006 | Verify No GPS Fallback When Coordinates Missing | 1. Run smart assignment on a fresh installation with no GPS data. | No GPS data in database | Results still returned. Distance component defaults to 0 for all vehicles. UI note shown that GPS data is unavailable. | | | Medium |

---

### Scenario: Validate Map View

| TC ID | Test Case | Test Steps | Test Data | Expected Result | Actual Result | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify Map View Loads with Google Maps API Key | 1. Ensure VITE_GOOGLE_MAPS_API_KEY is set. 2. Navigate to Map View. | Valid Google Maps API key | Google Maps renders. Vehicle markers appear at their last known GPS coordinates. | | | High |
| TC-002 | Verify Vehicle Markers Show Correct Coordinates | 1. Update a vehicle GPS coordinate via the API. 2. Open Map View. | Vehicle with known coordinates | Vehicle marker appears at the correct latitude and longitude on the map. | | | High |
| TC-003 | Verify Map Shows Fallback When API Key Missing | 1. Remove VITE_GOOGLE_MAPS_API_KEY from .env. 2. Open Map View. | No API key | Friendly message displayed: Google Maps API key is required for this feature. No JavaScript crash. | | | Medium |

---

## MODULE 3 — INSPECTIONS

### Scenario: Validate Create Inspection

| TC ID | Test Case | Test Steps | Test Data | Expected Result | Actual Result | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify Driver Can Start a New Inspection | 1. Log in as driver. 2. Click New Inspection. 3. Select an available vehicle. | Driver credentials, Available vehicle | Inspection record created with status in_progress. Driver advances to Customer Details step. | | | High |
| TC-002 | Verify Customer Details Are Saved | 1. Enter customer name, NIC, phone, rental start, rental end. 2. Click Continue. | Name: Amal Fernando, NIC: 199012345678, Phone: +94771234567, Rental: 2026-03-20 to 2026-03-25 | Customer details saved. Driver advances to Photo Capture step. | | | High |
| TC-003 | Verify Customer Details Validation — Missing NIC | 1. Leave NIC field empty. 2. Click Continue. | — | Validation error shown. Step does not advance. | | | High |
| TC-004 | Verify All 8 Photos Can Be Captured | 1. Capture photos for all 8 angles: front, rear, left, right, interior, dashboard, damage, odometer. 2. Click Continue. | 8 JPEG photos | All 8 photos uploaded to server. Thumbnails visible in photo review step. | | | High |
| TC-005 | Verify Photo Can Be Retaken | 1. On Photo Capture, capture a photo. 2. Click Retake on the captured photo. 3. Capture a new photo. | — | New photo replaces the previous one. Thumbnail updated. | | | Medium |
| TC-006 | Verify AI Damage Detection Runs | 1. After photo review, proceed to AI Processing. 2. Wait for analysis. | 8 inspection photos | AI analysis completes. Damage cards displayed with damage type, severity badge, and confidence score per photo. | | | High |
| TC-007 | Verify AI STUB_MODE When Model Unavailable | 1. Remove model weights (best.pt) from AI service. 2. Trigger AI analysis. | AI service in STUB_MODE | HTTP 200 returned with realistic mock detections. Response contains stub_mode: true. Workflow continues. | | | High |
| TC-008 | Verify AI Service Unreachable Returns Graceful Error | 1. Stop the AI service. 2. Trigger AI analysis. | AI service stopped | HTTP 503 returned. Error message shown to user. Application does not crash. | | | High |
| TC-009 | Verify Driver and Customer Signatures Captured | 1. On Digital Signatures step, draw driver signature. 2. Draw customer signature. 3. Click Continue. | Signature pad drawings | Both signatures saved as PNG files. Inspection advances to report step. | | | High |
| TC-010 | Verify Clear Signature Button Works | 1. Draw a signature. 2. Click Clear. 3. Draw a new signature. | — | Signature pad resets. New signature replaces the old one. | | | Medium |
| TC-011 | Verify PDF Report Is Generated | 1. On Report step, click Download PDF. | Completed inspection with all data | PDF downloads. Contains: customer name, NIC, vehicle plate, inspection date, damage summary, and both signatures. | | | High |
| TC-012 | Verify PDF Contains Both Signatures | 1. Complete the signature step. 2. Generate PDF immediately after signing. | Completed signatures | PDF contains both driver and customer signature images. No blank signature area. | | | High |
| TC-013 | Verify Inspection Marked Complete After Workflow | 1. Complete all 8 steps. 2. Check inspection history. | Completed inspection ID | Inspection status is completed. Record visible in driver history and manager inspection list. | | | High |

---

### Scenario: Validate Manager Inspection Review

| TC ID | Test Case | Test Steps | Test Data | Expected Result | Actual Result | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify Manager Can View All Inspections | 1. Log in as manager. 2. Navigate to Inspections page. | Manager credentials | All inspections from all drivers listed with status, vehicle plate, driver name, and date. | | | High |
| TC-002 | Verify Manager Can Approve an Inspection | 1. Open a completed inspection. 2. Select Approved review status. 3. Add notes. 4. Click Submit Review. | review_status: approved, notes: Looks good | Inspection status updates to reviewed. Review record created with status approved. Driver notified. | | | High |
| TC-003 | Verify Manager Can Flag an Inspection | 1. Open a completed inspection. 2. Select Flagged review status. 3. Add notes explaining the issue. 4. Click Submit Review. | review_status: flagged, notes: Undisclosed damage found | Inspection flagged. Notes saved. Driver receives a flag notification. | | | High |
| TC-004 | Verify Manager Cannot Review an Already Reviewed Inspection | 1. Open an inspection with status reviewed. 2. Attempt to submit a second review. | Already-reviewed inspection | Review submission rejected. Error: This inspection has already been reviewed. | | | Medium |
| TC-005 | Verify Driver Cannot Submit a Review | 1. Log in as driver. 2. Attempt to POST to /api/inspections/:id/review with driver JWT. | Driver JWT, Review endpoint | HTTP 403 Forbidden. Error: Insufficient role. | | | High |
| TC-006 | Verify Manager Dashboard Alert Count | 1. Log in as manager. 2. Observe the pending review count on the dashboard. | — | Alert count shows only completed inspections where review IS NULL (pending review). Reviewed inspections not counted. | | | High |

---

### Scenario: Validate Inspection History

| TC ID | Test Case | Test Steps | Test Data | Expected Result | Actual Result | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify Driver Sees Only Own Inspections | 1. Log in as driver1. 2. Navigate to Inspection History. | Driver1 credentials | Only inspections created by driver1 are shown. Other drivers' inspections not visible. | | | High |
| TC-002 | Verify Inspection Detail View Shows All Information | 1. Click an inspection in the history. | Inspection ID | Detail page shows: vehicle info, customer details, 8 photos, damage results, signatures, review status. | | | High |
| TC-003 | Verify Inspections Sorted by Most Recent | 1. Open Inspection History. | Multiple inspections | Inspections displayed in reverse chronological order (newest first). | | | Medium |
| TC-004 | Verify Completed Inspection Cannot Be Modified | 1. Open a completed inspection as driver. 2. Attempt to edit customer details. | Completed inspection | Edit controls are not available. Inspection data is read-only once completed. | | | High |

---

### Scenario: Validate Manager Analytics

| TC ID | Test Case | Test Steps | Test Data | Expected Result | Actual Result | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify Analytics Dashboard Loads | 1. Log in as manager. 2. Navigate to Analytics. | Manager credentials | Analytics page renders without errors. | | | High |
| TC-002 | Verify Health Trend Chart Renders | 1. On Analytics, select 7-day, then 30-day, then 90-day windows. | — | Line chart renders for all three time windows showing average fleet health score over time. | | | High |
| TC-003 | Verify Damage Type Donut Chart | 1. On Analytics, view the Damage Types chart. | — | Donut chart shows distribution of damage types (scratch, dent, crack, broken, rust). Percentages are correct. | | | High |

---

## MODULE 4 — NOTIFICATIONS

### Scenario: Validate Notification Centre

| TC ID | Test Case | Test Steps | Test Data | Expected Result | Actual Result | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify Notifications Page Loads | 1. Log in as manager. 2. Navigate to Notifications. | Manager credentials | Notifications page loads showing all notifications with message, type, and timestamp. | | | High |
| TC-002 | Verify Unread Badge Count is Correct | 1. Log in with unread notifications. 2. Check the notification bell badge. | User with 3 unread notifications | Badge shows 3. Count matches the number of unread notifications for that user. | | | High |
| TC-003 | Verify Notification Marked as Read | 1. Open Notifications. 2. Click on an unread notification. | Unread notification | Notification is marked as read. is_read updates to true. Badge count decrements. | | | High |
| TC-004 | Verify Notification Generated After Inspection Approved | 1. Log in as manager and approve an inspection. 2. Log in as the driver. 3. Check Notifications. | Approved inspection, Driver account | Driver receives notification: Your inspection has been approved. | | | High |
| TC-005 | Verify Notification Generated After Inspection Flagged | 1. Log in as manager and flag an inspection. 2. Log in as the driver. 3. Check Notifications. | Flagged inspection | Driver receives notification: Your inspection has been flagged. Notes shown. | | | High |
| TC-006 | Verify Notification Generated for High Severity Damage | 1. Complete an inspection where AI detects high-severity damage. 2. Log in as manager. 3. Check Notifications. | High-severity detection | Manager receives damage alert notification for the high-severity finding. | | | High |
| TC-007 | Verify User Sees Only Own Notifications | 1. Log in as driver1. 2. Open Notifications. | Driver1 credentials | Only driver1's notifications are shown. Other users' notifications are not returned. | | | High |
| TC-008 | Verify Mark All as Read | 1. Log in with multiple unread notifications. 2. Click Mark All as Read. | Multiple unread notifications | All notifications marked as read. Badge count resets to 0. | | | Medium |
| TC-009 | Verify Notification Timestamp Format | 1. Open Notifications. 2. Observe the timestamp on each notification. | — | Timestamps display in a human-readable format (e.g. 2026-03-19 14:32). | | | Low |
| TC-010 | Verify Notification Persists After Page Refresh | 1. Open Notifications. 2. Read a notification. 3. Refresh the page. | — | Read status persists. Notification is not shown as unread again after refresh. | | | High |

---

## MODULE 5 — ERROR HANDLING

### Scenario: Validate HTTP Error Responses

| TC ID | Test Case | Test Steps | Test Data | Expected Result | Actual Result | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify 401 — No Authorization Token | 1. Send GET /api/auth/me with no Authorization header. | No header | HTTP 401. Body: { "error": "No token provided" } | | | High |
| TC-002 | Verify 401 — Expired JWT Token | 1. Use a JWT token older than 8 hours. 2. Send request to a protected endpoint. | Expired JWT | HTTP 401. Body: { "error": "Token expired" } | | | High |
| TC-003 | Verify 401 — Malformed JWT Token | 1. Send Authorization: Bearer invalidtoken123. | Invalid JWT string | HTTP 401. Body: { "error": "Invalid token" } | | | High |
| TC-004 | Verify 403 — Driver Accesses Manager Route | 1. Log in as driver. 2. GET /api/manager/dashboard/stats with driver JWT. | Driver JWT | HTTP 403. Body: { "error": "Insufficient role" } | | | High |
| TC-005 | Verify 404 — Non-Existent Inspection | 1. GET /api/inspections/00000000-0000-0000-0000-000000000000 | Invalid inspection UUID | HTTP 404. Body: { "error": "Inspection not found" } | | | High |
| TC-006 | Verify 404 — Non-Existent Vehicle | 1. GET /api/vehicles/00000000-0000-0000-0000-000000000000 | Invalid vehicle UUID | HTTP 404. Body: { "error": "Vehicle not found" } | | | High |
| TC-007 | Verify 409 — Duplicate Email | 1. Register with email test@example.com. 2. Register again with same email. | Email: test@example.com | HTTP 409. Body: { "error": "Email address already registered" } | | | High |
| TC-008 | Verify 400 — Non-Image File Uploaded as Photo | 1. POST a PDF file to /api/photos/upload/:id. | document.pdf | HTTP 400. Body: { "error": "Invalid file type. Only JPEG and PNG accepted." } File not saved. | | | High |
| TC-009 | Verify 413 — File Upload Exceeds Size Limit | 1. Upload a photo larger than 10 MB. | Image > 10 MB | HTTP 413. Error message returned. File not saved to disk. | | | Medium |
| TC-010 | Verify 503 — AI Service Unreachable | 1. Stop the AI service on port 5001. 2. POST to /api/inspections/:id/analyze. | Stopped AI service | HTTP 503. Body: { "error": "AI service unavailable" }. Application does not crash. | | | High |

---

### Scenario: Validate Input Validation and Security

| TC ID | Test Case | Test Steps | Test Data | Expected Result | Actual Result | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify SQL Injection Prevented in Login Email | 1. Enter ' OR 1=1 -- in the email field. 2. Enter any password. 3. Click Login. | Email: ' OR 1=1 -- | HTTP 401. Login fails. Database uses parameterised queries — no SQL injected. | | | High |
| TC-002 | Verify SQL Injection Prevented in Registration | 1. Enter ' DROP TABLE users; -- as the name field. 2. Complete registration. | Name: ' DROP TABLE users; -- | User registration either fails validation or creates an account with the literal string as the name. No table dropped. | | | High |
| TC-003 | Verify Password Minimum Requirements Enforced | 1. Enter a 4-character password with no uppercase or symbols on register. 2. Click Continue. | Password: pass | Validation error. Registration does not proceed. Must be at least 8 characters. | | | High |
| TC-004 | Verify Invalid Email Format Rejected | 1. Enter amaltestcom (no @ sign) in registration email. 2. Click Continue. | Email: amaltestcom | Validation error: Please enter a valid email address. | | | High |
| TC-005 | Verify Invalid Date Range in Customer Details | 1. Set rental_end earlier than rental_start. 2. Click Continue. | Start: 2026-03-25, End: 2026-03-20 | Validation error. Inspection does not advance past the customer details step. | | | Medium |
| TC-006 | Verify XSS Input Sanitised in Profile Name | 1. Update profile name to script tag with alert. 2. View the profile page. | Name: script alert(1) /script | Script is not executed. Name is displayed as plain text or escaped. | | | High |
| TC-007 | Verify API Rejects Request Without Content-Type | 1. POST to /api/auth/login without Content-Type: application/json header. | No Content-Type header | HTTP 400 or appropriate error. Request is not processed as if JSON body was provided. | | | Medium |

---

## MODULE 6 — LANGUAGE SWITCHING

### Scenario: Validate Multi-Language UI

| TC ID | Test Case | Test Steps | Test Data | Expected Result | Actual Result | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify Switch to Sinhala | 1. Log in. 2. Click the language switcher. 3. Select Sinhala. | — | All navigation labels, dashboard headings, and form labels change to Sinhala. No keys shown as raw text (e.g. inspection.title). | | | High |
| TC-002 | Verify Switch to Tamil | 1. Log in. 2. Click the language switcher. 3. Select Tamil. | — | All navigation labels, dashboard headings, and form labels change to Tamil. No raw keys shown. | | | High |
| TC-003 | Verify Switch Back to English | 1. Switch to Sinhala. 2. Click language switcher. 3. Select English. | — | All labels revert to English immediately. | | | High |
| TC-004 | Verify Language Persists After Logout and Login | 1. Log in. 2. Switch to Tamil. 3. Log out. 4. Log in again. | — | Application loads in Tamil on next login. Language preference saved server-side. | | | High |
| TC-005 | Verify All 526 Translation Keys Present | 1. Switch to Sinhala. 2. Navigate through all pages: dashboard, inspections, vehicles, profile, notifications. | — | No page shows a raw i18n key string. All strings display translated text. | | | High |
| TC-006 | Verify Inspection Type Labels Translated | 1. Switch to Sinhala. 2. Navigate to the inspection workflow step 1. | — | Inspection type dropdown shows Sinhala labels. No fallback keys shown. | | | High |

---

## MODULE 7 — AI SERVICE

### Scenario: Validate AI Detection Endpoint

| TC ID | Test Case | Test Steps | Test Data | Expected Result | Actual Result | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify Valid JPEG Returns Detection Results | 1. POST a valid JPEG to /api/detect on the AI service (port 5001). | JPEG image of a vehicle | HTTP 200. Response contains: damages array, health_score (0-100), analysis_complete: true. | | | High |
| TC-002 | Verify STUB_MODE Returns HTTP 200 When Model Missing | 1. Remove best.pt from AI service. 2. POST a JPEG to /api/detect. | JPEG image, no model weights | HTTP 200. Response contains mock damages and stub_mode: true. | | | High |
| TC-003 | Verify Non-JPEG File Returns 400 | 1. POST a PDF to /api/detect. | document.pdf | HTTP 400. Body: { "error": "Invalid file type" }. Service does not crash. | | | High |
| TC-004 | Verify 8 Images Processed Simultaneously | 1. POST 8 JPEG images to /api/inspections/:id/analyze. | 8 inspection photos | All 8 processed. total_damages count is accurate. Damage results stored per photo in the database. | | | High |
| TC-005 | Verify Damage Severity Levels Returned | 1. POST a photo with visible damage. 2. Check the severity field in the response. | Photo with damage | Severity field is one of: low, medium, high. Confidence score is a decimal between 0 and 1. | | | High |
| TC-006 | Verify Health Score Decreases with High Damage | 1. POST a photo with multiple high-severity detections. 2. Check health_score in the response. | Photo with extensive damage | health_score is lower than 100. Score reflects severity and quantity of detected damage. | | | Medium |

---

## MODULE 8 — GPS TRACKING

### Scenario: Validate GPS Log Recording

| TC ID | Test Case | Test Steps | Test Data | Expected Result | Actual Result | Status | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify GPS Location Update Stored in Database | 1. POST to /api/vehicles/:id/gps with valid coordinates. | lat: 6.9271, lng: 79.8612 | GPS log entry created in gps_logs table with vehicle_id, latitude, longitude, and captured_at. | | | High |
| TC-002 | Verify Vehicle Last Location Updated | 1. POST GPS update. 2. GET /api/vehicles/:id. | Vehicle ID, valid coordinates | Vehicle record shows updated last_latitude, last_longitude, and last_location_update fields. | | | High |
| TC-003 | Verify GPS Records Appear on Map | 1. POST GPS update for a vehicle. 2. Open Map View as manager. | Vehicle with GPS coordinates | Vehicle marker appears at the submitted coordinates on the Google Map. | | | High |
| TC-004 | Verify Invalid Coordinates Rejected | 1. POST GPS update with latitude outside -90 to 90 range. | lat: 999, lng: 79.8612 | HTTP 400 returned. GPS log not created. Error: Invalid coordinates. | | | Medium |
| TC-005 | Verify Driver Cannot Update Other Vehicle GPS | 1. Log in as driver. 2. POST GPS to a vehicle not assigned to the driver. | Driver credentials, Another vehicle ID | HTTP 403 returned. Unauthorized access to other vehicle GPS denied. | | | High |

---

## Summary

| Module | Scenarios | Test Cases |
| --- | --- | --- |
| Authentication | 6 | 37 |
| Vehicles | 5 | 23 |
| Inspections | 4 | 22 |
| Notifications | 1 | 10 |
| Error Handling | 2 | 17 |
| Language Switching | 1 | 6 |
| AI Service | 1 | 6 |
| GPS Tracking | 1 | 5 |
| **Total** | **21** | **126** |

---

*All Actual Result and Status columns are to be completed during test execution.*
*Priority: High = must pass before submission. Medium = should pass. Low = nice to have.*
