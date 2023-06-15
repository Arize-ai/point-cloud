import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  ThreeDimensionalCanvas,
  ThreeDimensionalCanvasProps,
  ThreeDimensionalControls,
  Points,
} from '../src';
import { Container } from './components';
import _data from './data/point-cloud-3d.json';
import { interpolateSinebow } from 'd3-scale-chromatic';

const meta: Meta = {
  title: 'ColorByData',
  component: ThreeDimensionalCanvas,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    boundsZoomPaddingFactor: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const data = _data.map((d, idx) => ({
  ...d,
  metaData: { actualLabel: `${idx}` },
}));

const data2 = _data.map((d, idx) => ({
  ...d,
  position: [d.position[0], d.position[1] + 1, d.position[2] + 1],
  metaData: { actualLabel: `${idx}` },
}));

const actualLabelsArray = Array.from(
  data.reduce((acc, d) => acc.add(d.metaData.actualLabel), new Set())
);

const labelCount = actualLabelsArray.length - 1;

const actualLabelsColorMap: Map<string, number> = actualLabelsArray.reduce(
  (acc: Map<string, number>, d, index) => {
    acc[d as string] = index / labelCount;
    return acc;
  },
  new Map() as Map<string, number>
);

const colorByFn = (data) => {
  const { actualLabel } = data.metaData;
  return interpolateSinebow(actualLabelsColorMap[actualLabel]);
};

const Template: Story<ThreeDimensionalCanvasProps> = (args) => (
  <Container>
    <ThreeDimensionalCanvas {...args} camera={{ position: [0, 0, 10] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[10, 10, -10]} />
      <pointLight position={[10, -10, -10]} />
      <pointLight position={[0, 0, 0]} />
      <ThreeDimensionalControls />
      <Points
        data={data as any}
        opacity={1}
        pointProps={{
          scale: 2,
          color: colorByFn,
        }}
      />
      <Points
        data={data2 as any}
        opacity={1}
        pointShape="cube"
        pointProps={{
          scale: 2,
          color: colorByFn,
        }}
      />
      <axesHelper />
    </ThreeDimensionalCanvas>
  </Container>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
