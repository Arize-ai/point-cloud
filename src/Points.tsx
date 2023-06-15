import React, { useMemo, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { PointCoordinates, ThreeDimensionalPoint } from './types';

type PointShape = 'sphere' | 'cube' | 'octahedron';

type PointMeshProps = {
  /**
   * The radius of the point if it is a sphere.
   * @default 0.02
   */
  radius?: number;
  /**
   * The color of the point
   */
  color: string | ((point: PointBaseProps) => string);
  /**
   * The color of the point
   */
  scale?: number;
  /**
   * the dimension of a side if the radius is a sphere
   * @default 0.03
   */
  size?: number;
};

export type PointBaseProps = {
  metaData: any;
  position: PointCoordinates;
};

/**
 * Have to provide default mesh properties, otherwise the point will not get restored after selection
 */
const defaultPointMeshProps: PointMeshProps = { color: 'blue', scale: 1 };

export type PointsProps = {
  data: Array<PointBaseProps>;
  pointProps: PointMeshProps;
  /**
   * Callback for when a point gets selected. Returns the selected nearest point
   */
  onPointClicked?: (points: PointBaseProps) => void;
  /**
   * Callback for when point(s) gets selected. Returns the selected points that correspond to the ray trace hit
   */
  onPointsClicked?: (points: PointBaseProps[]) => void;
  /**
   * The shape of the points. This value must be uniform for all points.
   * @default 'sphere'
   */
  pointShape?: PointShape;
  /**
   * The opacity of the points
   * @default 1
   */
  opacity?: number;
  /**
   * The material of the points
   * @default 'meshMatcap'
   */
  material?: 'standard' | 'meshMatcap';
};

const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();

export function Points({
  data,
  pointProps = defaultPointMeshProps,
  onPointsClicked,
  onPointClicked,
  pointShape = 'sphere',
  opacity = 1,
  material = 'meshMatcap',
}: PointsProps) {
  // Callback function to get the color of a specific point
  const getColorPoint = useCallback(
    (data: PointBaseProps) => {
      const colorString =
        typeof pointProps.color === 'function'
          ? pointProps.color(data)
          : pointProps.color;
      return colorString;
    },
    [pointProps.color]
  );

  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(data.length)
          .fill(null)
          .flatMap((_, idx) =>
            tempColor.set(getColorPoint(data[idx])).toArray()
          )
      ),
    [data]
  );

  const meshRef = useRef<THREE.InstancedMesh>(null);

  useFrame(() => {
    data.forEach(({ position }, id) => {
      tempObject.position.set(position[0], position[1], position[2] || 0);
      if (meshRef.current) {
        meshRef.current.setMatrixAt(id, tempObject.matrix);
        meshRef.current.instanceMatrix.needsUpdate = true;

        const colorString = getColorPoint(data[id]);
        tempColor.set(colorString);

        // Flush the color to the color buffer at the point's index
        tempColor.toArray(colorArray, id * 3);

        meshRef.current.geometry.attributes.color.needsUpdate = true;

        tempObject.updateMatrix();
        meshRef.current.setMatrixAt(id, tempObject.matrix);
      }
    });
  });

  const geometryEl = useMemo(() => {
    switch (pointShape) {
      case 'sphere': {
        return (
          <sphereGeometry args={[pointProps.radius || 0.02, 20, 20]}>
            <instancedBufferAttribute
              attach="attributes-color"
              args={[colorArray, 3]}
            />
          </sphereGeometry>
        );
      }
      case 'cube': {
        const args: ThreeDimensionalPoint =
          typeof pointProps?.size === 'number'
            ? [pointProps.size, pointProps.size, pointProps.size]
            : [0.03, 0.03, 0.03];
        return (
          <boxGeometry args={args}>
            <instancedBufferAttribute
              attach="attributes-color"
              args={[colorArray, 3]}
            />
          </boxGeometry>
        );
      }
      case 'octahedron': {
        return (
          <octahedronGeometry args={[pointProps.radius || 0.02, 0]}>
            <instancedBufferAttribute
              attach="attributes-color"
              args={[colorArray, 3]}
            />
          </octahedronGeometry>
        );
      }
      default: {
        throw new Error(`Unsupported point shape: ${pointShape}`);
      }
    }
  }, [pointShape, pointProps]);

  const materialEl = useMemo(() => {
    switch (material) {
      case 'meshMatcap':
        return (
          <meshMatcapMaterial
            vertexColors={true}
            opacity={opacity}
            transparent={opacity < 1}
          />
        );

      default:
        return (
          <meshStandardMaterial
            vertexColors={true}
            opacity={opacity}
            transparent={opacity < 1}
          />
        );
    }
  }, [material]);

  return (
    <instancedMesh
      args={[undefined, undefined, data.length]}
      ref={meshRef}
      onPointerUp={(e) => {
        if (e.intersections) {
          const instanceIds = e.intersections
            .map((e) => e?.instanceId)
            .filter((i): i is NonNullable<typeof i> => i != null);

          // Multi click
          onPointsClicked && onPointsClicked(instanceIds.map((i) => data[i]));

          // Single click
          instanceIds.length > 0 &&
            onPointClicked &&
            onPointClicked(data[instanceIds[0]]);
        }
      }}
    >
      {geometryEl}
      {materialEl}
    </instancedMesh>
  );
}
