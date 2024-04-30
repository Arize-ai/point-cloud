import React from "react";
import { MapControls } from "@react-three/drei";
import { useTwoDimensionalBounds } from "./TwoDimensionalBounds";
import { ControlProps, ThreeDimensionalPoint } from "./types";

export type TwoDimensionalControlsProps = Omit<ControlProps, "enableRotate">;

export function TwoDimensionalControls({
    enabled = true,
    zoomSpeed = 1.5,
    enableZoom = true,
    panSpeed = 2,
    enablePan = true,
    ...passThroughProps
}: TwoDimensionalControlsProps) {
    const { center } = useTwoDimensionalBounds();
    const target = [...center, 0] as ThreeDimensionalPoint;

    /* disable rotation so that it doesn't clash with selection */
    return (
        <MapControls
            enableRotate={false}
            enabled={enabled}
            target={target}
            zoomSpeed={zoomSpeed}
            enableZoom={enableZoom}
            panSpeed={panSpeed}
            enablePan={enablePan}
            autoRotate={false}
            {...passThroughProps}
        />
    );
}
