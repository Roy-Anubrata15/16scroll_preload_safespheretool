import React, { useEffect, useRef } from 'react';
import './cardanimation.css';
import safeSvg from './Images/file (2).svg';  // Place your SVGs here
import esphSvg from './Images/file (1).svg';
import ereSvg from './Images/file.svg';




const SplitCardAnimation = () => {
  const containerRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    // Dynamically import GSAP and create script
    const initScript = async () => {
      if (!window.gsap || !window.ScrollTrigger || !window.Lenis) {
        const gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
        document.head.appendChild(gsapScript);

        gsapScript.onload = () => {
          const stScript = document.createElement('script');
          stScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
          document.head.appendChild(stScript);

          stScript.onload = () => {
            const lenisScript = document.createElement('script');
            lenisScript.src = 'https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.umd.js';
            document.head.appendChild(lenisScript);
            lenisScript.onload = initAnimations;
          };
        };
      } else {
        initAnimations();
      }
    };

    const initAnimations = () => {
      if (!window.gsap) return;
      
      window.gsap.registerPlugin(window.ScrollTrigger);
      
      const lenis = new window.Lenis();
      lenis.on("scroll", window.ScrollTrigger.update);
      window.gsap.ticker.add((time) => lenis.raf(time * 1000));
      window.gsap.ticker.lagSmoothing(0);

      let isGapAnimationCompleted = false;
      let isFlipAnimationCompleted = false;

      const cardContainer = containerRef.current?.querySelector(".card-container");
      const stickyHeader = containerRef.current?.querySelector(".sticky-header h1");

      function initScrollTrigger() {
        window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

        window.ScrollTrigger.create({
          trigger: containerRef.current.querySelector(".sticky"),
          start: "top top",
          end: `+=${window.innerHeight * 4}px`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const progress = self.progress;

            // Header animation
            if (progress >= 0.1 && progress <= 0.25) {
              const headerProgress = window.gsap.utils.mapRange(0.1, 0.25, 0, 1, progress);
              const yValue = window.gsap.utils.mapRange(0, 1, 40, 0, headerProgress);
              const opacityValue = window.gsap.utils.mapRange(0, 1, 0, 1, headerProgress);
              window.gsap.set(stickyHeader, { y: yValue, opacity: opacityValue });
            } else if (progress < 0.1) {
              window.gsap.set(stickyHeader, { y: 40, opacity: 0 });
            } else if (progress > 0.25) {
              window.gsap.set(stickyHeader, { y: 0, opacity: 1 });
            }

            // Card container width
            if (progress <= 0.25) {
              const widthPercentage = window.gsap.utils.mapRange(20, 0.25, 95, 60, progress);
              window.gsap.set(cardContainer, { width: `${widthPercentage}%` });
            } else {
              window.gsap.set(cardContainer, { width: "60%" });
            }

            // Gap animation
            if (progress >= 0.35 && !isGapAnimationCompleted) {
              window.gsap.to(cardContainer, { gap: "100px", duration: 0.5, ease: "power3.out" });
              window.gsap.to(["#card-1", "#card-2", "#card-3"], {
                borderRadius: "50px",
                duration: 0.5,
                ease: "power3.out",
              });
              isGapAnimationCompleted = true;
            } else if (progress < 0.35 && isGapAnimationCompleted) {
              window.gsap.to(cardContainer, { gap: "0px", duration: 0.5, ease: "power3.out" });
              window.gsap.to("#card-1", { borderRadius: "5px 0 0 5px", duration: 0.5, ease: "power3.out" });
              window.gsap.to("#card-2", { borderRadius: "0px", duration: 0.5, ease: "power3.out" });
              window.gsap.to("#card-3", { borderRadius: "0 5px 5px 0", duration: 0.5, ease: "power3.out" });
              isGapAnimationCompleted = false;
            }

            // Flip animation
// Flip animation block in onUpdate
if (progress >= 0.7 && !isFlipAnimationCompleted) {
  window.gsap.to(".card", {
    rotationY: 180,
    duration: 0.75,
    ease: "power3.inOut",
    stagger: 0.1,
  });
  window.gsap.to(["#card-1", "#card-3"], {
    y: 30,
    rotationZ: (i) => [-15, 15][i],
    duration: 0.75,
    ease: "power3.inOut",
  });
  isFlipAnimationCompleted = true;
} else if (progress < 0.7 && isFlipAnimationCompleted) {
  window.gsap.to(".card", {
    rotationY: 0,
    duration: 0.75,
    ease: "power3.inOut",
    stagger: -0.1,
  });
  window.gsap.to(["#card-1", "#card-3"], {
    y: 0,
    rotationZ: 0,
    duration: 0.75,
    ease: "power3.inOut",
  });
  isFlipAnimationCompleted = false;
}

          },
        });
      }

      initScrollTrigger();

      const resizeHandler = () => {
        window.ScrollTrigger.refresh();
      };
      window.addEventListener("resize", resizeHandler);
      return () => window.removeEventListener("resize", resizeHandler);
    };

    initScript();

    return () => {
      if (scriptRef.current) {
        document.head.removeChild(scriptRef.current);
      }
    };
  }, []);

  const cards = [
    { id: 'card-1', front: safeSvg, back: 'Risk Assessment' },
    { id: 'card-2', front: esphSvg, back: 'Documentation' },
    { id: 'card-3', front: ereSvg, back: 'Gap Assessment' },
  ];

  return (
    

    
    <div className="card-section" ref={containerRef}>
      
      
      <section className="sticky">
        {/* <div className="sticky-header">
          <h1>Three pillars with one purpose</h1>
        </div> */}
        
<div className="card-container">
  {cards.map(({ id, front, back }, index) => (
    <div className="card" key={id} id={id}>
      <div className="card-front">
        <img src={front} alt="" />
      </div>
      <div className="card-back">
        <span>({`0${index + 1}`})</span>
        <p>{back}</p>
      </div>
    </div>
  ))}
</div>

      </section>

    
    </div>
  );
};

export default SplitCardAnimation;
