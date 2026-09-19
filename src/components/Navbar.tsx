import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Calendar } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Treatments', href: '#treatments' },
    { label: 'Technology', href: '#technology' },
    { label: 'Interactive Cluster', href: '#cluster' },
    { label: 'Results', href: '#gallery' },
    { label: 'Experience', href: '#experience' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(calc(100% - 32px), 1160px)',
          height: '56px',
          zIndex: 1000,
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderRadius: '20px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: scrolled ? '0 12px 36px rgba(0, 0, 0, 0.08)' : '0 8px 30px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px 0 20px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Brand Logo */}
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: 'var(--text-primary)',
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: '7px',
                backgroundColor: 'rgba(0, 113, 227, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="17" height="17" viewBox="0 0 40 40" fill="none">
                <path
                  d="M20 5C14 5 10 9.5 10 17C10 23 12 30 16 35C17.2 36.5 18.8 35.5 19.2 33.5L20 28L20.8 33.5C21.2 35.5 22.8 36.5 24 35C28 30 30 23 30 17C30 9.5 26 5 20 5Z"
                  stroke="#0071E3"
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
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 800,
                fontSize: '0.9375rem',
                letterSpacing: '-0.02em',
                color: '#1d1d1f',
              }}
            >
              SHIVA SMILE <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>DENTAL CARE</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
            }}
            className="desktop-nav"
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  letterSpacing: '-0.01em',
                  transition: 'color 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#1d1d1f')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action: Book Appointment Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={onBookClick}
              className="btn btn-primary"
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                padding: '8px 18px',
                borderRadius: '9999px',
                backgroundColor: 'var(--accent-primary)',
                color: '#ffffff',
                border: 'none',
                boxShadow: '0 4px 14px rgba(0, 113, 227, 0.3)',
                cursor: 'pointer',
              }}
              id="nav-book-btn"
            >
              <Calendar size={13} />
              <span>Book Appointment</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-toggle"
              aria-label="Toggle menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'none',
                padding: '6px',
                color: '#1d1d1f',
              }}
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            left: '16px',
            right: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(25px)',
            zIndex: 999,
            borderRadius: '24px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            animation: 'fadeIn 0.2s ease-out',
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: '1.0625rem',
                  fontWeight: 600,
                  color: '#1d1d1f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                  textDecoration: 'none',
                }}
              >
                <span>{item.label}</span>
                <ArrowRight size={15} color="var(--accent-primary)" />
              </a>
            ))}
          </div>

          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '0.9375rem' }}
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};
