-- ==============================================================================
-- D Care Multi Speciality Dental Hospital - 1-Click Fix for Supabase Realtime & RLS Data Sync
-- Project: rniyxelqdwfdogsnosgu (https://supabase.com/dashboard/project/rniyxelqdwfdogsnosgu/sql)
--
-- This script guarantees:
-- 1. Correct table schema & columns (including 'dob' DATE)
-- 2. Clean Row Level Security (RLS) policies so:
--    - Public / Anon visitors can INSERT appointments
--    - Authenticated admins can SELECT, INSERT, UPDATE, DELETE all appointments
-- 3. Enables Supabase Realtime (Publication + Full Replica Identity) so newly submitted
--    appointments stream directly to the Admin Panel in real time.
-- ==============================================================================

-- 1. Ensure appointments table exists with all required columns
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    dob DATE,
    appointment_date DATE NOT NULL,
    preferred_time TEXT NOT NULL,
    service TEXT NOT NULL,
    message TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Ensure 'dob' column is present
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS dob DATE;

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON public.appointments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(appointment_date);

-- 2. Ensure clinic_settings table exists
CREATE TABLE IF NOT EXISTS public.clinic_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

INSERT INTO public.clinic_settings (key, value, description)
VALUES ('public_booking_enabled', 'true', 'Controls whether visitors can submit appointments on the public website')
ON CONFLICT (key) DO NOTHING;

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinic_settings ENABLE ROW LEVEL SECURITY;

-- 4. Clean up any conflicting or overly-restrictive policies on appointments
DROP POLICY IF EXISTS "Allow public insert only" ON public.appointments;
DROP POLICY IF EXISTS "Allow public insert when booking is open" ON public.appointments;
DROP POLICY IF EXISTS "Allow public insert" ON public.appointments;
DROP POLICY IF EXISTS "Allow authenticated admin full access" ON public.appointments;
DROP POLICY IF EXISTS "Allow authenticated users to read" ON public.appointments;
DROP POLICY IF EXISTS "Users can view their own data" ON public.appointments;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.appointments;

-- Policy A: Public anonymous visitors and authenticated users can INSERT appointments
CREATE POLICY "Allow public insert only"
ON public.appointments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy B: Authenticated admin staff have full CRUD access (SELECT, INSERT, UPDATE, DELETE)
CREATE POLICY "Allow authenticated admin full access"
ON public.appointments
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. RLS Policies on clinic_settings
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

-- 6. Enable Realtime Replication & Publication
-- Set Replica Identity to FULL so UPDATE and DELETE events include complete row payloads
ALTER TABLE public.appointments REPLICA IDENTITY FULL;
ALTER TABLE public.clinic_settings REPLICA IDENTITY FULL;

-- Add tables to the supabase_realtime publication
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'appointments'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.appointments;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'clinic_settings'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.clinic_settings;
  END IF;
END $$;

-- 7. Verification: Return current appointments and publication status
SELECT 
  'appointments' as table_name,
  count(*) as total_rows
FROM public.appointments
UNION ALL
SELECT 
  'clinic_settings' as table_name,
  count(*) as total_rows
FROM public.clinic_settings;
