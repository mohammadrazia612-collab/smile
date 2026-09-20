-- ==============================================================================
-- Shiva Smile Dental Care Hospital - 1-Click Fix for Supabase RLS & DOB
-- Project: rniyxelqdwfdogsnosgu (https://supabase.com/dashboard/project/rniyxelqdwfdogsnosgu/sql)
-- ==============================================================================

-- 1. Ensure 'dob' column exists in appointments table
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS dob DATE;

-- 2. Ensure Row Level Security is enabled
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Public / Anonymous visitors can INSERT new appointments (booking open)
-- Public users CANNOT SELECT, UPDATE, or DELETE (prevents leaking patient records)
DROP POLICY IF EXISTS "Allow public insert only" ON public.appointments;
DROP POLICY IF EXISTS "Allow public insert when booking is open" ON public.appointments;

CREATE POLICY "Allow public insert only"
ON public.appointments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Policy: Authenticated Admin staff have full access (SELECT, INSERT, UPDATE, DELETE)
DROP POLICY IF EXISTS "Allow authenticated admin full access" ON public.appointments;

CREATE POLICY "Allow authenticated admin full access"
ON public.appointments
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. Ensure clinic_settings table exists for public booking toggle
CREATE TABLE IF NOT EXISTS public.clinic_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

INSERT INTO public.clinic_settings (key, value, description)
VALUES ('public_booking_enabled', 'true', 'Controls whether visitors can submit appointments on the public website')
ON CONFLICT (key) DO NOTHING;

ALTER TABLE public.clinic_settings ENABLE ROW LEVEL SECURITY;

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
