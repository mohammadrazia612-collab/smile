# D Care Multi Speciality Dental Hospital 🏥✨

A modern, Apple-inspired website and secure patient management portal for **D Care Multi Speciality Dental Hospital**, located in Siddipet, Telangana.

---

## 🌟 Features

### Public Website
- **Cinematic Apple Aesthetics**: Clean typography, subtle micro-interactions, dark/light contrast, and glassmorphism.
- **Interactive Before/After Slider**: Clinical smile transformation showcase with dual-layer comparison.
- **Interactive Anatomy & Physics**: Interactive clusters with inertia drag and touch physics.
- **Verified Clinical Services**: General Dental Treatment, Braces / Orthodontic Treatment, Retainers, and Broken Tooth Treatment.
- **Online Appointment Booking**:
  - Direct integration with Supabase.
  - Client-side validation, loading states, and duplicate submission prevention.
  - Instant confirmation summary and next steps.
  - Controlled by a database-level Public Booking switch.

### Secure Admin Panel
- **Discreet Access**: Small, subtle "Admin Login" link located exclusively in the website footer.
- **Supabase Authentication**: Secure login for authorized clinic staff (`/admin/login`) with session management.
- **Real-Time KPI Metrics**: Overview of Total, Pending Review, Confirmed, Completed, and Cancelled appointments.
- **Search & Filtering**: Search by patient name, phone, email, or treatment; filter by date and status; sort by newest/oldest.
- **Booking Management**:
  - View complete patient clinical notes and submission details.
  - Single-click status updates (`Confirmed`, `Completed`, `Cancelled`).
  - Delete bookings with confirmation dialog.
- **Desk Booking Entry**: Manually create appointments for walk-in or call-in patients directly into the Supabase database.
- **Public Booking ON/OFF Switch**:
  - When **OPEN**: Visitors can submit appointments normally.
  - When **CLOSED**: The public website shows *"Online appointments are currently unavailable. Please contact the clinic directly."* with hospital contact numbers and working hours.
  - **Database-Enforced Security**: Enforced via PostgreSQL Row Level Security (RLS) policies so submissions cannot be bypassed via browser DevTools or direct API requests.

---

## 🛡️ Database & Security Architecture

### PostgreSQL Tables

#### `public.appointments`
- `id` (UUID, Primary Key)
- `name` (TEXT)
- `phone` (TEXT)
- `email` (TEXT)
- `appointment_date` (DATE)
- `preferred_time` (TEXT)
- `service` (TEXT)
- `message` (TEXT)
- `status` (`pending`, `confirmed`, `completed`, `cancelled`)
- `created_at` (TIMESTAMPTZ)

#### `public.clinic_settings`
- `key` (TEXT, Primary Key) — e.g. `'public_booking_enabled'`
- `value` (TEXT) — `'true'` or `'false'`
- `description` (TEXT)
- `updated_at` (TIMESTAMPTZ)

### Row Level Security (RLS)
- **Public / Anonymous Visitors**:
  - `INSERT` on `appointments` allowed **ONLY IF** `clinic_settings.public_booking_enabled = 'true'`.
  - `SELECT`, `UPDATE`, and `DELETE` on `appointments` are **strictly forbidden** (0 rows visible to public).
  - `SELECT` on `clinic_settings` is allowed to check if booking is open or closed.
- **Authenticated Clinic Admins**:
  - Full CRUD (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) on all appointments and clinic settings.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/mohammadrazia612-collab/smile.git
cd smile

# Install dependencies
npm install
```

### Environment Variables
Create a `.env` file in the root directory:
```ini
VITE_SUPABASE_URL=https://rniyxelqdwfdogsnosgu.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_mr7yB0TJUzWYoGyQXzrB7A_3NxKLmo4
```

### Database Setup
Run the SQL migration script located in [`supabase/schema.sql`](supabase/schema.sql) in your [Supabase SQL Editor](https://supabase.com/dashboard/project/rniyxelqdwfdogsnosgu/sql).

### Run Locally
```bash
# Start the local development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

---

## 📍 Clinic Contact Information

- **Hospital Name**: D Care Multi Speciality Dental Hospital
- **Location**: Siddipet – Medak Road, Beside Kotak Mahindra Bank, Near Prathiba Degree College, Siddipet, Telangana – 502103, India
- **Phone**: +91 93918 84433
- **Google Rating**: 4.9 / 5 (91 reviews)
- **Hours**:
  - Monday: 10:00 AM – 9:00 PM
  - Tuesday: 9:00 AM – 9:00 PM
  - Wednesday – Saturday: 10:00 AM – 9:00 PM
  - Sunday: 9:00 AM – 5:00 PM
