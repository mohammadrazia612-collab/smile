import React from 'react';

export type HeroImageMode = 'clinical' | 'sculpture';

interface HeroMediaProps {
  scrollY: number;
  imageMode?: HeroImageMode;
}

/**
 * HeroMedia: Edge-to-edge full-bleed background media layer.
 * Fills the entire hero section edge-to-edge without cropped boxes or borders.
 * Seamlessly supports both the existing ceramic sculpture and the real clinical suite image.
 */
export const HeroMedia: React.FC<HeroMediaProps> = ({ scrollY, imageMode = 'sculpture' }) => {
  const translateY = Math.min(scrollY * 0.18, 120);
  const scale = Math.max(1.03 - scrollY * 0.0003, 0.99);

  return (
    <div
      className="hero-layer hero-media"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          transform: `translate3d(0, ${translateY.toFixed(2)}px, 0) scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1)`,
          willChange: 'transform',
        }}
      >
        {/* Option A: Existing Architectural Ceramic Sculpture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: imageMode === 'sculpture' ? 1 : 0,
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <img
            src="/assets/images/hero-sculpture.jpg"
            alt="D Care Multi Speciality Dental Hospital — Modern Dental Care"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 42%',
              display: 'block',
            }}
            loading="eager"
          />
        </div>

        {/* Option B: New Reference Clinical Suite Image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: imageMode === 'clinical' ? 1 : 0,
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <img
            src="/assets/images/clinic-real-treatment.jpg"
            alt="D Care Multi Speciality Dental Hospital — Modern Treatment Suite, Siddipet"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 30%',
              display: 'block',
            }}
            loading="eager"
          />
          {/* Subtle soft-white wash over clinical photography for Apple-grade light legibility */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.35) 45%, rgba(255, 255, 255, 0.8) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
};
