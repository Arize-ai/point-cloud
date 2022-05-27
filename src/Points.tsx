import React, {
  useMemo,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useSelect, useCursor } from '@react-three/drei';

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

type PointProps = PointMeshProps &
  PointBaseProps & { selectedProps?: PointMeshProps };

/**
 * Have to provide default mesh properties, otherwise the point will not get restored after selection
 */
const defaultPointMeshProps: PointMeshProps = { scale: 1 };

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
  onPointSelected?: (props: PointBaseProps) => void;
};

const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();

export function Points({
  data,
  pointProps,
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
        if (selectedInstanceId !== prevSelectedInstanceIdRef.current) {
          const isSelected = id === selectedInstanceId;
          (isSelected
            ? tempColor.set(selectedPointProps?.color || 'lime')
            : tempColor.set(pointProps.color)
          ).toArray(colorArray, id * 3);
          meshRef.current.geometry.attributes.color.needsUpdate = true;
        }
        const scale = (scaleArrayRef.current[id] = THREE.MathUtils.lerp(
          scaleArrayRef.current[id],
          selectedInstanceId ? 2.5 : 1,
          0.1
        ));
        tempObject.scale.setScalar(scale);
        meshRef.current.setMatrixAt(id, tempObject.matrix);
        tempObject.updateMatrix();
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
        }
      }}
    >
      <sphereGeometry args={[0.02, 20, 20]} />
      <meshStandardMaterial color={pointProps.color} />
    </instancedMesh>
  );
}
