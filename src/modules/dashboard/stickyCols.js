import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import './scroll.css';
import risk from './Images/risk.svg';
import docu from  './Images/docu.svg'

const StickyScroll = () => {
  const scrollRef = useRef(null);
  const lenisRef = useRef(null);
  const currentPhaseRef = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const lenis = new Lenis();
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const initTextSplit = () => {
      const textElements = scrollRef.current?.querySelectorAll(".col-3 h1, .col-3 p");
      if (!textElements?.length) return;

      textElements.forEach((element) => {
        const split = new SplitText(element, {
          type: "lines",
          linesClass: "line",
        });
        split.lines.forEach((line) => {
          line.innerHTML = `<span>${line.textContent}</span>`;
        });
      });
    };

    // Small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      initTextSplit();
      
      gsap.set(".col-3 .col-content-wrapper .line span", { y: "0%" });
      gsap.set(".col-3 .col-content-wrapper-2 .line span", { y: "-125%" });

      ScrollTrigger.create({
        trigger: ".sticky-cols",
        start: "top top",
        end: `+=${window.innerHeight * 5}px`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress >= 0.25 && currentPhaseRef.current === 0) {
            currentPhaseRef.current = 1;
            gsap.to(".col-1", { opacity: 0, scale: 0.75, duration: 0.75 });
            gsap.to(".col-2", { x: "0%", duration: 0.75 });
            gsap.to(".col-3", { y: "0%", duration: 0.75 });
            gsap.to(".col-img-1 img", { scale: 1.25, duration: 0.75 });
            gsap.to(".col-img-2", {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              duration: 0.75,
            });
            gsap.to(".col-img-2 img", { scale: 1, duration: 0.75 });
          }

          if (progress >= 0.5 && currentPhaseRef.current === 1) {
            currentPhaseRef.current = 2;
            gsap.to(".col-2", { opacity: 0, scale: 0.75, duration: 0.75 });
            gsap.to(".col-3", { x: "0%", duration: 0.75 });
            gsap.to(".col-4", { y: "0%", duration: 0.75 });
            gsap.to(".col-3 .col-content-wrapper .line span", {
              y: "-125%",
              duration: 0.75,
            });
            gsap.to(".col-3 .col-content-wrapper-2 .line span", {
              y: "0%",
              duration: 0.75,
              delay: 0.5,
            });
          }

          if (progress < 0.25 && currentPhaseRef.current >= 1) {
            currentPhaseRef.current = 0;
            gsap.to(".col-1", { opacity: 1, scale: 1, duration: 0.75 });
            gsap.to(".col-2", { x: "100%", duration: 0.75 });
            gsap.to(".col-3", { y: "100%", duration: 0.75 });
            gsap.to(".col-img-1 img", { scale: 1, duration: 0.75 });
            gsap.to(".col-img-2", {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              duration: 0.75,
            });
            gsap.to(".col-img-2 img", { scale: 1.25, duration: 0.75 });
          }

          if (progress < 0.5 && currentPhaseRef.current === 2) {
            currentPhaseRef.current = 1;
            gsap.to(".col-2", { opacity: 1, scale: 1, duration: 0.75 });
            gsap.to(".col-3", { x: "100%", duration: 0.75 });
            gsap.to(".col-4", { y: "100%", duration: 0.75 });
            gsap.to(".col-3 .col-content-wrapper .line span", {
              y: "0%",
              duration: 0.75,
              delay: 0.5,
            });
            gsap.to(".col-3 .col-content-wrapper-2 .line span", {
              y: "-125%",
              duration: 0.75,
            });
          }
        },
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={scrollRef} className="scroll-container">
      <section className="intro">
        <h1>We create modern interiors that feel effortlessly personal.</h1>
      </section>

      <section className="sticky-cols">
        <div className="sticky-cols-wrapper">
          <div className="col col-1">
            <div className="col-content">
              <div className="col-content-wrapper">
                <h1>Need to provider some relative header</h1>
                <p>write some paraghraph related to teh heading</p>
              </div>
            </div>
          </div>
          <div className="col col-2">
            <div className="col-img col-img-1">
              <div className="col-img-wrapper">
                <img src={risk} alt="" />
              </div>
            </div>
            <div className="col-img col-img-2">
              <div className="col-img-wrapper">
                <img src={docu} alt="" />
              </div>
            </div>
          </div>
          <div className="col col-3">
            <div className="col-content-wrapper">
              <h1>Second heading</h1>
              <p>Write something about the heading</p>
            </div>
            <div className="col-content-wrapper-2">
              <h1>heading some again</h1>
              <p>some paraghraph</p>
            </div>
          </div>
          <div className="col col-4">
            <div className="col-img">
              <div className="col-img-wrapper">
                <img src="/ere.svg.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="outro">
        <h1>Timeless design begins with a conversation.</h1>
      </section>
    </div>
  );
};

export default StickyScroll;
