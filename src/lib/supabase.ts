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
  dob?: string;
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
// Cross-Tab & Realtime Synchronization Helpers
// ==============================================================================

export type AppointmentChangeEvent = 'INSERT' | 'UPDATE' | 'DELETE';

export interface AppointmentSyncMessage {
  type: AppointmentChangeEvent;
  record?: AppointmentRecord | { id: string };
  timestamp: number;
}

let syncBroadcastChannel: BroadcastChannel | null = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    syncBroadcastChannel = new BroadcastChannel('shiva_smile_appointments_sync');
  }
} catch (e) {
  console.warn('BroadcastChannel initialization note:', e);
}

/**
 * Broadcasts an appointment database change across all open tabs/windows of this browser.
 */
export function broadcastAppointmentChange(
  type: AppointmentChangeEvent,
  record?: AppointmentRecord | { id: string }
) {
  const message: AppointmentSyncMessage = {
    type,
    record,
    timestamp: Date.now(),
  };

  try {
    if (syncBroadcastChannel) {
      syncBroadcastChannel.postMessage(message);
    }
  } catch (err) {
    console.warn('Sync broadcast warning:', err);
  }

  // Fallback to localStorage event for older browsers or cross-context sync
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('shiva_smile_last_sync_event', JSON.stringify(message));
    }
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Listens for appointment changes dispatched from other tabs/windows of this browser.
 */
export function onAppointmentSyncEvent(callback: (msg: AppointmentSyncMessage) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleBroadcast = (event: MessageEvent<AppointmentSyncMessage>) => {
    if (event && event.data && event.data.type) {
      callback(event.data);
    }
  };

  const handleStorage = (e: StorageEvent) => {
    if (e.key === 'shiva_smile_last_sync_event' && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue) as AppointmentSyncMessage;
        callback(parsed);
      } catch {
        callback({ type: 'UPDATE', timestamp: Date.now() });
      }
    }
  };

  if (syncBroadcastChannel) {
    syncBroadcastChannel.addEventListener('message', handleBroadcast);
  }
  window.addEventListener('storage', handleStorage);

  return () => {
    if (syncBroadcastChannel) {
      syncBroadcastChannel.removeEventListener('message', handleBroadcast);
    }
    window.removeEventListener('storage', handleStorage);
  };
}

/**
 * Subscribes to Supabase PostgreSQL Realtime changes on the public.appointments table.
 * Listens directly for INSERT, UPDATE, and DELETE events from PostgreSQL replication.
 */
export function subscribeToAppointmentsRealtime(handlers: {
  onInsert?: (row: AppointmentRecord) => void;
  onUpdate?: (row: AppointmentRecord) => void;
  onDelete?: (deletedId: string) => void;
  onChange?: () => void;
}): () => void {
  const channel = supabase
    .channel('realtime:appointments')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'appointments',
      },
      (payload) => {
        try {
          if (payload.eventType === 'INSERT') {
            const newRecord = payload.new as AppointmentRecord;
            handlers.onInsert?.(newRecord);
          } else if (payload.eventType === 'UPDATE') {
            const updatedRecord = payload.new as AppointmentRecord;
            handlers.onUpdate?.(updatedRecord);
          } else if (payload.eventType === 'DELETE') {
            const oldRecord = payload.old as { id?: string };
            if (oldRecord?.id) {
              handlers.onDelete?.(oldRecord.id);
            }
          }
          handlers.onChange?.();
        } catch (err) {
          console.error('Error handling realtime appointment change:', err);
        }
      }
    )
    .subscribe((_status, err) => {
      if (err) {
        console.warn('Supabase Realtime appointments subscription notice:', err);
      }
    });

  return () => {
    supabase.removeChannel(channel);
  };
}

/**
 * Subscribes to Supabase Realtime changes on public.clinic_settings.
 */
