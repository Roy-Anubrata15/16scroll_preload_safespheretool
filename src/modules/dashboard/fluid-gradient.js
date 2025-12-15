// src/modules/dashboard/fluid-gradient.js


// let instance = null;

// export const initFluidGradient = (canvasRef, config = {}) => {
//   if (instance?.destroy) instance.destroy();

//   const canvas = canvasRef.current;
//   if (!canvas) return;

//   canvas.innerHTML = "";

//   const defaultConfig = {
//  brushSize: 0.2,          // was 0.04
//   brushStrength: 80.0,     // was 25.0
//   fluidDecay: 0.90,        // was 0.96 (slower fade)
//   distortionAmount: 0.12,  // was 0.025
//   colorIntensity: 3.0,     // was 1.2
//   colors: ["#4f46e5", "#7c3aed", "#ec4899", "#06b6d4"],
//   };
//   const settings = { ...defaultConfig, ...config };

//   const colors = settings.colors.map((hex) => {
//     const r = parseInt(hex.slice(1, 3), 16) / 255;
//     const g = parseInt(hex.slice(3, 5), 16) / 255;
//     const b = parseInt(hex.slice(5, 7), 16) / 255;
//     return [r, g, b];
//   });

//   const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
//   const scene = new THREE.Scene();
//   const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//   renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
//   canvas.appendChild(renderer.domElement);

//   const rtOptions = {
//     // type: THREE.FloatType,
//     format: THREE.RGBAFormat,
//     minFilter: THREE.LinearFilter,
//     magFilter: THREE.LinearFilter,
//     generateMipmaps: false,
//   };

//   const fluidTarget1 = new THREE.WebGLRenderTarget(1, 1, rtOptions);
//   const fluidTarget2 = new THREE.WebGLRenderTarget(1, 1, rtOptions);
//   let readTarget = fluidTarget1;
//   let writeTarget = fluidTarget2;

//   const geometry = new THREE.PlaneGeometry(2, 2);

//   const fluidMaterial = new THREE.ShaderMaterial({
//     uniforms: {
//       u_time: { value: 0 },
//       u_resolution: { value: new THREE.Vector2() },
//       u_mouse: { value: new THREE.Vector4(0.5, 0.5, 0.5, 0.5) },
//       u_brushSize: { value: settings.brushSize },
//       u_brushStrength: { value: settings.brushStrength },
//       u_fluidDecay: { value: settings.fluidDecay },
//       u_previousFrame: { value: null },
//     },
//     vertexShader,
//     fragmentShader: fluidShader,
//   });

//   const displayMaterial = new THREE.ShaderMaterial({
//     uniforms: {
//       u_time: { value: 0 },
//       u_resolution: { value: new THREE.Vector2() },
//       u_fluidTexture: { value: null },
//       u_color1: { value: new THREE.Vector3(...colors[0]) },
//       u_color2: { value: new THREE.Vector3(...colors[1]) },
//       u_color3: { value: new THREE.Vector3(...colors[2]) },
//       u_color4: { value: new THREE.Vector3(...colors[3]) },
//       u_distortionAmount: { value: settings.distortionAmount },
//       u_colorIntensity: { value: settings.colorIntensity },
//     },
//     vertexShader,
//     fragmentShader: displayShader,
//   });

//   const fluidMesh = new THREE.Mesh(geometry, fluidMaterial);
//   const displayMesh = new THREE.Mesh(geometry, displayMaterial);

//   scene.add(fluidMesh);

//   let mouseX = 0.5,
//     mouseY = 0.5,
//     prevMouseX = 0.5,
//     prevMouseY = 0.5;

//   const onMouseMove = (e) => {
//     const rect = renderer.domElement.getBoundingClientRect();
//     prevMouseX = mouseX;
//     prevMouseY = mouseY;
//     mouseX = (e.clientX - rect.left) / rect.width;
//     mouseY = 1 - (e.clientY - rect.top) / rect.height;
//   };

//   renderer.domElement.addEventListener("mousemove", onMouseMove);

//   const onResize = () => {
//     const w = canvas.offsetWidth;
//     const h = canvas.offsetHeight;
//     fluidTarget1.setSize(w, h);
//     fluidTarget2.setSize(w, h);
//     renderer.setSize(w, h);
//   };

