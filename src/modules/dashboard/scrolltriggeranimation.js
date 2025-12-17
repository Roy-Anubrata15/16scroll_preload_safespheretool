// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/all";
// import Lenis from "lenis";

// // Wait for DOM elements before starting
// function waitForElements() {
//   const cardContainer = document.querySelector(".card-container");
//   const stickyHeader = document.querySelector(".sticky-header h1");

//   if (!cardContainer || !stickyHeader) {
//     requestAnimationFrame(waitForElements);
//     return;
//   }

//   runAnimations();
// }

// function runAnimations() {
//   gsap.registerPlugin(ScrollTrigger);

//   const lenis = new Lenis();
//   lenis.on("scroll", ScrollTrigger.update);
//   gsap.ticker.add((time) => {
//     lenis.raf(time * 1000);
//   });
//   gsap.ticker.lagSmoothing(0);

//   const cardContainer = document.querySelector(".card-container");
//   const stickyHeader = document.querySelector(".sticky-header h1");
//   const cards = gsap.utils.toArray(".card");

//   let isGapAnimationCompleted = false;
//   let isFlipAnimationCompleted = false;

//   function initAnimations() {
//     // kill old triggers
//     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

//     const mm = gsap.matchMedia();

//     // Mobile / tablet: no scroll animations
//     mm.add("(max-width: 1000px)", () => {
//       document
//         .querySelectorAll(".card, .card-container, .sticky-header h1")
//         .forEach((el) => (el.style = ""));
//       return {};
//     });

//     // Desktop animations
//     mm.add("(min-width: 1001px)", () => {
//       ScrollTrigger.create({
//         trigger: ".sticky",
//         start: "top top",
//         end: `+=${window.innerHeight * 3}px`,
//         scrub: 1,
//         pin: true,
//         pinSpacing: false,
//         onUpdate: (self) => {
//           const progress = self.progress;

//           // Header animation (0.1–0.25 band, your mapping reused)
//           if (progress >= 0.1 && progress <= 0.25) {
//             const headerProgress = gsap.utils.mapRange(0.1, 0.25, 0, 1, progress);
//             const yValue = gsap.utils.mapRange(0, 1, 40, 0, headerProgress);
//             const opacityValue = gsap.utils.mapRange(0, 1, 0, 1, headerProgress);

//             gsap.set(stickyHeader, { y: yValue, opacity: opacityValue });
//           } else if (progress < 0.1) {
//             gsap.set(stickyHeader, { y: 40, opacity: 0 });
//           } else if (progress > 0.25) {
//             gsap.set(stickyHeader, { y: 0, opacity: 1 });
//           }

//           // Container width
//           if (progress <= 0.25) {
//             const widthPercentage = gsap.utils.mapRange(0, 0.25, 75, 60, progress);
//             gsap.set(cardContainer, { width: `${widthPercentage}%` });
//           } else {
//             gsap.set(cardContainer, { width: "60%" });
//           }

//           // Gap animation
//           if (progress >= 0.35 && !isGapAnimationCompleted) {
//             gsap.to(cardContainer, {
//               gap: "100px",
//               duration: 0.5,
//               ease: "power3.out",
//             });
//             gsap.to(["#card-1", "#card-2", "#card-3"], {
//               borderRadius: "100px",
//               duration: 0.5,
//               ease: "power3.out",
//             });
//             isGapAnimationCompleted = true;
//           } else if (progress < 0.35 && isGapAnimationCompleted) {
//             gsap.to(cardContainer, {
//               gap: "0px",
//               duration: 0.5,
//               ease: "power3.out",
//             });
//             gsap.to("#card-1", {
//               borderRadius: "20px 0 0 20px",
//               duration: 0.5,
//               ease: "power3.out",
//             });
//             gsap.to("#card-2", {
//               borderRadius: "0px",
//               duration: 0.5,
//               ease: "power3.out",
//             });
//             gsap.to("#card-3", {
//               borderRadius: "0 20px 20px 0",
//               duration: 0.5,
//               ease: "power3.out",
//             });
//             isGapAnimationCompleted = false;
//           }

//           // Card flip: smooth 0.4–0.8 progress band
//           cards.forEach((card, index) => {
//             const front = card.querySelector(".card-front");
//             const back = card.querySelector(".card-back");
//             if (!front || !back) return;

//             if (progress >= 0.4 && progress <= 0.8) {
//               const flipProgress = gsap.utils.mapRange(0.4, 0.8, 0, 1, progress);

//               // Front: 0 → 180, Back: 180 → 360
//               gsap.set(front, { rotationY: flipProgress * 180 });
//               gsap.set(back, { rotationY: 180 + flipProgress * 180 });

//               // Optional tilt / offset
//               const tilt = gsap.utils.interpolate(0, 10, flipProgress);
//               const offset = gsap.utils.interpolate(0, 20, flipProgress);

//               gsap.set(card, {
//                 rotationZ:
//                   index === 0 ? -tilt : index === 2 ? tilt : 0,
//                 y: index === 1 ? offset : 0,
//               });

//               isFlipAnimationCompleted = true;
//             } else if (progress < 0.4 && isFlipAnimationCompleted) {
//               // Reset to front side
//               gsap.set(front, { rotationY: 0 });
//               gsap.set(back, { rotationY: 180 });
//               gsap.set(card, { rotationZ: 0, y: 0 });
//               isFlipAnimationCompleted = false;
//             }
//           });
//         },
//       });
//     });
//   }

//   initAnimations();

//   // Resize handler
//   let resizeTimer;
//   window.addEventListener("resize", () => {
//     clearTimeout(resizeTimer);
//     resizeTimer = setTimeout(initAnimations, 250);
//   });
// }

// // Start when ready
// if (document.readyState === "loading") {
//   document.addEventListener("DOMContentLoaded", waitForElements);
// } else {
//   waitForElements();
// }
