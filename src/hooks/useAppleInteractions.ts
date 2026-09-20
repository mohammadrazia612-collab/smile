import { useEffect } from 'react';

export const useAppleInteractions = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Detect true mouse/fine-pointer devices (desktop/laptop) vs touchscreens
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // 1. Scroll-Triggered Fluid Reveal Observer
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
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const observeReveals = () => {
      const revealElements = document.querySelectorAll('.apple-reveal:not(.is-revealed)');
      revealElements.forEach((el) => revealObserver.observe(el));
    };

    observeReveals();
    // Safety pass for any deferred-rendered components
    const timerId = setTimeout(observeReveals, 350);

    const cleanups: (() => void)[] = [];

    // 2. Desktop-Only Subtle 3D Card Tilt (Micro-Physics)
    if (hasFinePointer) {
      const cards = document.querySelectorAll<HTMLElement>('.apple-card-tilt');

      cards.forEach((card) => {
        let rafId: number | null = null;
        let targetRotX = 0;
        let targetRotY = 0;
        let currentRotX = 0;
        let currentRotY = 0;

        const updateMotion = () => {
          // 12% lerp factor produces Apple-like gentle inertia
          currentRotX += (targetRotX - currentRotX) * 0.12;
          currentRotY += (targetRotY - currentRotY) * 0.12;

          card.style.transform = `perspective(1200px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translate3d(0, -4px, 0)`;

          if (Math.abs(targetRotX - currentRotX) > 0.02 || Math.abs(targetRotY - currentRotY) > 0.02) {
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

          // Apple-grade subtle restraint: max 3.2 degrees
          targetRotX = -((y - centerY) / centerY) * 3.2;
          targetRotY = ((x - centerX) / centerX) * 3.2;

          if (!rafId) {
            rafId = requestAnimationFrame(updateMotion);
          }
        };

        const onMouseLeave = () => {
          targetRotX = 0;
          targetRotY = 0;

          const resetMotion = () => {
            currentRotX += (0 - currentRotX) * 0.14;
            currentRotY += (0 - currentRotY) * 0.14;
            card.style.transform = `perspective(1200px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translate3d(0, 0, 0)`;

            if (Math.abs(currentRotX) > 0.02 || Math.abs(currentRotY) > 0.02) {
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

      // 3. Desktop-Only Magnetic Pull for Key Action Buttons
      const magneticBtns = document.querySelectorAll<HTMLElement>('.btn-magnetic, .btn-primary');

      magneticBtns.forEach((btn) => {
        let rafId: number | null = null;
        let targetX = 0;
        let targetY = 0;
        let curX = 0;
        let curY = 0;

        const updateBtn = () => {
          curX += (targetX - curX) * 0.18;
          curY += (targetY - curY) * 0.18;
          btn.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)`;

          if (Math.abs(targetX - curX) > 0.05 || Math.abs(targetY - curY) > 0.05) {
            rafId = requestAnimationFrame(updateBtn);
          } else {
            rafId = null;
          }
        };

        const onMouseMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          // Controlled subtle magnetic pull: max 4px
          targetX = x * 0.22;
          targetY = y * 0.22;

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

            if (Math.abs(curX) > 0.05 || Math.abs(curY) > 0.05) {
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
    }

    return () => {
      clearTimeout(timerId);
      revealObserver.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);
};
