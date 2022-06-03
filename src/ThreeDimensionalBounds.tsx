import React, { createContext, useContext, useEffect } from 'react';
import { ThreeDimensionalBoundsType, ThreeDimensionalPoint } from './types';
import { getCenterFromThreeDimensionalBounds } from './utils';
import { useThree } from '@react-three/fiber';

/**
 * The amount to reduce the zoom by to fit the content when bounds are provided.
 */
const DEFAULT_BOUNDS_ZOOM_PADDING_FACTOR = 0.9;

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
  offset = 1.25,
  boundsZoomPaddingFactor = DEFAULT_BOUNDS_ZOOM_PADDING_FACTOR,
}: {
  children: React.ReactNode;
  /**
   * Bounds of the canvas.
   */
  bounds: ThreeDimensionalBoundsType;
  /**
   * Offset from the object to make it fit the bounds.
   * @default 1.25
   */
  offset?: number;
  /**
   * The amount to reduce the zoom by to give some padding to the points (1 means no padding).
   * @default 0.9
   */
  boundsZoomPaddingFactor?: number;
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
    camera.position.z = Math.abs((maxDim / 4) * Math.tan(fov * 2)) * offset;

    // // Set the zoom to fit the bounds
    // // @src https://github.com/pmndrs/react-three-fiber/issues/67#issuecomment-496507403
    // camera.zoom =
    //   Math.min(width / boundsWidth, height / boundsHeight) *
    //   boundsZoomPaddingFactor;
    const cameraToFarEdge =
      minZ < 0 ? -minZ + camera.position.z : camera.position.z - minZ;

    camera.far = cameraToFarEdge * 3;
    camera.updateProjectionMatrix();
  }, [bounds]);

  return (
    <BoundsContext.Provider value={{ bounds, center }}>
      {children}
    </BoundsContext.Provider>
  );
}
