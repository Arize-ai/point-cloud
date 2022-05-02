import React from 'react';
import { Canvas } from '@react-three/fiber';

type CameraPropType = {
  position?: [number, number, number];
  zoom?: number;
  up?: [number, number, number];
};

export type TwoDimensionalCanvasProps = {
  children?: React.ReactNode;
  /**
   * The camera's initial props. overrides the defaults
   * @default { position: [0, 0, 1], zoom: 1, up: [0, 1, 0] }
   */
  camera?: CameraPropType;
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
      <ambientLight />
      {children}
    </Canvas>
  );
}