//   window.addEventListener("resize", onResize);

//   const animate = () => {
//     requestAnimationFrame(animate);

//     const t = performance.now() * 0.001;

//     fluidMaterial.uniforms.u_time.value = t;
//     fluidMaterial.uniforms.u_resolution.value.set(
//       renderer.domElement.width,
//       renderer.domElement.height
//     );
//     fluidMaterial.uniforms.u_mouse.value.set(
//       mouseX,
//       mouseY,
//       prevMouseX,
//       prevMouseY
//     );
//     fluidMaterial.uniforms.u_previousFrame.value = readTarget.texture;

//     displayMaterial.uniforms.u_time.value = t;
//     displayMaterial.uniforms.u_resolution.value.set(
//       renderer.domElement.width,
//       renderer.domElement.height
//     );
//     displayMaterial.uniforms.u_fluidTexture.value = readTarget.texture;

//     renderer.setRenderTarget(writeTarget);
//     renderer.render(scene, camera);

//     renderer.setRenderTarget(null);
//     scene.add(displayMesh);
//     renderer.render(scene, camera);
//     scene.remove(displayMesh);

//     [readTarget, writeTarget] = [writeTarget, readTarget];
//   };

//   animate();
//   onResize();

//   instance = {
//     destroy() {
//       renderer.domElement.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("resize", onResize);
//       renderer.dispose();
//       fluidTarget1.dispose();
//       fluidTarget2.dispose();
//       fluidMaterial.dispose();
//       displayMaterial.dispose();
//       canvas.innerHTML = "";
//     },
//   };

//   return instance;
// };


// import * as THREE from "three";
// import { vertexShader, fluidShader, displayShader } from "./shaders.js";



// const config = {
//   brushSize: 25.0,
//   brushStrength: 0.5,
//   distortionAmount: 2.5,
//   fluidDecay: 0.98,
//   trailLength: 0.8,
//   stopDecay: 0.85,
//   color1: "#b8fff7",
//   color2: "#6e3466",
//   color3: "#0133ff",
//   color4: "#66d1fe",
//   colorIntensity: 1.0,
//   softness: 1.0,
// };

// function hexToRgb(hex) {
//   const r = parseInt(hex.slice(1, 3), 16) / 255;
//   const g = parseInt(hex.slice(3, 5), 16) / 255;
//   const b = parseInt(hex.slice(5, 7), 16) / 255;
//   return [r, g, b];
// }

// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// const gradientCanvas = document.querySelector(".gradient-canvas");
// renderer.setSize(window.innerWidth, window.innerHeight);
// gradientCanvas.appendChild(renderer.domElement);

// const fluidTarget1 = new THREE.WebGLRenderTarget(
//   window.innerWidth,
//   window.innerHeight,
//   {
//     minFilter: THREE.LinearFilter,
//     magFilter: THREE.LinearFilter,
//         format: THREE.RGBAFormat,
//     type: THREE.FloatType,
//   }
// );

// const fluidTarget2 = new THREE.WebGLRenderTarget(
//   window.innerWidth,
//   window.innerHeight,
//   {
//     minFilter: THREE.LinearFilter,
//     magFilter: THREE.LinearFilter,
//     format: THREE.RGBAFormat,
//     type: THREE.FloatType,
//   }
// );
// let currentFluidTarget = fluidTarget1;
// let previousFluidTarget = fluidTarget2;
// let frameCount = 0;

// const fluidMaterial = new THREE.ShaderMaterial({
//   uniforms: {
//     iTime: { value: 0 },
//     iResolution: {
//       value: new THREE.Vector2(window.innerWidth, window.innerHeight),
//     },

//        iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
//     iFrame: { value: 0 },
//     iPreviousFrame: { value: null },
//     uBrushSize: { value: config.brushSize },
//     uBrushStrength: { value: config.brushStrength },
//     uFluidDecay: { value: config.fluidDecay },
//     uTrailLength: { value: config.trailLength },
//     uStopDecay: { value: config.stopDecay },
//   },
//   vertexShader: vertexShader,
//   fragmentShader: fluidShader,
// });

