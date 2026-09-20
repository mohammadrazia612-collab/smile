import React, { useRef, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/hero/Hero';
import { Statistics } from '../components/Statistics';
import { QuickServices } from '../components/QuickServices';
import { Treatments } from '../components/Treatments';
import { AboutClinic } from '../components/AboutClinic';
import { PatientExperience } from '../components/PatientExperience';
import { InteractiveCluster } from '../components/InteractiveCluster';
import { BeforeAfter } from '../components/BeforeAfter';
import { SmileGallery } from '../components/SmileGallery';
import { Testimonials } from '../components/Testimonials';
import { TrustBenefits } from '../components/TrustBenefits';
import { DoctorsTeam } from '../components/DoctorsTeam';
import { Technology } from '../components/Technology';
import { FAQSection } from '../components/FAQSection';
import { AppointmentSection } from '../components/AppointmentSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';

import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { useAppleInteractions } from '../hooks/useAppleInteractions';

export const PublicWebsite: React.FC = () => {
  useSmoothScroll();
  useAppleInteractions();

  const appointmentRef = useRef<HTMLElement>(null);
  const [selectedTreatment, setSelectedTreatment] = useState('General Dental Care & Consultation');

  const scrollToAppointment = () => {
    if (appointmentRef.current) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (el: HTMLElement, opts: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(appointmentRef.current, { offset: -60, duration: 1.2 });
      } else {
        appointmentRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      // Focus on the full name input after smooth scroll
      setTimeout(() => {
        const input = document.getElementById('fullName');
        if (input) input.focus();
      }, 750);
    }
  };

  const scrollToTreatments = () => {
    const section = document.getElementById('treatments');
    if (section) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (el: HTMLElement, opts: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(section, { offset: -60, duration: 1.2 });
      } else {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectTreatmentForBooking = (treatmentName: string) => {
    setSelectedTreatment(treatmentName);
    scrollToAppointment();
  };

  return (
    <div className="aura-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Global Navigation Bar */}
      <Navbar onBookClick={scrollToAppointment} />

      {/* Main Content Flow */}
      <main className="main-content" style={{ flex: 1 }}>
        {/* 1. Cinematic Hero with modular Spline 3D slot */}
        <Hero
          onBookClick={scrollToAppointment}
          onExploreClick={scrollToTreatments}
          splineSceneUrl={null}
        />

        {/* 2. Animated / Popping Statistics */}
        <Statistics />

        {/* 3. Quick Services / Key Treatment Categories */}
        <QuickServices onSelectService={handleSelectTreatmentForBooking} />

        {/* 4. Main Treatments (Large visual storytelling layout) */}
        <Treatments onSelectTreatment={handleSelectTreatmentForBooking} />

        {/* 5. About the Clinic / Clinic Story & Core Pillars */}
        <AboutClinic onExploreClick={scrollToTreatments} />

        {/* 6. Patient Experience / Why Choose Us */}
        <PatientExperience />

        {/* 7. Interactive Physics Cluster */}
        <InteractiveCluster />

        {/* 8. Master Interactive Before/After Dual-Layer Slider */}
        <BeforeAfter />

        {/* 9. Results / Clinical Cases Portfolio */}
        <SmileGallery />

        {/* 10. Testimonials */}
        <Testimonials />

        {/* 11. Trust & Key Benefits */}
        <TrustBenefits />

        {/* 12. Meet Our Doctors */}
        <DoctorsTeam onBookConsultation={handleSelectTreatmentForBooking} />

        {/* 13. Technology / Modern Dentistry */}
        <Technology />

        {/* 14. FAQ Accordion */}
        <FAQSection />

        {/* 15. Strong Appointment CTA & Request Form */}
        <AppointmentSection ref={appointmentRef} initialTreatment={selectedTreatment} />

        {/* 16. Studio Contact, Clinical Schedule & Concierge */}
        <ContactSection />
      </main>

      {/* 17. Minimalist Apple-Style Footer */}
      <Footer />
    </div>
  );
};
