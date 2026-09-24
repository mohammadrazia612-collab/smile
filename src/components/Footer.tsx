import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useRouter } from '../router/Router';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <img
                  src="/logo.png"
                  alt="Shiva Smile Dental Care Hospital Logo"
                  style={{
                    width: '54px',
                    height: '54px',
                    objectFit: 'contain',
                    flexShrink: 0,
                    display: 'block',
                  }}
                />
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <a href="#" style={{ color: 'var(--text-muted)' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--text-muted)' }}>Terms of Service</a>
            <a href="#" style={{ color: 'var(--text-muted)' }}>Medical Disclaimer</a>
            <a
              href="/admin/login"
              onClick={(e) => {
                e.preventDefault();
                navigate('/admin/login');
              }}
              style={{
                color: 'var(--text-muted)',
                opacity: 0.65,
                transition: 'opacity 0.2s ease, color 0.2s ease',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.65';
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              Admin Login
            </a>

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
