import { TwoDimensionalPoint, TwoDimensionalBoundsType } from '../types';
/**
 * A function that computes the bounds
 */
export function getTwoDimensionalBounds(
  points: TwoDimensionalPoint[]
): TwoDimensionalBoundsType {
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
