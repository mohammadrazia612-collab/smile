import React from 'react';

interface HeroContentProps {
  scrollY: number;
}

/**
 * HeroContent: Typography layer overlaid naturally over the edge-to-edge dental visual.
 * Matches the reference composition with bold, clean typography and pristine readability.
 */
export const HeroContent: React.FC<HeroContentProps> = ({ scrollY }) => {
  const textTranslateY = Math.min(scrollY * 0.12, 50);
  const textOpacity = Math.max(1 - scrollY * 0.002, 0.05);

  return (
    <div
      className="hero-layer hero-content"
      style={{
        position: 'relative',
        zIndex: 5,
        textAlign: 'center',
        maxWidth: '920px',
        margin: '0 auto',
        padding: '0 20px',
        transform: `translate3d(0, ${textTranslateY.toFixed(2)}px, 0)`,
        opacity: textOpacity,
        willChange: 'transform, opacity',
      }}
    >
      {/* 1. Eyebrow Badge Pill */}
      <div
        className="hero-eyebrow"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(0, 113, 227, 0.22)',
          boxShadow: '0 2px 10px rgba(0, 113, 227, 0.08)',
          marginBottom: '20px',
          animation: 'heroFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-primary)',
            display: 'inline-block',
          }}
        />
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent-primary)',
          }}
        >
          D Care Multi Speciality Dental Hospital • Siddipet
        </span>
      </div>

      {/* 2. Main Headline */}
      <h1
        className="hero-headline"
        style={{
          fontSize: 'clamp(2.75rem, 5.8vw, 4.85rem)',
          fontWeight: 800,
          letterSpacing: '-0.035em',
          lineHeight: 1.08,
          color: '#1d1d1f',
          marginBottom: '16px',
          animation: 'heroFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both',
          textShadow: '0 2px 24px rgba(255, 255, 255, 0.7)',
        }}
      >
        MODERN DENTAL CARE
        <br />
        <span>FOR HEALTHY, </span>
        <span style={{ color: 'var(--accent-primary)' }}>CONFIDENT SMILES.</span>
      </h1>

      {/* 3. Supporting Subtitle */}
      <p
        className="hero-subtitle"
        style={{
          fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
          color: '#3a3a3c',
          maxWidth: '660px',
          margin: '0 auto',
          lineHeight: 1.55,
          fontWeight: 400,
          textShadow: '0 1px 16px rgba(255, 255, 255, 0.9)',
          animation: 'heroFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
        }}
      >
        Professional dental healthcare and a comfortable patient experience serving families in Siddipet, Telangana.
      </p>

      <style>{`
        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
