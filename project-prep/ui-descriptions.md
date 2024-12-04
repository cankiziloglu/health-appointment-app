# Healthcare Appointment System UI Descriptions

## App Overview
This is a healthcare appointment booking system designed for use in Turkey. The system allows patients to easily book medical appointments without registration, while giving healthcare providers (both private practitioners and healthcare facilities) tools to manage their appointments. The system supports both Turkish and English languages throughout.

## Page Descriptions

### 1. Homepage (/)
**Purpose:** Primary entry point for patients to search for medical appointments.

**UI Description:**
- Clean, minimal hero section with a clear value proposition
- Prominent search box in the center containing:
  - City selection dropdown (pre-populated with major Turkish cities)
  - Medical unit/specialty dropdown
  - Large, obvious "Search" button
- Language toggle (TR/EN) in the top-right corner
- "Provider Login" link in the top-right corner
- Below the search:
  - Three feature highlights with icons:
    - No registration required
    - Instant booking
    - Wide provider network
- Footer with minimal necessary links
- Mobile: Single column layout with full-width search components

### 2. Search Results Page (/search)
**Purpose:** Display available appointments matching the user's search criteria.

**UI Description:**
- Compact search form at top:
  - City and specialty dropdowns in a single row
  - Maintains user's previous search criteria
- Filter section below search:
  - Provider dropdown (listing all providers in selected city)
  - Date range picker
  - Sort options (Earliest Available)
- Results displayed as cards in a grid (mobile: single column, desktop: 3 columns):
  - Each card shows:
    - Doctor photo (prominent)
    - Doctor name (primary text)
    - Provider name (if applicable, as subtitle)
    - Medical unit/specialty
    - Earliest available appointment time
    - Clickable card links to doctor details page
- Loading states for each card
- Infinite scroll pagination
- "No results" state with suggestions

### 3. Provider Page (/provider/[id])
**Purpose:** Display information about a healthcare facility.

**UI Description:**
- Provider header:
  - Provider logo
  - Name
  - Specialty/medical units offered
  - District
- About section with provider description
- Doctor gallery:
  - Grid of doctor cards
  - Each card shows:
    - Doctor photo
    - Name
    - Specialty
    - "View Details" link to doctor page
- Mobile: Single column layout

### 4. Doctor Page (/doctor/[id])
**Purpose:** Display doctor information and handle appointment booking.

**UI Description:**
- Doctor information section:
  - Large doctor photo
  - Name and title
  - Provider affiliation (if any)
  - Specialty
  - Professional details
- Available time slots section:
  - Date picker
  - Time slots displayed in grid
  - Clear indication of available/unavailable slots
  - Selected slot highlighting
- Booking form (appears in modal when slot selected):
  - Patient name
  - Phone number
  - Email
  - Simple submit button
- Success notification (modal):
  - Confirmation message
  - Appointment details
  - "Add to Calendar" button
  - Dismissible

### 5. Authentication Page (/auth)
**Purpose:** Combined login and registration page for providers.

**UI Description:**
- Toggle between login and registration views
- Login form:
  - Email
  - Password
  - "Forgot Password" link
- Registration form:
  - Provider type selection (Hospital/Clinic or Private Practitioner)
  - Email
  - Confirm email
  - Password
  - Terms acceptance checkbox
- Form validation with error messages
- Loading states for submit actions
- Mobile-optimized layout

### 6. Dashboard (/dashboard/[id])
**Purpose:** Management interface for providers and doctors.

**Doctor Dashboard UI:**
- Simple tab navigation:
  1. Profile tab:
     - Photo upload
     - Personal information form
     - Professional details form
     - All editing done inline
  2. Appointments tab:
     - Table view of appointments
     - Sorting and filtering options
     - Past/Upcoming toggle
  3. Calendar tab:
     - Monthly calendar view
     - Simple time slot blocking interface
     - Clear visual feedback for booked vs blocked slots

**Provider Dashboard UI:**
- Simple tab navigation:
  1. Profile tab:
     - Logo upload
     - Provider information form
     - All editing done inline
  2. Doctors tab:
     - Grid view of doctor cards
     - Add new doctor button
     - Click doctor card to view their dashboard
     - Simple doctor status indicators

### 7. Admin Dashboard (/dashboard/admin)
**Purpose:** Provider verification and management.

**UI Description:**
- Two main sections:
  1. Verification Queue:
     - List of new providers awaiting verification
     - Each item shows:
       - Provider name
       - Type
       - Registration date
       - Approve/Reject actions
  2. Provider List:
     - Table of all verified providers
     - Basic provider information
     - Click to view details (read-only)
- Simple search and filter options
- Clear action feedback
- Mobile-responsive tables

## Global UI Elements
- Language toggle (TR/EN) consistently placed
- Loading states for all data fetching
- Error states with recovery options
- Responsive design breakpoints
- Consistent color scheme
- Clear typography hierarchy
- Toast notifications for actions
- Confirmation dialogs for important actions