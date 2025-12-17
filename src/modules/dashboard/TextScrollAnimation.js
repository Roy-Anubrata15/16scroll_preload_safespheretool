// // TextScrollAnimation.jsx
// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Lenis from 'lenis';
// import './textreveal.css';
// import svg from './Images/Screenshot 2025-12-17 030458.svg';
// gsap.registerPlugin(ScrollTrigger);

// const TextScrollAnimation = () => {
//   const servicesRef = useRef(null);
//   const lenisRef = useRef(null);

//   useEffect(() => {
//     // Lenis smooth scroll
//     lenisRef.current = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
//     });

//     function raf(time) {
//       lenisRef.current?.raf(time);
//       ScrollTrigger.update();
//       requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);

//     // Text reveal animations
//     const animateTexts = gsap.context(() => {
//       document.querySelectorAll(".animate-text").forEach((textElement) => {
//         textElement.setAttribute("data-text", textElement.textContent.trim());
        
//         ScrollTrigger.create({
//           trigger: textElement,
//           start: "top 40%",
//           end: "bottom 5%",
//           scrub: 1,
//           onUpdate: (self) => {
//             const clipValue = Math.max(0, 100 - self.progress * 100);
//             textElement.style.setProperty("--clip-value", `${clipValue}%`);
//           },
//         });
//       });
//     });

//     // Services horizontal slide
//     const servicesSlide = gsap.context((self) => {
//       ScrollTrigger.create({
//         trigger: ".services",
//         start: "top bottom",
//         end: "top top",
//         scrub: 1,
//         onUpdate: (st) => {
//           const headers = document.querySelectorAll(".services-header");
//           if (headers.length >= 3) {
//             gsap.set(headers[0], { x: `${100 - st.progress * 100}%` });
//             gsap.set(headers[1], { x: `${-100 + st.progress * 100}%` });
//             gsap.set(headers[2], { x: `${100 - st.progress * 100}%` });
//           }
//         },
//       });
//     }, servicesRef);

//     // Services pin + vertical + scale
//     const servicesPin = gsap.context((self) => {
//       ScrollTrigger.create({
//         trigger: ".services",
//         start: "top top",
//         end: `+=${window.innerHeight * 2}`,
//         pin: true,
//         scrub: 1,
//         pinSpacing: false,
//         onUpdate: (st) => {
//           const headers = document.querySelectorAll(".services-header");
//           if (headers.length < 3) return;

//           if (st.progress <= 0.5) {
//             const yProgress = st.progress / 0.5;
//             gsap.set(headers[0], { y: `${yProgress * 100}%` });
//             gsap.set(headers[2], { y: `${yProgress * -100}%` });
//           } else {
//             gsap.set(headers[0], { y: "100%" });
//             gsap.set(headers[2], { y: "-100%" });
//           }

//           const scaleProgress = (st.progress - 0.5) / 0.5;
//           const minScale = window.innerWidth <= 1000 ? 0.3 : 0.1;
//           const scale = 1 - scaleProgress * (1 - minScale);
//           headers.forEach((header) => gsap.set(header, { scale }));
//         },
//       });
//     }, servicesRef);

//     return () => {
//       animateTexts.revert();
//       servicesSlide.revert();
//       servicesPin.revert();
//       lenisRef.current?.destroy();
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   return (
//     <>
//       <section className="hero" />
      
//       <section className="about">
//         <h1 className="animate-text">
//           About SafeSphere: Enterprise ISMS consulting platform with risk management, policy documentation, and ISO 27001 compliance tracking
//         </h1>
//       </section>

//       <section className="services" ref={servicesRef}>
//         <div className="services-header">
//           <img src={svg} alt="Risk Management" />
//         </div>
//         <div className="services-header">
//           <img src={svg} alt="Documentation" />
//         </div>
//         <div className="services-header">
//           <img src={svg} alt="Gap Assessment" />
//         </div>
//       </section>

//       {/* <section className="services-copy">
//         <h1 className="animate-text">
//           Comprehensive ISMS Services: Risk Assessment, Policy Management, Compliance Tracking, and Continuous Improvement
//         </h1>
//       </section> */}

//       <section className="outro" />
//     </>
//   );
// };

// export default TextScrollAnimation;












// TextScrollAnimation.jsx - EXACT vanilla logic
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './textreveal.css';
 import svg from './Images/Screenshot 2025-12-17 030458.svg';
gsap.registerPlugin(ScrollTrigger);

const TextScrollAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // EXACT vanilla code - nothing changed
    const lenis = new Lenis();
    
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll(".animate-text").forEach((textElement) => {
      textElement.setAttribute("data-text", textElement.textContent.trim());

      ScrollTrigger.create({
        trigger: textElement,
        start: "top 50%",
        end: "bottom 50%",
        scrub: 1,
        onUpdate: (self) => {
          const clipValue = Math.max(0, 100 - self.progress * 100);
          textElement.style.setProperty("--clip-value", `${clipValue}%`);
        },
      });
    });

    ScrollTrigger.create({
      trigger: ".services",
      start: "top bottom",
      end: "top top",
      scrub: 1,
      onUpdate: (self) => {
        const headers = document.querySelectorAll(".services-header");

        gsap.set(headers[0], { x: `${100 - self.progress * 100}%` });
        gsap.set(headers[1], { x: `${-100 + self.progress * 100}%` });
        gsap.set(headers[2], { x: `${100 - self.progress * 100}%` });
      },
    });

    ScrollTrigger.create({
      trigger: ".services",
      start: "top top",
      end: `+=${window.innerHeight * 2}`,
      pin: true,
      scrub: 1,
      pinSpacing: false,
      onUpdate: (self) => {
        const headers = document.querySelectorAll(".services-header");

        if (self.progress <= 0.5) {
          const yProgress = self.progress / 0.5;
          gsap.set(headers[0], { y: `${yProgress * 100}%` });
          gsap.set(headers[2], { y: `${yProgress * -100}%` });
        } else {
          gsap.set(headers[0], { y: "100%" });
          gsap.set(headers[2], { y: "-100%" });
        }

        const scaleProgress = (self.progress - 0.5) / 0.5;
        const minScale = window.innerWidth <= 1000 ? 0.3 : 0.1;
        const scale = 1 - scaleProgress * (1 - minScale);

        headers.forEach((header) => gsap.set(header, { scale }));
      },
    });

    // Cleanup
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef}>
      <section className="hero" />
      
      <section className="about">
        <h1 className="animate-text">
          About SafeSphere: Enterprise ISMS consulting platform with risk management, policy documentation, and ISO 27001 compliance tracking
        </h1>
      </section>

      <section className="services">
        <div className="services-header">
          <img src={svg} alt="Risk Management" />
        </div>
        <div className="services-header">
          <img src={svg} alt="Documentation" />
        </div>
        <div className="services-header">
          <img src={svg} alt="Gap Assessment" />
        </div>
      </section>

      <section className="services-copy">
        <h1 className="animate-text">
          Services we offer: Risk Assessment, Policy Management, Compliance Tracking
        </h1>
      </section>

      <section className="outro" />
    </div>
  );
};

export default TextScrollAnimation;
