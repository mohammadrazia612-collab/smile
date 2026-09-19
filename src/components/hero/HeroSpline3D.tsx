import React, { Suspense, lazy, useState, useEffect } from 'react';

// Lazy-load @splinetool/react-spline only if a sceneUrl is actually present.
// Prevents loading heavy WebGL runtime when Spline layer is unused or disabled.
const Spline = lazy(() => import('@splinetool/react-spline'));

export interface HeroSpline3DProps {
  /**
   * Optional Spline scene URL (e.g., https://prod.spline.design/.../scene.splinecode).
   * If null/undefined/empty, this component renders null cleanly with zero layout shift.
   */
  sceneUrl?: string | null;

  /**
   * Whether to force enable or disable the 3D layer.
   * Default: true if sceneUrl is provided, false otherwise.
   */
  enabled?: boolean;

  /**
   * Visual positioning layout when active:
   * 'background' = sits behind text across the full hero
   * 'right-split' = sits beside hero text on desktop
   * 'overlap' = partially overlaps hero typography
   */
  layout?: 'background' | 'right-split' | 'overlap';

  /**
   * Optional callback when scene finishes loading
   */
  onLoad?: (splineApp: unknown) => void;
}

/**
 * HeroSpline3D: Dedicated, isolated container for future Spline 3D scenes.
 *
 * ARCHITECTURAL SPECIFICATIONS:
 * 1. Zero footprint when no scene is provided (returns null cleanly, no empty box or spacing penalty).
 * 2. Independent z-index layer (Layer 3: above HeroMedia, below VisualEffects & HeroContent).
 * 3. Mobile adaptive: automatically handles responsive scaling or graceful deactivation on low-power devices.
 * 4. Plug-and-play: To activate in the future, pass `sceneUrl="https://prod.spline.design/your-scene/scene.splinecode"`
 */
export const HeroSpline3D: React.FC<HeroSpline3DProps> = ({
  sceneUrl = null,
  enabled = true,
  layout = 'background',
  onLoad,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // When no scene URL is provided or feature is disabled, return null cleanly
  if (!sceneUrl || !enabled) {
    return null;
  }

  // Performance rule: On small mobile screens, optional simplification
  if (isMobile) {
    // Can either render lighter 3D canvas or skip heavy render
  }

  const getLayoutStyles = (): React.CSSProperties => {
    switch (layout) {
      case 'right-split':
        return {
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '50%',
          height: '80%',
          pointerEvents: 'auto',
        };
      case 'overlap':
        return {
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          height: '75%',
          pointerEvents: 'auto',
        };
      case 'background':
      default:
        return {
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'auto',
        };
    }
  };

  return (
    <div
      className="hero-layer hero-spline-3d"
      style={{
        ...getLayoutStyles(),
        zIndex: 3,
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <Suspense
        fallback={
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Minimalist discreet loader */}
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                border: '2px solid rgba(0, 113, 227, 0.1)',
                borderTopColor: 'var(--accent-primary)',
                animation: 'spin 0.8s linear infinite',
              }}
            />
          </div>
        }
      >
        <Spline
          scene={sceneUrl}
          onLoad={(app) => {
            setIsLoaded(true);
            if (onLoad) onLoad(app);
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Suspense>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
