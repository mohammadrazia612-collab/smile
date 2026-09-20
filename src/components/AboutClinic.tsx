import React from 'react';
import { Cpu, HeartHandshake, Sparkles, Award, ArrowRight } from 'lucide-react';

interface AboutClinicProps {
  onExploreClick: () => void;
}

export const AboutClinic: React.FC<AboutClinicProps> = ({ onExploreClick }) => {
  return (
    <section
      id="about"
      className="section-padding"
      style={{
        backgroundColor: '#ffffff',
        position: 'relative',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}
          className="about-grid"
        >
          {/* Left Column: Story Editorial */}
          <div className="apple-reveal">
            <span className="eyebrow">About Our Hospital</span>
            <h2
              style={{
                fontSize: 'clamp(2.25rem, 4.2vw, 3.4rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: '#1d1d1f',
                marginBottom: '24px',
              }}
            >
              Professional dental healthcare serving patients and families in Siddipet.
            </h2>

            <p
              style={{
                fontSize: '1.0625rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                marginBottom: '20px',
              }}
            >
              Shiva Smile Dental Care Hospital is dedicated to providing modern, compassionate, and trustworthy dental care in Azam Pura, Siddipet. We focus on patient comfort, gentle clinical techniques, and personalized attention for every member of the family.
            </p>

            <p
              style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '36px',
              }}
            >
              From routine checkups and pediatric dental care to advanced dental implants, cosmetic smile enhancements, periodontal gum care, and emergency dental attention, our clinic provides comprehensive oral healthcare in a welcoming and supportive environment.
            </p>

            {/* 4 Pillars Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
                marginBottom: '36px',
              }}
              className="pillars-grid"
            >
              {[
                {
                  icon: <HeartHandshake size={20} color="var(--accent-primary)" />,
                  title: 'Professional Dental Care',
                  description: 'Comprehensive diagnosis and treatment across general, cosmetic, and implant dentistry.',
                },
                {
                  icon: <Sparkles size={20} color="var(--accent-primary)" />,
                  title: 'Patient Comfort',
                  description: 'A gentle, reassuring approach designed to keep children and adults comfortable throughout their visit.',
                },
                {
                  icon: <Cpu size={20} color="var(--accent-primary)" />,
                  title: 'Modern Dental Clinic',
                  description: 'Well-equipped clinical operatories maintained with high standards of hygiene and patient safety.',
                },
                {
                  icon: <Award size={20} color="var(--accent-primary)" />,
                  title: 'Serving Siddipet',
                  description: 'Conveniently located in Azam Pura with weekday hours until 8:00 PM and Sunday morning care.',
                },
              ].map((pillar) => (
                <div key={pillar.title} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(0, 113, 227, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {pillar.icon}
                  </div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1d1d1f' }}>
                    {pillar.title}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    {pillar.description}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onExploreClick}
              className="btn btn-primary"
              style={{ fontSize: '0.9375rem', padding: '12px 24px' }}
            >
              <span>Explore Treatments</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Column: Clinical Photography Frame */}
          <div
            style={{
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              aspectRatio: '4/4.5',
              backgroundColor: '#f8f8fa',
            }}
          >
            <img
              src="/assets/images/clinic-real-treatment.jpg"
              alt="Shiva Smile Dental Care Hospital — In-Operatory Clinical Care and Treatment"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 38%',
                display: 'block',
              }}
            />

            {/* Inset Credential Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '18px',
                padding: '16px 20px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Shiva Smile Dental Care Hospital
                </div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1d1d1f' }}>
                  Clinical Treatment Operatory
                </div>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Azam Pura, Siddipet
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .pillars-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
