import React from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraInitProps } from './types';

export type TwoDimensionalCanvasProps = {
  children?: React.ReactNode;
  /**
   * The camera's initial props. overrides the defaults
   * @default { position: [0, 0, 1], zoom: 1, up: [0, 1, 0] }
   */
  camera?: CameraInitProps;
};

export function TwoDimensionalCanvas({
  children,
  camera,
}: TwoDimensionalCanvasProps) {
  return (
    <Canvas
      orthographic
      camera={{
        position: [0, 0, 1],
        zoom: 1,
        up: [0, 1, 0],
        ...camera,
      }}
    >
      {children}
    </Canvas>
  );
}
