import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  ThreeDimensionalCanvas,
  ThreeDimensionalCanvasProps,
  ThreeDimensionalControls,
  ThreeDimensionalBounds,
  getThreeDimensionalBounds,
  Points,
} from '../src';
import { Container } from './components';
import data from './data/point-cloud-3d.json';
import { interpolateSpectral } from 'd3-scale-chromatic';

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

const actualLabelsSet = data.reduce(
  (acc, d) => acc.add(d.metaData.actualLabel),
  new Set()
);
const actualLabels = Array.from(actualLabelsSet);

const Template: Story<ThreeDimensionalCanvasProps> = (args) => (
  <Container>
    <ThreeDimensionalCanvas {...args} camera={{ position: [0, 0, 10] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <ThreeDimensionalControls />
      <Points
        // @ts-ignore
        data={data}
        pointProps={{
          color: (data) => {
            const { actualLabel } = data.metaData;
            const index = actualLabels.indexOf(actualLabel);
            return interpolateSpectral(index / actualLabels.length);
          },
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
