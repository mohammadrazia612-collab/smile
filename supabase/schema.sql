-- ==============================================================================
-- Shiva Smile Dental Care Hospital - Complete Database Schema & Security
-- Tables: public.appointments, public.clinic_settings
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
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Performance Indexes for Appointments
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON public.appointments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_email ON public.appointments(email);
CREATE INDEX IF NOT EXISTS idx_appointments_phone ON public.appointments(phone);

-- 3. Create Clinic Settings table for backend-enforced Public Booking ON/OFF control
CREATE TABLE IF NOT EXISTS public.clinic_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Seed initial default settings
INSERT INTO public.clinic_settings (key, value, description)
VALUES 
    ('public_booking_enabled', 'true', 'Controls whether visitors can submit appointments on the public website')
ON CONFLICT (key) DO NOTHING;

-- 5. Enable Row Level Security (RLS) on both tables
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinic_settings ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- RLS Policies for clinic_settings:
-- - Anyone (anon & authenticated) can SELECT so the public website knows if booking is OPEN/CLOSED
-- - Only authenticated admins can UPDATE or INSERT settings
-- ==============================================================================
DROP POLICY IF EXISTS "Allow public read clinic settings" ON public.clinic_settings;
CREATE POLICY "Allow public read clinic settings"
ON public.clinic_settings
FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Allow authenticated update clinic settings" ON public.clinic_settings;
CREATE POLICY "Allow authenticated update clinic settings"
ON public.clinic_settings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ==============================================================================
-- RLS Policies for appointments:
-- - Anonymous visitors can INSERT ONLY when public_booking_enabled = 'true'
--   (Enforced at PostgreSQL level: bypass via DevTools / Postman / Direct API is strictly BLOCKED)
-- - Anonymous visitors CANNOT SELECT, UPDATE, or DELETE any records
-- - Authenticated admins have full CRUD (SELECT, INSERT, UPDATE, DELETE)
-- ==============================================================================
DROP POLICY IF EXISTS "Allow public insert only" ON public.appointments;
DROP POLICY IF EXISTS "Allow public insert when booking is open" ON public.appointments;
CREATE POLICY "Allow public insert when booking is open"
ON public.appointments
FOR INSERT
TO anon
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.clinic_settings
        WHERE key = 'public_booking_enabled' AND value = 'true'
    )
);

DROP POLICY IF EXISTS "Allow authenticated admin full access" ON public.appointments;
CREATE POLICY "Allow authenticated admin full access"
ON public.appointments
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Helpful comments for Supabase studio
COMMENT ON TABLE public.appointments IS 'Patient appointments submitted via public form or created by clinic admins';
COMMENT ON TABLE public.clinic_settings IS 'Clinic-wide runtime configurations including Public Booking availability';
