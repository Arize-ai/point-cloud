import React, { useMemo } from 'react';
import * as THREE from 'three';
import { mergeBufferGeometries } from 'three-stdlib';
import { PointCoordinates } from './types';

const DEFAULT_RADIUS = 0.1;

export type ClusterPoint = {
  position: PointCoordinates;
};

export type ClusterProps = {
  data: Array<ClusterPoint>;
  /**
   * The radius of each cluster point
   */
  pointRadius?: number;
  /**
   * The color of the cluster
   * @default '#999999'
   */
  color?: string;
  /**
   * The opacity of the cluster
   * @default 0.1
   */
  opacity?: number;
  /**
   * Whether or not to render the mesh as a wire frame
   * @default false
   */
  wireframe?: boolean;
};

export function Cluster({
  data,
  pointRadius = DEFAULT_RADIUS,
  color = '#999999',
  opacity = 0.2,
  wireframe = false,
}: ClusterProps) {
  const singleGeometry = useMemo(() => {
    let geometries: THREE.SphereGeometry[] = [];
    // Keep track of the points added so that we can remove duplicates
    const pointSet = new Set();
    data.forEach((point) => {
      const { position } = point;
      // Remove duplicates
      if (!pointSet.has(position.join(','))) {
        const geometry = new THREE.SphereGeometry(pointRadius, 12, 12);
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
        wireframe={wireframe}
      />
    </mesh>
  );
}
