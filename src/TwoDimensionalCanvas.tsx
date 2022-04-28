import React from 'react';
import { Canvas } from '@react-three/fiber';
import { MapControls } from '@react-three/drei';

export type TwoDimensionalCanvasProps = {
  children?: React.ReactNode;
  /**
   * The camera's initial zoom.
   * @default 1
   */
  initialCameraZoom?: number;
};

export function TwoDimensionalCanvas({
  children,
  initialCameraZoom = 1,
}: TwoDimensionalCanvasProps) {
  return (
    <Canvas
      orthographic
      camera={{
        position: [0, 0, 1],
        zoom: initialCameraZoom,
        up: [0, 0, 1],
      }}
    >
      <ambientLight />
      {/* disable rotation so that it doesn't clash with selection */}
      <MapControls enableRotate={false} />
      {children}
    </Canvas>
  );
}