export function subscribeToClinicSettingsRealtime(onChange: (isOpen: boolean) => void): () => void {
  const channel = supabase
    .channel('realtime:clinic_settings')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'clinic_settings',
      },
      (payload) => {
        try {
          const rec = payload.new as ClinicSetting;
          if (rec && rec.key === 'public_booking_enabled') {
            onChange(rec.value === 'true');
          }
        } catch (err) {
          console.error('Error handling realtime clinic_settings change:', err);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

// ==============================================================================
// Appointments Data Access
// ==============================================================================

/**
 * Inserts a new appointment record into Supabase.
 * Respects Row Level Security (public INSERT).
 * Gracefully preserves DOB even if column migration is still pending in database.
 * Broadcasts sync events across tabs immediately.
 */
export async function createAppointment(payload: AppointmentInsert) {
  const basePayload: Record<string, unknown> = {
    name: payload.name,
    phone: payload.phone,
    email: payload.email,
    appointment_date: payload.appointment_date,
    preferred_time: payload.preferred_time,
    service: payload.service,
    message: payload.message || '',
    status: payload.status || 'pending',
    created_at: payload.created_at || new Date().toISOString(),
  };

  if (payload.dob) {
    basePayload.dob = payload.dob;
  }

  // Attempt insert and request returned row for instant sync
  let { data, error } = await supabase.from('appointments').insert([basePayload]).select();

  // If the database does not have the 'dob' column yet (PGRST204),
  // fallback cleanly by embedding DOB into the clinical message notes
  if (error && error.code === 'PGRST204' && String(error.message).includes('dob')) {
    console.warn(
      "Supabase notice: 'dob' column not yet migrated in appointments table. Saving DOB in notes."
    );
    delete basePayload.dob;
    const dobNote = `[DOB: ${payload.dob}]`;
    const existingMsg = (basePayload.message as string) || '';
    basePayload.message = existingMsg ? `${dobNote} ${existingMsg}` : dobNote;

    const retry = await supabase.from('appointments').insert([basePayload]).select();
    error = retry.error;
    data = retry.data;
  }

  if (error) {
    console.error('Supabase createAppointment error:', error);
    throw error;
  }

  const createdRow = data && data[0] ? (data[0] as AppointmentRecord) : (basePayload as unknown as AppointmentRecord);
  broadcastAppointmentChange('INSERT', createdRow);

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
    console.error('Supabase getAppointments error:', error);
    throw error;
  }

  const records = (data as AppointmentRecord[]) || [];

  // Diagnostic helper if 0 rows returned
  if (records.length === 0) {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData?.session) {
      console.warn(
        '[Supabase RLS Notice] getAppointments returned 0 records because there is no active authenticated session. Supabase RLS restricts SELECT to authenticated staff.'
      );
    }
  }

  return records;
}

/**
 * Update the status of an appointment.
 * Allowed for authenticated admins under RLS.
 */
export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<void> {
  const { data, error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Supabase updateAppointmentStatus error:', error);
    throw error;
  }

  const updatedRow = data && data[0] ? (data[0] as AppointmentRecord) : { id, status } as unknown as AppointmentRecord;
  broadcastAppointmentChange('UPDATE', updatedRow);
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
    console.error('Supabase deleteAppointment error:', error);
    throw error;
  }

  broadcastAppointmentChange('DELETE', { id });
}

/**
 * Manually create an appointment from the admin dashboard.
 */
export async function createAdminAppointment(payload: AppointmentInsert) {
  const basePayload: Record<string, unknown> = {
    name: payload.name,
    phone: payload.phone,
    email: payload.email,
    appointment_date: payload.appointment_date,
    preferred_time: payload.preferred_time,
    service: payload.service,
    message: payload.message || '',
    status: payload.status || 'confirmed',
    created_at: new Date().toISOString(),
  };

  if (payload.dob) {
    basePayload.dob = payload.dob;
  }

  let { data, error } = await supabase.from('appointments').insert([basePayload]).select();

  if (error && error.code === 'PGRST204' && String(error.message).includes('dob')) {
    console.warn(
      "Supabase notice: 'dob' column not yet migrated in appointments table. Saving DOB in notes."
    );
    delete basePayload.dob;
    const dobNote = `[DOB: ${payload.dob}]`;
    const existingMsg = (basePayload.message as string) || '';
    basePayload.message = existingMsg ? `${dobNote} ${existingMsg}` : dobNote;

    const retry = await supabase.from('appointments').insert([basePayload]).select();
    error = retry.error;
    data = retry.data;
  }

  if (error) {
    console.error('Supabase createAdminAppointment error:', error);
    throw error;
  }

  const createdRow = data && data[0] ? (data[0] as AppointmentRecord) : (basePayload as unknown as AppointmentRecord);
  broadcastAppointmentChange('INSERT', createdRow);

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
