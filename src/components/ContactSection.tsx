import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="section-padding"
      style={{
        backgroundColor: '#fbfbfd',
        position: 'relative',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="section-header apple-reveal">
          <span className="eyebrow">Connect With Us</span>
          <h2 className="section-title">We look forward to welcoming you.</h2>
          <p className="section-subtitle">
            Conveniently located on Siddipet – Medak Road, beside Kotak Mahindra Bank. Visit D Care Multi Speciality Dental Hospital for compassionate, professional dental care.
          </p>
        </div>

        {/* 2-Column Info & Location Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: '40px',
          }}
          className="contact-grid"
        >
          {/* Contact Details Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '28px',
              padding: 'clamp(28px, 4vw, 48px)',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: 'var(--shadow-subtle)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#1d1d1f',
                  marginBottom: '24px',
                }}
              >
                D Care Multi Speciality Dental Hospital
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Location */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(0, 113, 227, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={18} color="var(--accent-primary)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>
                      Hospital Location
                    </div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#1d1d1f' }}>
                      Siddipet – Medak Road
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Beside Kotak Mahindra Bank, Near Prathiba Degree College
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Siddipet, Telangana – 502103, India
                    </div>
                  </div>
                </div>

                {/* Telephone */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(0, 113, 227, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={18} color="var(--accent-primary)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>
                      Hospital Contact Desk
                    </div>
                    <a
                      href="tel:+919391884433"
                      style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--accent-primary)' }}
                    >
                      +91 93918 84433
                    </a>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      Direct line for appointments &amp; consultations
                    </div>
                  </div>
                </div>

                {/* Verified Specialties Notice */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(0, 113, 227, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={18} color="var(--accent-primary)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>
                      Verified Specialties
                    </div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#1d1d1f' }}>
                      General, Braces, Retainers &amp; Broken Tooth
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      Compassionate care &amp; gentle clinical attention
                    </div>
                  </div>
                </div>

                {/* WhatsApp Action Button */}
                <div style={{ marginTop: '8px' }}>
                  <a
                    href="https://wa.me/919391884433"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                    style={{
                      width: '100%',
                      justifyContent: 'space-between',
                      padding: '14px 20px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MessageSquare size={16} color="#25D366" />
                      <span>WhatsApp Clinic Desk</span>
                    </div>
                    <ExternalLink size={14} color="var(--text-muted)" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours & Interactive Map Preview Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '28px',
              padding: 'clamp(28px, 4vw, 48px)',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: 'var(--shadow-subtle)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <Clock size={20} color="var(--accent-primary)" />
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#1d1d1f',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Opening Hours
                </h3>
              </div>

              {/* Structured Schedule */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                  <span style={{ fontSize: '0.9375rem', color: '#1d1d1f', fontWeight: 500 }}>Monday</span>
                  <span style={{ fontSize: '0.9375rem', color: 'var(--accent-primary)', fontWeight: 600 }}>10:00 AM – 9:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                  <span style={{ fontSize: '0.9375rem', color: '#1d1d1f', fontWeight: 500 }}>Tuesday</span>
                  <span style={{ fontSize: '0.9375rem', color: 'var(--accent-primary)', fontWeight: 600 }}>9:00 AM – 9:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                  <span style={{ fontSize: '0.9375rem', color: '#1d1d1f', fontWeight: 500 }}>Wednesday – Saturday</span>
                  <span style={{ fontSize: '0.9375rem', color: 'var(--accent-primary)', fontWeight: 600 }}>10:00 AM – 9:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                  <span style={{ fontSize: '0.9375rem', color: '#1d1d1f', fontWeight: 500 }}>Sunday</span>
                  <span style={{ fontSize: '0.9375rem', color: '#1d1d1f', fontWeight: 600 }}>9:00 AM – 5:00 PM</span>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                marginBottom: '16px',
                lineHeight: 0,
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3792.3479457250933!2d78.8461053749523!3d18.101716382912485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcc92ad4498eda3%3A0xdf2cdef705c498c!2sD%20Care%20Multi%20Speciality%20Dental%20Hospital!5e0!3m2!1sen!2sin!4v1790414874308!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ border: 0, display: 'block' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="D Care Multi Speciality Dental Hospital Google Map"
              />
            </div>

            {/* Apple Map Style Visual Pin Card */}
            <div
              style={{
                borderRadius: '16px',
                backgroundColor: 'var(--bg-subtle)',
                padding: '16px 20px',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '2px' }}>
                  Siddipet – Medak Road, Siddipet
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Beside Kotak Mahindra Bank, Telangana 502103
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=D+Care+Multi+Speciality+Dental+Hospital+Siddipet"
                target="_blank"
                rel="noreferrer"
                className="link-animated"
                style={{ fontSize: '0.8125rem', fontWeight: 600 }}
              >
                <span>Open Maps</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
