-- ==============================================================================
-- D Care Multi Speciality Dental Hospital - 1-Click Fix for Supabase RLS & DOB
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
CREATE TABLE IF NOT EXISTS public.clinic_settings (\n    key TEXT PRIMARY KEY,\n    value TEXT NOT NULL,\n    description TEXT,\n    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())\n);\n\nINSERT INTO public.clinic_settings (key, value, description)\nVALUES ('public_booking_enabled', 'true', 'Controls whether visitors can submit appointments on the public website')\nON CONFLICT (key) DO NOTHING;\n\nALTER TABLE public.clinic_settings ENABLE ROW LEVEL SECURITY;\n\nDROP POLICY IF EXISTS \"Allow public read clinic settings\" ON public.clinic_settings;\nCREATE POLICY \"Allow public read clinic settings\"\nON public.clinic_settings\nFOR SELECT\nTO anon, authenticated\nUSING (true);\n\nDROP POLICY IF EXISTS \"Allow authenticated update clinic settings\" ON public.clinic_settings;\nCREATE POLICY \"Allow authenticated update clinic settings\"\nON public.clinic_settings\nFOR ALL\nTO authenticated\nUSING (true)\nWITH CHECK (true);\n\n-- 6. Enable Realtime Replication & Publication for Instant Admin Sync\nALTER TABLE public.appointments REPLICA IDENTITY FULL;\nALTER TABLE public.clinic_settings REPLICA IDENTITY FULL;\n\nDO $$\nBEGIN\n  IF NOT EXISTS (\n    SELECT 1 FROM pg_publication_tables \n    WHERE pubname = 'supabase_realtime' \n    AND schemaname = 'public' \n    AND tablename = 'appointments'\n  ) THEN\n    ALTER PUBLICATION supabase_realtime ADD TABLE public.appointments;\n  END IF;\n\n  IF NOT EXISTS (\n    SELECT 1 FROM pg_publication_tables \n    WHERE pubname = 'supabase_realtime' \n    AND schemaname = 'public' \n    AND tablename = 'clinic_settings'\n  ) THEN\n    ALTER PUBLICATION supabase_realtime ADD TABLE public.clinic_settings;\n  END IF;\nEND $$;\n