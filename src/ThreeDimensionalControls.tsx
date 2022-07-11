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
   * @default 1
   */
  zoomSpeed?: number;
  /**
   * control the zoom
   * @default true
   */
  enableZoom?: boolean;
  /**
   * control the pan
   * @default true
   */
  enablePan?: boolean;
};

export function ThreeDimensionalControls({
  enabled = true,
  zoomSpeed = 1,
  enableZoom = true,
  enablePan = true,
}: ThreeDimensionalControlsProps) {
  /* disable rotation so that it doesn't clash with selection */
  return (
    <OrbitControls
      enabled={enabled}
      zoomSpeed={zoomSpeed}
      enableZoom={enableZoom}
      enablePan={enablePan}
    />
  );
}
