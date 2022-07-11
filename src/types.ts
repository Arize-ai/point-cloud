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

/**
 * Control props
 */
export type ControlProps = {
  /**
   * A way to disable the controls dynamically.
   * @default true
   */
  enabled?: boolean;
  /**
   * The speed at which to zoom / pan
   * @default 2
   */
  zoomSpeed?: number;
  /**
   * The speed at which to zoom / pan
   * @default 2
   */
  panSpeed?: number;
  /**
   * control the zoom
   * @default true
   */
  enableZoom?: boolean;
  /**
   * control the pan
   * @default true
   */
  enablePan?: boolean;
  /**
   * control the rotation
   * @default true
   */
  enableRotate?: boolean;
};
