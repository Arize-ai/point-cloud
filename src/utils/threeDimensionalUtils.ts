import { ThreeDimensionalPoint, ThreeDimensionalBoundsType } from "../types";

type GetThreeDimensionalBoundsOptions = {
    fallbackBounds: ThreeDimensionalBoundsType;
};

const DEFAULT_FALLBACK_BOUNDS: ThreeDimensionalBoundsType = {
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
    minZ: 0,
    maxZ: 0,
};

/**
 * A function that computes the bounds
 */
export function getThreeDimensionalBounds(
    points: ThreeDimensionalPoint[],
    options?: GetThreeDimensionalBoundsOptions,
): ThreeDimensionalBoundsType {
    // Handle the case where there are no points
    if (points.length === 0) {
        const fallbackBounds =
            options?.fallbackBounds || DEFAULT_FALLBACK_BOUNDS;
        return fallbackBounds;
    }
    // The extent of the points
    let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity,
        minZ = Infinity,
        maxZ = -Infinity;

    points.forEach((p) => {
        minX = Math.min(minX, p[0]);
        minY = Math.min(minY, p[1]);
        minZ = Math.min(minZ, p[2]);
        maxX = Math.max(maxX, p[0]);
        maxY = Math.max(maxY, p[1]);
        maxZ = Math.max(maxZ, p[2]);
    });

    return {
        minX,
        maxX,
        minY,
        maxY,
        minZ,
        maxZ,
    };
}

/**
 * computes the center of the bounds
 */
export function getCenterFromThreeDimensionalBounds({
    minX,
    maxX,
    minY,
    maxY,
    minZ,
    maxZ,
}: ThreeDimensionalBoundsType): ThreeDimensionalPoint {
    return [
        minX + (maxX - minX) / 2,
        minY + (maxY - minY) / 2,
        minZ + (maxZ - minZ) / 2,
    ];
}

/**
 * Gets the absolute value of the largest
 */
export function getMaxDimensionFromThreeDimensionalBounds({
    minX,
    maxX,
    minY,
    maxY,
    minZ,
    maxZ,
}: ThreeDimensionalBoundsType): number {
    return Math.max(
        Math.abs(minX),
        Math.abs(maxX),
        Math.abs(minY),
        Math.abs(maxY),
        Math.abs(minZ),
        Math.abs(maxZ),
    );
}
