import React from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraInitProps } from './types';

/**
 * Pass through some  props directly to the canvas
 * Expose onPointerMissed to work with selection
 */
type CanvasPassthroughProps = Pick<
  React.ComponentProps<typeof Canvas>,
  'onPointerMissed'
>;

export type ThreeDimensionalCanvasProps = CanvasPassthroughProps & {
  children?: React.ReactNode;
  /**
   * Whether or not to use an orthographic camera or not
   * @default false
   */
  orthographic?: boolean;
  /**
   * The camera's initial props. overrides the defaults
   * @default { position: [0, 0, 1], zoom: 1, up: [0, 1, 0] }
   */
  camera?: CameraInitProps;
};

export function ThreeDimensionalCanvas({
  children,
  camera,
  orthographic = false,
  ...passThroughProps
}: ThreeDimensionalCanvasProps) {
  return (
    <Canvas
      orthographic={orthographic}
      camera={{
        position: [0, 0, 1],
        zoom: 1,
        up: [0, 1, 0],
        ...camera,
      }}
      {...passThroughProps}
    >
      {children}
    </Canvas>
  );
}
