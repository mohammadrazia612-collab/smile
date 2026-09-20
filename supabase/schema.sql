-- ==============================================================================
-- Shiva Smile Dental Care Hospital - Supabase Database Schema
-- Table: public.appointments
-- Project Ref: rniyxelqdwfdogsnosgu
-- ==============================================================================

-- 1. Create the appointments table if it does not already exist
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    appointment_date DATE NOT NULL,
    preferred_time TEXT NOT NULL,
    service TEXT NOT NULL,
    message TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Add helpful indexes for performance
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON public.appointments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(appointment_date);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- 4. Create Policy: Allow public / anonymous INSERT only
-- Anyone visiting the site can submit an appointment request.
DROP POLICY IF EXISTS "Allow public insert only" ON public.appointments;
CREATE POLICY "Allow public insert only"
ON public.appointments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 5. By default, PostgreSQL Row Level Security denies any operation without an explicit policy.
-- Because no SELECT, UPDATE, or DELETE policies are granted to 'anon' or public roles,
-- public users CANNOT view, modify, or delete appointment records.
-- Only authenticated clinic staff / service role can view or manage rows in the Supabase Dashboard.

COMMENT ON TABLE public.appointments IS 'Patient appointment requests submitted from Shiva Smile Dental Care Hospital website';
COMMENT ON COLUMN public.appointments.name IS 'Patient full name';
COMMENT ON COLUMN public.appointments.phone IS 'Contact phone number';
COMMENT ON COLUMN public.appointments.email IS 'Patient email address';
COMMENT ON COLUMN public.appointments.appointment_date IS 'Requested appointment date';
COMMENT ON COLUMN public.appointments.preferred_time IS 'Preferred time window (morning, afternoon, evening)';
COMMENT ON COLUMN public.appointments.service IS 'Selected dental treatment or consultation focus';
COMMENT ON COLUMN public.appointments.message IS 'Optional patient clinical notes or symptoms';
COMMENT ON COLUMN public.appointments.status IS 'Current processing status: pending, confirmed, completed, cancelled';
COMMENT ON COLUMN public.appointments.created_at IS 'Timestamp when the appointment was requested';
