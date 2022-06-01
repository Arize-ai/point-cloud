import React from 'react';
import { MapControls } from '@react-three/drei';
import { useTwoDimensionalBounds } from './TwoDimensionalBounds';

export type TwoDimensionalControlsProps = {
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
   * The speed at which to zoom / pan
   * @default 2
   */
  panSpeed?: number;
  /**
   * control the zoom
   * @default true
   */
  enableZoom?: boolean;
};

export function TwoDimensionalControls({
  enabled = true,
  zoomSpeed = 1.5,
  enableZoom = true,
  panSpeed = 2,
}: TwoDimensionalControlsProps) {
  const { center } = useTwoDimensionalBounds();
  const target = [...center, 0] as [number, number, number];

  /* disable rotation so that it doesn't clash with selection */
  return (
    <MapControls
      enableRotate={false}
      enabled={enabled}
      target={target}
      zoomSpeed={zoomSpeed}
      enableZoom={enableZoom}
      panSpeed={panSpeed}
    />
  );
}
