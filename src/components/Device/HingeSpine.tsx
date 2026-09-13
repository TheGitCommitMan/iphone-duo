import React from 'react';
import type { FinishConfig } from '../../types';
import { DEVICE_DIMENSIONS } from '../../constants/device';

interface HingeSpineProps {
  finish: FinishConfig;
  openProgress: number; // 0 = closed (0 deg), 1 = open (180 deg)
  hingeShadow: number;
}

export const HingeSpine: React.FC<HingeSpineProps> = ({
  finish,
  openProgress,
  hingeShadow,
}) => {
  const { hingeWidth, panelHeight, panelWidth } = DEVICE_DIMENSIONS;

  // When open (openProgress = 1), the hinge is flattened and minimal.
  // When closed (openProgress = 0), the spine is visible as a curved cylindrical hinge barrel.
  const spineVisibility = 1 - openProgress;

  return (
    <div
      className="absolute top-0 bottom-0 pointer-events-none z-30 preserve-3d"
      style={{
        left: `${panelWidth - hingeWidth / 2}px`,
        width: `${hingeWidth}px`,
        height: `${panelHeight}px`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Central Micro Seam when open */}
      <div
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] transition-opacity duration-200"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.2) 100%)',
          opacity: openProgress > 0.95 ? 0.35 : 0,
        }}
      />

      {/* Crease Shadow attached to the hinge seam */}
      {/* Requirement: "Keep shading attached to the left panel and hinge. Do NOT add a moving diagonal black stripe." */}
      <div
        className="absolute inset-y-0 -left-6 -right-6 pointer-events-none transition-opacity duration-75"
        style={{
          opacity: hingeShadow,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, transparent 80%)',
          filter: 'blur(3px)',
        }}
      />

      {/* Physical Hinge Spine Barrel (Outer Back Side) */}
      <div
        className="absolute inset-0 rounded-full border border-black/40 shadow-xl"
        style={{
          background: finish.hingeSpine,
          transform: `translateZ(-14px) scaleX(${0.8 + spineVisibility * 0.4})`,
          opacity: 0.3 + spineVisibility * 0.7,
        }}
      >
        {/* Specular highlight stripe along the hinge cylinder */}
        <div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 rounded-full"
          style={{
            background: finish.hingeHighlight,
            filter: 'blur(0.5px)',
          }}
        />
        {/* Subtle engraved micro-text on the hinge */}
        <div className="absolute inset-0 flex items-center justify-center -rotate-90">
          <span className="text-[7px] tracking-[0.2em] uppercase font-mono text-black/50 font-bold">
            DESIGNED BY APPLE IN CALIFORNIA
          </span>
        </div>
      </div>
    </div>
  );
};
