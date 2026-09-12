import { useState, useEffect, useRef, useCallback } from 'react';
import { DEVICE_DIMENSIONS } from '../constants/device';
import type { FoldingTimelineState } from '../types';

interface UseFoldingAnimationOptions {
  initialAngle?: number;
  reducedMotion?: boolean;
}

export function useFoldingAnimation({
  initialAngle = 180,
  reducedMotion = false,
}: UseFoldingAnimationOptions = {}) {
  // Target angle commanded by UI controls or keyboard
  const [targetAngle, setTargetAngle] = useState<number>(initialAngle);
  // Current interpolated angle
  const [angle, setAngle] = useState<number>(initialAngle);
  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1); // 0.5x, 1x, 2x

  // Refs for the animation loop
  const currentAngleRef = useRef<number>(initialAngle);
  const targetAngleRef = useRef<number>(initialAngle);
  const isPlayingRef = useRef<boolean>(false);
  const speedRef = useRef<number>(1);
  const playPhaseRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const rafIdRef = useRef<number | null>(null);

  // Sync refs
  useEffect(() => {
    targetAngleRef.current = targetAngle;
  }, [targetAngle]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // Main animation frame loop
  useEffect(() => {
    const loop = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.08); // cap dt to avoid huge jumps
      lastTimeRef.current = now;

      // Handle continuous playback oscillation
      if (isPlayingRef.current) {
        // Speed: 1x takes ~4.5s for a full smooth cycle (180 -> 0 -> 180)
        const cycleSpeed = (Math.PI * 2) / (4.5 / speedRef.current);
        playPhaseRef.current += cycleSpeed * dt;

        // Smooth cosine wave between 0 and 180:
        // cos(phase): from 1 down to -1 and back to 1
        // (1 + cos(phase)) / 2 gives 1 -> 0 -> 1
        const wave = (1 + Math.cos(playPhaseRef.current)) / 2;
        const autoTarget = wave * 180;
        targetAngleRef.current = autoTarget;
        setTargetAngle(autoTarget);
      }

      // Smooth frame-rate independent interpolation (spring/lerp)
      if (reducedMotion) {
        currentAngleRef.current = targetAngleRef.current;
      } else {
        const smoothingFactor = 1 - Math.exp(-12 * dt);
        const diff = targetAngleRef.current - currentAngleRef.current;
        if (Math.abs(diff) < 0.04) {
          currentAngleRef.current = targetAngleRef.current;
        } else {
          currentAngleRef.current += diff * smoothingFactor;
        }
      }

      // Update state for components
      setAngle(currentAngleRef.current);

      rafIdRef.current = requestAnimationFrame(loop);
    };

    lastTimeRef.current = performance.now();
    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [reducedMotion]);

  // Compute all derived physical and visual screen parameters
  const openProgress = Math.max(0, Math.min(1, angle / 180));
  const foldFactor = 1 - openProgress; // 0 when flat/open, 1 when closed

  // Left screen rises into final position as phone opens (foldFactor -> 0)
  const leftOffsetY = DEVICE_DIMENSIONS.maxLeftOffsetY * Math.pow(foldFactor, 1.15);
  // Left screen blur decreases to 0 at 180°
  const leftBlur = DEVICE_DIMENSIONS.maxLeftBlur * Math.pow(foldFactor, 1.25);
  // Left screen darkening (gradient opacity) attached to left panel
  const leftDarkness = Math.min(0.68, foldFactor * 0.75);
  // Hinge seam shadow: maximum at ~90-130° and smoothly vanishing at 180°
  const hingeShadow = Math.sin(foldFactor * Math.PI) * 0.65 + foldFactor * 0.25;
  // Center offset to keep the device centered in viewport throughout the fold
  const centerOffsetX = -(DEVICE_DIMENSIONS.panelWidth / 2) * foldFactor;

  const timelineState: FoldingTimelineState = {
    angle,
    targetAngle,
    isPlaying,
    speed,
    openProgress,
    leftOffsetY,
    leftBlur,
    leftDarkness,
    hingeShadow,
    centerOffsetX,
  };

  const setAngleDirect = useCallback((newAngle: number) => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    const clamped = Math.max(0, Math.min(180, newAngle));
    setTargetAngle(clamped);
    targetAngleRef.current = clamped;
  }, []);

  const togglePlayback = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      isPlayingRef.current = next;
      if (next) {
        // Initialize phase based on current angle so it starts smoothly
        const currentNorm = angle / 180;
        // wave = (1 + cos(phase)) / 2 => 2*wave - 1 = cos(phase)
        const cosVal = Math.max(-1, Math.min(1, 2 * currentNorm - 1));
        playPhaseRef.current = Math.acos(cosVal);
      }
      return next;
    });
  }, [angle]);

  const stepFold = useCallback((delta: number) => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setTargetAngle((prev) => {
      const next = Math.max(0, Math.min(180, prev + delta));
      targetAngleRef.current = next;
      return next;
    });
  }, []);

  return {
    timelineState,
    setAngle: setAngleDirect,
    togglePlayback,
    setSpeed,
    stepFold,
  };
}