// const displayMaterial = new THREE.ShaderMaterial({
//   uniforms: {
//     iTime: { value: 0 },
//     iResolution: {
//       value: new THREE.Vector2(window.innerWidth, window.innerHeight),
//     },
//     iFluid: { value: null },
//         uDistortionAmount: { value: config.distortionAmount },
//     uColor1: { value: new THREE.Vector3(...hexToRgb(config.color1)) },
//     uColor2: { value: new THREE.Vector3(...hexToRgb(config.color2)) },
//     uColor3: { value: new THREE.Vector3(...hexToRgb(config.color3)) },
//     uColor4: { value: new THREE.Vector3(...hexToRgb(config.color4)) },
//     uColorIntensity: { value: config.colorIntensity },
//     uSoftness: { value: config.softness },
//   },
//   vertexShader: vertexShader,
//   fragmentShader: displayShader,
// });
// const geometry = new THREE.PlaneGeometry(2, 2);
// const fluidPlane = new THREE.Mesh(geometry, fluidMaterial);
// const displayPlane = new THREE.Mesh(geometry, displayMaterial);

// let mouseX = 0,
//   mouseY = 0;
// let prevMouseX = 0,
//   prevMouseY = 0;
// let lastMoveTime = 0;


// document.addEventListener("mousemove", (e) => {
//   const rect = gradientCanvas.getBoundingClientRect();
//   prevMouseX = mouseX;
//   prevMouseY = mouseY;
//   mouseX = e.clientX - rect.left;
//   mouseY = rect.height - (e.clientY - rect.top);
//   lastMoveTime = performance.now();
//   fluidMaterial.uniforms.iMouse.value.set(
//     mouseX,
//     mouseY,
//     prevMouseX,
//     prevMouseY
//   );
// });

// document.addEventListener("mouseleave", () => {
//   fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
// });

// function animate() {
//   requestAnimationFrame(animate);

//   const time = performance.now() * 0.001;
//   fluidMaterial.uniforms.iTime.value = time;
//   displayMaterial.uniforms.iTime.value = time;
//   fluidMaterial.uniforms.iFrame.value = frameCount;

//   if (performance.now() - lastMoveTime > 100) {
//     fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
//   }
//     fluidMaterial.uniforms.uBrushSize.value = config.brushSize;
//   fluidMaterial.uniforms.uBrushStrength.value = config.brushStrength;
//   fluidMaterial.uniforms.uFluidDecay.value = config.fluidDecay;
//   fluidMaterial.uniforms.uTrailLength.value = config.trailLength;
//   fluidMaterial.uniforms.uStopDecay.value = config.stopDecay;

//   displayMaterial.uniforms.uDistortionAmount.value = config.distortionAmount;
//   displayMaterial.uniforms.uColorIntensity.value = config.colorIntensity;
//   displayMaterial.uniforms.uSoftness.value = config.softness;
//   displayMaterial.uniforms.uColor1.value.set(...hexToRgb(config.color1));
//   displayMaterial.uniforms.uColor2.value.set(...hexToRgb(config.color2));
//   displayMaterial.uniforms.uColor3.value.set(...hexToRgb(config.color3));
//   displayMaterial.uniforms.uColor4.value.set(...hexToRgb(config.color4));


//     fluidMaterial.uniforms.iPreviousFrame.value = previousFluidTarget.texture;
//   renderer.setRenderTarget(currentFluidTarget);
//   renderer.render(fluidPlane, camera);

//   displayMaterial.uniforms.iFluid.value = currentFluidTarget.texture;
//   renderer.setRenderTarget(null);
//   renderer.render(displayPlane, camera);
  
//     const temp = currentFluidTarget;
//   currentFluidTarget = previousFluidTarget;
//   previousFluidTarget = temp;

//   frameCount++;
// }

// window.addEventListener("resize", () => {
//   const width = window.innerWidth;
//   const height = window.innerHeight;
//   renderer.setSize(width, height);
//   fluidMaterial.uniforms.iResolution.value.set(width, height);
//   displayMaterial.uniforms.iResolution.value.set(width, height);
//   fluidTarget1.setSize(width, height);
//   fluidTarget2.setSize(width, height);
//   frameCount = 0;
// });
// animate();
















// import * as THREE from "three";
// import { vertexShader, fluidShader, displayShader } from "./shaders";

