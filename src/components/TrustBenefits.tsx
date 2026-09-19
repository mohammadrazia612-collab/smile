import React from 'react';
import { Cpu, Award, Heart, ShieldCheck } from 'lucide-react';

export const TrustBenefits: React.FC = () => {
  const benefits = [
    {
      icon: <Award size={22} color="var(--accent-primary)" />,
      title: '4.9 / 5 Google Rating',
      description: '51 verified reviews reflecting patient satisfaction and dedicated dental care in Siddipet.',
    },
    {
      icon: <ShieldCheck size={22} color="var(--accent-primary)" />,
      title: 'Comprehensive Hospital Care',
      description: 'General, cosmetic, dental implants, periodontal, pediatric, and emergency dental treatments.',
    },
    {
      icon: <Heart size={22} color="var(--accent-primary)" />,
      title: 'Family-Friendly Experience',
      description: 'Gentle, patient-focused environment ensuring a calm and comfortable visit for all ages.',
    },
    {
      icon: <Cpu size={22} color="var(--accent-primary)" />,
      title: 'Modern Clinical Hygiene',
      description: 'Strict sterilization protocols, modern equipment, and prompt emergency dental care.',
    },
  ];

  return (
    <section
      id="trust-benefits"
      style={{
        padding: '56px 0',
        backgroundColor: '#ffffff',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}
        >
          {benefits.map((b) => (
            <div
              key={b.title}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: '16px',
                borderRadius: '16px',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-page)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
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
                {b.icon}
              </div>

              <div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '4px' }}>
                  {b.title}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                  {b.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
