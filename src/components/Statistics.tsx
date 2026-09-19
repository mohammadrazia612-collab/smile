import React, { useState, useEffect, useRef } from 'react';
import { Star, MessageSquare, Clock, MapPin } from 'lucide-react';

interface StatMetric {
  id: string;
  type: 'number' | 'text';
  targetNumber?: number;
  displayText?: string;
  suffix?: string;
  isDecimal?: boolean;
  suffixColor?: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconBorder: string;
  accentColor: string;
}

export const Statistics: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    rating: 0,
    reviews: 0,
    days: 0,
  });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const metrics: StatMetric[] = [
    {
      id: 'rating',
      type: 'number',
      targetNumber: 49, // 4.9
      isDecimal: true,
      suffix: '/5',
      label: 'Google Rating',
      description: '51 verified patient reviews',
      icon: <Star size={24} strokeWidth={1.8} color="#0071e3" />,
      iconBg: 'rgba(0, 113, 227, 0.08)',
      iconBorder: 'rgba(0, 113, 227, 0.14)',
      accentColor: '#0071e3',
    },
    {
      id: 'reviews',
      type: 'number',
      targetNumber: 51,
      suffix: '+',
      suffixColor: '#10b981',
      label: 'Google Reviews',
      description: 'Authentic local feedback',
      icon: <MessageSquare size={24} strokeWidth={1.8} color="#10b981" />,
      iconBg: 'rgba(16, 185, 129, 0.08)',
      iconBorder: 'rgba(16, 185, 129, 0.16)',
      accentColor: '#10b981',
    },
    {
      id: 'days',
      type: 'number',
      targetNumber: 7,
      suffix: 'Days',
      label: 'Weekly Care',
      description: 'Mon–Sat 10am–8pm • Sun 10:30am–2pm',
      icon: <Clock size={24} strokeWidth={1.8} color="#7c3aed" />,
      iconBg: 'rgba(124, 58, 237, 0.08)',
      iconBorder: 'rgba(124, 58, 237, 0.16)',
      accentColor: '#7c3aed',
    },
    {
      id: 'location',
      type: 'text',
      displayText: 'Siddipet',
      label: 'Hospital Location',
      description: 'Azam Pura, Telangana 502103',
      icon: <MapPin size={24} strokeWidth={1.8} color="#0071e3" />,
      iconBg: 'rgba(0, 113, 227, 0.08)',
      iconBorder: 'rgba(0, 113, 227, 0.14)',
      accentColor: '#0071e3',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          runSmoothCount();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const runSmoothCount = () => {
    const duration = 1600; // 1.6s smooth Apple count
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Apple-grade quartic ease-out
      const ease = 1 - Math.pow(1 - progress, 4);

      setCounts({
        rating: Math.round(49 * ease),
        reviews: Math.round(51 * ease),
        days: Math.round(7 * ease),
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCounts({
          rating: 49,
          reviews: 51,
          days: 7,
        });
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <section
      id="statistics"
      ref={sectionRef}
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        padding: 'clamp(56px, 7vw, 88px) 0',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div className="container">
        {/* Apple-style 4-column balanced grid strictly matching reference design */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            alignItems: 'stretch',
            position: 'relative',
          }}
          className="stats-ref-grid"
        >
          {metrics.map((item, index) => {
            const isHovered = hoveredId === item.id;
            const isLast = index === metrics.length - 1;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  padding: '0 clamp(16px, 2.8vw, 36px)',
                  borderRight: isLast ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'default',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translate3d(0, -4px, 0)' : 'translate3d(0, 0, 0)',
                  opacity: hasAnimated ? 1 : 0,
                  transitionDelay: `${index * 80}ms`,
                }}
                className={`stat-ref-col ${isLast ? 'stat-ref-last' : ''}`}
              >
                {/* Circular Pastel Badge Icon */}
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: item.iconBg,
                    border: `1px solid ${item.iconBorder}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '22px',
                    transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease',
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                    boxShadow: isHovered ? `0 8px 20px ${item.iconBg}` : 'none',
                  }}
                >
                  {item.icon}
                </div>

                {/* Main Metric Value */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'center',
                    gap: item.id === 'days' ? '6px' : '3px',
                    marginBottom: '8px',
                    lineHeight: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: item.id === 'location'
                        ? 'clamp(2.1rem, 3.2vw, 2.75rem)'
                        : 'clamp(2.75rem, 4.4vw, 3.65rem)',
                      fontWeight: 700,
                      letterSpacing: '-0.035em',
                      color: '#1d1d1f',
                      fontFamily: 'var(--font-sans)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.type === 'number'
                      ? item.isDecimal
                        ? (counts[item.id] / 10).toFixed(1)
                        : counts[item.id]
                      : item.displayText}
                  </span>

                  {item.suffix && (
                    <span
                      style={{
                        fontSize: item.id === 'days'
                          ? 'clamp(1.15rem, 1.8vw, 1.5rem)'
                          : item.id === 'reviews'
                          ? 'clamp(1.6rem, 2.4vw, 2.1rem)'
                          : 'clamp(1.2rem, 1.8vw, 1.5rem)',
                        fontWeight: item.id === 'reviews' ? 600 : 500,
                        letterSpacing: '-0.02em',
                        color: item.suffixColor || '#4b5563',
                        marginLeft: item.id === 'days' ? '2px' : '1px',
                      }}
                    >
                      {item.suffix}
                    </span>
                  )}
                </div>

                {/* Metric Label */}
                <div
                  style={{
                    fontSize: '1.0625rem',
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: '12px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.label}
                </div>

                {/* Colored Decorative Accent Line */}
                <div
                  style={{
                    width: isHovered ? '42px' : '30px',
                    height: '2.5px',
                    borderRadius: '9999px',
                    backgroundColor: item.accentColor,
                    marginBottom: '14px',
                    transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />

                {/* Subtext Description */}
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    lineHeight: 1.48,
                    fontWeight: 400,
                    margin: 0,
                    maxWidth: '220px',
                  }}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .stats-ref-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 48px 0 !important;
          }
          .stat-ref-col {
            border-right: none !important;
            padding: 0 24px !important;
          }
          .stat-ref-col:nth-child(odd) {
            border-right: 1px solid rgba(0, 0, 0, 0.06) !important;
          }
        }
        @media (max-width: 540px) {
          .stats-ref-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .stat-ref-col {
            border-right: none !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            padding: 0 16px 32px 16px !important;
          }
          .stat-ref-col:last-child {
            border-bottom: none;
            padding-bottom: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};