// /* -------------------------------------------------
//    DEFAULT CONFIG
// -------------------------------------------------- */
// const DEFAULT_CONFIG = {
//   brushSize: 25.0,
//   brushStrength: 0.5,
//   distortionAmount: 2.5,
//   fluidDecay: 0.98,
//   trailLength: 0.8,
//   stopDecay: 0.85,
//   color1: "#b8fff7",
//   color2: "#6e3466",
//   color3: "#0133ff",
//   color4: "#66d1fe",
//   colorIntensity: 1.0,
//   softness: 1.0,
// };

// /* -------------------------------------------------
//    UTILS
// -------------------------------------------------- */
// function hexToRgb(hex) {
//   return [
//     parseInt(hex.slice(1, 3), 16) / 255,
//     parseInt(hex.slice(3, 5), 16) / 255,
//     parseInt(hex.slice(5, 7), 16) / 255,
//   ];
// }

// /* -------------------------------------------------
//    INIT FUNCTION (REACT SAFE)
// -------------------------------------------------- */
// export function initFluidGradient(container, userConfig = {}) {
//   if (!container || !(container instanceof HTMLElement)) return;

//   const config = { ...DEFAULT_CONFIG, ...userConfig };

//   /* ---------------- SCENE ---------------- */
//   const scene = new THREE.Scene();
//   const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

//   const renderer = new THREE.WebGLRenderer({
//     antialias: true,
//     alpha: true,
//     powerPreference: "high-performance",
//   });

//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//   renderer.setSize(container.clientWidth, container.clientHeight);

//   // ✅ CORRECTED LINE
//   container.appendChild(renderer.domElement);

//   /* ---------------- RENDER TARGETS ---------------- */
//   const rtOptions = {
//     minFilter: THREE.LinearFilter,
//     magFilter: THREE.LinearFilter,
//     format: THREE.RGBAFormat,
//     type: THREE.FloatType,
//   };

//   let targetA = new THREE.WebGLRenderTarget(
//     container.clientWidth,
//     container.clientHeight,
//     rtOptions
//   );
//   let targetB = targetA.clone();

//   let readTarget = targetA;
//   let writeTarget = targetB;

//   /* ---------------- MATERIALS ---------------- */
//   const fluidMaterial = new THREE.ShaderMaterial({
//     uniforms: {
//       iTime: { value: 0 },
//       iFrame: { value: 0 },
//       iResolution: {
//         value: new THREE.Vector2(
//           container.clientWidth,
//           container.clientHeight
//         ),
//       },
//       iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
//       iPreviousFrame: { value: null },

//       uBrushSize: { value: config.brushSize },
//       uBrushStrength: { value: config.brushStrength },
//       uFluidDecay: { value: config.fluidDecay },
//       uTrailLength: { value: config.trailLength },
//       uStopDecay: { value: config.stopDecay },
//     },
//     vertexShader,
//     fragmentShader: fluidShader,
//   });

//   const displayMaterial = new THREE.ShaderMaterial({
//     uniforms: {
//       iTime: { value: 0 },
//       iResolution: {
//         value: new THREE.Vector2(
//           container.clientWidth,
//           container.clientHeight
//         ),
//       },
//       iFluid: { value: null },

//       uDistortionAmount: { value: config.distortionAmount },
//       uColor1: { value: new THREE.Vector3(...hexToRgb(config.color1)) },
//       uColor2: { value: new THREE.Vector3(...hexToRgb(config.color2)) },
//       uColor3: { value: new THREE.Vector3(...hexToRgb(config.color3)) },
//       uColor4: { value: new THREE.Vector3(...hexToRgb(config.color4)) },
//       uColorIntensity: { value: config.colorIntensity },
//       uSoftness: { value: config.softness },
//     },
//     vertexShader,
//     fragmentShader: displayShader,
//   });

//   /* ---------------- MESHES ---------------- */
//   const geometry = new THREE.PlaneGeometry(2, 2);
//   const fluidMesh = new THREE.Mesh(geometry, fluidMaterial);
//   const displayMesh = new THREE.Mesh(geometry, displayMaterial);

//   scene.add(fluidMesh);

//   /* ---------------- MOUSE ---------------- */
//   let mouseX = 0,
//     mouseY = 0,
//     prevX = 0,
//     prevY = 0,
//     lastMove = 0;

//   const onMouseMove = (e) => {
//     const rect = renderer.domElement.getBoundingClientRect();

//     prevX = mouseX;
//     prevY = mouseY;

