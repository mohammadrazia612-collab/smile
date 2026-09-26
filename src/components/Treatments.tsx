import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, Sparkles, Shield, ChevronRight } from 'lucide-react';

interface TreatmentItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  highlights: string[];
  duration: string;
  longevity: string;
  comfortRating: string;
  visualGradient: string;
}

interface TreatmentsProps {
  onSelectTreatment: (treatmentName: string) => void;
}

export const Treatments: React.FC<TreatmentsProps> = ({ onSelectTreatment }) => {
  const treatments: TreatmentItem[] = [
    {
      id: 'general-dental',
      name: 'General Dental Treatment',
      category: 'Comprehensive Oral Care',
      tagline: 'Routine examinations, cleaning, and essential dental care for lasting oral health.',
      description: 'Comprehensive oral examinations, diagnostic assessments, professional cleanings, and preventive care tailored for patients of all ages.',
      highlights: [
        'Thorough dental checkup and clinical assessment',
        'Preventive oral hygiene care and patient education',
        'Personalized treatment planning for long-term tooth health',
      ],
      duration: '30 - 45 minutes',
      longevity: 'Recommended for regular checkups every 6 months',
      comfortRating: 'Gentle, compassionate, and patient-first care',
      visualGradient: 'linear-gradient(135deg, #eef5fc 0%, #e0edf9 100%)',
    },
    {
      id: 'braces-orthodontics',
      name: 'Braces / Orthodontic Treatment',
      category: 'Orthodontics & Alignment',
      tagline: 'Precision orthodontic correction for properly aligned teeth and bites.',
      description: 'Orthodontic solutions including metal and ceramic braces designed to straighten misaligned teeth, correct bite irregularities, and improve functional harmony.',
      highlights: [
        'Detailed evaluation and bite alignment assessment',
        'Effective correction for crowding, gaps, and malocclusion',
        'Structured progress visits and personalized treatment monitoring',
      ],
      duration: 'Structured treatment plan over scheduled appointments',
      longevity: 'Long-lasting alignment with proper retainer use',
      comfortRating: 'Gradual, gentle tooth movement with modern brackets',
      visualGradient: 'linear-gradient(135deg, #f0f7f4 0%, #dbeee5 100%)',
    },
    {
      id: 'retainers',
      name: 'Retainers',
      category: 'Post-Orthodontic Care',
      tagline: 'Custom retainers to stabilize and maintain your aligned smile.',
      description: 'Custom-fitted retainers designed to prevent teeth from shifting after orthodontic care, preserving alignment and stability.',
      highlights: [
        'Custom impressions for accurate, comfortable fit',
        'Fixed and removable retainer options available',
        'Protects your orthodontic investment and tooth alignment',
      ],
      duration: 'Custom fabrication & quick fitting visit',
      longevity: 'Durable with proper care and daily use',
      comfortRating: 'Comfortable, non-invasive custom fit',
      visualGradient: 'linear-gradient(135deg, #fdf8f4 0%, #f7ebe1 100%)',
    },
    {
      id: 'broken-tooth',
      name: 'Broken Tooth Treatment',
      category: 'Restorative Dental Care',
      tagline: 'Restoring the integrity, strength, and function of damaged teeth.',
      description: 'Targeted restorative care for fractured, chipped, or broken teeth, helping relieve discomfort and restore natural tooth structure, strength, and appearance.',
      highlights: [
        'Assessment of tooth fracture extent and pulp condition',
        'Restorative repair to prevent further cracking or decay',
        'Restores normal biting function and natural tooth contour',
      ],
      duration: 'Single visit or planned restoration based on damage',
      longevity: 'Durable restorative outcome',
      comfortRating: 'Comfortable care with local numbing for pain relief',
      visualGradient: 'linear-gradient(135deg, #faf3f3 0%, #fbe8e8 100%)',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeTreatment = treatments[activeIndex];

  return (
    <section
      id="treatments"
      className="section-padding"
      style={{
        backgroundColor: '#ffffff',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="section-header apple-reveal">
          <span className="eyebrow">Comprehensive Care</span>
          <h2 className="section-title">Designed for longevity. Engineered for beauty.</h2>
          <p className="section-subtitle">
            Every procedure at D Care Multi Speciality Dental Hospital is guided by thorough clinical assessment, patient comfort, and personalized care.
          </p>
        </div>

        {/* Storytelling Split Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 380px) 1fr',
            gap: '48px',
            alignItems: 'start',
          }}
          className="treatments-grid"
        >
          {/* Left Column: Interactive Treatment Selector List */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            {treatments.map((treatment, index) => {
              const isSelected = activeIndex === index;
              return (
                <button
                  key={treatment.id}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? 'var(--bg-subtle)' : 'transparent',
                    border: '1px solid',
                    borderColor: isSelected ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'var(--transition-smooth)',
                    outline: 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.02)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: isSelected ? 'var(--accent-primary)' : 'var(--text-muted)',
                        marginBottom: '2px',
                      }}
                    >
                      {treatment.category}
                    </div>
                    <div
                      style={{
                        fontSize: '1.0625rem',
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected ? '#1d1d1f' : 'var(--text-secondary)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {treatment.name}
                    </div>
                  </div>

                  <ChevronRight
                    size={18}
                    color={isSelected ? 'var(--accent-primary)' : 'rgba(0,0,0,0.2)'}
                    style={{
                      transform: isSelected ? 'translateX(4px)' : 'translateX(0)',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Immersive Cinematic Treatment Showcase */}
          <div
            className="apple-card-tilt"
            style={{
              backgroundColor: 'var(--bg-page)',
              borderRadius: '28px',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              padding: 'clamp(28px, 4vw, 48px)',
              boxShadow: 'var(--shadow-float)',
              minHeight: '520px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Visual background ambient gradient */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '60%',
                height: '60%',
                background: activeTreatment.visualGradient,
                borderRadius: '50%',
                filter: 'blur(60px)',
                opacity: 0.7,
                pointerEvents: 'none',
                transition: 'background 0.5s ease',
              }}
            />

            <div>
              {/* Category pill & Tagline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-primary)',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(0, 113, 227, 0.08)',
                  }}
                >
                  {activeTreatment.category}
                </span>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  D Care Clinical Standard
                </span>
              </div>

              <h3
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: '#1d1d1f',
                  marginBottom: '12px',
                  lineHeight: 1.1,
                }}
              >
                {activeTreatment.name}
              </h3>

              <p
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  color: '#1d1d1f',
                  marginBottom: '16px',
                }}
              >
                {activeTreatment.tagline}
              </p>

              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  maxWidth: '680px',
                  marginBottom: '32px',
                }}
              >
                {activeTreatment.description}
              </p>

              {/* Highlights Checklist */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '36px',
                }}
              >
                {activeTreatment.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '0.9375rem',
                      color: 'var(--text-primary)',
                      fontWeight: 500,
                    }}
                  >
                    <CheckCircle2 size={18} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Meta & Action */}
            <div
              style={{
                borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                paddingTop: '24px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                <div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>
                    Procedure Time
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1d1d1f', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} color="var(--accent-primary)" />
                    {activeTreatment.duration}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>
                    Expected Longevity
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1d1d1f', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Shield size={14} color="var(--accent-primary)" />
                    {activeTreatment.longevity}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>
                    Patient Comfort
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1d1d1f', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles size={14} color="var(--accent-primary)" />
                    {activeTreatment.comfortRating}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectTreatment(activeTreatment.name)}
                className="btn btn-primary btn-magnetic"
                style={{ fontSize: '0.875rem', padding: '10px 22px' }}
              >
                <span>Book This Treatment</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .treatments-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
