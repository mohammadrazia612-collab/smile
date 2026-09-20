import React, { useState, useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface ClinicalCase {
  id: string;
  title: string;
  category: 'veneers' | 'restoration' | 'aligners';
  categoryLabel: string;
  image: string;
  shade: string;
  duration: string;
  visits: string;
  description: string;
}

const CLINICAL_CASES: ClinicalCase[] = [
  {
    id: 'case-1',
    title: 'Feldspathic Porcelain Veneers',
    category: 'veneers',
    categoryLabel: 'Porcelain Veneers',
    image: '/assets/images/clinical-cases/case1-comparison.png',
    shade: 'Bleach Shade BL2 Natural',
    duration: '10 Days',
    visits: '2 Visits',
    description: 'Closed midline spacing, corrected lateral incisor rotation, and brightened tooth shade with 8 handcrafted ultra-thin feldspathic porcelain veneers.',
  },
  {
    id: 'case-2',
    title: 'Anterior Aesthetic Ceramic Restoration',
    category: 'restoration',
    categoryLabel: 'Aesthetic Restoration',
    image: '/assets/images/clinical-cases/case2-comparison.png',
    shade: 'High-Translucency E-Max BL1',
    duration: '14 Days',
    visits: '2 Visits',
    description: 'Comprehensive restorative correction of deep intrinsic enamel discoloration and incisal edge attrition using high-translucency ceramic veneers.',
  },
  {
    id: 'case-3',
    title: 'Clear Aligner Aesthetic Alignment',
    category: 'aligners',
    categoryLabel: 'Clear Aligners',
    image: '/assets/images/clinical-cases/case3-comparison.jpg',
    shade: 'Natural Enamel Harmony',
    duration: '6 Months',
    visits: '5 Sessions',
    description: 'Orthodontic correction of deep anterior crowding and tooth rotation without wires or brackets, finalized with biological enamel micro-polishing.',
  },
];

interface CaseCardProps {
  caseData: ClinicalCase;
  index: number;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseData, index }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Viewport reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: isCardHovered
          ? '0 20px 44px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03)'
          : '0 4px 20px rgba(0, 0, 0, 0.04)',
        transform: isCardHovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease, filter 0.6s ease',
        display: 'flex',
        flexDirection: 'column',
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'none' : 'blur(4px)',
        transitionDelay: `${index * 120}ms`,
      }}
    >
      {/* High-Resolution Clinical Case Comparison Image */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          overflow: 'hidden',
          backgroundColor: '#0a0a0c',
        }}
      >
        <img
          src={caseData.image}
          alt={`${caseData.title} Clinical Case`}
          draggable={false}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            display: 'block',
            transform: isCardHovered ? 'scale(1.025)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Top-Left Clinical Case Badge */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            zIndex: 5,
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#0071e3',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            pointerEvents: 'none',
          }}
        >
          <Sparkles size={11} />
          <span>Clinical Case</span>
        </div>

        {/* Top-Right Category Pill */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 5,
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(29, 29, 31, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            color: '#ffffff',
            pointerEvents: 'none',
          }}
        >
          {caseData.categoryLabel}
        </div>
      </div>

      {/* Card Content Information */}
      <div
        style={{
          padding: '24px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h3
            style={{
              fontSize: '1.1875rem',
              fontWeight: 700,
              color: '#1d1d1f',
              letterSpacing: '-0.02em',
              marginBottom: '8px',
              lineHeight: 1.3,
            }}
          >
            {caseData.title}
          </h3>

          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
              marginBottom: '20px',
            }}
          >
            {caseData.description}
          </p>
        </div>

        {/* Metadata Row */}
        <div
          style={{
            borderTop: '1px solid rgba(0, 0, 0, 0.06)',
            paddingTop: '14px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.8125rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
            <span style={{ fontWeight: 500 }}>{caseData.shade}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: '#1d1d1f' }}>
            <span>{caseData.duration}</span>
            <span style={{ color: 'rgba(0, 0, 0, 0.25)' }}>•</span>
            <span style={{ color: '#0071e3' }}>{caseData.visits}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SmileGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'veneers' | 'restoration' | 'aligners'>('all');

  const filteredCases = activeFilter === 'all'
    ? CLINICAL_CASES
    : CLINICAL_CASES.filter((c) => c.category === activeFilter);

  return (
    <section
      id="gallery"
      className="section-padding"
      style={{
        backgroundColor: '#fbfbfd',
        position: 'relative',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header apple-reveal">
          <span className="eyebrow">Clinical Documentation</span>
          <h2 className="section-title">Verified transformations. Calibrated to millimeter precision.</h2>
          <p className="section-subtitle">
            Every clinical outcome represents bespoke aesthetic artistry and micro-dentistry. Examine documented clinical cases comparing preoperative dentition directly with completed treatment.
          </p>
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '44px',
          }}
        >
          {[
            { label: 'All Cases (3)', value: 'all' },
            { label: 'Porcelain Veneers', value: 'veneers' },
            { label: 'Aesthetic Restorations', value: 'restoration' },
            { label: 'Clear Aligners', value: 'aligners' },
          ].map((tab) => {
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value as typeof activeFilter)}
                style={{
                  padding: '9px 20px',
                  borderRadius: '9999px',
                  fontSize: '0.8125rem',
                  fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? '#1d1d1f' : '#ffffff',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  border: isActive ? '1px solid #1d1d1f' : '1px solid rgba(0, 0, 0, 0.08)',
                  cursor: 'pointer',
                  boxShadow: isActive
                    ? '0 4px 14px rgba(0, 0, 0, 0.12)'
                    : '0 2px 6px rgba(0, 0, 0, 0.02)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 3 Clinical Cases Responsive Grid */}
        <div
          className="smile-gallery-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '32px',
          }}
        >
          {filteredCases.map((caseItem, idx) => (
            <CaseCard key={caseItem.id} caseData={caseItem} index={idx} />
          ))}
        </div>

        {/* Clinical Transparency & Consultation Note */}
        <div
          style={{
            maxWidth: '840px',
            margin: '48px auto 0 auto',
            textAlign: 'center',
            padding: '24px',
            borderRadius: '20px',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.02)',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: '100%',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#1d1d1f',
              marginBottom: '8px',
            }}
          >
            <span>Representative Clinical Case Documentation</span>
            <span>•</span>
            <span style={{ color: '#0071e3' }}>Shiva Smile Dental Care Hospital</span>
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            * Individual patient outcomes vary based on pre-existing enamel structure, occlusal load, and bone anatomy. Treatment duration reflects active clinical time. All procedures require comprehensive 3D intraoral diagnostics and smile simulation prior to clinical execution.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SmileGallery;
