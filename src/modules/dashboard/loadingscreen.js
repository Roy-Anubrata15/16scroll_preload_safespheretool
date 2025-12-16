import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function runPreloader(onComplete) {
  document.fonts.ready.then(() => {
    // 1. Helper: split texts
    function createSplitTexts(elements) {
      const splits = {};

      elements.forEach(({ key, selector, type }) => {
        const config = { type, mask: type };
        if (type === "chars") config.charsClass = "char";
        if (type === "lines") config.linesClass = "line";

        splits[key] = SplitText.create(selector, config);
      });

      return splits;
    }

    // Only split the SafeSphere logo text for now
    const splitElements = [
      { key: "logoChars", selector: ".preloader-logo h1", type: "chars" },
    ];

    const splits = createSplitTexts(splitElements);

    // 2. Initial states
    gsap.set(splits.logoChars.chars, { x: "100%" });
    gsap.set(".preloader-progress-bar", { scaleX: 0 });
    gsap.set(".preloader-mask", { scale: 1 });
    // gsap.set(".hero-image", { scale: 1.08 }); // hero starts slightly zoomed-in for parallax

    // 3. Progress bar helper (fake progress steps)
    function animateProgress(duration = 4) {
      const tl = gsap.timeline();
      const counterSteps = 5;
      let currentProgress = 0;

      for (let i = 0; i < counterSteps; i++) {
        const finalStep = i === counterSteps - 1;
        const targetProgress = finalStep
          ? 1
          : Math.min(currentProgress + Math.random() * 0.3 + 0.1, 0.9);
        currentProgress = targetProgress;

        tl.to(".preloader-progress-bar", {
          scaleX: targetProgress,
          duration: duration / counterSteps,
          ease: "power2.out",
        });
      }

      return tl;
    }

    // 4. Main timeline
    const tl = gsap.timeline({
      delay: 0.4,
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    tl.to(splits.logoChars.chars, {
      x: "0%",
      stagger: 0.05,
      duration: 1,
      ease: "power4.inOut",
    })
      .add(animateProgress(), "<")
      .to(
        splits.logoChars.chars,
        {
          x: "-100%",
          stagger: 0.05,
          duration: 1,
          ease: "power4.inOut",
        },
        "-=0.5"
      )
      // PILL → PAGE REVEAL + PARALLAX EFFECT
      .to(
        ".preloader-mask",
        {
          scale: 104, // pill cutout grows to cover the screen
          duration: 2,
          ease: "power3.out",
        },
        "<" // start at the same time as logo sliding out
      )
      // .to(
      //   ".hero-image",
      //   {
      //     scale: 1, // hero zooms out from 1.08 → 1
      //     duration: 2,
      //     ease: "power3.out",
      //   },
      //   "<"
      // )
      .to(".preloader", {
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        onComplete: () => {
          const el = document.querySelector(".preloader");
          if (el) el.style.display = "none";
        },
      });
  });
}
