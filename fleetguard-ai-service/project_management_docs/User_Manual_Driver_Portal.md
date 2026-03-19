# User Manual — Driver Portal
## FleetGuard AI — AI-Powered Vehicle Inspection System

**Version:** 1.0
**Date:** March 2026
**Prepared by:** Bethmi Jayamila — Start-up Manager

> **How to use this manual:** Replace every `[IMAGE: ...]` placeholder with an actual screenshot of the application. Each placeholder describes exactly what the screenshot should show.

---

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Registration](#2-registration)
3. [Login](#3-login)
4. [Forgot Password](#4-forgot-password)
5. [Driver Dashboard](#5-driver-dashboard)
6. [Starting a New Inspection](#6-starting-a-new-inspection)
   - [Step 1 — Select Vehicle](#step-1--select-vehicle)
   - [Step 2 — Customer Details](#step-2--customer-details)
   - [Step 3 — Photo Capture](#step-3--photo-capture)
   - [Step 4 — Photo Review](#step-4--photo-review)
   - [Step 5 — AI Analysis](#step-5--ai-analysis)
   - [Step 6 — Damage Review](#step-6--damage-review)
   - [Step 7 — Digital Signatures](#step-7--digital-signatures)
   - [Step 8 — Inspection Report and PDF](#step-8--inspection-report-and-pdf)
7. [Inspection History](#7-inspection-history)
8. [Notifications](#8-notifications)
9. [Driver Profile](#9-driver-profile)
10. [Language Switching](#10-language-switching)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Getting Started

### 1.1 System Requirements

| Item | Requirement |
| --- | --- |
| Device | Smartphone, tablet, or desktop computer |
| Browser | Google Chrome 110+, Safari 16+, Firefox 110+ |
| Internet | Required for AI analysis and photo upload |
| Camera | Required for capturing inspection photos |
| Application URL | Provided by your fleet manager |

### 1.2 Supported Languages

FleetGuard AI supports three languages. You can switch at any time from the language switcher in the navigation bar.

| Language | Code |
| --- | --- |
| English | EN |
| Sinhala | SI |
| Tamil | TA |

---

## 2. Registration

### 2.1 Creating a New Account

If you do not yet have an account, follow these steps to register.

**Step 1:** Open the application URL in your browser. You will see the landing page.

```
[IMAGE: Landing page showing FleetGuard AI logo, tagline, Login button and Register button]
```

---

**Step 2:** Click the **Register** button. The registration form will open.

```
[IMAGE: Registration page with fields — Full Name, Email Address, Password, Confirm Password, Role selector (Driver / Manager), and a Continue button. Also shows Sign in with Google option at the bottom.]
```

---

**Step 3:** Fill in all required fields.

| Field | What to Enter |
| --- | --- |
| Full Name | Your legal full name (e.g. Amal Fernando) |
| Email Address | A valid email address you have access to |
| Password | At least 8 characters including one uppercase letter, one number, and one symbol |
| Confirm Password | Re-enter the same password |
| Role | Select **Driver** |

---

**Step 4:** Click **Continue**.

```
[IMAGE: Registration form with all fields filled in. Role is set to Driver. Continue button is highlighted.]
```

---

**Step 5:** On success, you will be automatically logged in and redirected to the **Driver Dashboard**.

```
[IMAGE: Driver Dashboard immediately after first login. Shows welcome message and empty inspection history.]
```

### 2.2 Registration Errors

| Error Message | Cause | Fix |
| --- | --- | --- |
| Please enter a valid email address | Email format is incorrect | Check the email for a missing @ or domain |
| Password must be at least 8 characters | Password is too short | Enter a longer password |
| Email address already registered | Account already exists for this email | Click Login instead or use Forgot Password |

### 2.3 Register with Google

You can register using your Google account instead of creating a password.

**Step 1:** On the registration page, click **Sign in with Google**.

```
[IMAGE: Registration page with Sign in with Google button visible at the bottom of the form.]
```

**Step 2:** A Google account picker popup appears. Select your Google account.

```
[IMAGE: Google account picker popup overlaying the registration page.]
```

**Step 3:** Grant the requested permissions. You will be redirected to the Driver Dashboard.

---

## 3. Login

### 3.1 Logging In with Email and Password

**Step 1:** Open the application URL and click **Login**.

```
[IMAGE: Login page with Email and Password fields, Login button, Forgot Password link, and Sign in with Google button.]
```

**Step 2:** Enter your registered email address and password.

**Step 3:** Click **Login**. You will be redirected to the Driver Dashboard.

```
[IMAGE: Driver Dashboard after successful login showing the driver's name in the top navigation bar.]
```

### 3.2 Login Errors

| Error Message | Cause | Fix |
| --- | --- | --- |
| Invalid credentials | Wrong email or password | Check your email and password. Use Forgot Password if needed. |
| Please enter your email and password | Fields left empty | Fill in both fields before clicking Login |

### 3.3 Login with Google

**Step 1:** On the Login page, click **Sign in with Google**.

**Step 2:** Select your Google account and grant permissions.

**Step 3:** You will be logged in and redirected to the Driver Dashboard.

---

## 4. Forgot Password

### 4.1 Resetting Your Password

**Step 1:** On the Login page, click the **Forgot Password** link below the password field.

```
[IMAGE: Login page with the Forgot Password link circled or highlighted below the Password field.]
```

**Step 2:** The Forgot Password page opens. Enter your registered email address.

```
[IMAGE: Forgot Password page with a single Email field and a Send Reset Link button.]
```

**Step 3:** Click **Send Reset Link**. A success message is displayed.

```
[IMAGE: Forgot Password page showing success message: Password reset email sent. Check your inbox.]
```

**Step 4:** Open your email inbox. You will receive an email from FleetGuard AI with a **Reset Password** link. Click the link.

```
[IMAGE: Example password reset email showing the Reset Password button/link.]
```

**Step 5:** The Reset Password page opens. Enter and confirm your new password.

```
[IMAGE: Reset Password page with New Password and Confirm New Password fields and a Reset Password button.]
```

**Step 6:** Click **Reset Password**. Your password is updated. You can now log in with the new password.

> **Note:** The reset link expires after **1 hour**. If it has expired, go back to Forgot Password and request a new link.

---

## 5. Driver Dashboard

The Driver Dashboard is your home screen after logging in. It gives you a quick overview of your recent inspections and quick access to start a new one.

```
[IMAGE: Full Driver Dashboard view showing: top navigation bar with FleetGuard AI logo, driver name, notification bell, language switcher; a New Inspection button; a summary of recent inspections in a card list; and a sidebar navigation with links to Dashboard, New Inspection, History, Notifications, Profile.]
```

### 5.1 Navigation Sidebar

| Menu Item | Description |
| --- | --- |
| Dashboard | Returns to the home screen |
| New Inspection | Starts the 8-step inspection workflow |
| Inspection History | Lists all your past inspections |
| Notifications | Shows your alerts and review outcomes |
| Profile | View and edit your personal details |

```
[IMAGE: Driver sidebar navigation expanded, showing all five menu items with icons.]
```

### 5.2 Recent Inspections Panel

The dashboard shows your most recent inspections. Each card displays:

- Vehicle number plate
- Customer name
- Inspection date
- Status badge (In Progress / Completed / Reviewed / Flagged)

```
[IMAGE: Dashboard recent inspections panel showing 3-4 inspection cards with vehicle plates, customer names, dates, and coloured status badges.]
```

### 5.3 Notification Bell

The bell icon in the top navigation bar shows a badge with the count of unread notifications. Click it to open the Notifications page.

```
[IMAGE: Top navigation bar close-up showing the notification bell with a red badge showing the number 3.]
```

---

## 6. Starting a New Inspection

Click **New Inspection** from the dashboard or sidebar to begin the 8-step inspection workflow. A progress bar at the top of each step shows how far through the workflow you are.

```
[IMAGE: Step progress bar at the top of the inspection workflow showing 8 steps with the current step highlighted. Steps are: Select Vehicle, Customer Details, Photo Capture, Photo Review, AI Analysis, Damage Review, Signatures, Report.]
```

---

### Step 1 — Select Vehicle

**What to do:** Select the vehicle you are inspecting from the dropdown list.

```
[IMAGE: Step 1 page showing the vehicle selector dropdown listing all available vehicles with their number plates and models. A selected vehicle shows its photo, make, model, year, and current health score.]
```

- Only vehicles with status **Available** are shown. Vehicles in maintenance or in use are not selectable.
- The vehicle's current health score (0–100) is shown after selection.

**Step:** Select the vehicle from the list and click **Continue**.

> **Note:** If the vehicle you need is not in the list, contact your manager. The vehicle may be set to maintenance or in use.

---

### Step 2 — Customer Details

**What to do:** Enter the customer's information for this rental inspection.

```
[IMAGE: Step 2 form showing fields: Customer Full Name, National ID (NIC), Phone Number, Rental Start Date, Rental End Date, and a Continue button at the bottom.]
```

| Field | Description | Example |
| --- | --- | --- |
| Customer Full Name | Full legal name of the customer | Kumara Perera |
| National ID (NIC) | Customer's NIC number | 199012345678 |
| Phone Number | Customer's contact number | +94771234567 |
| Rental Start Date | Date the vehicle rental begins | 2026-03-20 |
| Rental End Date | Date the vehicle rental ends | 2026-03-25 |

**Step:** Fill in all fields and click **Continue**.

> **Validation:** Rental End Date must be after Rental Start Date. All fields are required.

---

### Step 3 — Photo Capture

**What to do:** Capture photos of the vehicle from all 8 required angles.

```
[IMAGE: Step 3 photo capture page showing a grid of 8 photo slots. Each slot has a label (Front, Rear, Left Side, Right Side, Interior, Dashboard, Damage Close-Up, Odometer) and a camera icon. Captured photos replace the camera icon with a thumbnail.]
```

The 8 required photo angles are:

| # | Angle | What to Capture |
| --- | --- | --- |
| 1 | Front | Full front view of the vehicle |
| 2 | Rear | Full rear view including number plate |
| 3 | Left Side | Full left side of the vehicle |
| 4 | Right Side | Full right side of the vehicle |
| 5 | Interior | Full interior view from driver seat |
| 6 | Dashboard | Odometer, fuel gauge, warning lights |
| 7 | Damage Close-Up | Any visible damage detail (even if none) |
| 8 | Odometer | Close-up of the odometer reading |

**How to capture a photo:**

1. Click on a photo slot. Your device camera opens.

```
[IMAGE: Camera view open on the device with capture button visible.]
```

2. Frame the vehicle correctly and click the capture button.
3. The photo thumbnail appears in the slot.

```
[IMAGE: Photo slot showing a captured thumbnail of the vehicle front view. A small Retake button appears on the thumbnail.]
```

4. If the photo is not clear, click **Retake** to capture again.
5. Repeat for all 8 angles.

**Step:** Once all 8 photo slots are filled, click **Continue**.

> **Tip:** Ensure good lighting before capturing. Move to a well-lit area if the vehicle is in a dark space. The AI detection quality depends on photo clarity.

---

### Step 4 — Photo Review

**What to do:** Review all 8 captured photos before sending them for AI analysis.

```
[IMAGE: Step 4 photo review page showing all 8 captured photo thumbnails in a grid. Each thumbnail has the angle label below it. A Retake button is visible on each photo. Continue button at bottom.]
```

- Check each photo for clarity and correct angle.
- Click **Retake** on any photo that is blurry, incorrectly angled, or shows the wrong area.
- When satisfied with all photos, click **Continue** to proceed to AI analysis.

---

### Step 5 — AI Analysis

**What to do:** Wait for the AI to analyse all 8 photos for damage.

```
[IMAGE: Step 5 AI analysis loading screen showing a progress animation or spinner with the message: Analysing vehicle condition. This may take a few seconds. Please wait.]
```

- The system automatically sends all 8 photos to the FleetGuard AI detection service.
- Analysis typically takes 5–15 seconds depending on image size and internet speed.
- **Do not close the browser** during analysis. You will lose progress.

```
[IMAGE: AI analysis completion screen transitioning to the Damage Review step. A brief confirmation like Analysis Complete! is shown before advancing.]
```

> **Note:** If the AI service is temporarily unavailable, the system uses a backup mode and returns estimated results. The PDF report will note this. You can still complete the inspection normally.

---

### Step 6 — Damage Review

**What to do:** Review the damage detected by the AI for each photo.

```
[IMAGE: Step 6 damage review page showing a list of damage detection cards. Each card shows: the photo thumbnail, the angle name, detected damage type (e.g. Scratch, Dent, Crack), severity badge (Low / Medium / High in coloured chips), and confidence percentage. A vehicle health score is shown at the top (e.g. 82/100).]
```

Each damage card shows:

| Field | Description |
| --- | --- |
| Photo | Thumbnail of the photo where damage was found |
| Angle | Which of the 8 angles the damage was detected in |
| Damage Type | Type of damage: Scratch, Dent, Crack, Broken, Rust |
| Severity | Low (green), Medium (yellow), High (red) |
| Confidence | How confident the AI is in the detection (e.g. 94%) |
| Health Score | Overall vehicle condition score calculated from all detections |

```
[IMAGE: Close-up of a single damage card showing a dent detection on the left side photo with severity: High and confidence: 91%. A red High badge is clearly visible.]
```

- This step is **read-only**. The AI results are recorded automatically.
- Review the results with the customer if needed.
- Click **Continue** to proceed to Digital Signatures.

---

### Step 7 — Digital Signatures

**What to do:** Capture digital signatures from both the driver and the customer.

```
[IMAGE: Step 7 digital signatures page showing two signature pad boxes side by side (or stacked on mobile). Left box is labelled Driver Signature. Right box is labelled Customer Signature. Each box has a Clear button below it. Continue button at the bottom.]
```

**Driver Signature:**

1. Ask the customer to hold the device if signing on a touchscreen.
2. Use your finger or a stylus to draw your signature in the **Driver Signature** box.

```
[IMAGE: Driver Signature box with a handwritten signature drawn inside it. Clear button is visible below.]
```

3. If the signature is incorrect, click **Clear** and draw again.

**Customer Signature:**

1. Hand the device to the customer.
2. The customer draws their signature in the **Customer Signature** box.

```
[IMAGE: Customer Signature box with a handwritten signature drawn inside it.]
```

3. If the customer is not satisfied with their signature, click **Clear** and ask them to sign again.

**Step:** Once both signatures are captured, click **Continue**.

> **Important:** Both signatures are legally significant. Ensure both parties sign clearly. The signatures are saved as image files and embedded in the PDF report.

---

### Step 8 — Inspection Report and PDF

**What to do:** Review the final inspection summary and download the PDF report.

```
[IMAGE: Step 8 final report page showing a formatted inspection summary with: vehicle details panel, customer details panel, inspection date and time, a list of detected damage items with severity, and a Download PDF button prominently displayed. Both signature previews are visible at the bottom of the summary.]
```

The final report includes:

| Section | Content |
| --- | --- |
| Vehicle Details | Number plate, make, model, year, health score |
| Customer Details | Full name, NIC, phone, rental period |
| Inspection Summary | Date, time, total damages detected |
| Damage Details | Each detected damage with type, severity, confidence |
| Driver Signature | Digital signature image |
| Customer Signature | Digital signature image |

**Downloading the PDF:**

1. Click the **Download PDF** button.

```
[IMAGE: Download PDF button on the report page — a prominent blue button.]
```

2. The PDF generates and downloads automatically to your device.

```
[IMAGE: PDF report preview showing the FleetGuard AI header, vehicle and customer information, damage summary table, and both signature images at the bottom.]
```

3. The PDF file is named with the inspection ID and date (e.g. `inspection_report_2026-03-20.pdf`).

> **Note:** The inspection is now **Complete**. It will appear in your Inspection History and is available for your manager to review.

---

## 7. Inspection History

The Inspection History page lists all inspections you have conducted, from most recent to oldest.

```
[IMAGE: Inspection History page showing a list of inspection cards in reverse chronological order. Each card shows: vehicle number plate, customer name, inspection date, and a status badge (Completed, In Progress, Reviewed, Flagged).]
```

### 7.1 Status Badges

| Badge | Colour | Meaning |
| --- | --- | --- |
| In Progress | Blue | Inspection workflow not yet completed |
| Completed | Green | Inspection completed; awaiting manager review |
| Reviewed | Teal | Manager has approved the inspection |
| Flagged | Red | Manager has flagged the inspection for follow-up |

### 7.2 Viewing Inspection Details

Click on any inspection card to open its full detail view.

```
[IMAGE: Inspection detail view page showing all information: vehicle and customer panels, inspection date, all 8 photo thumbnails, damage detection results, both signature images, and the manager review status (Approved / Flagged / Pending).]
```

The detail view shows:

- Vehicle and customer information
- All 8 inspection photos
- AI damage detection results
- Both digital signatures
- Manager review status and notes (if reviewed)

### 7.3 Re-downloading the PDF

On the inspection detail page, click **Download PDF** to re-download the report at any time.

---

## 8. Notifications

The Notifications page shows all alerts and updates relevant to your account.

```
[IMAGE: Notifications page showing a list of notification items. Each item shows a notification icon, message text, and timestamp. Unread notifications have a highlighted or bolder background. A Mark All as Read button is at the top.]
```

### 8.1 Notification Types

| Type | When You Receive It |
| --- | --- |
| Inspection Approved | Your manager approved one of your inspections |
| Inspection Flagged | Your manager flagged an inspection for follow-up |
| Damage Alert | High-severity damage was detected in your inspection |

### 8.2 Marking Notifications as Read

- Click on any notification to mark it as read.
- The badge count on the notification bell decrements.
- Click **Mark All as Read** to clear all unread notifications at once.

```
[IMAGE: Notification bell in the top navigation bar before and after clicking Mark All as Read. Before: red badge with 4. After: no badge.]
```

---

## 9. Driver Profile

The Profile page displays your account information and allows you to update your details.

```
[IMAGE: Driver Profile page showing profile photo (or avatar placeholder), full name, email address, phone number, role badge (Driver), and an Edit Profile button.]
```

### 9.1 Viewing Your Profile

Navigate to **Profile** from the sidebar. Your name, email, phone, and role are displayed.

### 9.2 Editing Your Profile

**Step 1:** Click **Edit Profile**.

```
[IMAGE: Edit Profile form with fields: Full Name, Phone Number, and a Save Changes button. Email is shown as read-only.]
```

**Step 2:** Update your name or phone number.

**Step 3:** Click **Save Changes**. A confirmation message is shown.

```
[IMAGE: Profile page after saving with a success toast notification: Profile updated successfully.]
```

> **Note:** Your email address cannot be changed after registration. Contact your manager if you need to update your email.

### 9.3 Changing Your Language Preference

1. Open the profile page or use the language switcher in the top navigation bar.
2. Select your preferred language: English, Sinhala, or Tamil.
3. The entire application switches to the selected language immediately.
4. Your preference is saved to your account and will be applied on your next login.

---

## 10. Language Switching

FleetGuard AI supports English, Sinhala, and Tamil throughout the application.

```
[IMAGE: Top navigation bar showing the language switcher dropdown with three options: English (EN), Sinhala (SI), Tamil (TA). Currently selected language is highlighted.]
```

**How to switch language:**

1. Click the language switcher in the top navigation bar (shows the current language code: EN, SI, or TA).
2. Select your preferred language from the dropdown.
3. All page labels, buttons, and messages change immediately.

```
[IMAGE: Driver Dashboard shown in Sinhala language. All navigation labels, button text, and headings are in Sinhala characters.]
```

```
[IMAGE: Driver Dashboard shown in Tamil language. All navigation labels, button text, and headings are in Tamil characters.]
```

> **Preference is saved:** Your language choice is stored on the server. It will be remembered the next time you log in, even on a different device.

---

## 11. Troubleshooting

### Common Issues and Fixes

| Problem | Likely Cause | Fix |
| --- | --- | --- |
| Camera does not open on photo capture | Browser does not have camera permission | In browser settings, allow camera access for the application URL |
| AI analysis takes a very long time | Slow internet connection or large photo sizes | Ensure a stable internet connection. Photos are compressed automatically. |
| AI analysis returns stub results | AI service model is in maintenance mode | The inspection can still be completed. Notify your manager. |
| PDF download does not start | Browser blocking pop-ups or downloads | Allow downloads from the application URL in browser settings |
| Login page says Invalid credentials | Wrong email or password | Use Forgot Password to reset, or contact your manager |
| Application shows a key name instead of text (e.g. inspection.title) | Translation is loading | Refresh the page. If it persists, contact your manager. |
| I cannot see a vehicle I need to inspect | Vehicle is set to maintenance or in use | Contact your manager to update the vehicle status |
| My inspection is flagged | Manager found an issue | Open the inspection in History, read the manager's notes, and follow up as instructed |

### Contacting Support

If you encounter an issue not listed above, contact your fleet manager with:

- Your full name and email address
- The inspection ID (shown in Inspection History)
- A description of the problem and the error message shown

---

*FleetGuard AI Driver Portal User Manual — Version 1.0 — March 2026*
*Prepared by Bethmi Jayamila — Start-up Manager*
