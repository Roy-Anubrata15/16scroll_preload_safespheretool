// src/StickyCols.jsx
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import safeSvg from './Images/safe.svg.svg';  // Place your SVGs here
import esphSvg from './Images/ere.svg.svg';
import ereSvg from './Images/esph.svg.svg';

import "./scroll.css"

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function StickyCols() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Lenis smooth scroll
      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      // SplitText on .col-3 text
      const textElements = gsap.utils.toArray(".col-3 h1, .col-3 p");
      textElements.forEach((el) => {
        const split = new SplitText(el, {
          type: "lines",
          linesClass: "line",
        });

        split.lines.forEach((line) => {
          line.innerHTML = `<span>${line.textContent}</span>`;
        });
      });

      gsap.set(".col-3 .col-content-wrapper .line span", { y: "0%" });
      gsap.set(".col-3 .col-content-wrapper-2 .line span", { y: "-125%" });

      let currentPhase = 0;

      ScrollTrigger.create({
        trigger: ".sticky-cols",
        start: "top top",
        end: `+=${window.innerHeight * 5}px`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress >= 0.25 && currentPhase === 0) {
            currentPhase = 1;

            gsap.to(".col-1", { opacity: 0, scale: 0.75, duration: 0.75 });
            gsap.to(".col-2", { x: "0%", y: "0%", duration: 0.75 });
            gsap.to(".col-3", { y: "0%", duration: 0.75 });

            gsap.to(".col-img-1 img", { scale: 1.25, duration: 0.75 });

            gsap.to(".col-img-2", {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              duration: 0.75,
            });

            gsap.to(".col-img-2 img", { scale: 1, duration: 0.75 });
          }

          if (progress >= 0.5 && currentPhase === 1) {
            currentPhase = 2;

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

          if (progress < 0.25 && currentPhase >= 1) {
            currentPhase = 0;

            gsap.to(".col-1", { opacity: 1, scale: 1, duration: 0.75 });
            gsap.to(".col-2", { x: "100%", y: "100%", duration: 0.75 });
            gsap.to(".col-3", { y: "100%", duration: 0.75 });

            gsap.to(".col-img-1 img", { scale: 1, duration: 0.75 });
            gsap.to(".col-img-2", {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              duration: 0.75,
            });
            gsap.to(".col-img-2 img", { scale: 1.25, duration: 0.75 });
          }

          if (progress < 0.5 && currentPhase === 2) {
            currentPhase = 1;

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
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <section className="intro">
        <h1>We create modern interiors that feel effortlessly personal.</h1>
      </section>

      <section className="sticky-cols">
        <div className="sticky-cols-wrapper">
          <div className="col col-1">
            <div className="col-content">
              <div className="col-content-wrapper">
                <h1>Need to provide some relative header</h1>
                <p>Write some paragraph related to the heading.</p>
              </div>
            </div>
          </div>

          <div className="col col-2">
            <div className="col-img col-img-1">
              <div className="col-img-wrapper">
                <img src={safeSvg} alt="" />
              </div>
            </div>

            <div className="col-img col-img-2">
              <div className="col-img-wrapper">
                <img src={esphSvg} alt="" />
              </div>
            </div>
          </div>

          <div className="col col-3">
            <div className="col-content-wrapper">
              <h1>Second heading</h1>
              <p>Write something about the heading.</p>
            </div>
            <div className="col-content-wrapper-2">
              <h1>Heading some again</h1>
              <p>Some paragraph.</p>
            </div>
          </div>

          <div className="col col-4">
            <div className="col-img">
              <div className="col-img-wrapper">
                <img src={ereSvg} alt="" />
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
}
