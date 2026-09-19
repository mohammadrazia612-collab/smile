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
      id: 'dental-implants',
      name: 'Dental Implants',
      category: 'Tooth Replacement',
      tagline: 'Permanent, natural-looking replacement for missing teeth.',
      description: 'Dental implants provide a strong, stable foundation for fixed replacement teeth designed to blend naturally with your smile and restore full chewing confidence.',
      highlights: [
        'Secure and stable tooth replacement solution',
        'Helps preserve healthy adjacent teeth and jawbone structure',
        'Custom-crafted crowns designed to match your natural smile',
      ],
      duration: 'Planned across consultation & placement visits',
      longevity: 'Long-lasting with good oral hygiene',
      comfortRating: 'Administered under gentle local anesthesia',
      visualGradient: 'linear-gradient(135deg, #eef5fc 0%, #e0edf9 100%)',
    },
    {
      id: 'cosmetic-dentistry',
      name: 'Cosmetic Dentistry',
      category: 'Smile Aesthetics',
      tagline: 'Aesthetic enhancements for healthy, confident smiles.',
      description: 'Our cosmetic treatments include smile styling, composite bonding, ceramic veneers, and contouring to harmonize tooth shape, color, and alignment.',
      highlights: [
        'Custom aesthetic planning for harmonious smile balance',
        'Natural-looking tooth color and translucency matching',
        'Conservative techniques focused on enamel preservation',
      ],
      duration: '1 - 2 clinical visits depending on procedure',
      longevity: 'Long-lasting aesthetic results',
      comfortRating: 'Comfort-focused, gentle clinical care',
      visualGradient: 'linear-gradient(135deg, #fdf8f4 0%, #f7ebe1 100%)',
    },
    {
      id: 'periodontal-care',
      name: 'Gum & Periodontal Care',
      category: 'Periodontics',
      tagline: 'Comprehensive therapies for healthy, protected gums.',
      description: 'Dedicated periodontal evaluation, deep scaling, root planing, and therapeutic care to treat gum inflammation, bleeding, and periodontal conditions.',
      highlights: [
        'Thorough plaque and calculus removal above and below gumline',
        'Gentle periodontal maintenance and tissue care',
        'Personalized hygiene guidance for long-term gum health',
      ],
      duration: '30 - 45 minutes per session',
      longevity: 'Maintained with periodic hygiene visits',
      comfortRating: 'Gentle, comfortable procedure with topical numbing',
      visualGradient: 'linear-gradient(135deg, #f0f7f4 0%, #dbeee5 100%)',
    },
    {
      id: 'pediatric-dentistry',
      name: 'Pediatric Dentistry',
      category: 'Children’s Dental Care',
      tagline: 'Kind, gentle dental care designed especially for children.',
      description: 'Our team provides a welcoming and friendly environment for kids, making dental visits positive and educational while safeguarding growing smiles.',
      highlights: [
        'Friendly approach helping kids feel relaxed and secure',
        'Cavity prevention, fluoride care, and dental sealants',
        'Gentle monitoring of dental development and bite alignment',
      ],
      duration: '30 - 40 minutes per visit',
      longevity: 'Builds a foundation for lifelong oral health',
      comfortRating: 'Kid-friendly, gentle, and positive atmosphere',
      visualGradient: 'linear-gradient(135deg, #fbf7ee 0%, #faedd3 100%)',
    },
    {
      id: 'teeth-whitening',
      name: 'Teeth Whitening',
      category: 'Cosmetic Hygiene',
      tagline: 'Professional in-office whitening for radiant brightness.',
      description: 'Safe, clinical-grade enamel whitening that lifts deep surface and intrinsic stains caused by tea, coffee, food, and natural aging.',
      highlights: [
        'Noticeably brighter shade achieved in a structured session',
        'Enamel-safe formulation minimizing tooth sensitivity',
        'Clear post-care guidance to prolong your bright results',
      ],
      duration: '45 - 60 minutes',
      longevity: 'Prolonged with good dietary and hygiene care',
      comfortRating: 'Comfortable with protective gingival barrier',
      visualGradient: 'linear-gradient(135deg, #f3f8fe 0%, #e3effc 100%)',
    },
    {
      id: 'endodontics',
      name: 'Root Canal Treatment',
      category: 'Tooth Preservation',
      tagline: 'Relieving tooth pain while saving your natural tooth.',
      description: 'Root canal therapy safely cleans and disinfects infected inner tooth pulp, relieving toothache and preserving the natural tooth structure from extraction.',
      highlights: [
        'Saves natural tooth structure and restores comfortable chewing',
        'Prompt relief from severe tooth pain and swelling',
        'Completed with biocompatible sealing and restorative crown',
      ],
      duration: '45 - 60 minutes per visit',
      longevity: 'Durable tooth restoration',
      comfortRating: 'Painless with effective local anesthesia',
      visualGradient: 'linear-gradient(135deg, #f8f8f9 0%, #ededf0 100%)',
    },
    {
      id: 'crowns-bridges',
      name: 'Crowns & Bridges',
      category: 'Restorative Care',
      tagline: 'Durable restorations to protect weakened or broken teeth.',
      description: 'Custom ceramic and tooth-colored crowns and bridges designed to restore strength, aesthetics, and natural occlusion for damaged or missing teeth.',
      highlights: [
        'Natural appearance harmonizing with your surrounding teeth',
        'Protects cracked or root-canal treated teeth from fracture',
        'Restores comfortable biting and chewing stability',
      ],
      duration: '1 - 2 visits',
      longevity: 'Durable, long-term restorative solution',
      comfortRating: 'Gentle, comfortable preparation and fit',
      visualGradient: 'linear-gradient(135deg, #f3f6fa 0%, #e2eaf5 100%)',
    },
    {
      id: 'emergency-dentistry',
      name: 'Emergency Dental Care',
      category: 'Urgent Attention',
      tagline: 'Prompt, compassionate attention for urgent dental needs.',
      description: 'Immediate evaluation and relief for acute toothache, broken or knocked-out teeth, oral swelling, and unexpected dental trauma in Siddipet.',
      highlights: [
        'Priority evaluation for urgent dental discomfort and injuries',
        'Immediate pain relief and emergency stabilization',
        'Clear diagnosis and customized follow-up treatment plan',
      ],
      duration: 'Immediate urgent evaluation',
      longevity: 'Immediate relief with follow-up restorative care',
      comfortRating: 'Rapid pain relief and comforting support',
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
            Every procedure at Shiva Smile Dental Care Hospital is performed under magnification, guided by clinical planning, and personalized to your unique oral health.
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
                  Shiva Smile Clinical Standard
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
