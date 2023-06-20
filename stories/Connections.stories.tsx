import React, { startTransition, useRef, useState } from 'react';
import { Meta, Story } from '@storybook/react';
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

import _data from './data/point-cloud-3d.json';
import { Container, ToolName } from './components';
import { QuadraticBezierLine } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const data = _data as unknown as Array<PointBaseProps>;

const meta: Meta = {
  title: 'Connections',
};

const connections: Array<{
  id: string;
  start: ThreeDimensionalPoint;
  end: ThreeDimensionalPoint;
}> = [];

const CONNECTIONS_PER_POINT = 10;
for (let i = CONNECTIONS_PER_POINT; i < data.length; i++) {
  const startPoint = data[i];
  const x = startPoint.position[0];
  const y = startPoint.position[1];
  const z = startPoint.position[2] as number;
  const start: ThreeDimensionalPoint = [x, y, z];
  for (let j = 0; j < CONNECTIONS_PER_POINT; j++) {
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
  const [tool, setTool] = useState<ToolName>('move');
  const bounds = React.useMemo(() => {
    return getThreeDimensionalBounds([
      ...data.map((d) => d.position as ThreeDimensionalPoint),
    ]);
  }, []);
  return (
    <Container showToolbar selectedTool={tool} onToolChange={setTool}>
      <ThreeDimensionalCanvas camera={{ zoom: 1, up: [0, 0, 1] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 10]} />
        <ThreeDimensionalControls />
        <ThreeDimensionalBounds bounds={bounds}>
          <Axes size={bounds.maxX - bounds.minX} />
          <PointsWithConnections />
        </ThreeDimensionalBounds>
      </ThreeDimensionalCanvas>
    </Container>
  );
}

function PointsWithConnections() {
  const lineWidth = 1;
  const group = useRef<THREE.Group>(null);
  const [selectedPoint, setSelectedPoint] =
    useState<PointBaseProps | null>(null);
  const filteredConnections = connections.filter((connection) => {
    return connection.id === selectedPoint?.metaData.uuid;
  });
  useFrame((_, delta) => {
    if (group.current) {
      group.current.children.forEach(
        (group) =>
          // @ts-ignore
          (group.children[0].material.uniforms.dashOffset.value -= delta * 5)
      );
    }
  });
  return (
    <>
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
      <group ref={group}>
        {filteredConnections.map((connection, i) => {
          return (
            <group>
              <QuadraticBezierLine
                key={i}
                start={connection.start}
                end={connection.end}
                color="white"
                opacity={1}
                transparent
                dashed
                dashScale={50}
                gapSize={20}
                lineWidth={lineWidth}
              />
              <QuadraticBezierLine
                key={i}
                start={connection.start}
                end={connection.end}
                color="white"
                lineWidth={lineWidth / 2}
                transparent
                opacity={0.8}
              />
            </group>
          );
        })}
      </group>
    </>
  );
}
