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
            Conveniently located in Azam Pura, Siddipet. Visit Shiva Smile Dental Care Hospital for compassionate, professional dental care.
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
                Shiva Smile Dental Care Hospital
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
                      Azam Pura, Siddipet
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Telangana 502103, India
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
                      href="tel:+918309864006"
                      style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--accent-primary)' }}
                    >
                      +91 83098 64006
                    </a>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      Direct line for appointments &amp; emergency dental service
                    </div>
                  </div>
                </div>

                {/* Emergency Dental Service Notice */}
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
                      Emergency Dental Service
                    </div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#1d1d1f' }}>
                      Prompt Emergency Attention Available
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      Call +91 83098 64006 for urgent dental situations
                    </div>
                  </div>
                </div>

                {/* WhatsApp Action Button */}
                <div style={{ marginTop: '8px' }}>
                  <a
                    href="https://wa.me/918309864006"
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                  <span style={{ fontSize: '0.9375rem', color: '#1d1d1f', fontWeight: 500 }}>Monday – Saturday</span>
                  <span style={{ fontSize: '0.9375rem', color: 'var(--accent-primary)', fontWeight: 600 }}>10:00 AM – 8:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                  <span style={{ fontSize: '0.9375rem', color: '#1d1d1f', fontWeight: 500 }}>Sunday</span>
                  <span style={{ fontSize: '0.9375rem', color: '#1d1d1f', fontWeight: 600 }}>10:30 AM – 2:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Emergency Care</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Call Ahead for Urgent Visits</span>
                </div>
              </div>
            </div>

            {/* Apple Map Style Visual Pin Card */}
            <div
              style={{
                borderRadius: '16px',
                backgroundColor: 'var(--bg-subtle)',
                padding: '20px',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '2px' }}>
                  Azam Pura, Siddipet
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Telangana 502103, India
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Shiva+Smile+Dental+Care+Hospital+Azam+Pura+Siddipet+Telangana+502103"
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
