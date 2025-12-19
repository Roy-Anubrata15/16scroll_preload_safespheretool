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
 import svg from './Images/Screenshot 2025-12-18 152652.svg';
 import { motion } from "framer-motion";
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
        start: "top 75%",
        end: "bottom 59%",
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


      requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

    // Cleanup
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef}>
      {/* <section className="hero" /> */}
         <section className="relative min-h-screen flex items-center justify-center  px-24">
  {/* Soft, balanced background */}
  {/* <div className="absolute inset-0 -z-10 flex items-center justify-center">
    <div className="w-[700px] h-[700px] bg-gradient-to-br from-indigo-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-[160px]" />
  </div> */}

  {/* Main Content */}
  <div className="w-full max-w-6xl text-center flex flex-col items-center">
    {/* Badge */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur border border-gray-200 shadow-sm text-sm font-medium text-gray-700">
        <span className="w-2 h-2 rounded-full bg-green-500" />
        Enterprise Compliance Platform
      </div>
    </motion.div>

    {/* Heading */}
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight"
    >
      Welcome to{" "}
      <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
        SafeSphere
      </span>
    </motion.h2>

    {/* Subtext */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.5 }}
      className="mt-6 max-w-3xl text-lg md:text-xl text-gray-600"
    >
      A unified compliance and risk intelligence platform that helps
      organizations stay audit-ready, manage exposure, and prove trust —
      without operational friction.
    </motion.p>

    {/* Feature Cards */}
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
    >
      {[
        {
          title: "Continuous Compliance",
          desc:
            "Automated evidence collection and real-time control monitoring keep you prepared year-round."
        },
        {
          title: "Risk Visibility",
          desc:
            "See your risk posture clearly, prioritize threats, and act before issues escalate."
        },
        {
          title: "Demonstrable Trust",
          desc:
            "Show customers, partners, and regulators that your security and processes meet industry standards."
        }
      ].map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 260 }}
          className="rounded-2xl bg-white border border-gray-200 p-8 shadow-sm hover:shadow-xl transition"
        >
          <h3 className="text-lg font-semibold text-gray-900">
            {item.title}
          </h3>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </motion.div>

    {/* CTA */}
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.5 }}
      className="mt-16 flex flex-col sm:flex-row gap-6"
    >
      <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-indigo-700 to-purple-800 text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.03] transition">
        Book A Demo
      </button>
      <button className="px-10 py-4 rounded-xl border border-gray-300 bg-white text-gray-900 font-semibold hover:bg-cyan-100 hover:scale-[1.02] transition">
        Explore Platform
      </button>
    </motion.div>
  </div>
             </section>


      <section className="about">
                       
          
        
        <h1 className="animate-text">
          About SafeSphere: Streamline ISO 27001 compliance consulting with smart risk tools, policy templates, and team collaboration. Scale your cybersecurity advisory business effortlessly.
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
          SafeSphere offers comprehensive risk assessments, ISO 27001 documentation, and gap analysis to streamline cybersecurity compliance for businesses.


        </h1>
      </section>

    </div>
  );
};

export default TextScrollAnimation;
