import React, { useState } from 'react';
import { Cpu, Scan, Box, Activity, ChevronRight } from 'lucide-react';

export const Technology: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState(0);

  const technologies = [
    {
      id: 'digital-diagnostics',
      name: 'Digital Dental Diagnostics & Imaging',
      eyebrow: 'High Clarity • Safe Low-Dose Imaging',
      description: 'Digital radiography and intraoral visual tools provide immediate, clear visualizations of teeth, roots, and bone structure, allowing accurate treatment planning with minimal radiation exposure.',
      specs: [
        { label: 'Diagnostic Clarity', value: 'High Definition' },
        { label: 'Radiation Exposure', value: 'Safe Low-Dose' },
        { label: 'Review Speed', value: 'Instant Display' },
      ],
      icon: <Scan size={20} color="var(--accent-primary)" />,
    },
    {
      id: 'dental-implants',
      name: 'Precision Dental Implants & Restorations',
      eyebrow: 'Durable Replacement • Natural Function',
      description: 'Medical-grade biocompatible titanium dental implants designed for lasting osseointegration, providing stable anchoring for natural-looking crowns and restoring confident chewing ability.',
      specs: [
        { label: 'Material', value: 'Biocompatible Titanium' },
        { label: 'Indication', value: 'Missing Teeth' },
        { label: 'Result', value: 'Restored Function' },
      ],
      icon: <Box size={20} color="var(--accent-primary)" />,
    },
    {
      id: 'periodontal-care',
      name: 'Periodontal & Ultrasonic Gum Care',
      eyebrow: 'Deep Cleansing • Gum Preservation',
      description: 'Gentle ultrasonic scaling and specialized periodontal therapies that remove subgingival calculus, restore gum health, and protect the foundational support of your teeth.',
      specs: [
        { label: 'Care Focus', value: 'Gums & Bone Support' },
        { label: 'Method', value: 'Ultrasonic Cleansing' },
        { label: 'Comfort', value: 'Gentle Irrigation' },
      ],
      icon: <Activity size={20} color="var(--accent-primary)" />,
    },
    {
      id: 'hospital-sterilization',
      name: 'Hospital-Grade Operatory & Sterilization',
      eyebrow: 'Strict Hygiene • Emergency Readiness',
      description: 'Multi-stage autoclaving and strict operatory hygiene protocols ensuring complete patient safety, equipped for family treatments and prompt emergency dental care in Siddipet.',
      specs: [
        { label: 'Hygiene Standard', value: 'Autoclave Sterilized' },
        { label: 'Emergency Care', value: 'Priority Triage' },
        { label: 'Patient Focus', value: 'All Age Groups' },
      ],
      icon: <Cpu size={20} color="var(--accent-primary)" />,
    },
  ];

  return (
    <section
      id="technology"
      className="section-padding"
      style={{
        backgroundColor: '#fbfbfd',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Apple Keynote Style Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 64px auto' }}>
          <span className="eyebrow">Modern Clinical Infrastructure</span>
          <h2
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              letterSpacing: '-0.035em',
              fontWeight: 800,
              lineHeight: 1.08,
              color: '#1d1d1f',
              marginBottom: '20px',
            }}
          >
            CARE MEETS
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #1d1d1f 40%, #0071e3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              MODERN DENTISTRY.
            </span>
          </h2>
          <p className="section-subtitle">
            Shiva Smile Dental Care Hospital combines modern dental operatory equipment, digital diagnostic imaging, and hospital-grade sterilization protocols in Siddipet.
          </p>
        </div>

        {/* Large Cinematic Visual Showcase Banner */}
        <div
          style={{
            position: 'relative',
            borderRadius: '28px',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05)',
            marginBottom: '48px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              alignItems: 'center',
            }}
            className="tech-showcase-grid"
          >
            {/* Visual Image */}
            <div
              style={{
                position: 'relative',
                height: '100%',
                minHeight: '380px',
                backgroundColor: '#ffffff',
                overflow: 'hidden',
              }}
            >
              <img
                src="/assets/images/digital-scanner.jpg"
                alt="Shiva Smile Dental Care Hospital — Modern Treatment Operatory"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, rgba(255,255,255,0) 70%, #ffffff 100%)',
                  pointerEvents: 'none',
                }}
                className="image-blend-overlay"
              />
            </div>

            {/* Content Details */}
            <div style={{ padding: 'clamp(28px, 4vw, 48px)' }}>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-primary)',
                  marginBottom: '8px',
                }}
              >
                {technologies[selectedTech].eyebrow}
              </div>

              <h3
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#1d1d1f',
                  marginBottom: '16px',
                }}
              >
                {technologies[selectedTech].name}
              </h3>

              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '28px',
                }}
              >
                {technologies[selectedTech].description}
              </p>

              {/* Hardware Spec Badges */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '12px',
                  borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                  paddingTop: '20px',
                }}
              >
                {technologies[selectedTech].specs.map((spec) => (
                  <div key={spec.label}>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                      {spec.label}
                    </div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1d1d1f' }}>
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Interactive Technology Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
          }}
        >
          {technologies.map((tech, index) => {
            const isSelected = selectedTech === index;
            return (
              <button
                key={tech.id}
                onClick={() => setSelectedTech(index)}
                style={{
                  padding: '24px',
                  borderRadius: '20px',
                  backgroundColor: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                  border: isSelected ? '1px solid var(--accent-primary)' : '1px solid rgba(0, 0, 0, 0.05)',
                  boxShadow: isSelected ? '0 10px 28px rgba(0, 113, 227, 0.08)' : 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                  outline: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '160px',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? 'rgba(0, 113, 227, 0.12)' : 'rgba(0, 0, 0, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    {tech.icon}
                  </div>
                  <div
                    style={{
                      fontSize: '1.0625rem',
                      fontWeight: 700,
                      color: isSelected ? '#1d1d1f' : 'var(--text-secondary)',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.3,
                    }}
                  >
                    {tech.name}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: isSelected ? 'var(--accent-primary)' : 'var(--text-muted)',
                    marginTop: '16px',
                  }}
                >
                  <span>{isSelected ? 'Currently Viewing' : 'Select System'}</span>
                  <ChevronRight size={14} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .tech-showcase-grid {
            grid-template-columns: 1fr !important;
          }
          .image-blend-overlay {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
