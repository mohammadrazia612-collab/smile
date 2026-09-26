import React, { useState, useEffect, forwardRef } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, Send, Loader2, Phone, CalendarX, MessageSquare } from 'lucide-react';
import { createAppointment, getPublicBookingStatus } from '../lib/supabase';

interface AppointmentSectionProps {
  initialTreatment?: string;
}

export const AppointmentSection = forwardRef<HTMLElement, AppointmentSectionProps>(
  ({ initialTreatment = '' }, ref) => {
    const [formData, setFormData] = useState({
      fullName: '',
      phone: '',
      email: '',
      dob: '',
      date: '',
      time: 'Morning (09:00 AM – 01:00 PM)',
      treatment: initialTreatment || 'General Dental Treatment',
      message: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submittedDetails, setSubmittedDetails] = useState<typeof formData | null>(null);
    const [isBookingOpen, setIsBookingOpen] = useState<boolean>(true);

    // Dynamic today string in YYYY-MM-DD format
    const todayStr = new Date().toISOString().split('T')[0];

    // Check public booking status on mount
    useEffect(() => {
      let isMounted = true;
      getPublicBookingStatus().then((status) => {
        if (isMounted) {
          setIsBookingOpen(status);
        }
      });
      return () => {
        isMounted = false;
      };
    }, []);

    // Synchronize selected treatment if user triggers it from other sections
    useEffect(() => {
      if (initialTreatment) {
        setFormData((prev) => ({ ...prev, treatment: initialTreatment }));
      }
    }, [initialTreatment]);

    const validateForm = () => {
      const newErrors: Record<string, string> = {};
      const trimmedName = formData.fullName.trim();
      if (!trimmedName || trimmedName.length < 2) {
        newErrors.fullName = 'Please provide your full name (minimum 2 characters)';
      }

      const phoneRegex = /^[+]?[\d\s-]{8,20}$/;
      if (!formData.phone.trim() || !phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = 'Please provide a valid contact number (min 8 digits)';
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please provide a valid email address';
      }

      // 1. Patient Date of Birth validation:
      // Accepts historical dates (01/01/2000, 15/06/1995, 10/12/1985, etc.)
      // Maximum allowed date is dynamically today (NOT hard-coded 2026)
      if (!formData.dob) {
        newErrors.dob = 'Please select patient date of birth';
      } else {
        if (formData.dob > todayStr) {
          newErrors.dob = 'Date of birth cannot be in the future';
        } else if (formData.dob < '1900-01-01') {
          newErrors.dob = 'Please enter a valid date of birth (after 1900)';
        }
      }

      // 2. Preferred Appointment Date validation:
      // Must only allow today or future dates
      if (!formData.date) {
        newErrors.date = 'Please select a preferred appointment date';
      } else {
        if (formData.date < todayStr) {
          newErrors.date = 'Appointment date cannot be in the past';
        }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      // Prevent duplicate submissions
      if (isSubmitting) return;

      if (!validateForm()) return;

      setIsSubmitting(true);
      setSubmitError(null);

      try {
        await createAppointment({
          name: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim().toLowerCase(),
          dob: formData.dob,
          appointment_date: formData.date,
          preferred_time: formData.time,
          service: formData.treatment,
          message: formData.message.trim(),
          status: 'pending',
          created_at: new Date().toISOString(),
        });

        setSubmittedDetails({ ...formData });
        setIsSubmitted(true);
      } catch (err: unknown) {
        console.error('Appointment submission error:', err);
        const errorMsg =
          err && typeof err === 'object' && 'message' in err
            ? String((err as { message: unknown }).message)
            : 'Unable to save appointment request. Please check your connection.';
        setSubmitError(errorMsg);
      } finally {
        setIsSubmitting(false);
      }
    };

    const resetForm = () => {
      setIsSubmitted(false);
      setSubmitError(null);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        dob: '',
        date: '',
        time: 'Morning (09:00 AM – 01:00 PM)',
        treatment: initialTreatment || 'General Dental Treatment',
        message: '',
      });
      setErrors({});
      setSubmittedDetails(null);
    };

    return (
      <section
        id="appointment"
        ref={ref}
        className="section-padding"
        style={{
          backgroundColor: '#ffffff',
          position: 'relative',
          borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        }}
      >
        <div className="container">
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px auto' }}>
            <span className="eyebrow">Personalized Consultations</span>
            <h2
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
                letterSpacing: '-0.035em',
                fontWeight: 800,
                lineHeight: 1.08,
                color: '#1d1d1f',
                marginBottom: '18px',
              }}
            >
              YOUR SMILE
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #1d1d1f 40%, #0071e3 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                STARTS HERE.
              </span>
            </h2>
            <p className="section-subtitle">
              Take the first step toward healthy teeth and a confident smile. Request your appointment at D Care Multi Speciality Dental Hospital below.
            </p>
          </div>

          {/* Form Container */}
          <div
            style={{
              maxWidth: '820px',
              margin: '0 auto',
              backgroundColor: 'var(--bg-page)',
              borderRadius: '28px',
              border: '1px solid rgba(0, 0, 0, 0.07)',
              padding: 'clamp(32px, 5vw, 56px)',
              boxShadow: 'var(--shadow-float)',
            }}
          >
            {!isBookingOpen ? (
              /* Public Booking Closed State */
              <div
                style={{
                  textAlign: 'center',
                  padding: '36px 16px',
                  animation: 'fadeIn 0.4s ease-out',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px auto',
                  }}
                >
                  <CalendarX size={32} color="#dc2626" />
                </div>

                <div
                  style={{
                    display: 'inline-block',
                    padding: '4px 14px',
                    borderRadius: '9999px',
                    backgroundColor: '#fee2e2',
                    color: '#991b1b',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    marginBottom: '16px',
                    letterSpacing: '0.02em',
                  }}
                >
                  Online Booking Temporarily Closed
                </div>

                <h3
                  style={{
                    fontSize: '1.625rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#1d1d1f',
                    marginBottom: '14px',
                  }}
                >
                  Online appointments are currently unavailable. Please contact the clinic directly.
                </h3>

                <p
                  style={{
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '560px',
                    margin: '0 auto 32px auto',
                    lineHeight: 1.6,
                  }}
                >
                  Our online appointment scheduling desk is temporarily paused. For consultations, inquiries, or dental emergencies, please reach our hospital team directly via telephone or WhatsApp.
                </p>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '16px',
                    flexWrap: 'wrap',
                    marginBottom: '32px',
                  }}
                >
                  <a
                    href="tel:+919391884433"
                    className="btn btn-primary"
                    style={{
                      padding: '14px 28px',
                      fontSize: '0.9375rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <Phone size={16} />
                    <span>Call +91 93918 84433</span>
                  </a>

                  <a
                    href="https://wa.me/919391884433"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                    style={{
                      padding: '14px 24px',
                      fontSize: '0.9375rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <MessageSquare size={16} color="#25D366" />
                    <span>WhatsApp Clinic</span>
                  </a>
                </div>

                <div
                  style={{
                    maxWidth: '460px',
                    margin: '0 auto',
                    padding: '16px 20px',
                    borderRadius: '14px',
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary)',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ fontWeight: 600, color: '#1d1d1f', marginBottom: '4px' }}>
                    Walk-in & Direct Desk Hours:
                  </div>
                  <div>Monday: 10:00 AM – 9:00 PM | Tuesday: 9:00 AM – 9:00 PM</div>
                  <div>Wednesday – Saturday: 10:00 AM – 9:00 PM | Sunday: 9:00 AM – 5:00 PM</div>
                  <div style={{ marginTop: '6px', color: 'var(--text-muted)' }}>
                    Location: Siddipet – Medak Road, Beside Kotak Mahindra Bank, Siddipet, Telangana 502103
                  </div>
                </div>
              </div>
            ) : isSubmitted ? (
              /* Submission Success State */
              <div
                style={{
                  textAlign: 'center',
                  padding: '32px 16px',
                  animation: 'fadeIn 0.4s ease-out',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 113, 227, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px auto',
                  }}
                >
                  <CheckCircle2 size={36} color="var(--accent-primary)" />
                </div>

                <h3
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#1d1d1f',
                    marginBottom: '12px',
                  }}
                >
                  Appointment Request Received
                </h3>

                <p
                  style={{
                    fontSize: '1.0625rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '520px',
                    margin: '0 auto 28px auto',
                    lineHeight: 1.6,
                  }}
                >
                  Thank you, <strong>{(submittedDetails || formData).fullName}</strong>. Our clinic team has received your appointment request for <strong>{(submittedDetails || formData).treatment}</strong>.
                </p>

                <div
                  style={{
                    maxWidth: '480px',
                    margin: '0 auto 32px auto',
                    padding: '20px 22px',
                    borderRadius: '16px',
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.07)',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    textAlign: 'left',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '10px',
                      paddingBottom: '8px',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    <span style={{ fontWeight: 700, color: '#1d1d1f', fontSize: '0.9375rem' }}>
                      Request Summary
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        backgroundColor: '#eff6ff',
                        color: '#1d4ed8',
                        fontWeight: 600,
                      }}
                    >
                      Status: Pending Desk Confirmation
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr',
                      gap: '6px 14px',
                      fontSize: '0.8125rem',
                      color: '#4b5563',
                      marginBottom: '14px',
                    }}
                  >
                    <span style={{ fontWeight: 500 }}>Patient DOB:</span>
                    <span style={{ fontWeight: 600, color: '#1d1d1f' }}>
                      {(submittedDetails || formData).dob}
                      {(() => {
                        const d = (submittedDetails || formData).dob;
                        if (!d) return '';
                        const b = new Date(d);
                        if (isNaN(b.getTime())) return '';
                        const t = new Date();
                        let a = t.getFullYear() - b.getFullYear();
                        const m = t.getMonth() - b.getMonth();
                        if (m < 0 || (m === 0 && t.getDate() < b.getDate())) a--;
                        return a >= 0 ? ` (${a} yrs)` : '';
                      })()}
                    </span>
                    <span style={{ fontWeight: 500 }}>Requested Date:</span>
                    <span style={{ fontWeight: 600, color: '#1d1d1f' }}>
                      {(submittedDetails || formData).date}
                    </span>
                    <span style={{ fontWeight: 500 }}>Preferred Window:</span>
                    <span style={{ fontWeight: 600, color: '#1d1d1f' }}>
                      {(submittedDetails || formData).time}
                    </span>
                    <span style={{ fontWeight: 500 }}>Contact Phone:</span>
                    <span style={{ fontWeight: 600, color: '#1d1d1f' }}>
                      {(submittedDetails || formData).phone}
                    </span>
                  </div>

                  <div style={{ fontWeight: 600, color: '#1d1d1f', marginBottom: '6px' }}>
                    What happens next:
                  </div>
                  <ul style={{ paddingLeft: '18px', lineHeight: 1.6, margin: 0, fontSize: '0.8125rem' }}>
                    <li>Our front desk will call you at <strong>{(submittedDetails || formData).phone}</strong> to confirm the exact chair time.</li>
                    <li>Hospital Location: Siddipet – Medak Road, Beside Kotak Mahindra Bank, Near Prathiba Degree College, Siddipet, Telangana 502103.</li>
                    <li>Clinic Phone: +91 93918 84433 (Mon–Sat: 9/10am–9pm, Sun: 9am–5pm).</li>
                  </ul>
                </div>

                <button
                  onClick={resetForm}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.875rem' }}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              /* Active Form */
              <form onSubmit={handleSubmit} noValidate>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    marginBottom: '20px',
                  }}
                  className="form-grid"
                >
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      style={{
                        display: 'block',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: '#1d1d1f',
                        marginBottom: '8px',
                      }}
                    >
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      disabled={isSubmitting}
                      placeholder="e.g. Eleanor Vance"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: errors.fullName ? '1px solid #ff3b30' : '1px solid rgba(0, 0, 0, 0.1)',
                        backgroundColor: isSubmitting ? '#f8f9fa' : '#ffffff',
                        fontSize: '0.9375rem',
                        color: '#1d1d1f',
                        outline: 'none',
                        transition: 'border 0.2s ease',
                      }}
                    />
                    {errors.fullName && (
                      <span style={{ fontSize: '0.75rem', color: '#ff3b30', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        <AlertCircle size={12} /> {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phone"
                      style={{
                        display: 'block',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: '#1d1d1f',
                        marginBottom: '8px',
                      }}
                    >
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      disabled={isSubmitting}
                      placeholder="+91 93918 84433"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: errors.phone ? '1px solid #ff3b30' : '1px solid rgba(0, 0, 0, 0.1)',
                        backgroundColor: isSubmitting ? '#f8f9fa' : '#ffffff',
                        fontSize: '0.9375rem',
                        color: '#1d1d1f',
                        outline: 'none',
                      }}
                    />
                    {errors.phone && (
                      <span style={{ fontSize: '0.75rem', color: '#ff3b30', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        <AlertCircle size={12} /> {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      style={{
                        display: 'block',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: '#1d1d1f',
                        marginBottom: '8px',
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      disabled={isSubmitting}
                      placeholder="patient@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: errors.email ? '1px solid #ff3b30' : '1px solid rgba(0, 0, 0, 0.1)',
                        backgroundColor: isSubmitting ? '#f8f9fa' : '#ffffff',
                        fontSize: '0.9375rem',
                        color: '#1d1d1f',
                        outline: 'none',
                      }}
                    />
                    {errors.email && (
                      <span style={{ fontSize: '0.75rem', color: '#ff3b30', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        <AlertCircle size={12} /> {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Patient Date of Birth (Allows past dates like 01/01/2000, 15/06/1995, 1990) */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label
                        htmlFor="dob"
                        style={{
                          display: 'block',
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          color: '#1d1d1f',
                        }}
                      >
                        Patient Date of Birth *
                      </label>
                      {formData.dob && (() => {
                        const b = new Date(formData.dob);
                        if (isNaN(b.getTime())) return null;
                        const t = new Date();
                        let a = t.getFullYear() - b.getFullYear();
                        const m = t.getMonth() - b.getMonth();
                        if (m < 0 || (m === 0 && t.getDate() < b.getDate())) a--;
                        return a >= 0 ? (
                          <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                            Age: {a} yrs
                          </span>
                        ) : null;
                      })()}
                    </div>
                    <input
                      id="dob"
                      type="date"
                      disabled={isSubmitting}
                      max={todayStr}
                      min="1900-01-01"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: errors.dob ? '1px solid #ff3b30' : '1px solid rgba(0, 0, 0, 0.1)',
                        backgroundColor: isSubmitting ? '#f8f9fa' : '#ffffff',
                        fontSize: '0.9375rem',
                        color: '#1d1d1f',
                        outline: 'none',
                      }}
                    />
                    {errors.dob && (
                      <span style={{ fontSize: '0.75rem', color: '#ff3b30', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        <AlertCircle size={12} /> {errors.dob}
                      </span>
                    )}
                  </div>

                  {/* Treatment of Interest */}
                  <div>
                    <label
                      htmlFor="treatment"
                      style={{
                        display: 'block',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: '#1d1d1f',
                        marginBottom: '8px',
                      }}
                    >
                      Treatment Focus *
                    </label>
                    <select
                      id="treatment"
                      disabled={isSubmitting}
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        backgroundColor: isSubmitting ? '#f8f9fa' : '#ffffff',
                        fontSize: '0.9375rem',
                        color: '#1d1d1f',
                        outline: 'none',
                      }}
                    >
                      <option value="General Dental Treatment">General Dental Treatment</option>
                      <option value="Braces / Orthodontic Treatment">Braces / Orthodontic Treatment</option>
                      <option value="Retainers">Retainers</option>
                      <option value="Broken Tooth Treatment">Broken Tooth Treatment</option>
                    </select>
                  </div>

                  {/* Preferred Appointment Date (Today or Future Dates Only) */}
                  <div>
                    <label
                      htmlFor="date"
                      style={{
                        display: 'block',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: '#1d1d1f',
                        marginBottom: '8px',
                      }}
                    >
                      Preferred Appointment Date *
                    </label>
                    <input
                      id="date"
                      type="date"
                      disabled={isSubmitting}
                      min={todayStr}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: errors.date ? '1px solid #ff3b30' : '1px solid rgba(0, 0, 0, 0.1)',
                        backgroundColor: isSubmitting ? '#f8f9fa' : '#ffffff',
                        fontSize: '0.9375rem',
                        color: '#1d1d1f',
                        outline: 'none',
                      }}
                    />
                    {errors.date && (
                      <span style={{ fontSize: '0.75rem', color: '#ff3b30', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        <AlertCircle size={12} /> {errors.date}
                      </span>
                    )}
                  </div>

                  {/* Preferred Time Window */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label
                      htmlFor="time"
                      style={{
                        display: 'block',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: '#1d1d1f',
                        marginBottom: '8px',
                      }}
                    >
                      Preferred Time Window
                    </label>
                    <select
                      id="time"
                      disabled={isSubmitting}
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        backgroundColor: isSubmitting ? '#f8f9fa' : '#ffffff',
                        fontSize: '0.9375rem',
                        color: '#1d1d1f',
                        outline: 'none',
                      }}
                    >
                      <option value="Morning (09:00 AM – 01:00 PM)">Morning (09:00 AM – 01:00 PM)</option>
                      <option value="Afternoon (01:00 PM – 05:00 PM)">Afternoon (01:00 PM – 05:00 PM)</option>
                      <option value="Evening (05:00 PM – 09:00 PM)">Evening (05:00 PM – 09:00 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Additional Clinical Notes */}
                <div style={{ marginBottom: '24px' }}>
                  <label
                    htmlFor="message"
                    style={{
                      display: 'block',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: '#1d1d1f',
                      marginBottom: '8px',
                    }}
                  >
                    Clinical Goals or Notes (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    disabled={isSubmitting}
                    placeholder="Tell us about your expectations, sensitivity history, or aesthetic goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      backgroundColor: isSubmitting ? '#f8f9fa' : '#ffffff',
                      fontSize: '0.9375rem',
                      color: '#1d1d1f',
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                </div>

                {/* Submission Error Banner */}
                {submitError && (
                  <div
                    role="alert"
                    style={{
                      marginBottom: '20px',
                      padding: '16px 20px',
                      borderRadius: '14px',
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                      color: '#991b1b',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      lineHeight: 1.5,
                      animation: 'fadeIn 0.3s ease-out',
                    }}
                  >
                    <AlertCircle size={20} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, marginBottom: '2px', color: '#991b1b' }}>
                        Unable to save appointment
                      </div>
                      <div style={{ color: '#b91c1c', marginBottom: '8px', fontSize: '0.8125rem' }}>
                        {submitError}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: '#7f1d1d' }}>
                        For immediate assistance, please call our clinic desk directly at{' '}
                        <a
                          href="tel:+919391884433"
                          style={{ fontWeight: 600, color: '#991b1b', textDecoration: 'underline' }}
                        >
                          +91 93918 84433
                        </a>.
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: '0 8px 24px rgba(0, 113, 227, 0.25)',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.8 : 1,
                  }}
                  id="submit-appointment-btn"
                >
                  {isSubmitting ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <Loader2 size={18} className="appointment-spin" />
                      <span>Saving Appointment...</span>
                    </span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Request Appointment</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    marginTop: '16px',
                  }}
                >
                  By submitting, you agree to our privacy policy. Your medical information is encrypted and strictly confidential.
                </p>
              </form>
            )}
          </div>
        </div>

        <style>{`
          @keyframes appointmentSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .appointment-spin {
            animation: appointmentSpin 0.9s linear infinite;
          }
          @media (max-width: 768px) {
            .form-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>
    );
  }
);
