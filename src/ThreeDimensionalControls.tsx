import React from 'react';
import { OrbitControls } from '@react-three/drei';

export type ThreeDimensionalControlsProps = {
  /**
   * A way to disable the controls dynamically.
   * @default true
   */
  enabled?: boolean;
  /**
   * The speed at which to zoom / pan
   * @default 2
   */
  zoomSpeed?: number;
  /**
   * control the zoom
   * @default true
   */
  enableZoom?: boolean;
};

export function ThreeDimensionalControls({
  enabled = true,
  zoomSpeed = 2,
  enableZoom = true,
}: ThreeDimensionalControlsProps) {
  /* disable rotation so that it doesn't clash with selection */
  return (
    <OrbitControls
      enabled={enabled}
      zoomSpeed={zoomSpeed}
      enableZoom={enableZoom}
    />
  );
}
