-- ==============================================================================
-- D Care Multi Speciality Dental Hospital - Create / Confirm Admin User
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/rniyxelqdwfdogsnosgu/sql
-- ==============================================================================

-- 1. If mohammadrazia612@gmail.com already exists in auth.users,
-- confirm their email and update password to: afkhan6300
UPDATE auth.users
SET 
  email_confirmed_at = COALESCE(email_confirmed_at, now()),
  encrypted_password = crypt('afkhan6300', gen_salt('bf')),
  raw_app_meta_data = jsonb_set(COALESCE(raw_app_meta_data, '{}'::jsonb), '{provider}', '"email"'),
  updated_at = now()
WHERE email = 'mohammadrazia612@gmail.com';

-- 2. If the user does not exist yet, insert them directly as fully confirmed
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at
)
SELECT 
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'mohammadrazia612@gmail.com',
  crypt('afkhan6300', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{}'::jsonb,
  false,
  now(),
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'mohammadrazia612@gmail.com'
);

-- 3. Link user identity for Supabase Auth
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
)
SELECT 
  u.id,
  u.id,
  format('{"sub":"%s","email":"%s"}', u.id::text, u.email)::jsonb,
  'email',
  u.id::text,
  now(),
  now(),
  now()
FROM auth.users u
WHERE u.email = 'mohammadrazia612@gmail.com'
AND NOT EXISTS (
  SELECT 1 FROM auth.identities i WHERE i.user_id = u.id
);

-- Verify the result
SELECT id, email, email_confirmed_at, created_at 
FROM auth.users 
WHERE email = 'mohammadrazia612@gmail.com';
