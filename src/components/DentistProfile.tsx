import React from 'react';
import { Award, GraduationCap, Microscope, ShieldCheck } from 'lucide-react';

export const DentistProfile: React.FC = () => {
  return (
    <section
      id="doctor"
      className="section-padding"
      style={{
        backgroundColor: '#fbfbfd',
        position: 'relative',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr',
            gap: '64px',
            alignItems: 'center',
          }}
          className="doctor-grid"
        >
          {/* Editorial Portrait Column */}
          <div
            style={{
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#ffffff',
              aspectRatio: '4/5',
            }}
          >
            <img
              src="/assets/images/doctor-portrait.jpg"
              alt="Clinical Director — Shiva Smile Dental Care Hospital"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {/* Editorial Name Badge Overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                padding: '20px 24px',
                borderRadius: '18px',
                backgroundColor: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-primary)',
                  marginBottom: '4px',
                }}
              >
                Dental Surgeon &amp; Director
              </div>
              <div
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#1d1d1f',
                  letterSpacing: '-0.02em',
                }}
              >
                [Doctor Name, BDS / MDS]
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Shiva Smile Dental Care Hospital • Siddipet
              </div>
            </div>
          </div>

          {/* Editorial Biography & Credentials Column */}
          <div>
            <span className="eyebrow">Clinical Care</span>
            <h2
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 3rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.12,
                color: '#1d1d1f',
                marginBottom: '24px',
              }}
            >
              "Dedicated to gentle hands, comfortable care, and healthy confident smiles."
            </h2>

            <p
              style={{
                fontSize: '1.0625rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                marginBottom: '20px',
              }}
            >
              Providing comprehensive dental healthcare at Shiva Smile Dental Care Hospital in Siddipet with a clear philosophy: patient comfort, clinical hygiene, and personalized dental treatments.
            </p>

            <p
              style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '36px',
              }}
            >
              Every smile is approached as a unique harmonic composition — balancing biological preservation with natural light reflection. No mass-produced teeth, no unnecessary tooth reduction, and never an impersonal clinical encounter.
            </p>

            {/* Structured Credentials Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                paddingTop: '28px',
              }}
              className="credentials-grid"
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    padding: '8px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(0, 113, 227, 0.08)',
                    flexShrink: 0,
                  }}
                >
                  <GraduationCap size={18} color="var(--accent-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '2px' }}>
                    Doctor of Dental Surgery
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Columbia University College of Dental Medicine
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    padding: '8px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(0, 113, 227, 0.08)',
                    flexShrink: 0,
                  }}
                >
                  <Award size={18} color="var(--accent-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '2px' }}>
                    MS in Prosthodontics
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Advanced Specialty Residency &amp; Biomechanics
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    padding: '8px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(0, 113, 227, 0.08)',
                    flexShrink: 0,
                  }}
                >
                  <Microscope size={18} color="var(--accent-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '2px' }}>
                    Microscopic Aesthetics
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    High-magnification minimally invasive protocols
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    padding: '8px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(0, 113, 227, 0.08)',
                    flexShrink: 0,
                  }}
                >
                  <ShieldCheck size={18} color="var(--accent-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '2px' }}>
                    Fellow, ICOI
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    International Congress of Oral Implantologists
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .doctor-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .credentials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
