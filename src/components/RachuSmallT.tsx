import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Heart, Eye, X, ChevronRight, Camera, Smile } from 'lucide-react';

interface PortraitItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  description: string;
  accent: string;
}

const PORTRAITS: PortraitItem[] = [
  {
    id: 'rachu-1',
    title: 'Natural Warmth',
    subtitle: 'Close-Up Radiance',
    badge: 'Genuine Smile',
    image: '/assets/images/rachu/rachu-3.jpg',
    description: 'A genuine, bright expression reflecting effortless poise, vitality, and authentic self-confidence.',
    accent: '#0071e3',
  },
  {
    id: 'rachu-2',
    title: 'Classic Poise',
    subtitle: 'Traditional Charm',
    badge: 'Timeless Elegance',
    image: '/assets/images/rachu/rachu-1.jpg',
    description: 'Vibrant crimson saree embodying cultural grace, self-assurance, and elegant personal style.',
    accent: '#e11d48',
  },
  {
    id: 'rachu-3',
    title: 'Luminous Light',
    subtitle: 'Outdoor Glow',
    badge: 'Vibrant Harmony',
    image: '/assets/images/rachu/rachu-2.jpg',
    description: 'Sunlit warmth and natural glow, capturing quiet joy and luminous harmony in everyday light.',
    accent: '#059669',
  },
];

export const RachuSmallT: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<PortraitItem | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="rachu-small-t"
      ref={sectionRef}
      className="section-padding"
      style={{
        backgroundColor: '#fafafb',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.05) 0%, rgba(0, 113, 227, 0.03) 50%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 113, 227, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 60px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(225, 29, 72, 0.08)',
              color: '#e11d48',
              fontSize: '0.8125rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '16px',
            }}
          >
            <Sparkles size={14} />
            <span>Spotlight Feature</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
              letterSpacing: '-0.035em',
              fontWeight: 800,
              lineHeight: 1.08,
              color: '#1d1d1f',
              marginBottom: '18px',
            }}
          >
            RACHU SMALL T
          </h2>

          <p className="section-subtitle" style={{ maxWidth: '620px', margin: '0 auto' }}>
            A curated showcase celebrating natural radiance, authentic poise, and the vibrant beauty of a genuine, confident smile.
          </p>
        </div>

        {/* 3-Portrait Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '28px',
            maxWidth: '1160px',
            margin: '0 auto',
          }}
          className="rachu-grid"
        >
          {PORTRAITS.map((item, index) => {
            const isHovered = hoveredCard === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setActivePhoto(item)}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid rgba(0, 0, 0, 0.07)',
                  boxShadow: isHovered
                    ? '0 20px 48px rgba(0, 0, 0, 0.1), 0 4px 14px rgba(0, 0, 0, 0.04)'
                    : '0 4px 20px rgba(0, 0, 0, 0.03)',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: `${index * 120}ms`,
                }}
              >
                {/* Image Container with 4:5 aspect ratio */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '4 / 5',
                    overflow: 'hidden',
                    backgroundColor: '#111827',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 20%',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 40%, rgba(0,0,0,0.65) 100%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Top Floating Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      zIndex: 2,
                      padding: '5px 12px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(255, 255, 255, 0.92)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      color: '#1d1d1f',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                    }}
                  >
                    <Smile size={13} color={item.accent} />
                    <span>{item.badge}</span>
                  </div>

                  {/* Click to View Hint */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      zIndex: 2,
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 0, 0.45)',
                      backdropFilter: 'blur(8px)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: isHovered ? 1 : 0.75,
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <Eye size={15} />
                  </div>

                  {/* In-Image Caption Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '16px',
                      right: '16px',
                      zIndex: 2,
                      color: '#ffffff',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        opacity: 0.85,
                        fontWeight: 600,
                      }}
                    >
                      {item.subtitle}
                    </span>
                    <h3
                      style={{
                        fontSize: '1.375rem',
                        fontWeight: 700,
                        margin: '2px 0 0 0',
                        letterSpacing: '-0.02em',
                        color: '#ffffff',
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div
                  style={{
                    padding: '20px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.55,
                      margin: '0 0 16px 0',
                    }}
                  >
                    {item.description}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: item.accent,
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Camera size={14} />
                      <span>View High-Res Photo</span>
                    </span>
                    <ChevronRight size={14} style={{ transform: isHovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.2s ease' }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Inspirational Bar */}
        <div
          style={{
            maxWidth: '840px',
            margin: '48px auto 0 auto',
            padding: '20px 28px',
            borderRadius: '20px',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            textAlign: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(225, 29, 72, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#e11d48',
              flexShrink: 0,
            }}
          >
            <Heart size={16} />
          </div>
          <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#1d1d1f' }}>
            Every smile tells a story of confidence, wellness, and self-expression.
          </span>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn 0.25s ease-out',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '640px',
              width: '100%',
              maxHeight: '90vh',
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              aria-label="Close photo preview"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(8px)',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <X size={18} />
            </button>

            {/* Modal Image */}
            <div style={{ width: '100%', maxHeight: '65vh', overflow: 'hidden', backgroundColor: '#0b0f19' }}>
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '65vh',
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto',
                }}
              />
            </div>

            {/* Modal Details */}
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span
                  style={{
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(225, 29, 72, 0.08)',
                    color: '#e11d48',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  {activePhoto.badge}
                </span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  RACHU SMALL T Collection
                </span>
              </div>

              <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#1d1d1f', margin: '0 0 8px 0' }}>
                {activePhoto.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Responsive Grid Styles */}
      <style>{`
        @media (max-width: 900px) {
          .rachu-grid {
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)) !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 640px) {
          .rachu-grid {
            grid-template-columns: 1fr !important;
            max-width: 380px !important;
          }
        }
      `}</style>
    </section>
  );
};
