import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import {
  Axes,
  Cluster,
  PointBaseProps,
  Points,
  ThreeDimensionalBounds,
  ThreeDimensionalCanvas,
  ThreeDimensionalControls,
  ThreeDimensionalPoint,
  getThreeDimensionalBounds,
} from '../src';

import _data from './data/point-cloud-3d.json';
import { Container, ToolName } from './components';
import { QuadraticBezierCurve3 } from 'three';
import { QuadraticBezierLine } from '@react-three/drei';

const data = _data as unknown as Array<PointBaseProps>;

const meta: Meta = {
  title: 'Connections',
};

const connections: Array<{
  id: string;
  start: ThreeDimensionalPoint;
  end: ThreeDimensionalPoint;
}> = [];

for (let i = 3; i < data.length / 2; i++) {
  const startPoint = data[i];
  const x = startPoint.position[0];
  const y = startPoint.position[1];
  const z = startPoint.position[2] as number;
  const start: ThreeDimensionalPoint = [x, y, z];
  for (let j = 0; j < 3; j++) {
    const endPoint = data[i - j - 1];
    const x2 = endPoint.position[0];
    const y2 = endPoint.position[1];
    const z2 = endPoint.position[2] as number;
    const end: ThreeDimensionalPoint = [x2, y2, z2];
    connections.push({ id: startPoint.metaData.uuid, start, end });
  }
}

export default meta;

export function Default() {
  const [selected, setSelected] = useState([]);
  const [tool, setTool] = useState<ToolName>('move');
  const bounds = React.useMemo(() => {
    return getThreeDimensionalBounds([
      ...data.map((d) => d.position as ThreeDimensionalPoint),
    ]);
  }, []);
  const [selectedPoint, setSelectedPoint] =
    useState<PointBaseProps | null>(null);
  return (
    <Container showToolbar selectedTool={tool} onToolChange={setTool}>
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
            onPointClicked={(point) => {
              setSelectedPoint(point);
            }}
          />
        </ThreeDimensionalBounds>
        {connections.map((connection, i) => {
          return (
            <QuadraticBezierLine
              key={i}
              start={connection.start}
              end={connection.end}
              color="white"
              opacity={
                connection.id === selectedPoint?.metaData.uuid ? 1 : 0.05
              }
              transparent
            />
          );
        })}
      </ThreeDimensionalCanvas>
      <div>Selected ID: {selectedPoint?.metaData.uuid}</div>
    </Container>
  );
}
