import React, { useState, useEffect } from 'react';
import { HeroBackground } from './HeroBackground';
import { HeroMedia, HeroImageMode } from './HeroMedia';
import { HeroSpline3D } from './HeroSpline3D';
import { HeroEffects } from './HeroEffects';
import { HeroContent } from './HeroContent';
import { HeroCTA } from './HeroCTA';

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
  splineSceneUrl?: string | null;
}

/**
 * Master Hero Section
 *
 * Fully matches the reference composition:
 * - Edge-to-edge dental image filling the full background.
 * - Naturally layered headline, subtitle, buttons, and discover more indicator.
 * - Seamlessly supports both the ceramic tooth sculpture and the live clinical suite image.
 * - Keeps independent layers and modular future Spline 3D slot intact.
 */
export const Hero: React.FC<HeroProps> = ({
  onBookClick,
  onExploreClick,
  splineSceneUrl = null,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [imageMode, setImageMode] = useState<HeroImageMode>('sculpture');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '110px',
        paddingBottom: '36px',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Layer 1: Background canvas */}
      <HeroBackground />

      {/* Layer 2: Edge-to-edge full-bleed dental visual (sculpture or clinical suite) */}
      <HeroMedia scrollY={scrollY} imageMode={imageMode} />

      {/* Layer 3: Future Spline 3D container (isolated, modular) */}
      <HeroSpline3D sceneUrl={splineSceneUrl} />

      {/* Layer 4: Ambient subtle bottom blend transition */}
      <HeroEffects />

      {/* Layer 5 & 6: Centered Typography & CTA Actions layered over the visual */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto 0',
        }}
      >
        <HeroContent scrollY={scrollY} />
        <HeroCTA onBookClick={onBookClick} onExploreClick={onExploreClick} />
      </div>

      {/* Discreet Visual Mode Switcher */}
      <div
        className="hero-view-toggle"
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '24px',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
        }}
      >
        <button
          onClick={() => setImageMode('sculpture')}
          aria-label="Switch to ceramic sculpture visual"
          style={{
            padding: '5px 12px',
            borderRadius: '9999px',
            fontSize: '0.6875rem',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            backgroundColor: imageMode === 'sculpture' ? '#1d1d1f' : 'transparent',
            color: imageMode === 'sculpture' ? '#ffffff' : 'var(--text-secondary)',
            transition: 'all 0.2s ease',
          }}
        >
          Ceramic Sculpture
        </button>
        <button
          onClick={() => setImageMode('clinical')}
          aria-label="Switch to clinical treatment suite visual"
          style={{
            padding: '5px 12px',
            borderRadius: '9999px',
            fontSize: '0.6875rem',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            backgroundColor: imageMode === 'clinical' ? '#1d1d1f' : 'transparent',
            color: imageMode === 'clinical' ? '#ffffff' : 'var(--text-secondary)',
            transition: 'all 0.2s ease',
          }}
        >
          Clinical Suite
        </button>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hero-view-toggle {
            bottom: 12px !important;
            right: 50% !important;
            transform: translateX(50%) !important;
          }
        }
      `}</style>
    </section>
  );
};
