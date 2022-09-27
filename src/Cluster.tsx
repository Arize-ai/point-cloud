import React, { useMemo, useRef, useCallback, useState } from 'react';
import * as THREE from 'three';
import { mergeBufferGeometries } from 'three-stdlib';

const DEFAULT_RADIUS = 0.1;

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

export function Cluster({ data, color, opacity = 0.4 }: ClusterProps) {
  const singleGeometry = useMemo(() => {
    let geometries: THREE.SphereGeometry[] = [];
    const pointSet = new Set();
    data.forEach((point) => {
      const { position } = point;
      // Remove duplicates
      if (!pointSet.has(position.join(','))) {
        const geometry = new THREE.SphereGeometry(DEFAULT_RADIUS);
        geometry.translate(position[0], position[1], position[2] || 0);
        geometries.push(geometry);
        pointSet.add(position.join(','));
      }
    });

    const geometry = mergeBufferGeometries(geometries);
    return geometry;
  }, [data]);

  return (
    <mesh geometry={singleGeometry ?? undefined}>
      <meshBasicMaterial
        opacity={opacity}
        transparent={opacity < 1}
        color={color}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
