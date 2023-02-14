import { OrbitControls } from '@react-three/drei';

export type TwoDimensionalPoint = [number, number];
export type TwoDimensionalBoundsType = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

export type ThreeDimensionalPoint = [number, number, number];

/**
 * A point's coordinates in 2 or 3 dimensions
 */
export type PointCoordinates = TwoDimensionalPoint | ThreeDimensionalPoint;

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
  position?: ThreeDimensionalPoint;
  zoom?: number;
  up?: ThreeDimensionalPoint;
};

/**
 * Pass through some  props directly to the controls
 */
type ControlPassthroughProps = Pick<
  React.ComponentProps<typeof OrbitControls>,
  'onEnd'
>;

/**
 * Control props
 */
export type ControlProps = ControlPassthroughProps & {
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
  /**
   * Start rotating when the control mounts
   * @default false
   */
  autoRotate?: boolean;
  /**
   * auto-rotation speed
   * @default 3
   */
  autoRotateSpeed?: number;
};
