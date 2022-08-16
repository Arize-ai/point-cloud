import React, { useEffect, ReactNode, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { PointBaseProps } from './Points';
import { isPointInsidePolygon } from './utils/twoDimensionalUtils';
import { TwoDimensionalPoint } from './types';
import { isOrthographicCamera } from './utils';

type LassoSelectProps = {
  /**
   * The color of the lasso line
   */
  lineColor?: string;
  /**
   * Whether or not selection is enabled
   * @default true
   */
  enabled?: boolean;
  children?: ReactNode;
  points: PointBaseProps[];
  onChange: (selected: PointBaseProps[]) => void;
};

/**
 * State that is kept track during the lifecycle of this component being mounted
 */
type SelectionState = {
  selectionPoints: number[];
  isDragging: boolean;
  selectionShapeNeedsUpdate: boolean;
  selectionNeedsUpdate: boolean;
};

function initializeSelectionShape() {
  const selectionShape = new THREE.Line();
  selectionShape.renderOrder = 1;
  selectionShape.position.z = -0.2;
  // @ts-ignore
  selectionShape.depthTest = false;
  selectionShape.scale.setScalar(1);
  return selectionShape;
}

export function LassoSelect({
  children,
  lineColor = '#53d7fb',
  onChange,
  points,
  enabled,
}: LassoSelectProps) {
  const { camera, raycaster, gl, controls, size, scene } = useThree();
  const selectionShape = useRef<THREE.Line>(initializeSelectionShape());
  const selectionState = useRef<SelectionState>({
    selectionPoints: [],
    isDragging: false,
    selectionNeedsUpdate: false,
    selectionShapeNeedsUpdate: false,
  });

  // Initialization step for retting up the selection shape and scene
  useEffect(() => {
    // Set the color of the lasso
    // @ts-ignore
    selectionShape.current.material.color.set(lineColor).convertSRGBToLinear();

    // Selection shape
    camera.add(selectionShape.current);

    // Must add the camera to the scene itself
    scene.add(camera);
  }, []);

  // Adds event handlers based on props
  useEffect(() => {
    // handle building lasso shape

    let prevX = -Infinity;
    let prevY = -Infinity;

    const tempVec0 = new THREE.Vector2();
    const tempVec1 = new THREE.Vector2();
    const tempVec2 = new THREE.Vector2();

    function pointerDown(e: MouseEvent) {
      if (enabled) {
        // The dimension of the canvas
        const canvasRect = gl.domElement.getClientRects()[0];
        prevX = e.clientX - canvasRect.left;
        prevY = e.clientY - canvasRect.top;
        selectionState.current.selectionPoints.length = 0;
        selectionState.current.isDragging = true;
      }
    }

    /**
     * Calculate the points to add to the line segment
     * @src https://github.com/gkjohnson/three-mesh-bvh/blob/master/example/selection.js
     */
    function pointerMove(e: MouseEvent) {
      if (selectionState.current.isDragging) {
        const { selectionPoints } = selectionState.current;
        // The dimension of the canvas
        const canvasRect = gl.domElement.getClientRects()[0];
        // Capture the click event position

        const ex = e.clientX - canvasRect.left;
        const ey = e.clientY - canvasRect.top;

        const nx = (ex / canvasRect.width) * 2 - 1;
        const ny = -((ey / canvasRect.height) * 2 - 1);

        // If the mouse hasn't moved a lot since the last point
        if (Math.abs(ex - prevX) >= 3 || Math.abs(ey - prevY) >= 3) {
          // Check if the mouse moved in roughly the same direction as the previous point
          // and replace it if so.
          const i = selectionPoints.length / 3 - 1;
          const i3 = i * 3;
          let doReplace = false;
          if (selectionPoints.length > 3) {
            // prev segment direction
            tempVec0.set(selectionPoints[i3 - 3], selectionPoints[i3 - 3 + 1]);
            tempVec1.set(selectionPoints[i3], selectionPoints[i3 + 1]);
            tempVec1.sub(tempVec0).normalize();

            // this segment direction
            tempVec0.set(selectionPoints[i3], selectionPoints[i3 + 1]);
            tempVec2.set(nx, ny);
            tempVec2.sub(tempVec0).normalize();

            const dot = tempVec1.dot(tempVec2);
            doReplace = dot > 0.99;
          }

          if (doReplace) {
            selectionPoints[i3] = nx;
            selectionPoints[i3 + 1] = ny;
          } else {
            selectionPoints.push(nx, ny, 0);
          }

          selectionState.current.selectionShapeNeedsUpdate = true;
          selectionShape.current.visible = true;

          prevX = ex;
          prevY = ey;
        }
      }
    }

    function pointerUp() {
      if (
        enabled &&
        selectionState.current.isDragging &&
        selectionState.current.selectionPoints.length
      ) {
        selectionState.current.selectionShapeNeedsUpdate = true;
        selectionState.current.selectionNeedsUpdate = true;
      }
      // Reset the state
      selectionShape.current.visible = false;
      selectionState.current.isDragging = false;
    }

    // Only start the lasso tool when you place the mouse down on the canvas
    gl.domElement.addEventListener('pointerdown', pointerDown, {
      passive: true,
    });
    document.addEventListener('pointermove', pointerMove, {
      passive: true,
      capture: true,
    });
    document.addEventListener('pointerup', pointerUp, { passive: true });

    return () => {
      gl.domElement.removeEventListener('pointerdown', pointerDown);
      document.removeEventListener('pointermove', pointerMove);
      document.removeEventListener('pointerup', pointerUp);
    };
  }, [size, raycaster, camera, controls, gl, enabled]);

  // Animation frames to draw the selections
  useFrame(({ camera }) => {
    const { selectionShapeNeedsUpdate, selectionPoints } =
      selectionState.current;
    // Update the selection lasso lines
    if (selectionShapeNeedsUpdate) {
      const ogLength = selectionPoints.length;
      selectionPoints.push(
        selectionPoints[0],
        selectionPoints[1],
        selectionPoints[2]
      );

      selectionShape.current.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(selectionPoints, 3, false)
      );

      selectionPoints.length = ogLength;

      selectionShape.current.frustumCulled = false;
      selectionState.current.selectionShapeNeedsUpdate = false;
    }

    if (
      selectionState.current.selectionNeedsUpdate &&
      selectionPoints.length > 0
    ) {
      selectionState.current.selectionNeedsUpdate = false;
      onChange(
        updateSelection({
          points,
          camera,
          selectionPoints: selectionState.current.selectionPoints,
        })
      );
    }

    // Set the scale to match the camera
    if (!isOrthographicCamera(camera)) {
      const yScale =
        Math.tan((THREE.MathUtils.DEG2RAD * camera.fov) / 2) *
        selectionShape.current.position.z;

      selectionShape.current.scale.set(-yScale * camera.aspect, -yScale, 1);
    } else {
      // TODO
      selectionShape.current.scale.set(
        (camera.right - camera.left) / camera.zoom / 2,
        (camera.top - camera.bottom) / camera.zoom / 2,
        1
      );
    }
  });

  return <>{children}</>;
}

function updateSelection({
  points,
  camera,
  selectionPoints,
}: {
  points: PointBaseProps[];
  camera: THREE.Camera;
  selectionPoints: number[];
}) {
  let selection: PointBaseProps[] = [];
  let lassoPolygon: TwoDimensionalPoint[] = [];
  for (let i = 0; i < selectionPoints.length; i += 3) {
    lassoPolygon.push([selectionPoints[i], selectionPoints[i + 1]]);
  }

  // A vector to re-use in calculating it's intersection with the polygon
  const pointVector = new THREE.Vector3();
  points.forEach((point) => {
    const isThreeD = point.position.length === 3;
    // Initialize the point vector from the point position
    const pointPosition = isThreeD
      ? point.position
      : [point.position[0], point.position[1], 0];
    pointVector.fromArray(pointPosition);
    if (!isThreeD) {
      // 2D specific adjustments
      // TODO this is pretty specific to orbital controls and should
      // be made more generic
      pointVector.sub(camera.position).applyMatrix4(camera.matrixWorld);
    }
    pointVector.project(camera);
    if (isPointInsidePolygon([pointVector.x, pointVector.y], lassoPolygon)) {
      selection.push(point);
    }
  });
  return selection;
}
