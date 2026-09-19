import React from 'react';

/**
 * HeroBackground: Independent subtle gradient & lighting canvas.
 * Kept strictly off-white / light per Apple aesthetic.
 */
export const HeroBackground: React.FC = () => {
  return (
    <div
      className="hero-layer hero-background"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        backgroundColor: '#fbfbfd',
        backgroundImage: `
          radial-gradient(circle at 50% 20%, rgba(0, 113, 227, 0.04) 0%, transparent 60%),
          radial-gradient(circle at 80% 80%, rgba(0, 0, 0, 0.02) 0%, transparent 40%),
          linear-gradient(180deg, #ffffff 0%, #fbfbfd 100%)
        `,
        pointerEvents: 'none',
      }}
    />
  );
};
