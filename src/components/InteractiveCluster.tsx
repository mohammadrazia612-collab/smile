import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Sparkles, Cpu, Layers, ShieldCheck, Zap, Smile, Eye, ArrowUpRight } from 'lucide-react';

interface ClusterNode {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  techSpec: string;
  icon: React.ReactNode;
  initialX: number; // percentage (0 - 100)
  initialY: number; // percentage (0 - 100)
  depth: number; // multiplier for parallax inertia
  rotFactor: number;
}

export const InteractiveCluster: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<ClusterNode | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Smooth lerp physics state
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  const clusterNodes: ClusterNode[] = [
    {
      id: 'tooth-anatomy',
      name: 'Bio-Mimetic Enamel',
      category: 'Micro-Structure',
      shortDesc: 'Multi-layer feldspathic porcelain mimicking natural light diffraction.',
      fullDesc: 'Custom-layered ceramic restorations engineered to match the natural fluorescence, opalescence, and micro-hardness of human dental enamel.',
      techSpec: 'Translucency: 49% | Vickers Hardness: 420 HV',
      icon: <Sparkles size={20} color="#0071e3" />,
      initialX: 20,
      initialY: 28,
      depth: 1.4,
      rotFactor: 1.2,
    },
    {
      id: 'smile-architecture',
      name: 'Harmonic Smile Curve',
      category: 'Aesthetic Geometry',
      shortDesc: 'Golden-ratio facial curvature analysis for naturally symmetrical smiles.',
      fullDesc: 'We calibrate tooth length, incisal display, and lip curvature according to individual facial dynamics, delivering an authentically natural smile.',
      techSpec: 'Sub-millimeter facial symmetry alignment',
      icon: <Smile size={20} color="#0071e3" />,
      initialX: 74,
      initialY: 22,
      depth: 1.9,
      rotFactor: -1.5,
    },
    {
      id: 'dental-implant',
      name: 'Titanium Dental Implant',
      category: 'Biocompatibility',
      shortDesc: 'Biocompatible titanium post engineered for stable bone integration.',
      fullDesc: 'Medical-grade titanium root replacements designed to support crowns and bridges, providing natural biting function and long-term stability.',
      techSpec: 'Biocompatible Grade-IV/V Titanium',
      icon: <ShieldCheck size={20} color="#0071e3" />,
      initialX: 16,
      initialY: 74,
      depth: 1.2,
      rotFactor: 0.8,
    },
    {
      id: 'clear-aligner',
      name: 'Transparent Clear Aligner',
      category: 'Orthodontics',
      shortDesc: 'Clear medical polymer delivering gentle, progressive alignment.',
      fullDesc: 'Custom-designed transparent aligners that guide teeth into natural alignment comfortably and discreetly without metal wires or brackets.',
      techSpec: 'Custom Dental Polymer',
      icon: <Layers size={20} color="#0071e3" />,
      initialX: 80,
      initialY: 68,
      depth: 1.6,
      rotFactor: -1.1,
    },
    {
      id: 'ceramic-veneer',
      name: 'Ceramic Dental Veneer',
      category: 'Cosmetic Dentistry',
      shortDesc: 'Custom-crafted thin ceramic shells bonded to tooth surfaces.',
      fullDesc: 'Precision-shaped ceramic restorations designed to enhance smile symmetry, close gaps, and restore discolored or chipped enamel.',
      techSpec: 'High-Translucency Dental Ceramic',
      icon: <Eye size={20} color="#0071e3" />,
      initialX: 48,
      initialY: 18,
      depth: 2.2,
      rotFactor: 1.8,
    },
    {
      id: 'digital-scan',
      name: 'Digital Intraoral Imaging',
      category: 'Diagnostics',
      shortDesc: 'Digital optical imaging eliminating traditional impression putty.',
      fullDesc: 'Modern optical scanning captures accurate 3D digital records of your teeth and bite for precise crowns, bridges, and aligner planning.',
      techSpec: 'High-Resolution 3D Optical Imaging',
      icon: <Cpu size={20} color="#0071e3" />,
      initialX: 32,
      initialY: 82,
      depth: 1.5,
      rotFactor: -1.3,
    },
    {
      id: 'guided-surgery',
      name: 'Computer-Guided Surgery',
      category: 'Surgical Precision',
      shortDesc: '3D printed stereolithographic surgical guides for flawless angle accuracy.',
      fullDesc: 'Virtual pre-surgical planning allows implants to be inserted with microscopic 0.1mm accuracy, minimizing recovery time and postoperative discomfort.',
      techSpec: 'Dynamic navigation with 0.1mm tolerance',
      icon: <Zap size={20} color="#0071e3" />,
      initialX: 52,
      initialY: 52,
      depth: 2.4,
      rotFactor: 2.0,
    },
  ];

  // High-performance GPU-composited physics loop (zero React re-renders)
  useEffect(() => {
    let animFrameId: number;

    const animatePhysics = (time: number) => {
      // Ambient breathing micro-drift so the cluster feels organic and responsive even when idle
      const idleDriftX = Math.sin(time * 0.0012) * 0.04;
      const idleDriftY = Math.cos(time * 0.001) * 0.04;

      const effectiveTargetX = targetPos.current.x + idleDriftX;
      const effectiveTargetY = targetPos.current.y + idleDriftY;

      // Smooth lerp (8.5% per frame for fluid Apple-style inertia)
      currentPos.current.x += (effectiveTargetX - currentPos.current.x) * 0.085;
      currentPos.current.y += (effectiveTargetY - currentPos.current.y) * 0.085;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--cluster-x', currentPos.current.x.toFixed(4));
        containerRef.current.style.setProperty('--cluster-y', currentPos.current.y.toFixed(4));
      }

      animFrameId = requestAnimationFrame(animatePhysics);
    };

    animFrameId = requestAnimationFrame(animatePhysics);
    return () => cancelAnimationFrame(animFrameId);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetPos.current = { x, y };
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetPos.current = { x: 0, y: 0 };
    setHoveredNodeId(null);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;
    targetPos.current = { x, y };
  }, []);

  return (
    <section
      id="cluster"
      className="section-padding"
      style={{
        backgroundColor: '#fbfbfd',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="section-header apple-reveal">
          <span className="eyebrow">Interactive Anatomy</span>
          <h2 className="section-title">The physics of bio-mimetic perfection.</h2>
          <p className="section-subtitle">
            Hover and move your cursor through the cluster. Observe how each element responds with depth, rotation, and inertia. Select any node to reveal microscopic specifications.
          </p>
        </div>

        {/* Dynamic Physics Stage */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleTouchMove}
          style={{
            position: 'relative',
            width: '100%',
            height: '580px',
            backgroundColor: '#ffffff',
            borderRadius: '28px',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.03)',
            overflow: 'hidden',
            cursor: 'default',
          }}
        >
          {/* Subtle Ambient Mesh */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 113, 227, 0.04) 0%, transparent 65%)',
              pointerEvents: 'none',
            }}
          />

          {/* Interactive Guidance Pill */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 5,
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              letterSpacing: '0.02em',
              pointerEvents: 'none',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
              maxWidth: 'calc(100% - 32px)',
              textAlign: 'center',
              boxSizing: 'border-box',
            }}
          >
            Move cursor to experience inertia • Tap or click any element for specifications
          </div>

          {/* Floating Elements */}
          {clusterNodes.map((node) => {
            const isHovered = hoveredNodeId === node.id;
            const isSelected = activeNode?.id === node.id;

            // Attraction boost if directly hovered
            const hoverScale = isHovered ? 1.08 : isSelected ? 1.05 : 1;
            const zIndexVal = isSelected ? 40 : isHovered ? 30 : Math.round(node.depth * 10);
            const xShift = (node.depth * 55).toFixed(1);
            const yShift = (node.depth * 55).toFixed(1);
            const rShift = (node.rotFactor * 12).toFixed(1);

            return (
              <button
                key={node.id}
                onClick={() => setActiveNode(isSelected ? null : node)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                aria-label={`Inspect ${node.name}`}
                style={{
                  position: 'absolute',
                  left: `${node.initialX}%`,
                  top: `${node.initialY}%`,
                  transform: `translate3d(calc(-50% + var(--cluster-x, 0) * 1px * ${xShift}), calc(-50% + var(--cluster-y, 0) * 1px * ${yShift}), 0) rotate(calc(var(--cluster-x, 0) * 1deg * ${rShift})) scale(${hoverScale})`,
                  transformOrigin: 'center center',
                  willChange: 'transform',
                  transition: isHovered
                    ? 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease'
                    : 'box-shadow 0.2s ease',
                  zIndex: zIndexVal,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 20px',
                  borderRadius: '9999px',
                  backgroundColor: isSelected || isHovered ? '#1d1d1f' : '#ffffff',
                  color: isSelected || isHovered ? '#ffffff' : '#1d1d1f',
                  border: isSelected || isHovered ? '1px solid #1d1d1f' : '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: isHovered || isSelected
                    ? '0 16px 36px rgba(0, 0, 0, 0.2)'
                    : '0 6px 20px rgba(0, 0, 0, 0.04)',
                  cursor: 'pointer',
                  userSelect: 'none',
                  outline: 'none',
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: isSelected || isHovered
                      ? 'rgba(255, 255, 255, 0.18)'
                      : 'rgba(0, 113, 227, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {node.icon}
                </div>

                <div style={{ textAlign: 'left' }}>
                  <div
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: isSelected || isHovered ? 'rgba(255, 255, 255, 0.7)' : 'var(--text-muted)',
                    }}
                  >
                    {node.category}
                  </div>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {node.name}
                  </div>
                </div>

                <ArrowUpRight
                  size={14}
                  color={isSelected || isHovered ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.3)'}
                />
              </button>
            );
          })}

          {/* Premium Information Popup Card */}
          {activeNode && (
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'min(92%, 580px)',
                backgroundColor: 'rgba(255, 255, 255, 0.96)',
                backdropFilter: 'blur(25px) saturate(180%)',
                WebkitBackdropFilter: 'blur(25px) saturate(180%)',
                borderRadius: '22px',
                padding: '24px 28px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 24px 56px rgba(0, 0, 0, 0.14)',
                zIndex: 50,
                animation: 'popupSpring 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.15)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-primary)',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(0, 113, 227, 0.08)',
                    }}
                  >
                    {activeNode.category}
                  </span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    D Care Clinical Specification
                  </span>
                </div>

                <button
                  onClick={() => setActiveNode(null)}
                  aria-label="Close specifications"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <X size={18} />
                </button>
              </div>

              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#1d1d1f',
                  marginBottom: '8px',
                }}
              >
                {activeNode.name}
              </h3>

              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.55,
                  marginBottom: '16px',
                }}
              >
                {activeNode.fullDesc}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-subtle)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: '#1d1d1f',
                }}
              >
                <Cpu size={15} color="var(--accent-primary)" />
                <span>{activeNode.techSpec}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes popupSpring {
          0% {
            opacity: 0;
            transform: translate(-50%, 20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
        }
      `}</style>
    </section>
  );
};
