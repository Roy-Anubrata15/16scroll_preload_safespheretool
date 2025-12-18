"use client"; // For Next.js

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './horizontalscroll.css';

gsap.registerPlugin(ScrollTrigger);

export default function Horizontalscroll() {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Main horizontal scroll
      ScrollTrigger.create({
        trigger: ".demo",
        start: "top top",
        end: "+=3000vh",
        scrub: 5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          gsap.to(".demo", {
            x: `${-350 * self.progress}vw`,
            duration: 0.3,
            ease: "power3.out",
          });
        },
        onComplete: () => {
          // Show button at end of scroll
          gsap.to(buttonRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="container" ref={containerRef}>
      <section className="demo">
        <h1>Book A Demo</h1>
        
      </section>
 
      
    </div>
  );
}
