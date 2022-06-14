import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { BoxGeometry } from 'three';

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
  color: string;
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
  onPointsClicked?: (points: PointBaseProps[]) => void;
  /**
   * Function that determines if a point is selected
   */
  isPointSelected?: (point: PointBaseProps) => boolean;
  /**
   * The shape of the points. This value must be uniform for all points.
   * @default 'sphere'
   */
  pointShape?: PointShape;
};

const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();

export function Points({
  data,
  pointProps = defaultPointMeshProps,
  selectedPointProps,
  onPointsClicked,
  pointShape = 'sphere',
  isPointSelected = () => false,
}: PointsProps) {
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

  useFrame(() => {
    data.forEach(({ position }, id) => {
      tempObject.position.set(position[0], position[1], position[2] || 0);
      if (meshRef.current) {
        meshRef.current.setMatrixAt(id, tempObject.matrix);
        meshRef.current.instanceMatrix.needsUpdate = true;
        const isSelected = isPointSelected(data[id]);

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

  const geometry = useMemo(() => {
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
        const args: [number, number, number] =
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

  return (
    <instancedMesh
      args={[undefined, undefined, data.length]}
      ref={meshRef}
      onPointerUp={(e) => {
        if (e.intersections) {
          onPointsClicked &&
            onPointsClicked(
              e.intersections
                .map((e) => e?.instanceId)
                .filter((i): i is NonNullable<typeof i> => i != null)
                .map((i) => data[i])
            );
        }
      }}
    >
      {geometry}
      <meshStandardMaterial
        // @ts-ignore
        vertexColors={THREE.VertexColors}
      />
    </instancedMesh>
  );
}
