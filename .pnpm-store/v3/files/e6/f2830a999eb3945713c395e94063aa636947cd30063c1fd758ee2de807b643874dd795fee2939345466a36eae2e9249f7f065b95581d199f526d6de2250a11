"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FigspecFileViewer = exports.FigspecFrameViewer = void 0;
const components_1 = require("@figspec/components");
const react_1 = require("@lit-labs/react");
const React = require("react");
// NOTE: These exported components are casted with `as unknown as ...` in order not to break
//       typings accidentally. `as unknown` is required because a component created by
//       `createComponent` has `RefAttributes<unknown>`, which is incompatible with existing
//       type signature (and breaks ref typings). Also the explicit props definition prevents
//       every properties turns into optional.
exports.FigspecFrameViewer = (0, react_1.createComponent)(React, "figspec-frame-viewer", components_1.FigspecFrameViewer, {
    onNodeSelect: "nodeselect",
    onPositionChange: "positionchange",
    onScaleChange: "scalechange",
});
exports.FigspecFileViewer = (0, react_1.createComponent)(React, "figspec-file-viewer", components_1.FigspecFileViewer, {
    onNodeSelect: "nodeselect",
    onPositionChange: "positionchange",
    onScaleChange: "scalechange",
});
