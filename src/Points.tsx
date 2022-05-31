import React, { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

type PointMeshProps = {
  /**
   * The radius of the point.
   * @default 0.02
   */
  radius?: number;
  /**
   * The color of the point
   */
  color: string;
  /**
   * The color of the point
   */
  scale?: number;
};

type PointBaseProps = {
  metaData: any;
  position: [number, number, number] | [number, number];
};

/**
 * Have to provide default mesh properties, otherwise the point will not get restored after selection
 */
const defaultPointMeshProps: PointMeshProps = { color: 'blue', scale: 1 };

export type PointsProps = {
  data: Array<PointBaseProps>;
  pointProps: PointMeshProps;
  /**
   * Additional props that will be merged with point props when the point is selected
   */
  selectedPointProps?: PointMeshProps;
  /**
   * Callback for when a point gets selected
   */
  onPointSelected?: (pointOrVoid: PointBaseProps | void) => void;
};

const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();

export function Points({
  data,
  pointProps = defaultPointMeshProps,
  selectedPointProps,
  onPointSelected,
}: PointsProps) {
  const [selectedInstanceId, setSelectedInstanceId] =
    useState<number | null>(null);
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(data.length)
          .fill(null)
          .flatMap((_) => tempColor.set(pointProps.color).toArray())
      ),
    [data]
  );
  const scaleArrayRef = useRef(Array.from(new Array(data.length).fill(1)));
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const prevSelectedInstanceIdRef = useRef<number | null>(null);
  useEffect(
    () => void (prevSelectedInstanceIdRef.current = selectedInstanceId),
    [selectedInstanceId]
  );

  useFrame(() => {
    data.forEach(({ position }, id) => {
      tempObject.position.set(position[0], position[1], position[2] || 0);
      if (meshRef.current) {
        meshRef.current.setMatrixAt(id, tempObject.matrix);
        meshRef.current.instanceMatrix.needsUpdate = true;
        const isSelected = id === selectedInstanceId;

        (isSelected
          ? tempColor.set(selectedPointProps?.color || 'lime')
          : tempColor.set(pointProps.color)
        ).toArray(colorArray, id * 3);
        meshRef.current.geometry.attributes.color.needsUpdate = true;

        const scale = (scaleArrayRef.current[id] = THREE.MathUtils.lerp(
          scaleArrayRef.current[id],
          isSelected ? selectedPointProps?.scale || 1.2 : 1,
          0.1
        ));
        tempObject.scale.setScalar(scale);
        tempObject.updateMatrix();
        meshRef.current.setMatrixAt(id, tempObject.matrix);
      }
    });
  });
  return (
    <instancedMesh
      args={[undefined, undefined, data.length]}
      ref={meshRef}
      onPointerUp={(e) => {
        if (e.instanceId) {
          setSelectedInstanceId(e.instanceId);
          onPointSelected && onPointSelected(data[e.instanceId]);
        } else {
          setSelectedInstanceId(null);
          onPointSelected && onPointSelected();
        }
      }}
    >
      <sphereGeometry args={[pointProps.radius || 0.02, 20, 20]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colorArray, 3]}
        />
      </sphereGeometry>
      <meshStandardMaterial
        // @ts-ignore
        vertexColors={THREE.VertexColors}
      />
    </instancedMesh>
  );
}
