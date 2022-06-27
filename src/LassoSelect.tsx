import React, { useEffect, ReactNode } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { PointBaseProps } from './Points';
import { isPointInsidePolygon } from './utils/twoDimensionalUtils';
import { TwoDimensionalPoint } from './types';

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
  children: ReactNode;
  points: PointBaseProps[];
  onChange: (selected: PointBaseProps[]) => void;
};

const selectionPoints: number[] = [];
let isDragging = false;
/**
 * Whether or not the lasso shape needs rendering
 */
let selectionShapeNeedsUpdate = false;
/**
 * Whether or not the selection should be updated (e.g. the lasso is closed)
 */
let selectionNeedsUpdate = false;

const selectionShape = new THREE.Line();
selectionShape.renderOrder = 1;
selectionShape.position.z = -0.2;
// @ts-ignore
selectionShape.depthTest = false;
selectionShape.scale.setScalar(1);

export function LassoSelect({
  children,
  lineColor = '#53d7fb',
  onChange,
  points,
  enabled,
}: LassoSelectProps) {
  const { camera, raycaster, gl, controls, size, scene } = useThree();
  const canvasRect = gl.domElement.getClientRects()[0];

  // Initialization step for retting up the selection shape and scene
  useEffect(() => {
    // Set the color of the lasso
    // @ts-ignore
    selectionShape.material.color.set(lineColor).convertSRGBToLinear();

    // Selection shape
    camera.add(selectionShape);

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
        prevX = e.clientX - canvasRect.left;
        prevY = e.clientY - canvasRect.top;
        selectionPoints.length = 0;
        isDragging = true;
      }
    }

    /**
     * Calculate the points to add to the line segment
     * @src https://github.com/gkjohnson/three-mesh-bvh/blob/master/example/selection.js
     */
    function pointerMove(e: MouseEvent) {
      if (isDragging) {
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

          selectionShapeNeedsUpdate = true;
          selectionShape.visible = true;

          prevX = ex;
          prevY = ey;
        }
      }
    }

    function pointerUp() {
      selectionShape.visible = false;
      isDragging = false;
      if (enabled && selectionPoints.length) {
        selectionShapeNeedsUpdate = true;
        selectionNeedsUpdate = true;
      }
    }

    document.addEventListener('pointerdown', pointerDown, { passive: true });
    document.addEventListener('pointermove', pointerMove, {
      passive: true,
      capture: true,
    });
    document.addEventListener('pointerup', pointerUp, { passive: true });

    return () => {
      document.removeEventListener('pointerdown', pointerDown);
      document.removeEventListener('pointermove', pointerMove);
      document.removeEventListener('pointerup', pointerUp);
    };
  }, [size, raycaster, camera, controls, gl, enabled]);

  // Animation frames to draw the selections
  useFrame(({ camera }) => {
    // Update the selection lasso lines
    if (selectionShapeNeedsUpdate) {
      const ogLength = selectionPoints.length;
      selectionPoints.push(
        selectionPoints[0],
        selectionPoints[1],
        selectionPoints[2]
      );

      selectionShape.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(selectionPoints, 3, false)
      );

      selectionPoints.length = ogLength;

      selectionShape.frustumCulled = false;
      selectionShapeNeedsUpdate = false;
    }

    if (selectionNeedsUpdate && selectionPoints.length > 0) {
      selectionNeedsUpdate = false;
      onChange(
        updateSelection({
          points,
          camera,
          canvasWidth: canvasRect.width,
          canvasHeight: canvasRect.height,
        })
      );
    }

    const yScale =
      // @ts-ignore
      Math.tan((THREE.MathUtils.DEG2RAD * camera.fov) / 2) *
      selectionShape.position.z;
    // @ts-ignore
    selectionShape.scale.set(-yScale * camera.aspect, -yScale, 1);
  });

  return <>{children}</>;
}

function updateSelection({
  points,
  camera,
}: {
  points: PointBaseProps[];
  camera: THREE.Camera;
  canvasWidth: number;
  canvasHeight: number;
}) {
  let selection: PointBaseProps[] = [];
  let lassoPolygon: TwoDimensionalPoint[] = [];
  for (let i = 0; i < selectionPoints.length; i += 3) {
    lassoPolygon.push([selectionPoints[i], selectionPoints[i + 1]]);
  }

  // A vector to re-use in calculating it's intersection with the polygon
  const pointVector = new THREE.Vector3();
  points.forEach((point) => {
    // Initialize the point vector from the point position
    pointVector.fromArray(point.position).project(camera);
    if (isPointInsidePolygon([pointVector.x, pointVector.y], lassoPolygon)) {
      selection.push(point);
    }
  });
  return selection;
}
