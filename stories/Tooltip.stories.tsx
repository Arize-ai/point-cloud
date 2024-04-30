import { Meta } from '@storybook/react';
import { startTransition, useState } from 'react';
import { Container, ToolName } from './components';
import {
  Axes,
  PointBaseProps,
  Points,
  ThreeDimensionalBounds,
  ThreeDimensionalCanvas,
  ThreeDimensionalControls,
  ThreeDimensionalPoint,
  getThreeDimensionalBounds,
} from '../src';
import React from 'react';
import { Html } from '@react-three/drei';
import _data from './data/point-cloud-3d.json';
import { Vector3 } from 'three';
const data = _data as unknown as Array<PointBaseProps>;

const meta: Meta = {
  title: 'Tooltip',
};

export default meta;

export function Default() {
  const bounds = React.useMemo(() => {
    return getThreeDimensionalBounds([
      ...data.map((d) => d.position as ThreeDimensionalPoint),
    ]);
  }, []);
  const [selectedPoint, setSelectedPoint] =
    useState<PointBaseProps | null>(null);

  return (
    <Container showToolbar={false}>
      <ThreeDimensionalCanvas camera={{ zoom: 1, up: [0, 0, 1] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 10]} />
        <ThreeDimensionalControls />
        <ThreeDimensionalBounds bounds={bounds}>
          <Axes size={bounds.maxX - bounds.minX} />
          <Points
            data={data}
            pointProps={{
              color: 'limegreen',
            }}
            onPointHovered={(point) => {
              startTransition(() => {
                setSelectedPoint(point);
              });
            }}
            onPointerLeave={() => {
              startTransition(() => {
                setSelectedPoint(null);
              });
            }}
          />
        </ThreeDimensionalBounds>
        {selectedPoint ? (
          <Html position={selectedPoint.position as unknown as Vector3}>
            <div style={{ color: 'white', padding: '10px 10px' }}>
              <section style={{ background: 'gray', borderRadius: '4px' }}>
                {selectedPoint.metaData.uuid}
              </section>
            </div>
          </Html>
        ) : null}
      </ThreeDimensionalCanvas>
    </Container>
  );
}
