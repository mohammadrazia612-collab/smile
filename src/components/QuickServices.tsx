import React from 'react';
import { ShieldCheck, Sparkles, Activity, Layers, SunMedium, HeartPulse, ArrowUpRight } from 'lucide-react';

interface QuickServiceItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  icon: React.ReactNode;
  treatmentName: string;
}

interface QuickServicesProps {
  onSelectService: (treatmentName: string) => void;
}

export const QuickServices: React.FC<QuickServicesProps> = ({ onSelectService }) => {
  const services: QuickServiceItem[] = [
    {
      id: 'general-dental',
      name: 'General Dental Care',
      category: 'Preventive & Restorative',
      tagline: 'Comprehensive exams, cleanings, and tooth-colored restorations.',
      icon: <HeartPulse size={20} color="var(--accent-primary)" />,
      treatmentName: 'General Dental Care',
    },
    {
      id: 'cosmetic',
      name: 'Cosmetic Dentistry',
      category: 'Smile Aesthetics',
      tagline: 'Aesthetic enhancements and smile restorations for confident smiles.',
      icon: <Sparkles size={20} color="var(--accent-primary)" />,
      treatmentName: 'Cosmetic Dentistry',
    },
    {
      id: 'implants',
      name: 'Dental Implants',
      category: 'Tooth Replacement',
      tagline: 'Fixed tooth restorations designed for natural look, feel, and function.',
      icon: <ShieldCheck size={20} color="var(--accent-primary)" />,
      treatmentName: 'Dental Implants',
    },
    {
      id: 'periodontal',
      name: 'Gum & Periodontal Care',
      category: 'Periodontics',
      tagline: 'Targeted gum health therapies, deep scaling, and periodontal maintenance.',
      icon: <Activity size={20} color="var(--accent-primary)" />,
      treatmentName: 'Gum & Periodontal Care',
    },
    {
      id: 'pediatric',
      name: 'Pediatric Dentistry',
      category: 'Children’s Dental Care',
      tagline: 'Gentle, reassuring, and kid-friendly oral health care for young smiles.',
      icon: <SunMedium size={20} color="var(--accent-primary)" />,
      treatmentName: 'Pediatric Dentistry',
    },
    {
      id: 'emergency',
      name: 'Emergency Dental Care',
      category: 'Urgent Attention',
      tagline: 'Prompt evaluation and relief for acute dental pain or sudden injury.',
      icon: <Layers size={20} color="var(--accent-primary)" />,
      treatmentName: 'Emergency Dental Care',
    },
  ];

  return (
    <section
      id="quick-services"
      style={{
        padding: '64px 0',
        backgroundColor: 'var(--bg-page)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Mini Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '36px',
          }}
        >
          <div>
            <span className="eyebrow">Key Disciplines</span>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: '#1d1d1f',
              }}
            >
              Excellence across every specialty.
            </h2>
          </div>

          <a
            href="#treatments"
            className="link-animated"
            style={{ fontSize: '0.875rem', fontWeight: 600, paddingBottom: '4px' }}
          >
            <span>Explore all comprehensive treatments</span>
            <ArrowUpRight size={15} />
          </a>
        </div>

        {/* 6 Compact Interactive Service Pills */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '16px',
          }}
        >
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service.treatmentName)}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '18px',
                padding: '22px 24px',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = 'rgba(0, 113, 227, 0.25)';
                e.currentTarget.style.boxShadow = '0 10px 24px rgba(0, 113, 227, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.02)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(0, 113, 227, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {service.icon}
                </div>

                <div>
                  <div
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      marginBottom: '2px',
                    }}
                  >
                    {service.category}
                  </div>
                  <div
                    style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: '#1d1d1f',
                      letterSpacing: '-0.01em',
                      marginBottom: '3px',
                    }}
                  >
                    {service.name}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                    {service.tagline}
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: 'var(--accent-primary)',
                }}
              >
                <ArrowUpRight size={15} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
