import React, { createContext, useContext, useEffect } from 'react';
import { ThreeDimensionalBoundsType, ThreeDimensionalPoint } from './types';
import { getCenterFromThreeDimensionalBounds } from './utils';
import { useThree } from '@react-three/fiber';

export type ThreeDimensionalBoundsContextType = {
  bounds: ThreeDimensionalBoundsType;
  center: ThreeDimensionalPoint;
};

const BoundsContext = createContext<ThreeDimensionalBoundsContextType>({
  bounds: { minX: -10, maxX: 10, minY: -10, maxY: 10, minZ: -10, maxZ: 10 },
  center: [0, 0, 0],
});

export function useThreeDimensionalBounds() {
  return useContext(BoundsContext);
}

/**
 * Provides the bounds of the canvas. and centers all child controls
 */
export function ThreeDimensionalBounds({
  bounds,
  children,
  offset = 1.5,
}: {
  children: React.ReactNode;
  /**
   * Bounds of the canvas.
   */
  bounds: ThreeDimensionalBoundsType;
  /**
   * Offset from the object to make it fit the bounds.
   * @default 1.5
   */
  offset?: number;
  }) {
  const center = getCenterFromThreeDimensionalBounds(bounds);
  const {
    camera,
    // size: { width, height },
  } = useThree();

  useEffect(() => {
    // @src https://discourse.threejs.org/t/camera-zoom-to-fit-object/936/2
    const { minX, maxX, minY, maxY, minZ, maxZ } = bounds;
    const boundsWidth = maxX - minX;
    const boundsHeight = maxY - minY;
    const boundsDepth = maxZ - minZ;
    const maxDim = Math.max(boundsWidth, boundsHeight, boundsDepth);
    // @ts-ignore
    const fov = camera.fov * (Math.PI / 180);
    camera.position.x = boundsWidth / 2 + minX;
    camera.position.y = boundsHeight / 2 + minY;
    const cameraZ = maxDim / (2 * Math.tan(fov / 2));
    camera.position.z = (cameraZ + center[2]) * offset;

    const cameraToFarEdge =
      minZ < 0 ? -minZ + camera.position.z : camera.position.z - minZ;

    camera.far = cameraToFarEdge * 3;
    camera.updateProjectionMatrix();
    camera.lookAt(...center);
  }, [bounds]);

  return (
    <BoundsContext.Provider value={{ bounds, center }}>
      {children}
    </BoundsContext.Provider>
  );
}
