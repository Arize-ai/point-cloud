import React, { createContext, useContext, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { ThreeDimensionalBoundsType, ThreeDimensionalPoint } from "./types";
import {
    getCenterFromThreeDimensionalBounds,
    getMaxDimensionFromThreeDimensionalBounds,
    isOrthographicCamera,
} from "./utils";

export type ThreeDimensionalBoundsContextType = {
    bounds: ThreeDimensionalBoundsType;
    center: ThreeDimensionalPoint;
};

const BoundsContext = createContext<ThreeDimensionalBoundsContextType>({
    bounds: { minX: -10, maxX: 10, minY: -10, maxY: 10, minZ: -10, maxZ: 10 },
    center: [0, 0, 0],
});

const ORTHOGRAPHIC_CAMERA_Z_OFFSET = 10;

export function useThreeDimensionalBounds() {
    return useContext(BoundsContext);
}

/**
 * Provides the bounds of the canvas. and centers all child controls
 */
export function ThreeDimensionalBounds({
    bounds,
    children,
    offset = 1.5,
    boundsZoomPaddingFactor = 0.9,
}: {
    children: React.ReactNode;
    /**
     * Bounds of the canvas.
     */
    bounds: ThreeDimensionalBoundsType;
    /**
     * Offset from the object to make it fit the bounds.
     *
     * Only affects perspective cameras.
     * @default 1.5
     */
    offset?: number;
    /**
     * The amount to reduce the zoom by to give some padding to the points (1 means no padding).
     *
     * Only affects orthographic cameras.
     * @default 0.9
     */
    boundsZoomPaddingFactor?: number;
}) {
    const center = getCenterFromThreeDimensionalBounds(bounds);
    const {
        camera,
        size: { width, height },
    } = useThree();

    useEffect(() => {
        // @src https://discourse.threejs.org/t/camera-zoom-to-fit-object/936/2
        const { minX, maxX, minY, maxY, minZ, maxZ } = bounds;
        const boundsWidth = maxX - minX;
        const boundsHeight = maxY - minY;
        const boundsDepth = maxZ - minZ;
        const maxDim = Math.max(boundsWidth, boundsHeight, boundsDepth);
        camera.position.x = boundsWidth / 2 + minX;
        camera.position.y = boundsHeight / 2 + minY;
        if (isOrthographicCamera(camera)) {
            // Orthographic camera
            // Set the zoom to fit the bounds
            // @src https://github.com/pmndrs/react-three-fiber/issues/67#issuecomment-496507403
            camera.zoom =
                Math.min(width / boundsWidth, height / boundsHeight) *
                boundsZoomPaddingFactor;
            const furthestPointDim = getMaxDimensionFromThreeDimensionalBounds(
                bounds,
            );

            // Set the camera position to be a bit further away than the furthest coordinate value, to allow for rotation of the cloud without clipping through the near plane
            // The default near value is .1, so if we move the camera back this far, we are guaranteed to be not clip the near plane
            const cameraZ =
                Math.abs(furthestPointDim) + ORTHOGRAPHIC_CAMERA_Z_OFFSET;
            camera.position.z = cameraZ;

            // Set the far edge to be a bit further away than the furthest coordinate value + the camera's position, to allow for rotation of the cloud without clipping through the far plane
            const cameraToFarEdge = Math.max(
                camera.far,
                cameraZ + furthestPointDim + ORTHOGRAPHIC_CAMERA_Z_OFFSET,
            );
            camera.far = cameraToFarEdge;
        } else {
            // Perspective camera
            const fov = camera.fov * (Math.PI / 180);
            const cameraZ = maxDim / (2 * Math.tan(fov / 2));
            camera.position.z = (cameraZ + center[2]) * offset;

            const cameraToFarEdge =
                minZ < 0 ? -minZ + camera.position.z : camera.position.z - minZ;
            camera.far = cameraToFarEdge * 3;
        }

        camera.updateProjectionMatrix();
        camera.lookAt(...center);
    }, [bounds]);

    return (
        <BoundsContext.Provider value={{ bounds, center }}>
            {children}
        </BoundsContext.Provider>
    );
}
