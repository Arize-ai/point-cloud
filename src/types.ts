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
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  zoom?: number;
  position?: [number, number, number];
  up?: [number, number, number];
};
