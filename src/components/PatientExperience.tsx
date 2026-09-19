import React from 'react';
import { Shield, Sparkles, Coffee, HeartHandshake } from 'lucide-react';

export const PatientExperience: React.FC = () => {
  const experiences = [
    {
      icon: <Sparkles size={20} color="var(--accent-primary)" />,
      title: 'Gentle Clinical Care',
      description: 'Attentive, gentle techniques ensuring patients of all ages feel relaxed, heard, and cared for during every procedure.',
    },
    {
      icon: <HeartHandshake size={20} color="var(--accent-primary)" />,
      title: 'Clear & Transparent Guidance',
      description: 'We explain your diagnosis and treatment options clearly with honest communication and zero pressure.',
    },
    {
      icon: <Shield size={20} color="var(--accent-primary)" />,
      title: 'Hygienic & Modern Facility',
      description: 'Clean, well-maintained clinical operatories adhering to strict hygiene and patient safety protocols.',
    },
    {
      icon: <Coffee size={20} color="var(--accent-primary)" />,
      title: 'Family-Friendly Atmosphere',
      description: 'Welcoming care tailored for children, parents, and seniors, making dental visits reassuring for the entire family.',
    },
  ];

  return (
    <section
      id="experience"
      className="section-padding"
      style={{
        backgroundColor: '#ffffff',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="eyebrow">Patient Experience</span>
          <h2 className="section-title">Comfortable, reassuring care designed around your peace of mind.</h2>
          <p className="section-subtitle">
            At Shiva Smile Dental Care Hospital, we prioritize patient comfort, clear communication, and gentle clinical attention so every visit feels calm and reassuring.
          </p>
        </div>

        {/* Large Clinical Operatory Image Frame */}
        <div
          style={{
            position: 'relative',
            borderRadius: '32px',
            overflow: 'hidden',
            aspectRatio: '16/9',
            maxHeight: '560px',
            marginBottom: '48px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.07)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            backgroundColor: '#f8f8fa',
          }}
        >
          <img
            src="/assets/images/clinic-operatory.jpg"
            alt="Shiva Smile Dental Care Hospital — Modern Clinical Operatory in Siddipet"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 45%',
              display: 'block',
            }}
          />

          {/* Floating Aesthetic Glass Tag */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              padding: '12px 20px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#1d1d1f',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Shield size={16} color="var(--accent-primary)" />
            <span>Clinical Operatory &amp; Treatment Suite</span>
          </div>
        </div>

        {/* 4 Comfort Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
          }}
        >
          {experiences.map((exp) => (
            <div
              key={exp.title}
              style={{
                padding: '32px 24px',
                borderRadius: '20px',
                backgroundColor: 'var(--bg-page)',
                border: '1px solid rgba(0, 0, 0, 0.04)',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
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
                  marginBottom: '20px',
                }}
              >
                {exp.icon}
              </div>

              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#1d1d1f',
                  letterSpacing: '-0.01em',
                  marginBottom: '8px',
                }}
              >
                {exp.title}
              </h3>

              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.55,
                }}
              >
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
