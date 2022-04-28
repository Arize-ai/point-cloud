import React from 'react';
import { useMemo, useRef, useEffect } from 'react';
import { Vector3 } from 'three';
import { useSelect } from '@react-three/drei';

type PointMeshProps = {
  /**
   * The radius of the point.
   * @default 0.01
   */
  radius?: number;
  /**
   * The color of the point
   * @default #fffff
   */
  color?: string;
};

type PointBaseProps = {
  metaData: any;
  position: [number, number, number] | [number, number];
};

type PointProps = PointMeshProps & PointBaseProps;

function Point({
  radius = 0.01,
  color = '#ffffff',
  metaData,
  position: propsPosition,
  ...meshProps
}: PointProps) {
  /**
   * Normalize the position (alternatively hoist?)
   */
  const position = useMemo(() => {
    const [x, y, z = 0] = propsPosition;
    return [x, y, z] as unknown as Vector3;
  }, [propsPosition]);

  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef(null);
  // Return the view, these are regular Threejs elements expressed in JSX
  const selected = useSelect();
  // @ts-ignore
  const isSelected = !!selected.find((sel) => sel.uuid === ref.current?.uuid);

  useEffect(() => {
    if (ref.current) {
      // attach custom metaData via monkey patching
      // @ts-ignore
      ref.current.metaData = metaData;
    }
  }, [ref, metaData]);
  return (
    <mesh
      {...meshProps}
      position={position}
      ref={ref}
      scale={isSelected ? 1.5 : 1} // TODO move this to props
    >
      <sphereGeometry args={[radius, 32, 16]} />
      <meshStandardMaterial color={isSelected ? 'red' : color} />
    </mesh>
  );
}

export type PointsProps = {
  data: Array<PointBaseProps>;
  pointProps?: PointMeshProps;
};

export function Points({ data, pointProps }: PointsProps) {
  return (
    <>
      {data.map((point, i) => (
        <Point {...pointProps} {...point} key={i} />
      ))}
    </>
  );
}
