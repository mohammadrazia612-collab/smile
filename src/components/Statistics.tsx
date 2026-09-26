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

type AnimationPhase = 'idle' | 'revealed' | 'counting' | 'settled';

export const Statistics: React.FC = () => {
  const [phase, setPhase] = useState<AnimationPhase>('idle');
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    rating: 0,
    reviews: 0,
    days: 0,
  });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const timersRef = useRef<number[]>([]);

  const metrics: StatMetric[] = [
    {
      id: 'rating',
      type: 'number',
      targetNumber: 49, // 4.9
      isDecimal: true,
      suffix: '/5',
      label: 'Google Rating',
      description: '91 verified patient reviews',
      icon: <Star size={24} strokeWidth={1.8} color="#0071e3" />,
      iconBg: 'rgba(0, 113, 227, 0.08)',
      iconBorder: 'rgba(0, 113, 227, 0.14)',
      accentColor: '#0071e3',
    },
    {
      id: 'reviews',
      type: 'number',
      targetNumber: 91,
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
      description: 'Mon–Sat to 9:00 PM • Sun 9am–5pm',
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
      description: 'Siddipet – Medak Road, beside Kotak Bank',
      icon: <MapPin size={24} strokeWidth={1.8} color="#0071e3" />,
      iconBg: 'rgba(0, 113, 227, 0.08)',
      iconBorder: 'rgba(0, 113, 227, 0.14)',
      accentColor: '#0071e3',
    },
  ];

  const triggerAnimationSequence = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    // Respect reduced-motion preferences if set by user system
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setCounts({ rating: 49, reviews: 91, days: 7 });
      setPhase('settled');
      return;
    }

    // Sequence 1: Statistics section and badge icons subtly reveal
    setPhase('revealed');

    // Sequence 2: Numbers smoothly emerge from 0 and count upward
    const countTimer = window.setTimeout(() => {
      setPhase('counting');
      runSmoothAppleCount();
    }, 140);
    timersRef.current.push(countTimer);
  };

  const runSmoothAppleCount = () => {
    // 1500ms duration for natural, measured, non-rushed Apple keynote cadence
    const duration = 1500;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(Math.max(elapsed / duration, 0), 1);

      // Smooth Apple-grade ease-out (exponent 2.3):
      // Steady organic acceleration from 0 -> natural decelerating settle (0 -> 10 -> 25 -> 50 -> 100 curve)
      const ease = 1 - Math.pow(1 - progress, 2.3);

      setCounts({
        rating: Math.min(49, Math.round(49 * ease)),
        reviews: Math.min(91, Math.round(91 * ease)),
        days: Math.min(7, Math.round(7 * ease)),
      });

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        // Clean final settling
        setCounts({
          rating: 49,
          reviews: 91,
          days: 7,
        });
        setPhase('settled');
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    if (hasTriggeredRef.current) return;

    const checkIsInViewport = () => {
      if (hasTriggeredRef.current || !sectionRef.current) return false;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Meaningfully visible check:
      // Top has reached within 92% of the viewport and element has not passed completely
      const isVisible = rect.top < windowHeight * 0.92 && rect.bottom > 40;
      if (isVisible) {
        triggerAnimationSequence();
        return true;
      }
      return false;
    };

    // 1. Initial page load check: if statistics are part of the opening viewport/initial screen, trigger immediately
    const initialTimer = window.setTimeout(() => {
      checkIsInViewport();
    }, 60);
    timersRef.current.push(initialTimer);

    // 2. High-performance IntersectionObserver for scroll trigger
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if ((entry.isIntersecting || entry.intersectionRatio >= 0.08) && !hasTriggeredRef.current) {
            triggerAnimationSequence();
            if (observer) observer.disconnect();
          }
        },
        {
          threshold: [0.08, 0.18, 0.3],
          rootMargin: '0px 0px -30px 0px',
        }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
    }

    // 3. Passive scroll/resize fallback listener
    const handleScrollOrResize = () => {
      if (checkIsInViewport()) {
        window.removeEventListener('scroll', handleScrollOrResize);
        window.removeEventListener('resize', handleScrollOrResize);
        if (observer) observer.disconnect();
      }
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      timersRef.current.forEach((t) => clearTimeout(t));
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const isRevealed = phase !== 'idle';
  const isCountingOrSettled = phase === 'counting' || phase === 'settled';

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
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? 'translateY(0)' : 'translateY(18px)',
        transition: 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform',
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
                  opacity: isRevealed ? 1 : 0,
                  transform: isHovered
                    ? 'translate3d(0, -4px, 0)'
                    : isRevealed
                    ? 'translate3d(0, 0, 0)'
                    : 'translate3d(0, 16px, 0)',
                  transition: phase === 'settled'
                    ? 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: phase === 'settled' ? '0ms' : `${index * 75}ms`,
                  willChange: 'transform, opacity',
                }}
                className={`stat-ref-col ${isLast ? 'stat-ref-last' : ''}`}
              >
                {/* 1. Circular Pastel Badge Icon (reveals first with gentle scale) */}
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
                    opacity: isRevealed ? 1 : 0,
                    transform: isHovered
                      ? 'scale(1.08)'
                      : isRevealed
                      ? 'scale(1) translateY(0)'
                      : 'scale(0.85) translateY(8px)',
                    boxShadow: isHovered ? `0 8px 20px ${item.iconBg}` : 'none',
                    transition: phase === 'settled'
                      ? 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease'
                      : 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease',
                    transitionDelay: phase === 'settled' ? '0ms' : `${index * 75 + 30}ms`,
                  }}
                >
                  {item.icon}
                </div>

                {/* 2. Main Metric Value (smoothly counts up from 0 to target value) */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'center',
                    gap: item.id === 'days' ? '6px' : '3px',
                    marginBottom: '8px',
                    lineHeight: 1,
                    opacity: isCountingOrSettled ? 1 : 0,
                    transform: isCountingOrSettled ? 'translateY(0)' : 'translateY(10px)',
                    transition: phase === 'settled'
                      ? 'none'
                      : 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: phase === 'settled' ? '0ms' : `${index * 50}ms`,
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
                      fontVariantNumeric: 'tabular-nums',
                      minWidth: item.type === 'number' ? '1ch' : 'auto',
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
                        opacity: isCountingOrSettled ? 1 : 0,
                        transition: phase === 'settled'
                          ? 'none'
                          : 'opacity 0.35s ease',
                      }}
                    >
                      {item.suffix}
                    </span>
                  )}
                </div>

                {/* 3. Metric Label (subtly settles into place) */}
                <div
                  style={{
                    fontSize: '1.0625rem',
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: '12px',
                    letterSpacing: '-0.01em',
                    opacity: isCountingOrSettled ? 1 : 0,
                    transform: isCountingOrSettled ? 'translateY(0)' : 'translateY(8px)',
                    transition: phase === 'settled'
                      ? 'none'
                      : 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: phase === 'settled' ? '0ms' : `${index * 75 + 140}ms`,
                  }}
                >
                  {item.label}
                </div>

                {/* 4. Colored Decorative Accent Line */}
                <div
                  style={{
                    width: isHovered ? '42px' : '30px',
                    height: '2.5px',
                    borderRadius: '9999px',
                    backgroundColor: item.accentColor,
                    marginBottom: '14px',
                    opacity: isCountingOrSettled ? 1 : 0,
                    transform: isCountingOrSettled ? 'scaleX(1)' : 'scaleX(0.3)',
                    transformOrigin: 'center',
                    transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: phase === 'settled' ? '0ms' : `${index * 75 + 180}ms`,
                  }}
                />

                {/* 5. Subtext Description */}
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    lineHeight: 1.48,
                    fontWeight: 400,
                    margin: 0,
                    maxWidth: '220px',
                    opacity: isCountingOrSettled ? 1 : 0,
                    transform: isCountingOrSettled ? 'translateY(0)' : 'translateY(6px)',
                    transition: phase === 'settled'
                      ? 'none'
                      : 'opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: phase === 'settled' ? '0ms' : `${index * 75 + 220}ms`,
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