//     mouseX = e.clientX - rect.left;
//     mouseY = rect.height - (e.clientY - rect.top);
//     lastMove = performance.now();

//     fluidMaterial.uniforms.iMouse.value.set(
//       mouseX,
//       mouseY,
//       prevX,
//       prevY
//     );
//   };

//   window.addEventListener("mousemove", onMouseMove);

//   /* ---------------- RESIZE ---------------- */
//   const onResize = () => {
//     const w = container.clientWidth;
//     const h = container.clientHeight;

//     renderer.setSize(w, h);
//     fluidMaterial.uniforms.iResolution.value.set(w, h);
//     displayMaterial.uniforms.iResolution.value.set(w, h);

//     targetA.setSize(w, h);
//     targetB.setSize(w, h);
//   };

//   window.addEventListener("resize", onResize);

//   /* ---------------- LOOP ---------------- */
//   let rafId;

//   const animate = () => {
//     rafId = requestAnimationFrame(animate);

//     const t = performance.now() * 0.001;
//     fluidMaterial.uniforms.iTime.value = t;
//     fluidMaterial.uniforms.iFrame.value++;
//     displayMaterial.uniforms.iTime.value = t;

//     if (performance.now() - lastMove > 120) {
//       fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
//     }

//     fluidMaterial.uniforms.iPreviousFrame.value = readTarget.texture;

//     renderer.setRenderTarget(writeTarget);
//     renderer.render(scene, camera);

//     displayMaterial.uniforms.iFluid.value = writeTarget.texture;

//     renderer.setRenderTarget(null);
//     scene.add(displayMesh);
//     renderer.render(scene, camera);
//     scene.remove(displayMesh);

//     [readTarget, writeTarget] = [writeTarget, readTarget];
//   };

//   animate();

//   /* ---------------- CLEANUP ---------------- */
//   return {
//     destroy() {
//       cancelAnimationFrame(rafId);
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("resize", onResize);

//       geometry.dispose();
//       fluidMaterial.dispose();
//       displayMaterial.dispose();
//       targetA.dispose();
//       targetB.dispose();
//       renderer.dispose();

//       container.innerHTML = "";
//     },
//   };
// }


















// src/modules/dashboard/fluid-gradient.js
import * as THREE from "three";
 import * as shaders from "./shaders.js"; 
const config = {
  brushSize: 25.0,
  brushStrength: 0.5,
  distortionAmount: 2.5,
  fluidDecay: 0.98,
  trailLength: 0.8,
  stopDecay: 0.85,
  color1: "#b8fff7",
  color2: "#6e3466",
  color3: "#0133ff",
  color4: "#66d1fe",
  colorIntensity: 1.0,
  softness: 1.0,
};

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

let scene, camera, renderer, fluidTarget1, fluidTarget2;
let currentFluidTarget, previousFluidTarget, fluidMaterial, displayMaterial;
let fluidPlane, displayPlane;
let frameCount = 0;
let isInitialized = false;
let resizeHandler = null;
let mouseX = 0, mouseY = 0, prevMouseX = 0, prevMouseY = 0, lastMoveTime = 0;

