import * as Figma from "figma-js";
export interface OutlineProps {
    node: Extract<Figma.Node, {
        absoluteBoundingBox: any;
    }>;
    computedThickness: number;
    selected?: boolean;
    onClick?(ev: MouseEvent): void;
}
export declare const Outline: ({ node, selected, computedThickness, onClick, }: OutlineProps) => import("lit-html").TemplateResult<2>;
export interface TooltipProps {
    nodeSize: Figma.Rect;
    offsetX: number;
    offsetY: number;
    reverseScale: number;
}
export declare const Tooltip: ({ nodeSize: { x, y, width, height }, offsetX, offsetY, reverseScale, }: TooltipProps) => import("lit-html").TemplateResult<1>;
export declare const styles: import("lit").CSSResult;
