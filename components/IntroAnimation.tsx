/* eslint-disable react-hooks/refs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */

"use client";

import React, { useState, useEffect, useRef, useLayoutEffect, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useSfx } from '@/lib/useSfx';
import Image from 'next/image';

// =====================================
// OGL Galaxy Background (Neon Palette)
// Adapted as pre-roll intro phase
// =====================================

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform float uZoom;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;
uniform bool uTransparent;

varying vec2 vUv;

#define NUM_LAYER 4.0
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

vec3 neonPalette(float s) {
  float k = floor(fract(s * 11.73) * 4.0);
  float shift = floor(mod(uHueShift, 360.0) / 90.0);
  k = mod(k + shift, 4.0);

  vec3 magenta = vec3(1.0, 0.0, 1.0);
  vec3 cyan    = vec3(0.0, 1.0, 1.0);
  vec3 green   = vec3(0.0, 1.0, 0.53);
  vec3 purple  = vec3(0.53, 0.0, 1.0);

  vec3 base;
  if (k < 0.5) base = magenta;
  else if (k < 1.5) base = cyan;
  else if (k < 2.5) base = green;
  else base = purple;

  float luma = dot(base, vec3(0.299, 0.587, 0.114));
  base = mix(vec3(luma), base, clamp(uSaturation, 0.0, 1.0));

  return base;
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);

  vec2 gv = fract(uv) - 0.5;
  vec2 id = floor(uv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 si = id + vec2(float(x), float(y));
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

      vec3 base = neonPalette(seed);
      float bright = 0.65 + 0.55 * smoothstep(0.6, 1.0, size);
      base *= bright;

      vec2 pad = vec2(
        tris(seed * 34.0 + uTime * uSpeed / 10.0),
        tris(seed * 38.0 + uTime * uSpeed / 30.0)
      ) - 0.5;

      float star = Star(gv - vec2(float(x), float(y)) - pad, flareSize);

      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;

      col += star * size * base;
    }
  }

  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0);
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  } else if (uMouseRepulsion) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    float mouseDist = length(uv - mousePosUV);
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
    uv += repulsion * 0.05 * uMouseActiveFactor;
  } else {
    vec2 mouseOffset = (uMouse - vec2(0.5)) * 0.1 * uMouseActiveFactor;
    uv += mouseOffset;
  }

  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;

  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

  uv *= max(0.001, uZoom);

  vec3 col = vec3(0.0);

  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }

  if (uTransparent) {
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.3, alpha);
    alpha = min(alpha, 1.0);
    gl_FragColor = vec4(col, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`;

export type GalaxyController = {
  set: (next: Partial<GalaxyParams>) => void;
  params: GalaxyParams;
};

type GalaxyParams = {
  zoom: number;
  starSpeed: number;
  density: number;
  hueShift: number;
  speed: number;
  glowIntensity: number;
  saturation: number;
  twinkleIntensity: number;
  rotationSpeed: number;
  repulsionStrength: number;
  mouseRepulsion: boolean;
  autoCenterRepulsion: number;
  transparent: boolean;
  focal: [number, number];
  rotation: [number, number];
};

interface GalaxyBgProps {
  controllerRef?: React.MutableRefObject<GalaxyController | null>;
  focal?: [number, number];
  rotation?: [number, number];
  starSpeed?: number;
  density?: number;
  hueShift?: number;
  speed?: number;
  glowIntensity?: number;
  saturation?: number;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  mouseInteraction?: boolean;
  mouseRepulsion?: boolean;
  repulsionStrength?: number;
  autoCenterRepulsion?: number;
  transparent?: boolean;
  disableAnimation?: boolean;
}

function GalaxyBackground({
  controllerRef,
  focal = [0.5, 0.5],
  rotation = [1.0, 0.0],
  starSpeed = 0.12,
  density = 0.2,
  hueShift = 180,
  speed = 1.0,
  glowIntensity = 0.1,
  saturation = 1.0,
  twinkleIntensity = 0.1,
  rotationSpeed = 0.12,
  mouseInteraction = true,
  mouseRepulsion = true,
  repulsionStrength = 2,
  autoCenterRepulsion = 0,
  transparent = true,
  disableAnimation = false,
}: GalaxyBgProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const targetMousePos = useRef({ x: 0.5, y: 0.5 });
  const smoothMousePos = useRef({ x: 0.5, y: 0.5 });
  const targetMouseActive = useRef(0.0);
  const smoothMouseActive = useRef(0.0);

  const paramsRef = useRef<GalaxyParams>({
    zoom: 1.0,
    starSpeed,
    density,
    hueShift,
    speed,
    glowIntensity,
    saturation,
    twinkleIntensity,
    rotationSpeed,
    repulsionStrength,
    mouseRepulsion,
    autoCenterRepulsion,
    transparent,
    focal,
    rotation,
  });

  useEffect(() => {
    if (!controllerRef) return;
    controllerRef.current = {
      params: paramsRef.current,
      set: (next) => Object.assign(paramsRef.current, next),
    };
  }, [controllerRef]);

  useEffect(() => {
    Object.assign(paramsRef.current, {
      starSpeed,
      density,
      hueShift,
      speed,
      glowIntensity,
      saturation,
      twinkleIntensity,
      rotationSpeed,
      repulsionStrength,
      mouseRepulsion,
      autoCenterRepulsion,
      transparent,
      focal,
      rotation,
    });
    if (controllerRef?.current) controllerRef.current.params = paramsRef.current;
  }, [
    starSpeed,
    density,
    hueShift,
    speed,
    glowIntensity,
    saturation,
    twinkleIntensity,
    rotationSpeed,
    repulsionStrength,
    mouseRepulsion,
    autoCenterRepulsion,
    transparent,
    focal,
    rotation,
    controllerRef,
  ]);

  useEffect(() => {
    if (!ctnDom.current) return;
    const ctn = ctnDom.current;

    const renderer = new Renderer({
      alpha: transparent,
      premultipliedAlpha: false,
    });
    const gl = renderer.gl;

    if (transparent) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
    } else {
      gl.clearColor(0, 0, 0, 1);
    }

    let program: Program;

    function resize() {
      const scale = 1;
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
      if (program) {
        program.uniforms.uResolution.value = new Color(
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height
        );
      }
    }

    window.addEventListener("resize", resize, false);
    resize();

    const geometry = new Triangle(gl);
    const p0 = paramsRef.current;

    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height),
        },
        uFocal: { value: new Float32Array(p0.focal) },
        uRotation: { value: new Float32Array(p0.rotation) },
        uStarSpeed: { value: 0 },
        uDensity: { value: p0.density },
        uHueShift: { value: p0.hueShift },
        uSpeed: { value: p0.speed },
        uZoom: { value: p0.zoom },
        uMouse: { value: new Float32Array([smoothMousePos.current.x, smoothMousePos.current.y]) },
        uGlowIntensity: { value: p0.glowIntensity },
        uSaturation: { value: p0.saturation },
        uMouseRepulsion: { value: p0.mouseRepulsion },
        uTwinkleIntensity: { value: p0.twinkleIntensity },
        uRotationSpeed: { value: p0.rotationSpeed },
        uRepulsionStrength: { value: p0.repulsionStrength },
        uMouseActiveFactor: { value: 0.0 },
        uAutoCenterRepulsion: { value: p0.autoCenterRepulsion },
        uTransparent: { value: p0.transparent },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    let animateId = 0;

    function update(t: number) {
      animateId = requestAnimationFrame(update);
      const p = paramsRef.current;

      if (!disableAnimation) {
        const time = t * 0.001;
        program.uniforms.uTime.value = time;
        program.uniforms.uStarSpeed.value = (time * p.starSpeed) / 10.0;
      }

      const lerp = 0.05;
      smoothMousePos.current.x += (targetMousePos.current.x - smoothMousePos.current.x) * lerp;
      smoothMousePos.current.y += (targetMousePos.current.y - smoothMousePos.current.y) * lerp;
      smoothMouseActive.current += (targetMouseActive.current - smoothMouseActive.current) * lerp;

      program.uniforms.uMouse.value[0] = smoothMousePos.current.x;
      program.uniforms.uMouse.value[1] = smoothMousePos.current.y;
      program.uniforms.uMouseActiveFactor.value = smoothMouseActive.current;

      program.uniforms.uDensity.value = p.density;
      program.uniforms.uGlowIntensity.value = p.glowIntensity;
      program.uniforms.uTwinkleIntensity.value = p.twinkleIntensity;
      program.uniforms.uRotationSpeed.value = p.rotationSpeed;
      program.uniforms.uRepulsionStrength.value = p.repulsionStrength;
      program.uniforms.uSpeed.value = p.speed;
      program.uniforms.uZoom.value = p.zoom;
      program.uniforms.uHueShift.value = p.hueShift;
      program.uniforms.uSaturation.value = p.saturation;
      program.uniforms.uMouseRepulsion.value = p.mouseRepulsion;
      program.uniforms.uTransparent.value = p.transparent;
      program.uniforms.uAutoCenterRepulsion.value = p.autoCenterRepulsion;

      program.uniforms.uFocal.value[0] = p.focal[0];
      program.uniforms.uFocal.value[1] = p.focal[1];
      program.uniforms.uRotation.value[0] = p.rotation[0];
      program.uniforms.uRotation.value[1] = p.rotation[1];

      renderer.render({ scene: mesh });
    }

    animateId = requestAnimationFrame(update);
    ctn.appendChild(gl.canvas);

    function handleMouseMove(e: MouseEvent) {
      const rect = ctn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      targetMousePos.current = { x, y };
      targetMouseActive.current = 1.0;
    }

    function handleMouseLeave() {
      targetMouseActive.current = 0.0;
    }

    if (mouseInteraction) {
      ctn.addEventListener("mousemove", handleMouseMove);
      ctn.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener("resize", resize);
      if (mouseInteraction) {
        ctn.removeEventListener("mousemove", handleMouseMove);
        ctn.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (gl.canvas.parentElement === ctn) ctn.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [mouseInteraction, disableAnimation, transparent]);

  return <div ref={ctnDom} className="absolute inset-0" aria-hidden="true" />;
}

type SoundType = "poweron" | "whoosh" | "enter";

function HeadsetModel({
  onZoomEnd,
  playSound,
}: {
  onZoomEnd: () => void;
  playSound: (sound: SoundType) => void;
}) {
  const { scene } = useGLTF("/models/headset.glb");
  const groupRef = useRef<THREE.Group>(null);
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const { camera } = useThree();
  const hasStarted = useRef(false);

  const onZoomEndRef = useRef(onZoomEnd);
  const playSoundRef = useRef(playSound);
  useEffect(() => {
    onZoomEndRef.current = onZoomEnd;
    playSoundRef.current = playSound;
  }, [onZoomEnd, playSound]);

  const finishedRef = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (!groupRef.current) return;

    const box = new THREE.Box3().setFromObject(groupRef.current);
    const center = new THREE.Vector3();
    box.getCenter(center);

    groupRef.current.position.x -= center.x;
    groupRef.current.position.y -= center.y;
    groupRef.current.position.z -= center.z;

    groupRef.current.scale.setScalar(0.002);
  }, [scene]);

  useEffect(() => {
    if (!groupRef.current) return;
    if (hasStarted.current) return;
    hasStarted.current = true;

    camera.position.set(0, 0, 10);
    camera.updateProjectionMatrix();

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material && (child.material as any).transparent) {
          (child.material as THREE.MeshStandardMaterial).emissive = new THREE.Color(0x00ffff);
          (child.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
        }
      }
    });

    groupRef.current.rotation.y = 0;
    groupRef.current.scale.setScalar(0.002);

    const tl = gsap.timeline();
    tlRef.current = tl;

    const wait = 0.7;      // minimal delay before action
    const spinDur = 2.0;   // faster spin
    const zoomDur = 0.55;  // quicker zoom

    tl.call(() => playSoundRef.current("poweron"), undefined, 0);
    tl.to(
      groupRef.current.rotation,
      { y: Math.PI, duration: spinDur, ease: "power2.inOut" },
      wait
    );
    tl.to(
      groupRef.current.scale,
      { x: 0.005, y: 0.005, z: 0.005, duration: spinDur, ease: "power2.inOut" },
      wait
    );

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && (child.material as any).emissive) {
        tl.to(
          child.material as THREE.MeshStandardMaterial,
          { emissiveIntensity: 2, duration: 0.8, ease: "power2.inOut" },
          wait + spinDur * 0.45
        );
      }
    });

    if (spotLightRef.current) {
      tl.to(
        spotLightRef.current,
        { intensity: 3, duration: spinDur, ease: "power2.inOut" },
        wait
      );
    }

    tl.to(
      camera.position,
      {
        z:  0.5,
        duration: zoomDur,
        ease: "power2.in",
        onStart: () => playSoundRef.current("whoosh"),
        onComplete: () => {
          if (finishedRef.current) return;
          finishedRef.current = true;
          playSoundRef.current("enter");
          onZoomEndRef.current();
          tlRef.current?.kill();
        },
      },
      wait + spinDur - 0.65
    );

    return () => {
      tlRef.current?.kill();
      tlRef.current = null;
      hasStarted.current = false; // allow rerun after strict-mode remounts
    };
  }, [scene, camera]);

  return (
    <>
      <group ref={groupRef} scale={0.002}>
        <primitive object={scene} />
      </group>

      <spotLight
        ref={spotLightRef}
        position={[0, 5, 5]}
        angle={0.3}
        penumbra={0.5}
        intensity={0}
        color={0xff00ff}
        castShadow
        target={groupRef.current || undefined}
      />
    </>
  );
}

// Preload headset model early so Suspense resolves quicker
useGLTF.preload("/models/headset.glb");

function GalaxyIntro({
  onFinished,
  onSkipToHome,
}: {
  onFinished: () => void;
  onSkipToHome: () => void;
}) {
  const [isWarping, setIsWarping] = useState(false);
  const [fadeState, setFadeState] = useState<"in" | "visible" | "out">("in");
  const [isMuted, setIsMuted] = useState(false);
  const [audioPrimed, setAudioPrimed] = useState(false);
  const flashRef = useRef<HTMLDivElement>(null);
  const galaxyCtrlRef = useRef<GalaxyController | null>(null);
  const warpStartedRef = useRef(false);
  const audioRefs = useRef({
    poweron: null as HTMLAudioElement | null,
    whoosh: null as HTMLAudioElement | null,
    enter: null as HTMLAudioElement | null,
  });

  useEffect(() => {
    audioRefs.current.poweron = new Audio("/sounds/beep.mp3");
    audioRefs.current.whoosh = new Audio("/sounds/whoosh.wav");
    audioRefs.current.enter = new Audio("/sounds/beep.mp3");

    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.volume = 0.5;
        audio.playbackRate = 1.0;
        audio.preload = "auto";
      }
    });

    const silentPrime = () => {
      const attempts = Object.values(audioRefs.current).map((audio) => {
        if (!audio) return Promise.resolve();
        audio.muted = true;
        audio.currentTime = 0;
        return audio
          .play()
          .then(() => {
            audio.pause();
            audio.currentTime = 0;
            audio.muted = false;
          })
          .catch(() => Promise.reject());
      });

      return Promise.all(attempts).then(() => setAudioPrimed(true));
    };

    silentPrime().catch(() => {
      // fallback: wait for first user gesture
      const unlockOnGesture = () => {
        silentPrime().finally(() => {
          window.removeEventListener("pointerdown", unlockOnGesture);
          window.removeEventListener("keydown", unlockOnGesture);
        });
      };
      window.addEventListener("pointerdown", unlockOnGesture, { once: true });
      window.addEventListener("keydown", unlockOnGesture, { once: true });
    });

    setTimeout(() => setFadeState("visible"), 100);

    // hard fail-safe: if anything hangs (e.g., asset load), exit to main intro
    const failSafe = setTimeout(() => onFinished(), 14000);

    return () => {
      clearTimeout(failSafe);
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.src = "";
        }
      });
    };
  }, []);

  const playSound = (sound: SoundType) => {
    if (isMuted) return;
    const audio = audioRefs.current[sound];
    if (!audio) return;
    audio.currentTime = 0;
    audio.playbackRate = 1.0;

    const attemptPlay = () => audio.play().catch(() => null);

    // If not primed yet, silently prime all audio then play the requested one
    if (!audioPrimed) {
      const all = Object.values(audioRefs.current).map((a) => {
        if (!a) return Promise.resolve();
        a.muted = true;
        a.currentTime = 0;
        return a.play().then(() => {
          a.pause();
          a.currentTime = 0;
          a.muted = false;
        }).catch(() => Promise.resolve());
      });
      Promise.all(all).then(() => {
        setAudioPrimed(true);
        attemptPlay();
      }).catch(() => attemptPlay());
      return;
    }

    attemptPlay();
  };

  const goHome = () => {
    setIsWarping(false);
    setFadeState("out");
    setTimeout(() => {
      warpStartedRef.current = false;
      onFinished();
    }, 650);
  };

  const runWarpSequence = () => {
    if (warpStartedRef.current) return;
    setIsWarping(true);
    warpStartedRef.current = true;

    const ctrl = galaxyCtrlRef.current;
    if (!ctrl) {
      goHome();
      return;
    }

    ctrl.set({
      zoom: 1.05,
      speed: 0.7,
      density: 0.18,
      glowIntensity: 0.08,
      twinkleIntensity: 0.08,
      rotationSpeed: 0.08,
      starSpeed: 0.1,
      saturation: 1.0,
      hueShift: 180,
    });

    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
    tl.to({}, { duration: 0.18 });
    tl.to(ctrl.params, {
      duration: 1.2,
      zoom: 2.0,
      speed: 2.2,
      density: 0.45,
      glowIntensity: 0.2,
      twinkleIntensity: 0.16,
      rotationSpeed: 0.12,
      starSpeed: 0.13,
    });
    tl.to(
      ctrl.params,
      {
        duration: 1.4,
        zoom: 3.2,
        speed: 6.5,
        density: 0.95,
        glowIntensity: 0.7,
        twinkleIntensity: 0.34,
        rotationSpeed: 0.22,
        starSpeed: 0.18,
      },
      ">-0.10"
    );
    tl.add(() => {
      if (!flashRef.current) return;
      gsap.fromTo(
        flashRef.current,
        { opacity: 0 },
        { opacity: 0.65, duration: 0.08, ease: "power2.out", yoyo: true, repeat: 1 }
      );
    });
    tl.to(
      ctrl.params,
      {
        duration: 0.25,
        zoom: 3.6,
        glowIntensity: 1.05,
        speed: 7.5,
        density: 1.15,
      },
      ">-0.06"
    );
    tl.add(() => goHome(), ">-0.02");
  };

  const toggleMute = () => setIsMuted((v) => !v);

  return (
    <div
      className={`relative w-full h-screen bg-black transition-opacity duration-1000 ${
        fadeState === "in" ? "opacity-0" : fadeState === "out" ? "opacity-0" : "opacity-100"
      }`}
    >
      <GalaxyBackground
        controllerRef={galaxyCtrlRef}
        density={0.2}
        glowIntensity={0.1}
        twinkleIntensity={0.1}
        rotationSpeed={0.12}
        hueShift={180}
        saturation={1.0}
        speed={1.0}
        starSpeed={0.12}
        mouseInteraction
        mouseRepulsion
        repulsionStrength={2}
        transparent
      />

      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0"
        style={{ opacity: 0, background: "rgba(255,255,255,1)" }}
      />

      <div
        className={`absolute inset-0 transition-opacity duration-500 ${isWarping ? "opacity-0" : "opacity-100"}`}
        style={{ pointerEvents: isWarping ? "none" : "auto" }}
      >
        <Canvas
          frameloop="always"
          gl={{ alpha: true, premultipliedAlpha: false }}
          camera={{ position: [0, 0, 10], fov: 30 }}
          className="relative"
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} color={0xffffff} />
            <pointLight position={[-5, 3, -5]} intensity={1.5} color={0xff00ff} />
            <pointLight position={[5, 3, -5]} intensity={1.5} color={0x00ffff} />
            <pointLight position={[0, 3, -8]} intensity={1.2} color={0x00ff88} />
            <Environment preset="night" />
            {!isWarping ? <HeadsetModel onZoomEnd={runWarpSequence} playSound={playSound} /> : null}
          </Suspense>
        </Canvas>
      </div>

      {/* Top-right controls for the pre-roll */}
      <div className="fixed top-6 right-6 flex gap-3 z-[500]">
        {/* <button
          onClick={toggleMute}
          className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-lg backdrop-blur-sm transition-all duration-300 font-medium text-sm font-pixel"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button> */}
        <button
          onClick={onSkipToHome}
          className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-lg backdrop-blur-sm transition-all duration-300 font-medium text-[11px] font-pixel"
        >
          Skip Intro →
        </button>
      </div>
    </div>
  );
}

interface IntroAnimationProps {
  onComplete: () => void;
}

type IntroStage = "preroll" | "main";

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<IntroStage>("preroll");
  const [phase, setPhase] = useState(0); // 0: Boot Logs, 1: Neural Sync, 2: Logo Spotlight, 3: The Jump
  const [logs, setLogs] = useState<string[]>([]);
  const [syncProgress, setSyncProgress] = useState(0);
  const [rawMousePos, setRawMousePos] = useState({ x: 0, y: 0 });
  const { playClick, playHover } = useSfx();

  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 0 });
  const logoRef = useRef<HTMLDivElement>(null);

  const bootLogs = [
    "NEURAL_LINK_BOOT_V4.0...",
    "DETECTING_HMD_HARDWARE...",
    "CALIBRATING_OPTICS...",
    "SYNCING_HAPTIC_SUIT...",
    "ESTABLISHING_DATA_BRIDGE...",
    "SECURE_LINK_ESTABLISHED.",
    "READY_FOR_NEURAL_MAPPING."
  ];

  // Phase 0: System Boot Logs (with fail-safe start) — only when in main stage
  useEffect(() => {
    if (stage !== "main") return;

    let logIndex = 0;
    let logInterval: NodeJS.Timeout | null = null;
    let failSafe: NodeJS.Timeout | null = null;

    setPhase(0);
    setLogs([]);

    const kickToPhaseOne = () => setPhase((prev) => (prev < 1 ? 1 : prev));

    logInterval = setInterval(() => {
      if (logIndex < bootLogs.length) {
        setLogs((prev) => [...prev.slice(-5), bootLogs[logIndex]]);
        logIndex++;
      } else if (logInterval) {
        clearInterval(logInterval);
        logInterval = null;
        setTimeout(kickToPhaseOne, 800);
      }
    }, 120);

    // Fail-safe: if for any reason logs stall, advance after a short window
    failSafe = setTimeout(kickToPhaseOne, bootLogs.length * 150 + 1500);

    return () => {
      if (logInterval) clearInterval(logInterval);
      if (failSafe) clearTimeout(failSafe);
    };
  }, [stage]);

  // Secondary fail-safe: if phase stays at 0 too long, advance
  useEffect(() => {
    if (stage !== "main") return;
    if (phase !== 0) return;
    const nudge = setTimeout(() => setPhase((p) => (p === 0 ? 1 : p)), 4500);
    return () => clearTimeout(nudge);
  }, [phase, stage]);

  useEffect(() => {
    if (stage !== "main") return;
    if (phase === 1) {
      // Create a master timeline for the sync and the jump
      const tl = gsap.timeline();

      // Cinematic Entry for HUD elements
      tl.fromTo(".hud-element", 
        { scale: 1.5, opacity: 0, rotationX: 45, filter: "blur(10px)" },
        { scale: 1, opacity: 1, rotationX: 0, filter: "blur(0px)", duration: 0.75, stagger: 0.08, ease: "expo.out" }
      );

      // Automated Sync Progress
      tl.to(progressRef.current, {
        value: 100,
        duration: 0.5,
        ease: "power2.inOut",
        onUpdate: () => setSyncProgress(Math.floor(progressRef.current.value))
      });

      // Small pause at 100% to let the user see completion
      tl.to({}, { duration: 0 });

      // Phase 2: Logo-only spotlight
      tl.call(() => {
        setPhase(2);
        playClick();
      });

      // Let the logo breathe on screen
      tl.to({}, { duration: 1.8 });

      // Intensify glitch and shake leading up to the jump
      tl.to(".sync-visual", {
        x: () => gsap.utils.random(-15, 15),
        y: () => gsap.utils.random(-15, 15),
        duration: 0.05,
        repeat: 20,
        ease: "none",
      }, "-=0.5");

      // Trigger Phase 3 (The Jump)
      tl.call(() => {
        setPhase(3);
        playClick();
        
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            scale: 30,
            opacity: 0,
            filter: "blur(150px) brightness(4)",
            duration: 1.2,
            ease: "power4.in",
            onComplete: () => {
              // Final callback to parent to remove IntroAnimation from DOM
              onComplete();
            }
          });
        }
      });

      // Animation for HUD rings
      gsap.to(".hud-ring-1", { rotation: 360, duration: 12, repeat: -1, ease: "none" });
      gsap.to(".hud-ring-2", { rotation: -360, duration: 8, repeat: -1, ease: "none" });
    }
  }, [phase, onComplete, stage]);

  useEffect(() => {
    if (stage !== "main") return;
    if (phase === 2 && logoRef.current) {
      // Logo enter + breathing during spotlight phase
      gsap.fromTo(logoRef.current, {
        scale: 0.6,
        opacity: 0,
        rotateX: -20,
        filter: "blur(12px) brightness(0.5)",
      }, {
        scale: 1.1,
        opacity: 1,
        rotateX: 0,
        filter: "blur(0px) brightness(1.2)",
        duration: 1.1,
        ease: "expo.out"
      });

      gsap.to(logoRef.current, {
        scale: 1.18,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        filter: "drop-shadow(0 0 38px rgba(0,243,255,0.5))",
      });
    }
  }, [phase, stage]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setRawMousePos({ x: e.clientX, y: e.clientY });
    playHover();
  };

  if (stage === "preroll") {
    return (
      <GalaxyIntro
        onFinished={() => setStage("main")}
        onSkipToHome={() => onComplete()}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[100] bg-background-dark flex items-center justify-center font-pixel overflow-hidden perspective-[1500px] cursor-none"
    >
      {/* Global skip button visible throughout the main intro */}
      <button
        onClick={onComplete}
        className="fixed top-6 right-6 z-[600] px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-lg backdrop-blur-sm transition-all duration-300 font-medium text-[11px] font-pixel"
      >
        Skip Intro →
      </button>

      {/* Dynamic Laser Reticle */}
      <div
        className="fixed pointer-events-none z-[500] mix-blend-screen"
        style={{
          left: rawMousePos.x,
          top: rawMousePos.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 border border-primary/30 rounded-full animate-ping"></div>
          <div className="absolute inset-2 border border-secondary/20 rounded-full"></div>
          <div className="w-8 h-[1px] bg-primary shadow-[0_0_8px_#00f3ff]"></div>
          <div className="h-8 w-[1px] bg-primary absolute shadow-[0_0_8px_#00f3ff]"></div>
          <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 text-[7px] text-primary whitespace-nowrap tracking-[0.4em] font-black uppercase">
            {phase === 1 ? `LINKING_NODE: ${syncProgress}%` : ""}
          </div>
        </div>
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0 bg-grid-pattern animate-[tunnel_12s_linear_infinite]"
          style={{ transform: "rotateX(80deg)" }}
        ></div>
      </div>

      <div className="relative z-[110] w-full max-w-4xl px-10 flex flex-col items-center">
        {/* Phase 0: System Logs (Perfect Version Kept) */}
        {phase === 0 && (
          <div className="text-left w-full max-w-sm p-8 bg-black/60 border border-primary/20 backdrop-blur-md shadow-[0_0_30px_rgba(0,243,255,0.1)]">
            <div className="mb-6">
              <div className="text-primary font-display font-black text-2xl tracking-tighter mb-1 uppercase italic flex items-center gap-2">
                <span className="font-display font-black text-lg md:text-xl tracking-tighter text-primary leading-none">
                  CYPHER
                  <span className="text-pink-400  group-hover:neon-glow-cyan transition-all">
                    ZONE
                  </span>
                  <span className="text-yellow-500">X_OS</span>
                </span>
              </div>
              <div className="text-[6px] text-slate-500 tracking-[0.8em]">
                INIT_VERSION_4.2.1_STABLE
              </div>
            </div>
            {logs.map((log, i) => (
              <div
                key={i}
                className="text-primary text-[10px] md:text-xs mb-1.5 opacity-80 flex gap-2"
              >
                <span className="text-secondary">#</span> {log}
              </div>
            ))}
          </div>
        )}

        {/* Phase 1: Cinematic Neural Sync (Automated) */}
        {phase === 1 && (
          <div className="sync-visual flex flex-col items-center gap-10 w-full preserve-3d">
            {/* Holographic Core - dedicated to loader */}
            <div className="hud-element relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
              <div className="hud-ring-1 absolute inset-0 border-2 border-primary/10 rounded-full border-dashed"></div>
              <div className="hud-ring-2 absolute inset-5 border border-secondary/15 rounded-full border-dotted"></div>
              <div className="absolute inset-10 border border-primary/5 rounded-full animate-pulse"></div>
              <div className="absolute inset-[-14%] bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.14),transparent_62%)] blur-2xl"></div>
              <div className="absolute inset-[-9%] border border-primary/20 rounded-full opacity-40 animate-ping"></div>

              <div className="relative text-center flex flex-col items-center gap-3 z-[2]">
                <div className="text-[9px] text-primary tracking-[0.6em] font-black uppercase opacity-60">
                  Neural_Synchronization
                </div>
                <div className="text-7xl md:text-8xl font-display font-black text-white drop-shadow-[0_0_40px_rgba(0,243,255,0.8)]">
                  {syncProgress}
                  <span className="text-2xl text-primary opacity-40">%</span>
                </div>
                <div className="mt-4 flex justify-center gap-1.5">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-5 transition-all duration-300 ${i < syncProgress / 8.3 ? "bg-primary shadow-[0_0_12px_#00f3ff]" : "bg-white/5"}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tactical Readouts */}
            <div className="hud-element grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-2xl px-4">
              {[
                {
                  label: "UPLINK_STABILITY",
                  val: syncProgress > 50 ? "STABLE" : "BUFFERING",
                  color: "text-primary",
                },
                {
                  label: "NEURAL_INTEGRITY",
                  val: "99.99%",
                  color: "text-green-500",
                },
                {
                  label: "EYE_TRACKING",
                  val: "LOCKED",
                  color: "text-secondary",
                },
                {
                  label: "REALITY_PHASE",
                  val: syncProgress > 80 ? "DESYNC_READY" : "WAITING",
                  color: "text-white",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 bg-black/40 border border-white/5 backdrop-blur-md flex flex-col items-center"
                >
                  <div className="text-[6px] text-slate-500 mb-1.5 tracking-widest uppercase">
                    {stat.label}
                  </div>
                  <div
                    className={`text-[8px] font-black uppercase tracking-wider ${stat.color}`}
                  >
                    {stat.val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Phase 2: Logo Spotlight */}
        {phase === 2 && (
          <div className="sync-visual flex flex-col items-center justify-center gap-10 w-full preserve-3d">
            <div
              ref={logoRef}
              className="relative flex items-center justify-center"
            >
              <div className="absolute inset-[-45%] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.6),transparent_72%)] blur-3xl"></div>
              <div className="absolute inset-[-35%] bg-[conic-gradient(from_0deg,rgba(0,0,0,0.7),rgba(0,243,255,0.18),rgba(0,0,0,0.7))] blur-lg animate-[spin_12s_linear_infinite]"></div>
              <div className="absolute inset-[-15%] "></div>
              <div className="relative w-120 h-120 md:w-80 md:h-80 rounded-2xl overflow-hidden ">
                <Image
                  src="/logo-trans.png"
                  alt="Cypherzone logo"
                  fill
                  sizes="(min-width: 768px) 20rem, 14rem"
                  className="object-contain scale-125"
                  priority
                />
              </div>
            </div>
            {/* <div className="text-[9px] text-primary tracking-[0.6em] font-black uppercase opacity-70">
              Neural Link Secured
            </div> */}
          </div>
        )}

        {/* Phase 2: Flash Transition */}
        {phase === 3 && (
          <div className="fixed inset-0 bg-white flex items-center justify-center z-[200]">
            <div className="w-full h-[3px] bg-primary animate-[scan_0.3s_linear_infinite]"></div>
          </div>
        )}
      </div>

      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
        @keyframes tunnel { 
          from { background-position: 0 0; } 
          to { background-position: 0 1000px; } 
        }
        @keyframes scan {
          0% { transform: translateY(-100vh); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default IntroAnimation;
