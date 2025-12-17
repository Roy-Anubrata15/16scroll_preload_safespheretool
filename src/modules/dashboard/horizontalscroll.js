// BookDemoScroll.jsx
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Horizontalscroll() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".demo",
        start: "top top",
        end: "+=5000vh", // increase for slower movement
        scrub: 5,        // higher = smoother/slower catching up
        pin: ".demo",
        onUpdate: (self) => {
          gsap.to(".demo", {
            x: `${-350 * self.progress}vw`,
            duration: 0.5,
            ease: "power3.out",
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);



  
  return (
    <div className="container" ref={containerRef}>
      <section className="demo ">
        <h1>Book A Demo</h1>



      </section>
    </div>
  );
}
