import React from 'react';
import { MapControls } from '@react-three/drei';

export type TwoDimensionalControlsProps = {
  /**
   * A way to disable the controls dynamically.
   * @default true
   */
  enabled?: boolean;
};

export function TwoDimensionalControls({
  enabled = true,
}: TwoDimensionalControlsProps) {
  /* disable rotation so that it doesn't clash with selection */
  return <MapControls enableRotate={false} enabled={enabled} />;
}
