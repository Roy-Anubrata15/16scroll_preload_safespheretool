// // src/modules/dashboard/shaders.js

// export const vertexShader = `
// varying vec2 vUv;

// void main() {
//   vUv = uv;
//   gl_Position = vec4(position.xy, 0.0, 1.0);
// }
// `;

// export const fluidShader = `
// precision highp float;

// uniform float u_time;
// uniform vec2 u_resolution;
// uniform vec4 u_mouse;
// uniform float u_brushSize;
// uniform float u_brushStrength;
// uniform float u_fluidDecay;
// uniform sampler2D u_previousFrame;

// varying vec2 vUv;

// void main() {
//   vec2 uv = vUv;

//   vec2 mousePos = u_mouse.xy;
//   vec2 prevMousePos = u_mouse.zw;

//   vec2 velocity = (mousePos - prevMousePos) * u_brushStrength;

//   float dist = distance(uv, mousePos);
//   float brush = 0.0;
//   if (dist < u_brushSize) {
//     brush = 1.0 - smoothstep(0.0, u_brushSize, dist);
//     velocity *= (1.0 - dist / u_brushSize) * 5.0;
//   }

//   vec4 prev = texture2D(u_previousFrame, uv);
//   vec2 newVel = mix(prev.xy * u_fluidDecay, velocity, brush);

//   newVel *= 0.985;

//   gl_FragColor = vec4(newVel, 0.0, 1.0);
// }
// `;

// export const displayShader = `
// precision highp float;

// uniform float u_time;
// uniform vec2 u_resolution;
// uniform sampler2D u_fluidTexture;
// uniform vec3 u_color1;
// uniform vec3 u_color2;
// uniform vec3 u_color3;
// uniform vec3 u_color4;
// uniform float u_distortionAmount;
// uniform float u_colorIntensity;

// varying vec2 vUv;

// void main() {
//   vec2 uv = vUv;

//   vec4 fluidData = texture2D(u_fluidTexture, uv);
//   vec2 distortion = fluidData.xy * u_distortionAmount * 30.0;

//   uv += distortion;
//   uv = clamp(uv, 0.0, 1.0);

//   float t = u_time * 0.15;
//   float gx = sin(uv.x * 6.0 + t) * 0.5 + 0.5;
//   float gy = cos(uv.y * 6.0 + t * 1.2) * 0.5 + 0.5;

//   vec3 colA = mix(u_color1, u_color2, gx);
//   vec3 colB = mix(u_color3, u_color4, gy);

//   vec3 gradient = mix(colA, colB, smoothstep(0.0, 1.0, uv.y + distortion.y * 0.5));

//   float fluidStrength = length(fluidData.xy) * u_colorIntensity;
//   gradient += gradient * fluidStrength * 0.8;

//   gl_FragColor = vec4(gradient, 0.95);
// }
// `;



















// export const vertexShader = `
// varying vec2 vUv;
// void main() {
//     vUv = uv;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }
// `;

// export const fluidShader = `
// uniform float iTime;
// uniform vec2 iResolution;
// uniform vec4 iMouse;
// uniform int iFrame;
// uniform sampler2D iPreviousFrame;
// uniform float uBrushSize;
// uniform float uBrushStrength;
// uniform float uFluidDecay;
// uniform float uTrailLength;
// uniform float uStopDecay;
// varying vec2 vUv;
// ;


// vec2 uT, U;

// float ln(vec2 p, vec2 a, vec2 b) {
//     return length(p - a - (b - a) * clamp(dot(p - a, b - a) / dot(b - a, b - a), 0., 1.));
// }

// vec4 t(vec2 v, int a, int b) {
//     return texture2D(iPreviousFrame, fract((v + vec2(float(a), float(b))) / uT));
// }

// vec4 t(vec2 v) {
//     return texture2D(iPreviousFrame, fract(v / uT));
// }

// float area(vec2 a, vec2 b, vec2 c) {
//     float A = length(b - c), B = length(c - a), C = length(a - b), s = 0.5 * (A + B + C);
//     return sqrt(s * (s - A) * (s - B) * (s - C));
// }

// void main() {
//     U = vUv * iResolution;
//     uT = iResolution.xy;

//     if (iFrame < 1) {
//         float w = 0.5 + sin(0.2 * U.x) * 0.5;
//         float q = length(U - 0.5 * uT);
//         gl_FragColor = vec4(0.1 * exp(-0.001 * q * q), 0, 0, w);
//     } else {
//         vec2 v = U;
//           A = v + vec2( 1,  1),
//         B = v + vec2( 1, -1),
//         C = v + vec2(-1,  1),
//         D = v + vec2(-1, -1);

