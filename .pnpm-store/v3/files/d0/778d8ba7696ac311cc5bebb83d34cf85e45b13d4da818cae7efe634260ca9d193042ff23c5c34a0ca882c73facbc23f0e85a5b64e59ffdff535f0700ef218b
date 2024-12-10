import { FigspecFrameViewer as FigspecFrameViewerElement, FigspecFileViewer as FigspecFileViewerElement, } from "@figspec/components";
import { createComponent } from "@lit-labs/react";
import * as React from "react";
// NOTE: These exported components are casted with `as unknown as ...` in order not to break
//       typings accidentally. `as unknown` is required because a component created by
//       `createComponent` has `RefAttributes<unknown>`, which is incompatible with existing
//       type signature (and breaks ref typings). Also the explicit props definition prevents
//       every properties turns into optional.
export const FigspecFrameViewer = createComponent(React, "figspec-frame-viewer", FigspecFrameViewerElement, {
    onNodeSelect: "nodeselect",
    onPositionChange: "positionchange",
    onScaleChange: "scalechange",
});
export const FigspecFileViewer = createComponent(React, "figspec-file-viewer", FigspecFileViewerElement, {
    onNodeSelect: "nodeselect",
    onPositionChange: "positionchange",
    onScaleChange: "scalechange",
});
