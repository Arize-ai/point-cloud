import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { ControlProps } from './types';

export type ThreeDimensionalControlsProps = ControlProps;

export function ThreeDimensionalControls({
  enabled = true,
  zoomSpeed = 1,
  enableZoom = true,
  enablePan = true,
  enableRotate = true,
}: ThreeDimensionalControlsProps) {
  /* disable rotation so that it doesn't clash with selection */
  return (
    <OrbitControls
      enabled={enabled}
      zoomSpeed={zoomSpeed}
      enableZoom={enableZoom}
      enablePan={enablePan}
      enableRotate={enableRotate}
    />
  );
}
