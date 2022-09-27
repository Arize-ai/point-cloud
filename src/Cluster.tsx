import React, { useMemo, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const DEFAULT_RADIUS = 0.08;

type ClusterMeshProps = {
  /**
   * The radius of the point if it is a sphere.
   * @default 0.02
   */
  radius?: number;
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

export type ClusterBaseProps = {
  metaData: any;
  position: [number, number, number] | [number, number];
};

/**
 * Have to provide default mesh properties, otherwise the point will not get restored after selection
 */
const defaultPointMeshProps: ClusterMeshProps = { scale: 1 };

export type ClusterProps = {
  data: Array<ClusterBaseProps>;
  pointProps: ClusterMeshProps;
  /**
   * The color of the cluster
   */
  color: string;
  /**
   * The opacity of the cluster
   * @default 0.5
   */
  opacity?: number;
};

const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();

export function Cluster({
  data,
  pointProps = defaultPointMeshProps,
  color,
  opacity = 0.5,
}: ClusterProps) {
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(data.length)
          .fill(null)
          .flatMap(() => tempColor.set(color).toArray())
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

        const colorString = color;
        tempColor.set(colorString);

        // Flush the color to the color buffer at the point's index
        tempColor.toArray(colorArray, id * 3);

        meshRef.current.geometry.attributes.color.needsUpdate = true;

        tempObject.updateMatrix();
        meshRef.current.setMatrixAt(id, tempObject.matrix);
      }
    });
  });

  return (
    <instancedMesh
      args={[undefined, undefined, data.length]}
      ref={meshRef}
      //   onPointerUp={(e) => {
      //     if (e.intersections) {
      //       const instanceIds = e.intersections
      //         .map((e) => e?.instanceId)
      //         .filter((i): i is NonNullable<typeof i> => i != null);
      //     }
      //   }}
    >
      <sphereGeometry args={[pointProps.radius || DEFAULT_RADIUS, 20, 20]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colorArray, 3]}
        />
      </sphereGeometry>
      <meshBasicMaterial
        vertexColors
        opacity={opacity}
        transparent={opacity < 1}
      />
    </instancedMesh>
  );
}
