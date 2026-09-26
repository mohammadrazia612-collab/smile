import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'Location & Appointments',
      question: 'Where is D Care Multi Speciality Dental Hospital located and how do I book an appointment?',
      answer:
        'We are located at Siddipet – Medak Road, Beside Kotak Mahindra Bank, Near Prathiba Degree College, Siddipet, Telangana – 502103, India. You can book an appointment using the online form on this page or by calling our hospital line directly at +91 93918 84433.',
    },
    {
      id: 'faq-2',
      category: 'Hospital Hours',
      question: 'What are your hospital opening hours?',
      answer:
        'D Care Multi Speciality Dental Hospital is open 7 days a week: Monday from 10:00 AM – 9:00 PM, Tuesday from 9:00 AM – 9:00 PM, Wednesday through Saturday from 10:00 AM – 9:00 PM, and Sunday from 9:00 AM – 5:00 PM.',
    },
    {
      id: 'faq-3',
      category: 'Services & Treatments',
      question: 'What dental treatments do you provide at D Care?',
      answer:
        'We provide verified treatments including General Dental Treatment, Braces / Orthodontic Treatment, Retainers, and Broken Tooth Treatment.',
    },
    {
      id: 'faq-4',
      category: 'Orthodontics & Braces',
      question: 'Do you provide braces and orthodontic teeth alignment?',
      answer:
        'Yes. We provide braces and orthodontic treatments to straighten teeth, close gaps, and correct bite alignment for patients in Siddipet.',
    },
    {
      id: 'faq-5',
      category: 'Retainers & Stability',
      question: 'Do you provide retainers after braces or alignment?',
      answer:
        'Yes. We provide custom-fabricated fixed and removable retainers to maintain tooth stability and keep teeth properly aligned following orthodontic treatment.',
    },
    {
      id: 'faq-6',
      category: 'Broken Tooth Treatment',
      question: 'How do you treat chipped, cracked, or broken teeth?',
      answer:
        'We provide restorative broken tooth treatments to assess tooth structure, alleviate discomfort, and rebuild the strength and natural shape of damaged teeth. Call us directly at +91 93918 84433.',
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="section-padding"
      style={{
        backgroundColor: '#ffffff',
        position: 'relative',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="container-narrow">
        {/* Section Header */}
        <div className="section-header apple-reveal">
          <span className="eyebrow">Common Inquiries</span>
          <h2 className="section-title">Frequently asked questions.</h2>
          <p className="section-subtitle">
            Find answers regarding our clinic location in Siddipet, opening hours, treatment categories, and appointment bookings.
          </p>
        </div>

        {/* Accordion Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                style={{
                  borderRadius: '18px',
                  backgroundColor: isOpen ? 'var(--bg-page)' : '#ffffff',
                  border: '1px solid',
                  borderColor: isOpen ? 'rgba(0, 113, 227, 0.2)' : 'rgba(0, 0, 0, 0.06)',
                  overflow: 'hidden',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isOpen ? '0 8px 24px rgba(0, 0, 0, 0.03)' : 'none',
                }}
              >
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: '22px 28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    outline: 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        backgroundColor: isOpen ? 'rgba(0, 113, 227, 0.1)' : 'var(--bg-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <HelpCircle size={15} color={isOpen ? 'var(--accent-primary)' : 'var(--text-muted)'} />
                    </div>

                    <span
                      style={{
                        fontSize: '1.0625rem',
                        fontWeight: 700,
                        letterSpacing: '-0.01em',
                        color: isOpen ? '#1d1d1f' : '#1d1d1f',
                      }}
                    >
                      {faq.question}
                    </span>
                  </div>

                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? 'var(--accent-primary)' : 'var(--bg-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: isOpen ? '#ffffff' : '#1d1d1f',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 28px 24px 70px',
                      fontSize: '0.9375rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.65,
                      animation: 'accordionFade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <style>{`
          @keyframes accordionFade {
            from {
              opacity: 0;
              transform: translateY(-6px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </section>
  );
};
