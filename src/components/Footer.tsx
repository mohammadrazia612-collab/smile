import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        padding: '80px 0 40px 0',
        color: 'var(--text-secondary)',
      }}
    >
      <div className="container">
        {/* Main Footer Sitemap Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr repeat(3, 1fr)',
            gap: '48px',
            marginBottom: '64px',
          }}
          className="footer-grid"
        >
            {/* Brand Col */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '6px',
                    backgroundColor: 'rgba(0, 113, 227, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
                    <path
                      d="M20 5C14 5 10 9.5 10 17C10 23 12 30 16 35C17.2 36.5 18.8 35.5 19.2 33.5L20 28L20.8 33.5C21.2 35.5 22.8 36.5 24 35C28 30 30 23 30 17C30 9.5 26 5 20 5Z"
                      stroke="#1D1D1F"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 16C17 19 23 19 25 16"
                      stroke="#0071E3"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#1d1d1f' }}>
                  SHIVA SMILE <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>DENTAL CARE HOSPITAL</span>
                </span>
              </div>

              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '320px', marginBottom: '16px' }}>
                Professional, modern dental healthcare provider serving patients and families in Siddipet with compassion and gentle care.
              </p>

              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Azam Pura, Siddipet, Telangana 502103
                <br />
                Phone: <a href="tel:+918309864006" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>+91 83098 64006</a>
                <br />
                Mon–Sat: 10:00 AM – 8:00 PM | Sun: 10:30 AM – 2:00 PM
              </div>
            </div>

            {/* Treatments Col */}
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1d1d1f', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                Treatments
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><a href="#treatments" style={{ fontSize: '0.875rem' }}>General Dental Care</a></li>
                <li><a href="#treatments" style={{ fontSize: '0.875rem' }}>Cosmetic Dentistry</a></li>
                <li><a href="#treatments" style={{ fontSize: '0.875rem' }}>Dental Implants</a></li>
                <li><a href="#treatments" style={{ fontSize: '0.875rem' }}>Gum &amp; Periodontal Care</a></li>
                <li><a href="#treatments" style={{ fontSize: '0.875rem' }}>Pediatric Dentistry</a></li>
                <li><a href="#treatments" style={{ fontSize: '0.875rem' }}>Emergency Dental Service</a></li>
              </ul>
            </div>

            {/* Technology & Clinical Col */}
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1d1d1f', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                Hospital
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><a href="#technology" style={{ fontSize: '0.875rem' }}>Digital Diagnostics</a></li>
                <li><a href="#technology" style={{ fontSize: '0.875rem' }}>Precision Implants</a></li>
                <li><a href="#technology" style={{ fontSize: '0.875rem' }}>Sterilization Protocols</a></li>
                <li><a href="#experience" style={{ fontSize: '0.875rem' }}>Comfortable Operatories</a></li>
                <li><a href="#about" style={{ fontSize: '0.875rem' }}>Hospital Story</a></li>
                <li><a href="#doctors" style={{ fontSize: '0.875rem' }}>Dental Specialists</a></li>
              </ul>
            </div>

            {/* Practice & Legal Col */}
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1d1d1f', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                Quick Links
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><a href="#results" style={{ fontSize: '0.875rem' }}>Clinical Cases</a></li>
                <li><a href="#testimonials" style={{ fontSize: '0.875rem' }}>Google Reviews (4.9★)</a></li>
                <li><a href="#appointment" style={{ fontSize: '0.875rem' }}>Book Appointment</a></li>
                <li><a href="#contact" style={{ fontSize: '0.875rem' }}>Clinic Location</a></li>
                <li><a href="tel:+918309864006" style={{ fontSize: '0.875rem' }}>Call +91 83098 64006</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Disclaimer & Copyright */}
          <div
            style={{
              borderTop: '1px solid rgba(0, 0, 0, 0.06)',
              paddingTop: '32px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
            }}
          >
            <div>
              © {new Date().getFullYear()} Shiva Smile Dental Care Hospital. All rights reserved. Azam Pura, Siddipet, Telangana 502103.
            </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a href="#" style={{ color: 'var(--text-muted)' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--text-muted)' }}>Terms of Service</a>
            <a href="#" style={{ color: 'var(--text-muted)' }}>Medical Disclaimer</a>

            <button
              onClick={scrollToTop}
              aria-label="Scroll to top of page"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'none',
                border: 'none',
                color: 'var(--accent-primary)',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.75rem',
                marginLeft: '8px',
              }}
            >
              <span>Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 540px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};
