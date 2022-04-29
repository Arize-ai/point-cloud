import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  TwoDimensionalCanvas,
  TwoDimensionalCanvasProps,
  Points,
} from '../src';
import { Container } from './components';
import data from './data/point-cloud-2d.json';
import data2 from './data/point-cloud-2d-alt.json';

const meta: Meta = {
  title: 'TwoDimensionalCanvas',
  component: TwoDimensionalCanvas,
  argTypes: {
    children: {
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

const Template: Story<TwoDimensionalCanvasProps> = (args) => (
  <Container>
    <TwoDimensionalCanvas initialCameraZoom={30} {...args}>
      {/* @ts-ignore */}
      <Points data={data} />
      {/* @ts-ignore */}
      <Points data={data2} pointProps={{ color: 'red' }} />
    </TwoDimensionalCanvas>
  </Container>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
