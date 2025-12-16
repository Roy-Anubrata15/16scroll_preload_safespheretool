import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "lenis";

// Wait for DOM elements before starting
function waitForElements() {
  const cardContainer = document.querySelector(".card-container");
  const stickyHeader = document.querySelector(".sticky-header h1");
  
  if (!cardContainer || !stickyHeader) {
    requestAnimationFrame(waitForElements);
    return;
  }

  // Elements found, run animations
  runAnimations();
}

function runAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const cardContainer = document.querySelector(".card-container");
  const stickyHeader = document.querySelector(".sticky-header h1");

  let isGapAnimationCompleted = false;
  let isFlipAnimationCompleted = false;

  function initAnimations() {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const mm = gsap.matchMedia();

    // Mobile: reset styles
    mm.add("(max-width: 1000px)", () => {
      document
        .querySelectorAll(".card, .card-container, .sticky-header h1")
        .forEach((el) => (el.style = ""));
      return {};
    });

    // Desktop: perfect animations
    mm.add("(min-width: 1001px)", () => {
      ScrollTrigger.create({
        trigger: "section.sticky",
        start: "top top",
        end: `+=${window.innerHeight * 4}px`,
        scrub: 0.8,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // 1. Header animation (0.1-0.25)
          if (progress >= 0.1 && progress <= 0.25) {
            const headerProgress = gsap.utils.mapRange(0.1, 0.25, 0, 1, progress);
            const yValue = gsap.utils.mapRange(0, 1, 40, 0, headerProgress);
            const opacityValue = gsap.utils.mapRange(0, 1, 0, 1, headerProgress);

            gsap.set(stickyHeader, { y: yValue, opacity: opacityValue });
          } else if (progress < 0.1) {
            gsap.set(stickyHeader, { y: 40, opacity: 0 });
          } else {
            gsap.set(stickyHeader, { y: 0, opacity: 1 });
          }

          // 2. Container width (0-0.25)
          if (progress <= 0.25) {
            const widthPercentage = gsap.utils.mapRange(0, 0.25, 75, 60, progress);
            gsap.set(cardContainer, { width: `${widthPercentage}%` });
          } else {
            gsap.set(cardContainer, { width: "60%" });
          }

          // 3. Gap animation (0.35)
          if (progress >= 0.35 && !isGapAnimationCompleted) {
            gsap.to(cardContainer, { gap: "100px", duration: 0.5, ease: "power3.out" });
            gsap.to(["#card-1", "#card-2", "#card-3"], {
              borderRadius: "100px",
              duration: 0.5,
              ease: "power3.out",
            });
            isGapAnimationCompleted = true;
          } else if (progress < 0.35 && isGapAnimationCompleted) {
            gsap.to(cardContainer, { gap: "0px", duration: 0.5, ease: "power3.out" });
            gsap.to("#card-1", { borderRadius: "20px 0 0 20px", duration: 0.5, ease: "power3.out" });
            gsap.to("#card-2", { borderRadius: "0px", duration: 0.5, ease: "power3.out" });
            gsap.to("#card-3", { borderRadius: "0 20px 20px 0", duration: 0.5, ease: "power3.out" });
            isGapAnimationCompleted = false;
          }

          // 4. PERFECT 180° Card Flip (0.65-0.95)
          if (progress >= 0.65 && !isFlipAnimationCompleted) {
            const flipProgress = Math.min(gsap.utils.mapRange(0.65, 0.95, 0, 1, progress), 1);
            
            gsap.set(".card", { 
              rotationY: flipProgress * 180,      // 0° → 180° smooth
              rotationX: flipProgress * 8,        // Slight tilt
              scale: 1 + flipProgress * 0.03,     // Subtle scale
            });
            
            gsap.set("#card-1", { rotationZ: flipProgress * -12 });
            gsap.set("#card-3", { rotationZ: flipProgress * 12 });
            gsap.set("#card-2", { y: flipProgress * 15 });
            
            if (flipProgress >= 0.95) {
              isFlipAnimationCompleted = true;
            }
          } else if (progress <= 0.6 && isFlipAnimationCompleted) {
            gsap.set(".card", { rotationY: 0, rotationX: 0, scale: 1 });
            gsap.set("#card-1, #card-3", { rotationZ: 0 });
            gsap.set("#card-2", { y: 0 });
            isFlipAnimationCompleted = false;
          }
        },
      });
    });
  }

  initAnimations();

  // Resize handler
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initAnimations, 250);
  });
}

// Start when ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", waitForElements);
} else {
  waitForElements();
}
