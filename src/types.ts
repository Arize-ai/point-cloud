export type TwoDimensionalPoint = [number, number];
export type TwoDimensionalBoundsType = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};
/**
 * Customizable for the camera on initialization
 */
export type CameraInitProps = {
  position?: [number, number, number];
  zoom?: number;
  up?: [number, number, number];
};
