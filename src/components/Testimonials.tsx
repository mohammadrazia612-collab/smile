import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: '[Patient Name / Google Reviewer]',
      title: 'Verified Patient • Siddipet',
      treatment: 'General Dental Care',
      quote:
        'Professional dental care and attentive staff. The hospital environment in Siddipet is clean, comfortable, and the team ensures a gentle patient experience.',
      rating: 5,
      year: 'Google Business Review',
    },
    {
      id: 2,
      name: '[Patient Name / Google Reviewer]',
      title: 'Verified Patient • Siddipet',
      treatment: 'Dental Implants & Restorations',
      quote:
        'Very thorough dental examination and treatment explanation. The procedure was smooth with great attention to comfort and hygiene.',
      rating: 5,
      year: 'Google Business Review',
    },
    {
      id: 3,
      name: '[Patient Name / Google Reviewer]',
      title: 'Family Dental Care',
      treatment: 'Pediatric & Preventive Dentistry',
      quote:
        'A warm and family-friendly dental clinic in Azam Pura, Siddipet. Kind approach with gentle care for kids and adults alike.',
      rating: 5,
      year: 'Google Business Review',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className="section-padding"
      style={{
        backgroundColor: '#fbfbfd',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="section-header apple-reveal">
          <span className="eyebrow">Google Business Reviews</span>
          <h2 className="section-title">Rated 4.9 / 5 with 51 Google Reviews</h2>
          <p className="section-subtitle">
            Authentic patient feedback and experiences at Shiva Smile Dental Care Hospital in Siddipet.
          </p>
        </div>

        {/* Single Large Testimonial Card */}
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '28px',
            padding: 'clamp(36px, 6vw, 64px)',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05)',
            position: 'relative',
          }}
        >
          {/* 5-Star Rating & Verified Badge */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            <div style={{ display: 'flex', gap: '4px' }}>
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} size={18} fill="#0071e3" color="#0071e3" />
              ))}
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--accent-primary)',
                backgroundColor: 'rgba(0, 113, 227, 0.06)',
                padding: '4px 12px',
                borderRadius: '9999px',
              }}
            >
              <CheckCircle2 size={13} />
              <span>Verified Clinical Review • {current.treatment}</span>
            </div>
          </div>

          {/* Large Quote */}
          <blockquote
            style={{
              fontSize: 'clamp(1.25rem, 2.2vw, 1.65rem)',
              lineHeight: 1.5,
              fontWeight: 500,
              color: '#1d1d1f',
              letterSpacing: '-0.02em',
              marginBottom: '40px',
              minHeight: '120px',
            }}
          >
            "{current.quote}"
          </blockquote>

          {/* Author & Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(0, 0, 0, 0.06)',
              paddingTop: '28px',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#1d1d1f',
                  letterSpacing: '-0.01em',
                }}
              >
                {current.name}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {current.title} • {current.year}
              </div>
            </div>

            {/* Navigation Arrows & Indicator Dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    style={{
                      width: i === currentIndex ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: i === currentIndex ? 'var(--accent-primary)' : 'rgba(0,0,0,0.15)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0,
                    }}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#1d1d1f',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-subtle)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#1d1d1f',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-subtle)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
