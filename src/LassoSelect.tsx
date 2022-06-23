import React, { useEffect, ReactNode } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

const context = React.createContext<THREE.Object3D[]>([]);

type LassoSelectProps = {
  /**
   * The color of the lasso line
   */
  lineColor?: string;
  children: ReactNode;
};

const selectionPoints: number[] = [];
let isDragging = false;
let selectionShapeNeedsUpdate = false;

const selectionShape = new THREE.Line();
selectionShape.renderOrder = 1;
selectionShape.position.z = -0.2;
// @ts-ignore
selectionShape.depthTest = false;
selectionShape.scale.setScalar(1);

export function LassoSelect({
  children,
  lineColor = '#53d7fb',
}: LassoSelectProps) {
  const { camera, raycaster, gl, controls, size, scene } = useThree();

  // const ref = React.useRef<THREE.Group>(null!);

  useEffect(() => {
    // Set the color of the lasso
    // @ts-ignore
    selectionShape.material.color.set(lineColor).convertSRGBToLinear();

    // Selection shape
    camera.add(selectionShape);

    // Must add the camera to the scene itself
    scene.add(camera);

    gl.setPixelRatio(window.devicePixelRatio);

    // handle building lasso shape
    let startX = -Infinity;
    let startY = -Infinity;

    let prevX = -Infinity;
    let prevY = -Infinity;

    const canvasRect = gl.domElement.getClientRects()[0];

    const tempVec0 = new THREE.Vector2();
    const tempVec1 = new THREE.Vector2();
    const tempVec2 = new THREE.Vector2();

    function pointerDown(e: MouseEvent) {
      prevX = e.clientX - canvasRect.left;
      prevY = e.clientY - canvasRect.top;
      startX = ((e.clientX - canvasRect.left) / canvasRect.width) * 2 - 1;
      startY = -(((e.clientY - canvasRect.top) / gl.domElement.height) * 2 - 1);
      selectionPoints.length = 0;
      isDragging = true;
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
      if (selectionPoints.length) {
        selectionShapeNeedsUpdate = true;
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
  }, [size, raycaster, camera, controls, gl]);

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

    const yScale =
      // @ts-ignore
      Math.tan((THREE.MathUtils.DEG2RAD * camera.fov) / 2) *
      selectionShape.position.z;
    // @ts-ignore
    selectionShape.scale.set(-yScale * camera.aspect, -yScale, 1);
  });

  return <>{children}</>;
}

export function useSelect() {
  return React.useContext(context);
}
