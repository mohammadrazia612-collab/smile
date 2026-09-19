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
      question: 'Where is Shiva Smile Dental Care Hospital located and how do I book an appointment?',
      answer:
        'We are conveniently located at Azam Pura, Siddipet, Telangana 502103, India. You can book an appointment using the online form on this page or by calling our direct clinic line at +91 83098 64006.',
    },
    {
      id: 'faq-2',
      category: 'Clinic Hours',
      question: 'What are your hospital opening hours?',
      answer:
        'Shiva Smile Dental Care Hospital is open 7 days a week: Monday through Saturday from 10:00 AM to 8:00 PM, and Sunday from 10:30 AM to 2:00 PM.',
    },
    {
      id: 'faq-3',
      category: 'Services',
      question: 'What dental treatments and clinical disciplines do you provide?',
      answer:
        'We provide comprehensive dental hospital care including general dental checkups, cosmetic dentistry, dental implants, gum / periodontal care, pediatric dentistry, and prompt emergency dental treatments.',
    },
    {
      id: 'faq-4',
      category: 'Dental Implants',
      question: 'Do you provide dental implants and periodontal gum care?',
      answer:
        'Yes. As a verified dental implants provider and periodontist hospital in Siddipet, we offer durable dental implant solutions for missing teeth along with focused care for gum health and periodontal stabilization.',
    },
    {
      id: 'faq-5',
      category: 'Pediatric Care',
      question: 'Is Shiva Smile Dental Care Hospital child and family-friendly?',
      answer:
        'Yes. We provide pediatric dental care with a gentle, patient-friendly approach designed to ensure comfortable visits for children, adolescents, and families in a welcoming hospital environment.',
    },
    {
      id: 'faq-6',
      category: 'Emergency Care',
      question: 'Do you offer emergency dental services in Siddipet?',
      answer:
        'Yes. We provide emergency dental care for acute tooth pain, sudden oral trauma, broken teeth, or lost restorations. Please call our hospital directly at +91 83098 64006 for immediate care.',
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
        <div className="section-header">
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
