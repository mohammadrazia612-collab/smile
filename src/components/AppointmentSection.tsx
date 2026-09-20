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
      date: '',
      time: 'Morning (10:00 AM – 01:00 PM)',
      treatment: initialTreatment || 'General Dental Care & Consultation',
      message: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submittedDetails, setSubmittedDetails] = useState<typeof formData | null>(null);
    const [isBookingOpen, setIsBookingOpen] = useState<boolean>(true);

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

      if (!formData.date) {
        newErrors.date = 'Please select a preferred date';
      } else {
        const todayStr = new Date().toISOString().split('T')[0];
        if (formData.date < todayStr) {
          newErrors.date = 'Preferred date cannot be in the past';
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
        date: '',
        time: 'Morning (10:00 AM – 01:00 PM)',
        treatment: initialTreatment || 'General Dental Care & Consultation',
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
              Take the first step toward healthy teeth and a confident smile. Request your appointment at Shiva Smile Dental Care Hospital below.
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
                    href="tel:+918309864006"
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
                    <span>Call +91 83098 64006</span>
                  </a>

                  <a
                    href="https://wa.me/918309864006"
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
                  <div>Monday – Saturday: 10:00 AM – 8:00 PM</div>
                  <div>Sunday: 10:30 AM – 2:00 PM</div>
                  <div style={{ marginTop: '6px', color: 'var(--text-muted)' }}>
                    Location: Azam Pura, Siddipet, Telangana 502103
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
                    <li>Hospital Location: Azam Pura, Siddipet, Telangana 502103.</li>
                    <li>Clinic Phone: +91 83098 64006 (Mon–Sat: 10am–8pm, Sun: 10:30am–2pm).</li>
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
                      placeholder="+91 83098 64006"
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
                      <option value="General Dental Care & Consultation">General Dental Care &amp; Consultation</option>
                      <option value="Cosmetic Dentistry & Smile Care">Cosmetic Dentistry &amp; Smile Care</option>
                      <option value="Dental Implants Consultation">Dental Implants Consultation</option>
                      <option value="Gum & Periodontal Care">Gum &amp; Periodontal Care</option>
                      <option value="Pediatric Dentistry (Children)">Pediatric Dentistry (Children)</option>
                      <option value="Emergency Dental Service">Emergency Dental Service</option>
                    </select>
                  </div>

                  {/* Preferred Date */}
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
                      Preferred Date *
                    </label>
                    <input
                      id="date"
                      type="date"
                      disabled={isSubmitting}
                      min={new Date().toISOString().split('T')[0]}
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
                  <div>
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
                      <option value="Morning (10:00 AM – 01:00 PM)">Morning (10:00 AM – 01:00 PM)</option>
                      <option value="Afternoon (01:00 PM – 05:00 PM)">Afternoon (01:00 PM – 05:00 PM)</option>
                      <option value="Evening (05:00 PM – 08:00 PM)">Evening (05:00 PM – 08:00 PM)</option>
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
                          href="tel:+918309864006"
                          style={{ fontWeight: 600, color: '#991b1b', textDecoration: 'underline' }}
                        >
                          +91 83098 64006
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
