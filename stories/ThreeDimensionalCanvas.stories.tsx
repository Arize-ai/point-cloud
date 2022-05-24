import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  ThreeDimensionalCanvas,
  ThreeDimensionalCanvasProps,
  ThreeDimensionalControls,
  Points,
} from '../src';
import { Container } from './components';
import data from './data/point-cloud-3d.json';
import data2 from './data/point-cloud-3d-alt.json';

const meta: Meta = {
  title: 'ThreeDimensionalCanvas',
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

const Template: Story<ThreeDimensionalCanvasProps> = (args) => (
  <Container>
    <ThreeDimensionalCanvas {...args} camera={{ position: [0, 0, 10] }}>
      <pointLight position={[10, 10, 10]} />
      <ThreeDimensionalControls />
      {/* @ts-ignore */}
      <Points data={data} pointProps={{ color: 'aqua' }} />
      {/* @ts-ignore */}
      <Points data={data2} pointProps={{ color: 'MediumPurple' }} />
      <axesHelper />
    </ThreeDimensionalCanvas>
  </Container>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};