import { FigspecFrameViewer as FigspecFrameViewerElement, FigspecFileViewer as FigspecFileViewerElement } from "@figspec/components";
import * as React from "react";
declare type FigspecFrameViewerElementProps = Pick<FigspecFrameViewerElement, "nodes" | "renderedImage"> & Partial<Pick<FigspecFrameViewerElement, "id" | "className" | "style" | "zoomSpeed" | "panSpeed" | "zoomMargin" | "link">>;
interface FigspecFrameViewerEvents {
    onScaleChange?(ev: CustomEvent<{
        scale: number;
    }>): void;
    onPositionChange?(ev: CustomEvent<{
        x: number;
        y: number;
    }>): void;
    onNodeSelect?(ev: CustomEvent<{
        selectedNode: unknown | null;
    }>): void;
}
export declare type FigspecFrameViewerProps = FigspecFrameViewerElementProps & FigspecFrameViewerEvents;
export declare const FigspecFrameViewer: React.ForwardRefExoticComponent<Pick<FigspecFrameViewerElement, "nodes" | "renderedImage"> & Partial<Pick<FigspecFrameViewerElement, "className" | "id" | "style" | "zoomMargin" | "link" | "zoomSpeed" | "panSpeed">> & FigspecFrameViewerEvents & React.RefAttributes<FigspecFrameViewerElement>>;
declare type FigspecFileViewerElementProps = Pick<FigspecFileViewerElement, "documentNode" | "renderedImages"> & Partial<Pick<FigspecFileViewerElement, "id" | "className" | "style" | "zoomSpeed" | "panSpeed" | "zoomMargin" | "link">>;
interface FigspecFileViewerEvents {
    onScaleChange?(ev: CustomEvent<{
        scale: number;
    }>): void;
    onPositionChange?(ev: CustomEvent<{
        x: number;
        y: number;
    }>): void;
    onNodeSelect?(ev: CustomEvent<{
        selectedNode: unknown | null;
    }>): void;
}
export declare type FigspecFileViewerProps = FigspecFileViewerElementProps & FigspecFileViewerEvents;
export declare const FigspecFileViewer: React.ForwardRefExoticComponent<Pick<FigspecFileViewerElement, "documentNode" | "renderedImages"> & Partial<Pick<FigspecFileViewerElement, "className" | "id" | "style" | "zoomMargin" | "link" | "zoomSpeed" | "panSpeed">> & FigspecFileViewerEvents & React.RefAttributes<FigspecFileViewerElement>>;
export {};
