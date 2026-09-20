import { createClient } from '@supabase/supabase-js';

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
    persistSession: false,
    autoRefreshToken: false,
  },
});

export interface AppointmentRecord {
  id?: string;
  name: string;
  phone: string;
  email: string;
  appointment_date: string;
  preferred_time: string;
  service: string;
  message?: string;
  status?: string;
  created_at?: string;
}

export type AppointmentInsert = Omit<AppointmentRecord, 'id'>;

/**
 * Inserts a new appointment record into Supabase.
 * Respects Row Level Security (public INSERT only).
 */
export async function createAppointment(payload: AppointmentInsert) {
  const { data, error } = await supabase
    .from('appointments')
    .insert([
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