//         for (int i = 0; i < 8; i++) {
//             v -= t(v).xy;
//             A -= t(A).xy;
//             B -= t(B).xy;
//             C -= t(C).xy;
//             D -= t(D).xy;
//         }

//         vec4 me = t(v);
//         vec4 n = t(v,  0,  1),
//              e = t(v,  1,  0),
//              s = t(v,  0, -1),
//              w = t(v, -1,  0);
//         vec4 ne = .25 * (n + e + s + w);
//         me = mix(t(v), ne, vec4(0.15, 0.15, 0.95, 0.));
//         me.z = me.z - 0.01 * ((area(A, B, C) + area(B, C, D)) - 4.);
//               vec4 pr = vec4(e.z, w.z, n.z, s.z);
//         me.xy = me.xy + 100. * vec2(pr.x - pr.y, pr.z - pr.w) / uT;

//         me.xy *= uFluidDecay;
//         me.z *= uTrailLength;

//         if (iMouse.z > 0.0) {
//             vec2 mousePos  = iMouse.xy;
//             vec2 mousePrev = iMouse.zw;
//             vec2 mouseVel  = mousePos - mousePrev;
//             float velMagnitude = length(mouseVel);
//             float q = ln(U, mousePos, mousePrev);
//             vec2 m = mousePos - mousePrev;
//             float l = length(m);
//             if (l > 0.0) m = min(1., 10.0) * m / l;

//             float brushSizeFactor   = 1e-4 / uBrushSize;
//             float strengthFactor    = 0.03 * uBrushStrength;

//             float falloff = exp(-brushSizeFactor * q * q * q);
//                       falloff = pow(falloff, 0.5);

//             me.xyw += strengthFactor * falloff * vec3(m, 10.);

//             if (velMagnitude < 2.0) {
//                 float distToCursor = length(U - mousePos);
//                 float influence = exp(-distToCursor * 0.01);
//                 float cursorDecay = mix(1.0, uStopDecay, influence);
//                 me.xy *= cursorDecay;
//                 me.z *= cursorDecay;
//             }

//         }

//         gl_FragColor = clamp(me, -0.4, 0.4);
//     }
// `;
// export const displayShader = `
// uniform float iTime;
// uniform vec2 iResolution;
// uniform sampler2D iFluid;
// uniform float uDistortionAmount;
// uniform vec3 uColor1;
// uniform vec3 uColor2;
// uniform vec3 uColor3;
// uniform vec3 uColor4;
// uniform float uColorIntensity;
// uniform float uSoftness;
// varying vec2 vUv;

// void main() {
//     vec2 fragCoord = vUv * iResolution;
//       vec4 fluid = texture2D(iFluid, vUv);
//     vec2 fluidVel = fluid.xy;

//     float mr = min(iResolution.x, iResolution.y);
//     vec2 uv = (fragCoord * 2.0 - iResolution.xy) / mr;

//     uv += fluidVel * (0.5 * uDistortionAmount);

//     float d = -iTime * 0.5;
//     float a = 0.0;
//     for (float i = 0.0; i < 8.0; ++i) {
//         a += cos(i - d - a * uv.x);
//         d += sin(uv.y * i + a);
//     }
//     d += iTime * 0.5;

//     float mixer1 = cos(uv.x * d) * 0.5 + 0.5;
//         float mixer2 = cos(uv.y * d) * 0.5 + 0.5;
//     float mixer3 = sin(d + a) * 0.5 + 0.5;

//     float smoothAmount = clamp(uSoftness * 0.1, 0.0, 0.9);
//     mixer1 = mix(mixer1, 0.5, smoothAmount);
//     mixer2 = mix(mixer2, 0.5, smoothAmount);
//     mixer3 = mix(mixer3, 0.5, smoothAmount);

//     vec3 col = mix(uColor1, uColor2, mixer1);
//     col = mix(col, uColor3, mixer2);
//     col = mix(col, uColor4, mixer3 * 0.4);

//     col *= uColorIntensity;

//     gl_FragColor = vec4(col, 1.0);
// }
// `;





