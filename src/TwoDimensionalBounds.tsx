import React, { createContext, useContext, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { TwoDimensionalBoundsType, TwoDimensionalPoint } from "./types";
import { getCenterFromTwoDimensionalBounds } from "./utils";

/**
 * The amount to reduce the zoom by to fit the content when bounds are provided.
 */
const DEFAULT_BOUNDS_ZOOM_PADDING_FACTOR = 0.9;

export type TwoDimensionalBoundsContextType = {
    bounds: TwoDimensionalBoundsType;
    center: TwoDimensionalPoint;
};

const BoundsContext = createContext<TwoDimensionalBoundsContextType>({
    bounds: { minX: -10, maxX: 10, minY: -10, maxY: 10 },
    center: [0, 0],
});

export function useTwoDimensionalBounds() {
    return useContext(BoundsContext);
}

/**
 * Provides the bounds of the canvas. and centers all child controls
 */
export function TwoDimensionalBounds({
    bounds,
    children,
    boundsZoomPaddingFactor = DEFAULT_BOUNDS_ZOOM_PADDING_FACTOR,
}: {
    children: React.ReactNode;
    /**
     * Bounds of the canvas.
     */
    bounds: TwoDimensionalBoundsType;
    /**
     * The amount to reduce the zoom by to give some padding to the points (1 means no padding).
     * @default 0.9
     */
    boundsZoomPaddingFactor?: number;
}) {
    const center = getCenterFromTwoDimensionalBounds(bounds);
    const {
        camera,
        size: { width, height },
    } = useThree();

    useEffect(() => {
        const { minX, maxX, minY, maxY } = bounds;
        const boundsWidth = maxX - minX;
        const boundsHeight = maxY - minY;
        camera.translateX(boundsWidth / 2 + minX);
        camera.translateY(boundsHeight / 2 + minY);

        // Set the zoom to fit the bounds
        // @src https://github.com/pmndrs/react-three-fiber/issues/67#issuecomment-496507403
        camera.zoom =
            Math.min(width / boundsWidth, height / boundsHeight) *
            boundsZoomPaddingFactor;
        camera.updateProjectionMatrix();
    }, [bounds]);

    return (
        <BoundsContext.Provider value={{ bounds, center }}>
            {children}
        </BoundsContext.Provider>
    );
}
