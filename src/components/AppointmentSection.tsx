import React, { useState, forwardRef } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, Send } from 'lucide-react';

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
      time: 'morning',
      treatment: initialTreatment || 'General Dental Care & Consultation',
      message: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = () => {
      const newErrors: Record<string, string> = {};
      if (!formData.fullName.trim()) newErrors.fullName = 'Please provide your full name';
      if (!formData.phone.trim() || formData.phone.length < 8)
        newErrors.phone = 'Please provide a valid contact number';
      if (!formData.email.trim() || !formData.email.includes('@'))
        newErrors.email = 'Please provide a valid email address';
      if (!formData.date) newErrors.date = 'Please select a preferred date';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;

      setIsSubmitting(true);
      // Simulate real-time API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 750);
    };

    const resetForm = () => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        date: '',
        time: 'morning',
        treatment: 'General Dental Care & Consultation',
        message: '',
      });
      setErrors({});
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
            {isSubmitted ? (
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
                  Thank you, <strong>{formData.fullName}</strong>. Our clinic team has received your appointment request for <strong>{formData.treatment}</strong>.
                </p>

                <div
                  style={{
                    maxWidth: '460px',
                    margin: '0 auto 32px auto',
                    padding: '16px 20px',
                    borderRadius: '14px',
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ fontWeight: 600, color: '#1d1d1f', marginBottom: '4px' }}>
                    Next steps:
                  </div>
                  <ul style={{ paddingLeft: '18px', lineHeight: 1.6 }}>
                    <li>Our clinic staff will contact you at <strong>{formData.phone}</strong> to confirm your appointment time.</li>
                    <li>Hospital Location: Azam Pura, Siddipet, Telangana 502103.</li>
                    <li>Clinic Contact: +91 83098 64006 | Mon–Sat: 10am–8pm, Sun: 10:30am–2pm.</li>
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
                      placeholder="e.g. Eleanor Vance"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: errors.fullName ? '1px solid #ff3b30' : '1px solid rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#ffffff',
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
                      placeholder="+91 83098 64006"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: errors.phone ? '1px solid #ff3b30' : '1px solid rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#ffffff',
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
                      placeholder="patient@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: errors.email ? '1px solid #ff3b30' : '1px solid rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#ffffff',
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
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#ffffff',
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
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: errors.date ? '1px solid #ff3b30' : '1px solid rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#ffffff',
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
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#ffffff',
                        fontSize: '0.9375rem',
                        color: '#1d1d1f',
                        outline: 'none',
                      }}
                    >
                      <option value="morning">Morning (10:00 AM – 01:00 PM)</option>
                      <option value="afternoon">Afternoon (01:00 PM – 05:00 PM)</option>
                      <option value="evening">Evening (05:00 PM – 08:00 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Additional Clinical Notes */}
                <div style={{ marginBottom: '28px' }}>
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
                    placeholder="Tell us about your expectations, sensitivity history, or aesthetic goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      backgroundColor: '#ffffff',
                      fontSize: '0.9375rem',
                      color: '#1d1d1f',
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                </div>

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
                  }}
                  id="submit-appointment-btn"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
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