// src/modules/dashboard/shaders.js
export const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fluidShader = `
uniform float iTime;
uniform vec2 iResolution;
uniform vec4 iMouse;
uniform int iFrame;
uniform sampler2D iPreviousFrame;
uniform float uBrushSize;
uniform float uBrushStrength;
uniform float uFluidDecay;
uniform float uTrailLength;
uniform float uStopDecay;
varying vec2 vUv;

vec2 uT, U;

float ln(vec2 p, vec2 a, vec2 b) {
    return length(p - a - (b - a) * clamp(dot(p - a, b - a) / dot(b - a, b - a), 0., 1.));
}

vec4 t(vec2 v, int a, int b) {
    return texture2D(iPreviousFrame, fract((v + vec2(float(a), float(b))) / uT));
}

vec4 t(vec2 v) {
    return texture2D(iPreviousFrame, fract(v / uT));
}

float area(vec2 a, vec2 b, vec2 c) {
    float A = length(b - c), B = length(c - a), C = length(a - b), s = 0.5 * (A + B + C);
    return sqrt(s * (s - A) * (s - B) * (s - C));
}

void main() {
    U = vUv * iResolution;
    uT = iResolution.xy;

    if (iFrame < 1) {
        float w = 0.5 + sin(0.2 * U.x) * 0.5;
        float q = length(U - 0.5 * uT);
        gl_FragColor = vec4(0.1 * exp(-0.001 * q * q), 0, 0, w);
    } else {
        vec2 v = U;
        vec2 A = v + vec2( 1,  1);  // ✅ FIXED: Added 'vec2' declarations
        vec2 B = v + vec2( 1, -1);
        vec2 C = v + vec2(-1,  1);
        vec2 D = v + vec2(-1, -1);

        for (int i = 0; i < 8; i++) {
            v -= t(v).xy;
            A -= t(A).xy;
            B -= t(B).xy;
            C -= t(C).xy;
            D -= t(D).xy;
        }

        vec4 me = t(v);
        vec4 n = t(v,  0,  1);
        vec4 e = t(v,  1,  0);
        vec4 s = t(v,  0, -1);
        vec4 w = t(v, -1,  0);
        vec4 ne = .25 * (n + e + s + w);
        me = mix(t(v), ne, vec4(0.15, 0.15, 0.95, 0.));
        me.z = me.z - 0.01 * ((area(A, B, C) + area(B, C, D)) - 4.);
        vec4 pr = vec4(e.z, w.z, n.z, s.z);
        me.xy = me.xy + 100. * vec2(pr.x - pr.y, pr.z - pr.w) / uT;

        me.xy *= uFluidDecay;
        me.z *= uTrailLength;

        if (iMouse.z > 0.0) {
            vec2 mousePos  = iMouse.xy;
            vec2 mousePrev = iMouse.zw;
            vec2 mouseVel  = mousePos - mousePrev;
            float velMagnitude = length(mouseVel);
            float q = ln(U, mousePos, mousePrev);
            vec2 m = mousePos - mousePrev;
            float l = length(m);
            if (l > 0.0) m = min(1., 10.0) * m / l;

            float brushSizeFactor   = 1e-4 / uBrushSize;
            float strengthFactor    = 0.03 * uBrushStrength;

            float falloff = exp(-brushSizeFactor * q * q * q);
            falloff = pow(falloff, 0.5);

            me.xyw += strengthFactor * falloff * vec3(m, 10.);

            if (velMagnitude < 2.0) {
                float distToCursor = length(U - mousePos);
                float influence = exp(-distToCursor * 0.01);
                float cursorDecay = mix(1.0, uStopDecay, influence);
                me.xy *= cursorDecay;
                me.z *= cursorDecay;
            }
        }

        gl_FragColor = clamp(me, -0.4, 0.4);
    }
}
`;

export const displayShader = `
uniform float iTime;
uniform vec2 iResolution;
uniform sampler2D iFluid;
uniform float uDistortionAmount;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform float uColorIntensity;
uniform float uSoftness;
varying vec2 vUv;

void main() {
    vec2 fragCoord = vUv * iResolution;
    vec4 fluid = texture2D(iFluid, vUv);
    vec2 fluidVel = fluid.xy;

    float mr = min(iResolution.x, iResolution.y);
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / mr;

    uv += fluidVel * (0.5 * uDistortionAmount);

    float d = -iTime * 0.5;
    float a = 0.0;
    for (float i = 0.0; i < 8.0; ++i) {
        a += cos(i - d - a * uv.x);
        d += sin(uv.y * i + a);
    }
    d += iTime * 0.5;

    float mixer1 = cos(uv.x * d) * 0.5 + 0.5;
    float mixer2 = cos(uv.y * d) * 0.5 + 0.5;
    float mixer3 = sin(d + a) * 0.5 + 0.5;

    float smoothAmount = clamp(uSoftness * 0.1, 0.0, 0.9);
    mixer1 = mix(mixer1, 0.5, smoothAmount);
    mixer2 = mix(mixer2, 0.5, smoothAmount);
    mixer3 = mix(mixer3, 0.5, smoothAmount);

    vec3 col = mix(uColor1, uColor2, mixer1);
    col = mix(col, uColor3, mixer2);
    col = mix(col, uColor4, mixer3 * 0.4);

    col *= uColorIntensity;

    gl_FragColor = vec4(col, 1.0);
}
`;
