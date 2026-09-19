import React from 'react';

/**
 * HeroEffects: Subtle ambient transitions.
 * Softly blends the bottom of the full-bleed hero visual into the statistics section.
 */
export const HeroEffects: React.FC = () => {
  return (
    <div
      className="hero-layer hero-effects"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 4,
        pointerEvents: 'none',
        background: `
          linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 25%),
          linear-gradient(0deg, #ffffff 0%, rgba(255, 255, 255, 0.4) 12%, rgba(255, 255, 255, 0) 30%)
        `,
      }}
    />
  );
};
