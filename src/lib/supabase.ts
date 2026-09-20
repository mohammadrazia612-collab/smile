import { createClient, User, Session } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://rniyxelqdwfdogsnosgu.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_mr7yB0TJUzWYoGyQXzrB7A_3NxKLmo4';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Check your .env configuration.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface AppointmentRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  appointment_date: string;
  preferred_time: string;
  service: string;
  message?: string;
  status: AppointmentStatus;
  created_at: string;
}

export type AppointmentInsert = Omit<AppointmentRecord, 'id' | 'created_at'> & {
  created_at?: string;
};

export interface ClinicSetting {
  key: string;
  value: string;
  description?: string;
  updated_at?: string;
}

// ==============================================================================
// Appointments Data Access
// ==============================================================================

/**
 * Inserts a new appointment record into Supabase.
 * Respects Row Level Security (public INSERT only when public_booking_enabled is true).
 */
export async function createAppointment(payload: AppointmentInsert) {
  const { data, error } = await supabase.from('appointments').insert([
    {
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      appointment_date: payload.appointment_date,
      preferred_time: payload.preferred_time,
      service: payload.service,
      message: payload.message || '',
      status: payload.status || 'pending',
      created_at: payload.created_at || new Date().toISOString(),
    },
  ]);

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Fetch all appointments for authorized admin.
 * Requires authenticated session under RLS.
 */
export async function getAppointments(): Promise<AppointmentRecord[]> {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return (data as AppointmentRecord[]) || [];
}

/**
 * Update the status of an appointment.
 * Allowed for authenticated admins under RLS.
 */
export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<void> {
  const { error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', id);

  if (error) {
    throw error;
  }
}

/**
 * Delete an appointment by ID.
 * Allowed for authenticated admins under RLS.
 */
export async function deleteAppointment(id: string): Promise<void> {
  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}

/**
 * Manually create an appointment from the admin dashboard.
 */
export async function createAdminAppointment(payload: AppointmentInsert) {
  const { data, error } = await supabase.from('appointments').insert([
    {
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      appointment_date: payload.appointment_date,
      preferred_time: payload.preferred_time,
      service: payload.service,
      message: payload.message || '',
      status: payload.status || 'confirmed',
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    throw error;
  }

  return data;
}

// ==============================================================================
// Clinic Settings (Public Booking ON/OFF)
// ==============================================================================

/**
 * Get current public booking status.
 * Accessible to public and admin. Returns boolean (default true if setting not yet initialized).
 */
export async function getPublicBookingStatus(): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('clinic_settings')
      .select('value')
      .eq('key', 'public_booking_enabled')
      .maybeSingle();

    if (error) {
      // If table doesn't exist yet, default to open
      return true;
    }

    if (!data) return true;
    return data.value === 'true';
  } catch {
    return true;
  }
}

/**
 * Set public booking status (OPEN / CLOSED).
 * Requires authenticated admin. Enforced by PostgreSQL RLS.
 */
export async function setPublicBookingStatus(isOpen: boolean): Promise<void> {
  const val = isOpen ? 'true' : 'false';
  const { error } = await supabase
    .from('clinic_settings')
    .upsert({
      key: 'public_booking_enabled',
      value: val,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    throw error;
  }
}

// ==============================================================================
// Supabase Authentication
// ==============================================================================

export async function signInAdmin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOutAdmin() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
}

export async function getAdminSession(): Promise<Session | null> {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getAdminUser(): Promise<User | null> {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  const { data: authListener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      callback(session?.user || null);
    }
  );

  return () => {
    authListener.subscription.unsubscribe();
  };
}
