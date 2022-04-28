import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  TwoDimensionalCanvas,
  TwoDimensionalControls,
  TwoDimensionalControlsProps,
  Points,
} from '../src';
import { Container } from './components';
import data from './data/point-cloud-2d.json';

const meta: Meta = {
  title: 'TwoDimensionalControls',
  component: TwoDimensionalControls,
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

const Template: Story<TwoDimensionalControlsProps> = (props) => (
  <Container>
    <TwoDimensionalCanvas initialCameraZoom={30}>
      <TwoDimensionalControls {...props} />
      {/* @ts-ignore */}
      <Points data={data} pointProps={{ color: 'aqua' }} />
    </TwoDimensionalCanvas>
  </Container>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
