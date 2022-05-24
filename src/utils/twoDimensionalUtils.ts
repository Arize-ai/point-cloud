import { TwoDimensionalPoint, TwoDimensionalBoundsType } from '../types';

type GetTwoDimensionalBoundsOptions = {
  fallbackBounds: TwoDimensionalBoundsType;
};

const DEFAULT_FALLBACK_BOUNDS = {
  minX: -1,
  maxX: 1,
  minY: -1,
  maxY: 1,
};

/**
 * A function that computes the bounds
 */
export function getTwoDimensionalBounds(
  points: TwoDimensionalPoint[],
  options?: GetTwoDimensionalBoundsOptions
): TwoDimensionalBoundsType {
  // Handle the case where there are no points
  if (points.length === 0) {
    const fallbackBounds = options?.fallbackBounds || DEFAULT_FALLBACK_BOUNDS;
    return fallbackBounds;
  }
  // The extent of the points
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  points.forEach((p) => {
    minX = Math.min(minX, p[0]);
    minY = Math.min(minY, p[1]);
    maxX = Math.max(maxX, p[0]);
    maxY = Math.max(maxY, p[1]);
  });

  return {
    minX,
    maxX,
    minY,
    maxY,
  };
}

/**
 * computes the center of the bounds
 */
export function getCenterFromTwoDimensionalBounds({
  minX,
  maxX,
  minY,
  maxY,
}: TwoDimensionalBoundsType): TwoDimensionalPoint {
  return [minX + (maxX - minX) / 2, minY + (maxY - minY) / 2];
}
