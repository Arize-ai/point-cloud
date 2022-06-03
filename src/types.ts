export type TwoDimensionalPoint = [number, number];
export type TwoDimensionalBoundsType = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

export type ThreeDimensionalPoint = [number, number, number];

export type ThreeDimensionalBoundsType = {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
};

/**
 * Customizable for the camera on initialization
 */
export type CameraInitProps = {
  position?: [number, number, number];
  zoom?: number;
  up?: [number, number, number];
};
