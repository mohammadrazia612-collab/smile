import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  LogOut,
  Plus,
  Search,
  Calendar,
  Clock,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Trash2,
  Eye,
  RefreshCw,
  Power,
  Check,
  User,
  Phone,
  Mail,
  X,
  ExternalLink,
  Loader2,
  ArrowUpDown,
} from 'lucide-react';
import {
  AppointmentRecord,
  AppointmentStatus,
  AppointmentInsert,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  createAdminAppointment,
  getPublicBookingStatus,
  setPublicBookingStatus,
  getAdminUser,
  signOutAdmin,
  subscribeToAppointmentsRealtime,
  subscribeToClinicSettingsRealtime,
  onAppointmentSyncEvent,
} from '../../lib/supabase';
import { useRouter } from '../../router/Router';

export const AdminDashboard: React.FC = () => {
  const { navigate } = useRouter();

  // Auth & Admin state
  const [adminEmail, setAdminEmail] = useState<string>('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Appointments state
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Public booking state
  const [isBookingOpen, setIsBookingOpen] = useState(true);
  const [isTogglingBooking, setIsTogglingBooking] = useState(false);

  // Filter & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | AppointmentStatus>('all');
  const [dateFilter, setDateFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Modals state
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentRecord | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<AppointmentRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Manual create form state
  const [newAppointment, setNewAppointment] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '',
    appointment_date: new Date().toISOString().split('T')[0],
    preferred_time: 'Morning (10:00 AM – 01:00 PM)',
    service: 'General Dental Care & Consultation',
    message: '',
    status: 'confirmed' as AppointmentStatus,
  });
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  // 1. Verify Authentication
  useEffect(() => {
    let isMounted = true;
    getAdminUser().then((user) => {
      if (isMounted) {
        if (!user) {
          navigate('/admin/login');
        } else {
          setAdminEmail(user.email || 'Admin Staff');
          setIsCheckingAuth(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  // 2. Fetch Appointments & Settings
  const fetchData = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    setActionError(null);
    try {
      const [bookings, bookingOpen] = await Promise.all([
        getAppointments(),
        getPublicBookingStatus(),
      ]);
      setAppointments(bookings);
      setIsBookingOpen(bookingOpen);
    } catch (err: unknown) {
      console.error('Error loading dashboard data:', err);
      const msg =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: unknown }).message)
          : 'Failed to load appointments from database.';
      setActionError(msg);
    } finally {
      if (!isSilent) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isCheckingAuth) {
      fetchData();
    }
  }, [isCheckingAuth, fetchData]);

  // 3. Realtime Supabase Subscription, Polling, Tab Focus & Cross-Tab Sync
  useEffect(() => {
    if (isCheckingAuth) return;

    // A. Supabase Realtime Subscription for Postgres INSERT/UPDATE/DELETE events
    const unsubscribeRealtime = subscribeToAppointmentsRealtime({
      onInsert: (newRecord) => {
        setAppointments((prev) => {
          if (prev.some((a) => a.id === newRecord.id)) return prev;
          return [newRecord, ...prev];
        });
        setActionSuccess(`New appointment received from ${newRecord.name || 'patient'}!`);
        fetchData(true);
      },
      onUpdate: (updatedRecord) => {
        setAppointments((prev) =>
          prev.map((a) => (a.id === updatedRecord.id ? updatedRecord : a))
        );
        setSelectedAppointment((prev) =>
          prev?.id === updatedRecord.id ? updatedRecord : prev
        );
        fetchData(true);
      },
      onDelete: (deletedId) => {
        setAppointments((prev) => prev.filter((a) => a.id !== deletedId));
        setSelectedAppointment((prev) => (prev?.id === deletedId ? null : prev));
        fetchData(true);
      },
    });

    // B. Supabase Realtime for Clinic Settings (booking toggle)
    const unsubscribeSettings = subscribeToClinicSettingsRealtime((isOpen) => {
      setIsBookingOpen(isOpen);
    });

    // C. Cross-Tab Synchronization (dispatched when appointment is created on website in same browser)
    const unsubscribeSync = onAppointmentSyncEvent(() => {
      fetchData(true);
    });

    // D. Window Focus & Page Visibility Refetch
    const handleFocus = () => {
      fetchData(true);
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchData(true);
      }
    };
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // E. Periodic Polling Interval (every 12 seconds when tab is active)
    const pollInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchData(true);
      }
    }, 12000);

    return () => {
      unsubscribeRealtime();
      unsubscribeSettings();
      unsubscribeSync();
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(pollInterval);
    };
  }, [isCheckingAuth, fetchData]);

  // 3. Clear temporary action notifications
  useEffect(() => {
    if (actionSuccess) {
      const timer = setTimeout(() => setActionSuccess(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [actionSuccess]);

  // 4. Logout Handler
  const handleLogout = async () => {
    try {
      await signOutAdmin();
      navigate('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
      navigate('/admin/login');
    }
  };

  // 5. Toggle Public Booking Availability
  const handleToggleBooking = async () => {
    setIsTogglingBooking(true);
    setActionError(null);
    const targetState = !isBookingOpen;
    try {
      await setPublicBookingStatus(targetState);
      setIsBookingOpen(targetState);
      setActionSuccess(
        `Public booking is now ${targetState ? 'OPEN' : 'CLOSED'}. Changes are enforced at the database level.`
      );
    } catch (err: unknown) {
      console.error('Error toggling booking:', err);
      const msg =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: unknown }).message)
          : 'Unable to update booking status.';
      setActionError(msg);
    } finally {
      setIsTogglingBooking(false);
    }
  };

  // 6. Update Appointment Status
  const handleStatusChange = async (id: string, newStatus: AppointmentStatus) => {
    setActionError(null);
    try {
      await updateAppointmentStatus(id, newStatus);
      setAppointments((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
      if (selectedAppointment && selectedAppointment.id === id) {
        setSelectedAppointment((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      setActionSuccess(`Appointment status updated to "${newStatus.toUpperCase()}".`);
    } catch (err: unknown) {
      console.error('Status change error:', err);
      const msg =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: unknown }).message)
          : 'Failed to update appointment status.';
      setActionError(msg);
    }
  };

  // 7. Delete Appointment
  const handleDeleteAppointment = async () => {
    if (!appointmentToDelete) return;
    setIsDeleting(true);
    setActionError(null);
    try {
      await deleteAppointment(appointmentToDelete.id);
      setAppointments((prev) => prev.filter((a) => a.id !== appointmentToDelete.id));
      if (selectedAppointment?.id === appointmentToDelete.id) {
        setSelectedAppointment(null);
      }
      setActionSuccess('Appointment deleted permanently.');
      setAppointmentToDelete(null);
    } catch (err: unknown) {
      console.error('Delete error:', err);
      const msg =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: unknown }).message)
          : 'Failed to delete appointment.';
      setActionError(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  // 8. Create Appointment Manually
  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppointment.name.trim() || !newAppointment.phone.trim() || !newAppointment.email.trim()) {
      setCreateError('Patient name, phone, and email are required.');
      return;
    }

    setIsCreating(true);
    setCreateError(null);

    try {
      const payload: AppointmentInsert = {
        name: newAppointment.name.trim(),
        phone: newAppointment.phone.trim(),
        email: newAppointment.email.trim().toLowerCase(),
        dob: newAppointment.dob ? newAppointment.dob : undefined,
        appointment_date: newAppointment.appointment_date,
        preferred_time: newAppointment.preferred_time,
        service: newAppointment.service,
        message: newAppointment.message.trim(),
        status: newAppointment.status,
      };

      await createAdminAppointment(payload);
      setActionSuccess(`Appointment created for ${newAppointment.name}.`);
      setIsCreateModalOpen(false);
      setNewAppointment({
        name: '',
        phone: '',
        email: '',
        dob: '',
        appointment_date: new Date().toISOString().split('T')[0],
        preferred_time: 'Morning (10:00 AM – 01:00 PM)',
        service: 'General Dental Care & Consultation',
        message: '',
        status: 'confirmed',
      });
      fetchData();
    } catch (err: unknown) {
      console.error('Create appointment error:', err);
      const msg =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: unknown }).message)
          : 'Failed to create appointment in database.';
      setCreateError(msg);
    } finally {
      setIsCreating(false);
    }
  };

  // 9. Filtered & Sorted Appointments
  const filteredAppointments = useMemo(() => {
    return appointments
      .filter((app) => {
        // Status filter
        if (statusFilter !== 'all' && app.status !== statusFilter) {
          return false;
        }
        // Date filter
        if (dateFilter && app.appointment_date !== dateFilter) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = (app.name || '').toLowerCase().includes(q);
          const matchPhone = (app.phone || '').toLowerCase().includes(q);
          const matchEmail = (app.email || '').toLowerCase().includes(q);
          const matchService = (app.service || '').toLowerCase().includes(q);
          const matchNotes = (app.message || '').toLowerCase().includes(q);
          return matchName || matchPhone || matchEmail || matchService || matchNotes;
        }
        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.created_at).getTime() || 0;
        const timeB = new Date(b.created_at).getTime() || 0;
        return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
      });
  }, [appointments, statusFilter, dateFilter, searchQuery, sortOrder]);

  // 10. Dashboard KPI Counts
  const stats = useMemo(() => {
    const total = appointments.length;
    const pending = appointments.filter((a) => a.status === 'pending').length;
    const confirmed = appointments.filter((a) => a.status === 'confirmed').length;
    const completed = appointments.filter((a) => a.status === 'completed').length;
    const cancelled = appointments.filter((a) => a.status === 'cancelled').length;
    return { total, pending, confirmed, completed, cancelled };
  }, [appointments]);

  if (isCheckingAuth) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f7',
        }}
      >
        <Loader2 size={32} className="spin-loader" color="var(--accent-primary)" />
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .spin-loader {
            animation: spin 0.9s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f7',
        fontFamily: 'var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
        color: '#1d1d1f',
      }}
    >
      {/* Top Navigation Bar */}
      <header
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          {/* Logo & Portal Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src="/logo.png"
              alt="Shiva Smile Dental Care Hospital Logo"
              style={{
                width: '46px',
                height: '46px',
                objectFit: 'contain',
                display: 'block',
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9375rem', letterSpacing: '-0.01em' }}>
                SHIVA SMILE <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>ADMIN</span>
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                Dental Care Hospital Management
              </div>
            </div>
          </div>

          {/* Right Header Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            {/* View Public Website */}
            <button
              onClick={() => navigate('/')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.8125rem',
                cursor: 'pointer',
                padding: '6px 10px',
                borderRadius: '8px',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <span>View Public Website</span>
              <ExternalLink size={13} />
            </button>

            {/* Admin Profile Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderRadius: '9999px',
                fontSize: '0.8125rem',
                color: '#1d1d1f',
              }}
            >
              <User size={14} color="var(--text-muted)" />
              <span style={{ fontWeight: 500 }}>{adminEmail}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '9999px',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                color: '#dc2626',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fef2f2';
                e.currentTarget.style.borderColor = '#fecaca';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
              }}
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1360px', margin: '0 auto', padding: '32px 24px 80px 24px' }}>
        {/* Banner Messages */}
        {actionSuccess && (
          <div
            style={{
              marginBottom: '20px',
              padding: '12px 18px',
              borderRadius: '12px',
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              color: '#065f46',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              animation: 'fadeIn 0.3s ease-out',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} color="#10b981" />
              <span>{actionSuccess}</span>
            </div>
            <button
              onClick={() => setActionSuccess(null)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#065f46' }}
            >
              <X size={16} />
            </button>
          </div>
        )}

        {actionError && (
          <div
            style={{
              marginBottom: '20px',
              padding: '12px 18px',
              borderRadius: '12px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#991b1b',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              animation: 'fadeIn 0.3s ease-out',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={18} color="#dc2626" />
              <span>{actionError}</span>
            </div>
            <button
              onClick={() => setActionError(null)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#991b1b' }}
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Section 1: Dashboard KPI Statistics & Public Booking Control */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr)) 280px',
            gap: '16px',
            marginBottom: '28px',
          }}
          className="kpi-grid"
        >
          {/* Total Appointments */}
          <div className="card-kpi" onClick={() => setStatusFilter('all')}>
            <div className="kpi-label">Total Bookings</div>
            <div className="kpi-value">{stats.total}</div>
            <div className="kpi-sub">All patient submissions</div>
          </div>

          {/* Pending Appointments */}
          <div
            className="card-kpi"
            style={{ borderColor: statusFilter === 'pending' ? '#f59e0b' : 'rgba(0,0,0,0.06)' }}
            onClick={() => setStatusFilter('pending')}
          >
            <div className="kpi-label" style={{ color: '#b45309' }}>
              Pending Review
            </div>
            <div className="kpi-value" style={{ color: '#d97706' }}>
              {stats.pending}
            </div>
            <div className="kpi-sub">Awaiting confirmation</div>
          </div>

          {/* Confirmed Appointments */}
          <div
            className="card-kpi"
            style={{ borderColor: statusFilter === 'confirmed' ? '#10b981' : 'rgba(0,0,0,0.06)' }}
            onClick={() => setStatusFilter('confirmed')}
          >
            <div className="kpi-label" style={{ color: '#047857' }}>
              Confirmed
            </div>
            <div className="kpi-value" style={{ color: '#059669' }}>
              {stats.confirmed}
            </div>
            <div className="kpi-sub">Scheduled on calendar</div>
          </div>

          {/* Completed Appointments */}
          <div
            className="card-kpi"
            style={{ borderColor: statusFilter === 'completed' ? '#0284c7' : 'rgba(0,0,0,0.06)' }}
            onClick={() => setStatusFilter('completed')}
          >
            <div className="kpi-label" style={{ color: '#0369a1' }}>
              Completed
            </div>
            <div className="kpi-value" style={{ color: '#0284c7' }}>
              {stats.completed}
            </div>
            <div className="kpi-sub">Treated patients</div>
          </div>

          {/* Cancelled Appointments */}
          <div
            className="card-kpi"
            style={{ borderColor: statusFilter === 'cancelled' ? '#dc2626' : 'rgba(0,0,0,0.06)' }}
            onClick={() => setStatusFilter('cancelled')}
          >
            <div className="kpi-label" style={{ color: '#991b1b' }}>
              Cancelled
            </div>
            <div className="kpi-value" style={{ color: '#dc2626' }}>
              {stats.cancelled}
            </div>
            <div className="kpi-sub">Declined / cancelled</div>
          </div>

          {/* Public Booking ON/OFF Control Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '18px',
              padding: '20px',
              border: isBookingOpen ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Public Booking
                </span>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '9999px',
                    backgroundColor: isBookingOpen ? '#dcfce7' : '#fee2e2',
                    color: isBookingOpen ? '#15803d' : '#b91c1c',
                  }}
                >
                  {isBookingOpen ? 'OPEN' : 'CLOSED'}
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: '0 0 14px 0' }}>
                {isBookingOpen
                  ? 'Visitors can submit appointments normally.'
                  : 'Public submissions blocked at database level.'}
              </p>
            </div>

            <button
              onClick={handleToggleBooking}
              disabled={isTogglingBooking}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: isBookingOpen ? '#fee2e2' : '#dcfce7',
                color: isBookingOpen ? '#991b1b' : '#15803d',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: isTogglingBooking ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
              }}
            >
              {isTogglingBooking ? (
                <Loader2 size={14} className="spin-loader" />
              ) : (
                <Power size={14} />
              )}
              <span>{isBookingOpen ? 'Switch to CLOSED' : 'Switch to OPEN'}</span>
            </button>
          </div>
        </div>

        {/* Section 2: Toolbar (Search, Filters, Sort, Create) */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            padding: '16px 20px',
            marginBottom: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* Left Controls: Search & Date */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', flex: 1, minWidth: '280px' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', minWidth: '240px', flex: 1 }}>
              <Search
                size={16}
                color="var(--text-muted)"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Search patient, phone, email, treatment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: '10px',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                  boxSizing: 'border-box',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Date Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={16} color="var(--text-muted)" />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  fontSize: '0.8125rem',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                }}
              />
              {dateFilter && (
                <button
                  onClick={() => setDateFilter('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Order */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ArrowUpDown size={15} color="var(--text-muted)" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                style={{
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  fontSize: '0.8125rem',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Right Action: Refresh & Create Appointment Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => fetchData(false)}
              title="Refresh Bookings"
              style={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
              }}
            >
              <RefreshCw size={16} className={isLoading ? 'spin-loader' : ''} />
            </button>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn btn-primary"
              style={{
                padding: '9px 18px',
                fontSize: '0.875rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '10px',
              }}
            >
              <Plus size={16} />
              <span>Create Appointment</span>
            </button>
          </div>
        </div>

        {/* Section 3: Status Filter Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
            overflowX: 'auto',
            paddingBottom: '4px',
          }}
        >
          {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((status) => {
            const count =
              status === 'all'
                ? stats.total
                : status === 'pending'
                ? stats.pending
                : status === 'confirmed'
                ? stats.confirmed
                : status === 'completed'
                ? stats.completed
                : stats.cancelled;

            const isSelected = statusFilter === status;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  border: isSelected ? '1px solid transparent' : '1px solid rgba(0, 0, 0, 0.08)',
                  backgroundColor: isSelected ? 'var(--accent-primary)' : '#ffffff',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{status === 'all' ? 'All Bookings' : status.charAt(0).toUpperCase() + status.slice(1)}</span>
                <span
                  style={{
                    padding: '2px 6px',
                    borderRadius: '9999px',
                    backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.06)',
                    color: isSelected ? '#ffffff' : 'var(--text-muted)',
                    fontSize: '0.6875rem',
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Section 4: Bookings Table Container */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
          }}
        >
          {isLoading && appointments.length === 0 ? (
            <div style={{ padding: '64px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Loader2 size={32} className="spin-loader" style={{ margin: '0 auto 12px auto' }} />
              <div>Loading appointments from Supabase...</div>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div style={{ padding: '56px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 14px auto',
                }}
              >
                <Filter size={20} color="var(--text-muted)" />
              </div>
              <div style={{ fontWeight: 600, color: '#1d1d1f', marginBottom: '6px', fontSize: '1rem' }}>
                {appointments.length === 0
                  ? 'No patient appointments found'
                  : 'No appointments match your filters'}
              </div>
              <div style={{ fontSize: '0.8125rem', maxWidth: '480px', margin: '0 auto 16px auto', lineHeight: 1.5 }}>
                {appointments.length === 0
                  ? 'Appointments submitted by visitors through the website form will appear here automatically.'
                  : 'Try adjusting your search query, status tab, or date filter.'}
              </div>
              <button
                onClick={() => fetchData(false)}
                className="btn btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <RefreshCw size={13} />
                <span>Refresh Bookings</span>
              </button>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                      backgroundColor: '#fafafb',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    <th style={{ padding: '14px 20px' }}>Patient Details</th>
                    <th style={{ padding: '14px 16px' }}>Schedule</th>
                    <th style={{ padding: '14px 16px' }}>Treatment Focus</th>
                    <th style={{ padding: '14px 16px' }}>Status</th>
                    <th style={{ padding: '14px 16px' }}>Requested On</th>
                    <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((app) => {
                    const statusBadge = getStatusBadge(app.status);
                    return (
                      <tr
                        key={app.id}
                        style={{
                          borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
                          transition: 'background-color 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafafa')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        {/* Patient Name & Contacts */}
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px', flexWrap: 'wrap' }}>
                            <span style={{ fontWeight: 600, color: '#1d1d1f' }}>{app.name}</span>
                            {app.dob && (
                              <span
                                style={{
                                  fontSize: '0.6875rem',
                                  padding: '1px 6px',
                                  borderRadius: '6px',
                                  backgroundColor: 'rgba(0, 113, 227, 0.08)',
                                  color: 'var(--accent-primary)',
                                  fontWeight: 600,
                                }}
                              >
                                DOB: {app.dob}
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '12px' }}>
                            <a
                              href={`tel:${app.phone}`}
                              style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 500 }}
                            >
                              {app.phone}
                            </a>
                            <span>•</span>
                            <a
                              href={`mailto:${app.email}`}
                              style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                            >
                              {app.email}
                            </a>
                          </div>
                        </td>

                        {/* Schedule (Date & Time Window) */}
                        <td style={{ padding: '16px 16px' }}>
                          <div style={{ fontWeight: 600, color: '#1d1d1f' }}>
                            {app.appointment_date}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            {app.preferred_time}
                          </div>
                        </td>

                        {/* Service / Focus */}
                        <td style={{ padding: '16px 16px' }}>
                          <div style={{ color: '#1d1d1f', fontWeight: 500 }}>{app.service}</div>
                          {app.message && (
                            <div
                              style={{
                                fontSize: '0.75rem',
                                color: 'var(--text-muted)',
                                maxWidth: '240px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                              title={app.message}
                            >
                              {app.message}
                            </div>
                          )}
                        </td>

                        {/* Status Badge */}
                        <td style={{ padding: '16px 16px' }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '4px 10px',
                              borderRadius: '9999px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              backgroundColor: statusBadge.bg,
                              color: statusBadge.color,
                            }}
                          >
                            {statusBadge.icon}
                            <span>{app.status.toUpperCase()}</span>
                          </span>
                        </td>

                        {/* Created At */}
                        <td style={{ padding: '16px 16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {formatDateTime(app.created_at)}
                        </td>

                        {/* Action Buttons */}
                        <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            {/* View Details */}
                            <button
                              onClick={() => setSelectedAppointment(app)}
                              title="View Full Booking Details"
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: '8px',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'var(--text-secondary)',
                              }}
                            >
                              <Eye size={15} />
                            </button>

                            {/* Quick Confirm */}
                            {app.status !== 'confirmed' && (
                              <button
                                onClick={() => handleStatusChange(app.id, 'confirmed')}
                                title="Mark Confirmed"
                                style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '8px',
                                  border: '1px solid #a7f3d0',
                                  backgroundColor: '#ecfdf5',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                  color: '#059669',
                                }}
                              >
                                <Check size={15} />
                              </button>
                            )}

                            {/* Quick Complete */}
                            {app.status === 'confirmed' && (
                              <button
                                onClick={() => handleStatusChange(app.id, 'completed')}
                                title="Mark Completed"
                                style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '8px',
                                  border: '1px solid #bae6fd',
                                  backgroundColor: '#f0f9ff',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                  color: '#0284c7',
                                }}
                              >
                                <CheckCircle2 size={15} />
                              </button>
                            )}

                            {/* Cancel Booking */}
                            {app.status !== 'cancelled' && (
                              <button
                                onClick={() => handleStatusChange(app.id, 'cancelled')}
                                title="Cancel Booking"
                                style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '8px',
                                  border: '1px solid rgba(0, 0, 0, 0.1)',
                                  backgroundColor: '#ffffff',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                  color: '#dc2626',
                                }}
                              >
                                <XCircle size={15} />
                              </button>
                            )}

                            {/* Delete Booking */}
                            <button
                              onClick={() => setAppointmentToDelete(app)}
                              title="Delete Booking"
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: '8px',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#9ca3af',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#dc2626';
                                e.currentTarget.style.backgroundColor = '#fef2f2';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#9ca3af';
                                e.currentTarget.style.backgroundColor = '#ffffff';
                              }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* ============================================================================== */}
      {/* Modal 1: Booking Details & Status Update Modal */}
      {/* ============================================================================== */}
      {selectedAppointment && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 60,
            padding: '16px',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              maxWidth: '560px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#1d1d1f' }}>
                  Appointment Details
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  ID: {selectedAppointment.id}
                </span>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  padding: '4px',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Details Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {/* Patient Profile */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--bg-subtle, #f5f5f7)',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                  Patient
                </div>
                <div style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '4px' }}>
                  {selectedAppointment.name}
                </div>
                {selectedAppointment.dob && (
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600 }}>Date of Birth:</span> {selectedAppointment.dob}
                    {(() => {
                      const b = new Date(selectedAppointment.dob);
                      if (isNaN(b.getTime())) return '';
                      const t = new Date();
                      let a = t.getFullYear() - b.getFullYear();
                      const m = t.getMonth() - b.getMonth();
                      if (m < 0 || (m === 0 && t.getDate() < b.getDate())) a--;
                      return a >= 0 ? ` (${a} years old)` : '';
                    })()}
                  </div>
                )}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.8125rem' }}>
                  <a
                    href={`tel:${selectedAppointment.phone}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}
                  >
                    <Phone size={14} />
                    <span>{selectedAppointment.phone}</span>
                  </a>
                  <a
                    href={`mailto:${selectedAppointment.email}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', textDecoration: 'none' }}
                  >
                    <Mail size={14} />
                    <span>{selectedAppointment.email}</span>
                  </a>
                </div>
              </div>

              {/* Schedule Info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ padding: '14px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.08)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Appointment Date
                  </div>
                  <div style={{ fontWeight: 600, color: '#1d1d1f' }}>
                    {selectedAppointment.appointment_date}
                  </div>
                </div>
                <div style={{ padding: '14px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.08)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Time Window
                  </div>
                  <div style={{ fontWeight: 600, color: '#1d1d1f' }}>
                    {selectedAppointment.preferred_time}
                  </div>
                </div>
              </div>

              {/* Treatment Focus */}
              <div style={{ padding: '14px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Treatment Focus
                </div>
                <div style={{ fontWeight: 600, color: '#1d1d1f' }}>
                  {selectedAppointment.service}
                </div>
              </div>

              {/* Clinical Notes */}
              <div style={{ padding: '14px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Clinical Goals / Patient Notes
                </div>
                <div style={{ fontSize: '0.875rem', color: '#1d1d1f', lineHeight: 1.5 }}>
                  {selectedAppointment.message || 'No additional notes provided by patient.'}
                </div>
              </div>

              {/* Status Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>
                  Update Booking Status
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {(['pending', 'confirmed', 'completed', 'cancelled'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedAppointment.id, st)}
                      style={{
                        padding: '8px',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        border: selectedAppointment.status === st ? '2px solid var(--accent-primary)' : '1px solid rgba(0,0,0,0.1)',
                        backgroundColor: selectedAppointment.status === st ? 'rgba(0, 113, 227, 0.08)' : '#ffffff',
                        color: selectedAppointment.status === st ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={() => {
                  setAppointmentToDelete(selectedAppointment);
                  setSelectedAppointment(null);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  color: '#dc2626',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Trash2 size={14} />
                <span>Delete Booking</span>
              </button>

              <button
                onClick={() => setSelectedAppointment(null)}
                className="btn btn-secondary"
                style={{ padding: '8px 18px', fontSize: '0.8125rem' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================================== */}
      {/* Modal 2: Admin Create Appointment Modal */}
      {/* ============================================================================== */}
      {isCreateModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 60,
            padding: '16px',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              maxWidth: '560px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#1d1d1f' }}>
                  Create Patient Appointment
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Manual clinic desk entry (saves directly to Supabase)
                </span>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            {createError && (
              <div
                style={{
                  marginBottom: '16px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#991b1b',
                  fontSize: '0.8125rem',
                }}
              >
                {createError}
              </div>
            )}

            <form onSubmit={handleCreateAppointment}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '6px' }}>
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={newAppointment.name}
                    onChange={(e) => setNewAppointment({ ...newAppointment, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(0,0,0,0.12)',
                      fontSize: '0.875rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '6px' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={newAppointment.phone}
                    onChange={(e) => setNewAppointment({ ...newAppointment, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(0,0,0,0.12)',
                      fontSize: '0.875rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="patient@gmail.com"
                    value={newAppointment.email}
                    onChange={(e) => setNewAppointment({ ...newAppointment, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(0,0,0,0.12)',
                      fontSize: '0.875rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '6px' }}>
                    Patient Date of Birth (Optional)
                  </label>
                  <input
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    value={newAppointment.dob}
                    onChange={(e) => setNewAppointment({ ...newAppointment, dob: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(0,0,0,0.12)',
                      fontSize: '0.875rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '6px' }}>
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={newAppointment.appointment_date}
                    onChange={(e) => setNewAppointment({ ...newAppointment, appointment_date: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(0,0,0,0.12)',
                      fontSize: '0.875rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '6px' }}>
                    Preferred Time Window
                  </label>
                  <select
                    value={newAppointment.preferred_time}
                    onChange={(e) => setNewAppointment({ ...newAppointment, preferred_time: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(0,0,0,0.12)',
                      fontSize: '0.875rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="Morning (10:00 AM – 01:00 PM)">Morning (10:00 AM – 01:00 PM)</option>
                    <option value="Afternoon (01:00 PM – 05:00 PM)">Afternoon (01:00 PM – 05:00 PM)</option>
                    <option value="Evening (05:00 PM – 08:00 PM)">Evening (05:00 PM – 08:00 PM)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '6px' }}>
                    Treatment Focus
                  </label>
                  <select
                    value={newAppointment.service}
                    onChange={(e) => setNewAppointment({ ...newAppointment, service: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(0,0,0,0.12)',
                      fontSize: '0.875rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="General Dental Care & Consultation">General Dental Care &amp; Consultation</option>
                    <option value="Cosmetic Dentistry & Smile Care">Cosmetic Dentistry &amp; Smile Care</option>
                    <option value="Dental Implants Consultation">Dental Implants Consultation</option>
                    <option value="Gum & Periodontal Care">Gum &amp; Periodontal Care</option>
                    <option value="Pediatric Dentistry (Children)">Pediatric Dentistry (Children)</option>
                    <option value="Emergency Dental Service">Emergency Dental Service</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '6px' }}>
                    Initial Status
                  </label>
                  <select
                    value={newAppointment.status}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, status: e.target.value as AppointmentStatus })
                    }
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(0,0,0,0.12)',
                      fontSize: '0.875rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '6px' }}>
                  Clinical Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Doctor notes, requested procedure, priority..."
                  value={newAppointment.message}
                  onChange={(e) => setNewAppointment({ ...newAppointment, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid rgba(0,0,0,0.12)',
                    fontSize: '0.875rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ padding: '10px 18px', fontSize: '0.8125rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="btn btn-primary"
                  style={{ padding: '10px 22px', fontSize: '0.8125rem', fontWeight: 600 }}
                >
                  {isCreating ? 'Saving...' : 'Save Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================================== */}
      {/* Modal 3: Delete Confirmation Modal */}
      {/* ============================================================================== */}
      {appointmentToDelete && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 70,
            padding: '16px',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '440px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: '#fee2e2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <Trash2 size={24} color="#dc2626" />
            </div>

            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '0 0 8px 0', color: '#1d1d1f' }}>
              Confirm Deletion
            </h3>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 20px 0' }}>
              Are you sure you want to permanently delete the appointment for{' '}
              <strong style={{ color: '#1d1d1f' }}>{appointmentToDelete.name}</strong> on{' '}
              <strong>{appointmentToDelete.appointment_date}</strong>? This action cannot be undone.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setAppointmentToDelete(null)}
                className="btn btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.8125rem' }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteAppointment}
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: isDeleting ? 'not-allowed' : 'pointer',
                }}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embedded CSS */}
      <style>{`
        .card-kpi {
          background-color: #ffffff;
          border-radius: 18px;
          padding: 20px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 2px 10px rgba(0,0,0,0.02);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .card-kpi:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.05);
        }
        .kpi-label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 6px;
        }
        .kpi-value {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #1d1d1f;
          line-height: 1.1;
          margin-bottom: 4px;
        }
        .kpi-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        @media (max-width: 900px) {
          .kpi-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .kpi-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

// Helper: Status Badges
function getStatusBadge(status: AppointmentStatus) {
  switch (status) {
    case 'confirmed':
      return { bg: '#dcfce7', color: '#15803d', icon: <Check size={12} /> };
    case 'completed':
      return { bg: '#e0f2fe', color: '#0369a1', icon: <CheckCircle2 size={12} /> };
    case 'cancelled':
      return { bg: '#fee2e2', color: '#b91c1c', icon: <XCircle size={12} /> };
    case 'pending':
    default:
      return { bg: '#fef3c7', color: '#b45309', icon: <Clock size={12} /> };
  }
}

// Helper: Format Date Time
function formatDateTime(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return isoString;
  }
}
