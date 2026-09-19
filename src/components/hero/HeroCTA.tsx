import React from 'react';
import { ArrowRight, ChevronDown, Calendar } from 'lucide-react';

interface HeroCTAProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

/**
 * HeroCTA: Action buttons and scroll indicator layered over the lower portion of the tooth sculpture.
 * Exactly matches the reference composition in Screenshot 2.
 */
export const HeroCTA: React.FC<HeroCTAProps> = ({ onBookClick, onExploreClick }) => {
  return (
    <div
      className="hero-layer hero-cta"
      style={{
        position: 'relative',
        zIndex: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '28px',
        animation: 'heroCtaFade 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both',
      }}
    >
      {/* Button Group */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
        }}
      >
        <button
          onClick={onBookClick}
          className="btn btn-primary"
          style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            padding: '13px 26px',
            borderRadius: '9999px',
            backgroundColor: 'var(--accent-primary)',
            color: '#ffffff',
            border: 'none',
            boxShadow: '0 8px 24px rgba(0, 113, 227, 0.36)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 113, 227, 0.45)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 113, 227, 0.36)';
          }}
          id="hero-book-btn"
        >
          <Calendar size={16} />
          <span>Book an Appointment</span>
          <ArrowRight size={15} />
        </button>

        <button
          onClick={onExploreClick}
          style={{
            fontSize: '0.9375rem',
            fontWeight: 500,
            padding: '13px 26px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            color: '#1d1d1f',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.65)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)';
          }}
          id="hero-explore-btn"
        >
          <span>Explore Treatments</span>
        </button>
      </div>

      {/* Discover More Scroll Indicator */}
      <a
        href="#statistics"
        aria-label="Scroll to statistics"
        style={{
          marginTop: '44px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          color: 'var(--text-muted)',
          fontSize: '0.6875rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          transition: 'color 0.2s ease',
          cursor: 'pointer',
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
      >
        <span>Discover More</span>
        <div style={{ animation: 'bounceDown 2s infinite' }}>
          <ChevronDown size={16} />
        </div>
      </a>

      <style>{`
        @keyframes heroCtaFade {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounceDown {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(5px);
          }
          60% {
            transform: translateY(2px);
          }
        }
      `}</style>
    </div>
  );
};