export function initFluidGradient(canvas) {
  if (isInitialized) return;
  
  // Setup renderer
  renderer = new THREE.WebGLRenderer({ 
    canvas, 
    antialias: true,
    preserveDrawingBuffer: true 
  });
  
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  
  const resizeRenderer = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    fluidMaterial.uniforms.iResolution.value.set(width, height);
    displayMaterial.uniforms.iResolution.value.set(width, height);
    
    if (fluidTarget1) {
      fluidTarget1.setSize(width, height);
      fluidTarget2.setSize(width, height);
    }
  };
  
  resizeHandler = resizeRenderer;
  resizeRenderer();
  
  // Setup render targets
  fluidTarget1 = new THREE.WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight,
    {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    }
  );

  fluidTarget2 = fluidTarget1.clone();
  currentFluidTarget = fluidTarget1;
  previousFluidTarget = fluidTarget2;

  // Setup materials
  fluidMaterial = new THREE.ShaderMaterial({
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
      iFrame: { value: 0 },
      iPreviousFrame: { value: null },
      uBrushSize: { value: config.brushSize },
      uBrushStrength: { value: config.brushStrength },
      uFluidDecay: { value: config.fluidDecay },
      uTrailLength: { value: config.trailLength },
      uStopDecay: { value: config.stopDecay },
    },
   vertexShader: shaders.vertexShader,    // ✅ CHANGED
  fragmentShader: shaders.fluidShader, 
  });

  displayMaterial = new THREE.ShaderMaterial({
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      iFluid: { value: null },
      uDistortionAmount: { value: config.distortionAmount },
      uColor1: { value: new THREE.Vector3(...hexToRgb(config.color1)) },
      uColor2: { value: new THREE.Vector3(...hexToRgb(config.color2)) },
      uColor3: { value: new THREE.Vector3(...hexToRgb(config.color3)) },
      uColor4: { value: new THREE.Vector3(...hexToRgb(config.color4)) },
      uColorIntensity: { value: config.colorIntensity },
      uSoftness: { value: config.softness },
    },
  vertexShader: shaders.vertexShader,    // ✅ CHANGED
  fragmentShader: shaders.displayShader, // ✅ CHANGED
  });

  const geometry = new THREE.PlaneGeometry(2, 2);
  fluidPlane = new THREE.Mesh(geometry, fluidMaterial);
  displayPlane = new THREE.Mesh(geometry, displayMaterial);

  scene = new THREE.Scene();
  scene.add(fluidPlane);
  scene.add(displayPlane);

  // Mouse handling - moved to module scope
  const handleMouseMove = (e) => {
    const rect = canvas.getBoundingClientRect();
    prevMouseX = mouseX;
    prevMouseY = mouseY;
    mouseX = e.clientX - rect.left;
    mouseY = canvas.clientHeight - (e.clientY - rect.top);
    lastMoveTime = performance.now();
    fluidMaterial.uniforms.iMouse.value.set(mouseX, mouseY, prevMouseX, prevMouseY);
  };

  const handleMouseLeave = () => {
    fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
  };

  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mouseleave", handleMouseLeave);

  // Store event handlers for cleanup
  canvas._fluidHandlers = { handleMouseMove, handleMouseLeave };

  // Resize handler
  window.addEventListener("resize", resizeHandler);

  isInitialized = true;
  animate();
}

function animate() {
  if (!renderer || !isInitialized) return;
  
  requestAnimationFrame(animate);

  const time = performance.now() * 0.001;
  fluidMaterial.uniforms.iTime.value = time;
  displayMaterial.uniforms.iTime.value = time;
  fluidMaterial.uniforms.iFrame.value = frameCount;

  // Reset mouse if inactive
  if (performance.now() - lastMoveTime > 100) {
    fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
  }

  // Update colors
  displayMaterial.uniforms.uColor1.value.set(...hexToRgb(config.color1));
  displayMaterial.uniforms.uColor2.value.set(...hexToRgb(config.color2));
  displayMaterial.uniforms.uColor3.value.set(...hexToRgb(config.color3));
  displayMaterial.uniforms.uColor4.value.set(...hexToRgb(config.color4));

  // Fluid simulation pass
  fluidMaterial.uniforms.iPreviousFrame.value = previousFluidTarget.texture;
  renderer.setRenderTarget(currentFluidTarget);
  renderer.render(fluidPlane, camera);

  // Display pass
  displayMaterial.uniforms.iFluid.value = currentFluidTarget.texture;
  renderer.setRenderTarget(null);
  renderer.render(displayPlane, camera);

  // Swap render targets
  [currentFluidTarget, previousFluidTarget] = [previousFluidTarget, currentFluidTarget];
  frameCount++;
}

export function destroyFluidGradient(canvas) {
  if (canvas && canvas._fluidHandlers) {
    canvas.removeEventListener("mousemove", canvas._fluidHandlers.handleMouseMove);
    canvas.removeEventListener("mouseleave", canvas._fluidHandlers.handleMouseLeave);
    delete canvas._fluidHandlers;
  }
  
  if (resizeHandler) {
    window.removeEventListener("resize", resizeHandler);
  }
  
  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
  }
  
  if (fluidTarget1) fluidTarget1.dispose();
  if (fluidTarget2) fluidTarget2.dispose();
  if (fluidMaterial) fluidMaterial.dispose();
  if (displayMaterial) displayMaterial.dispose();
  
  isInitialized = false;
  frameCount = 0;
}
