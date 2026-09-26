import React from 'react';
import { GraduationCap, Award, Stethoscope, ArrowRight } from 'lucide-react';

interface DoctorMember {
  id: string;
  name: string;
  role: string;
  qualification: string;
  specialization: string;
  fellowship: string;
  image: string;
  bio: string;
}

interface DoctorsTeamProps {
  onBookConsultation: (doctorName: string) => void;
}

export const DoctorsTeam: React.FC<DoctorsTeamProps> = ({ onBookConsultation }) => {
  const doctors: DoctorMember[] = [
    {
      id: 'specialist-general-care',
      name: 'General Dental Care Team',
      role: 'Department of General Dentistry',
      qualification: 'Comprehensive Dental Examinations',
      specialization: 'General Dental Treatment',
      fellowship: 'Routine & Preventive Dental Care',
      image: '/assets/images/doctor-portrait.jpg',
      bio: 'Dedicated to thorough examinations, cleanings, tooth health checkups, and patient-centered treatment at D Care Multi Speciality Dental Hospital.',
    },
    {
      id: 'specialist-orthodontics',
      name: 'Orthodontic & Braces Team',
      role: 'Department of Orthodontics',
      qualification: 'Teeth Alignment & Corrective Dentistry',
      specialization: 'Braces / Orthodontic Treatment',
      fellowship: 'Metal & Ceramic Braces Alignment',
      image: '/assets/images/doctor-portrait.jpg',
      bio: 'Providing targeted orthodontic care for misaligned teeth, spacing, and bite correction for patients in Siddipet.',
    },
    {
      id: 'specialist-restorative',
      name: 'Restorative & Retainer Team',
      role: 'Department of Restorative Care',
      qualification: 'Tooth Repair & Post-Braces Stability',
      specialization: 'Retainers & Broken Tooth Care',
      fellowship: 'Tooth Restorations & Custom Retainers',
      image: '/assets/images/doctor-portrait.jpg',
      bio: 'Specialized in assessing and repairing broken or damaged teeth and providing custom retainers to maintain aligned dental health.',
    },
  ];

  return (
    <section
      id="doctors"
      className="section-padding"
      style={{
        backgroundColor: '#fbfbfd',
        position: 'relative',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header apple-reveal">
          <span className="eyebrow">Our Clinical Specialists</span>
          <h2 className="section-title">Dental Doctors & Specialists</h2>
          <p className="section-subtitle">
            Qualified dental professionals committed to gentle, ethical, and comprehensive oral healthcare for patients in Siddipet.
          </p>
        </div>

        {/* 3 Doctor Profile Cards */}
        <div
          className="doctors-team-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '32px',
          }}
        >
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="apple-card-tilt"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: 'var(--shadow-subtle)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
              }}
            >
              {/* Doctor Portrait Frame */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4/4.2',
                  backgroundColor: '#f0f0f2',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={doc.image}
                  alt={doc.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />

                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-primary)',
                  }}
                >
                  {doc.role}
                </div>
              </div>

              {/* Bio & Credentials Details */}
              <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#1d1d1f',
                      letterSpacing: '-0.02em',
                      marginBottom: '4px',
                    }}
                  >
                    {doc.name}
                  </h3>

                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--accent-primary)',
                      marginBottom: '12px',
                    }}
                  >
                    {doc.specialization}
                  </div>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.55,
                      marginBottom: '20px',
                    }}
                  >
                    {doc.bio}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(0, 0, 0, 0.05)', paddingTop: '16px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      <GraduationCap size={14} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
                      <span>{doc.qualification}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      <Award size={14} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
                      <span>{doc.fellowship}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onBookConsultation(doc.specialization)}
                  className="btn btn-outline btn-magnetic"
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    fontSize: '0.8125rem',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Stethoscope size={14} />
                    <span>Request Consult: {doc.name}</span>
                  </div>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
