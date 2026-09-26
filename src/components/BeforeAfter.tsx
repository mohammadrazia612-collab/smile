import React, { useState, useRef, useCallback } from 'react';
import { ChevronsLeftRight, Sparkles } from 'lucide-react';

export const BeforeAfter: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const rafRef = useRef<number | null>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      setSliderPosition(percentage);
    });
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Pointer capture was already released
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - (e.shiftKey ? 8 : 2.5)));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + (e.shiftKey ? 8 : 2.5)));
    }
  };

  return (
    <section
      id="results"
      className="section-padding"
      style={{
        backgroundColor: '#ffffff',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header apple-reveal">
          <span className="eyebrow">Aesthetic Precision</span>
          <h2 className="section-title">Harmonious smiles, calibrated to millimeter accuracy.</h2>
          <p className="section-subtitle">
            Drag the interactive slider to examine the transformation: from natural enamel wear and uneven symmetry to bespoke handcrafted ceramic veneers.
          </p>
        </div>

        {/* Before / After Slider Box */}
        <div
          ref={containerRef}
          role="slider"
          aria-label="Interactive before and after comparison slider. Use left and right arrow keys to adjust."
          aria-valuenow={Math.round(sliderPosition)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '900px',
            margin: '0 auto',
            aspectRatio: '16/10',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            cursor: isDragging ? 'grabbing' : 'ew-resize',
            backgroundColor: '#000000',
            touchAction: 'none',
          }}
        >
          {/* Layer 1: AFTER Image (Full background) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <img
              src="/assets/images/teeth-after.jpg"
              alt="After Ceramic Restoration"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
                display: 'block',
              }}
              draggable={false}
              loading="eager"
            />
            {/* After Tag */}
            <div
              className="before-after-tag before-after-tag-right"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: 5,
                padding: '8px 16px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent-primary)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Sparkles size={14} />
              <span>AFTER • CERAMIC VENEERS</span>
            </div>
          </div>

          {/* Layer 2: BEFORE Image (Clipped overlay) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              WebkitClipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              zIndex: 2,
            }}
          >
            <img
              src="/assets/images/teeth-before.jpg"
              alt="Before Treatment — Initial Dentition"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
                display: 'block',
              }}
              draggable={false}
              loading="eager"
            />
            {/* Before Tag */}
            <div
              className="before-after-tag before-after-tag-left"
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 5,
                padding: '8px 16px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(29, 29, 31, 0.88)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              }}
            >
              BEFORE • INITIAL STATE
            </div>
          </div>

          {/* Draggable Divider Handle Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${sliderPosition}%`,
              transform: 'translateX(-50%)',
              width: '2px',
              backgroundColor: '#ffffff',
              zIndex: 10,
              boxShadow: '0 0 12px rgba(0, 0, 0, 0.4)',
              pointerEvents: 'none',
              willChange: 'left',
              transition: isDragging ? 'none' : 'left 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Apple-style Round Center Handle */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: isDragging ? 'translate(-50%, -50%) scale(1.14)' : 'translate(-50%, -50%) scale(1)',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                boxShadow: isDragging
                  ? '0 8px 28px rgba(0, 0, 0, 0.38)'
                  : '0 4px 18px rgba(0, 0, 0, 0.24)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1d1d1f',
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease',
              }}
            >
              <ChevronsLeftRight size={18} />
            </div>
          </div>
        </div>

        {/* Case Narrative & Transparent Medical Disclosure */}
        <div
          style={{
            maxWidth: '820px',
            margin: '36px auto 0 auto',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: '100%',
              boxSizing: 'border-box',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '9999px',
              backgroundColor: 'var(--bg-subtle)',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
              marginBottom: '12px',
            }}
          >
            <span>Case Demonstration: Tooth Whitening &amp; Enamel Restoration</span>
            <span>•</span>
            <span>D Care Multi Speciality Dental Hospital</span>
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            * Representative clinical case demonstration. Clinical outcomes vary based on individual biological bone density, gingival scallop, and pre-existing dental health. A comprehensive digital scan and diagnostic evaluation is required prior to any restorative procedure.
          </p>
        </div>
      </div>
    </section>
  );
};
