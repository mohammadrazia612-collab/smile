import { useEffect } from 'react';

export const useAppleInteractions = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // 1. Scroll-Triggered Reveal Animations
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const revealElements = document.querySelectorAll('.apple-reveal');
    revealElements.forEach((el) => revealObserver.observe(el));

    // 2. Subtle 3D Card Tilt Interaction
    const cards = document.querySelectorAll<HTMLElement>('.apple-card-tilt');
    const cleanups: (() => void)[] = [];

    cards.forEach((card) => {
      let rafId: number | null = null;
      let targetRotX = 0;
      let targetRotY = 0;
      let currentRotX = 0;
      let currentRotY = 0;

      const updateMotion = () => {
        currentRotX += (targetRotX - currentRotX) * 0.12;
        currentRotY += (targetRotY - currentRotY) * 0.12;

        card.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translate3d(0, -3px, 0)`;

        if (Math.abs(targetRotX - currentRotX) > 0.05 || Math.abs(targetRotY - currentRotY) > 0.05) {
          rafId = requestAnimationFrame(updateMotion);
        } else {
          rafId = null;
        }
      };

      const onMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Gentle subtle tilt: max ~3.5 degrees
        targetRotX = -((y - centerY) / centerY) * 3.5;
        targetRotY = ((x - centerX) / centerX) * 3.5;

        if (!rafId) {
          rafId = requestAnimationFrame(updateMotion);
        }
      };

      const onMouseLeave = () => {
        targetRotX = 0;
        targetRotY = 0;
        const resetMotion = () => {
          currentRotX += (0 - currentRotX) * 0.15;
          currentRotY += (0 - currentRotY) * 0.15;
          card.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translate3d(0, 0, 0)`;
          if (Math.abs(currentRotX) > 0.05 || Math.abs(currentRotY) > 0.05) {
            requestAnimationFrame(resetMotion);
          } else {
            card.style.transform = '';
          }
        };
        requestAnimationFrame(resetMotion);
      };

      card.addEventListener('mousemove', onMouseMove, { passive: true });
      card.addEventListener('mouseleave', onMouseLeave, { passive: true });

      cleanups.push(() => {
        card.removeEventListener('mousemove', onMouseMove);
        card.removeEventListener('mouseleave', onMouseLeave);
      });
    });

    // 3. Magnetic Hover for Primary Buttons
    const magneticBtns = document.querySelectorAll<HTMLElement>('.btn-magnetic');
    magneticBtns.forEach((btn) => {
      let rafId: number | null = null;
      let targetX = 0;
      let targetY = 0;
      let curX = 0;
      let curY = 0;

      const updateBtn = () => {
        curX += (targetX - curX) * 0.2;
        curY += (targetY - curY) * 0.2;
        btn.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)`;

        if (Math.abs(targetX - curX) > 0.1 || Math.abs(targetY - curY) > 0.1) {
          rafId = requestAnimationFrame(updateBtn);
        } else {
          rafId = null;
        }
      };

      const onMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Subtle pull: max 5px
        targetX = x * 0.25;
        targetY = y * 0.25;

        if (!rafId) {
          rafId = requestAnimationFrame(updateBtn);
        }
      };

      const onMouseLeave = () => {
        targetX = 0;
        targetY = 0;
        const resetBtn = () => {
          curX += (0 - curX) * 0.2;
          curY += (0 - curY) * 0.2;
          btn.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)`;
          if (Math.abs(curX) > 0.1 || Math.abs(curY) > 0.1) {
            requestAnimationFrame(resetBtn);
          } else {
            btn.style.transform = '';
          }
        };
        requestAnimationFrame(resetBtn);
      };

      btn.addEventListener('mousemove', onMouseMove, { passive: true });
      btn.addEventListener('mouseleave', onMouseLeave, { passive: true });

      cleanups.push(() => {
        btn.removeEventListener('mousemove', onMouseMove);
        btn.removeEventListener('mouseleave', onMouseLeave);
      });
    });

    return () => {
      revealObserver.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);
};
