import React from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraInitProps } from './types';

// Constants relating to the camera parameters.
const PERSP_CAMERA_FOV_VERTICAL = 70;

export type ThreeDimensionalCanvasProps = {
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
}: ThreeDimensionalCanvasProps) {
  return (
    <Canvas
      orthographic={orthographic}
      camera={{
        position: [0, 0, 1],
        zoom: 1,
        up: [0, 1, 0],
        fov: PERSP_CAMERA_FOV_VERTICAL,
        ...camera,
      }}
    >
      {children}
    </Canvas>
  );
}
