import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  TwoDimensionalCanvas,
  TwoDimensionalCanvasProps,
  Points,
  getTwoDimensionalBounds,
  TwoDimensionalBounds,
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

const Template: Story<TwoDimensionalCanvasProps> = (args) => (
  <Container>
    <TwoDimensionalCanvas camera={{ zoom: 30 }} {...args}>
      {/* @ts-ignore */}
      <Points data={data} />
      {/* @ts-ignore */}
      <Points data={data2} pointProps={{ color: 'red' }} />
      <axesHelper />
    </TwoDimensionalCanvas>
  </Container>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

export const WithBounds = () => {
  const bounds = React.useMemo(() => {
    // @ts-ignore
    return getTwoDimensionalBounds([
      ...data.map((d) => d.position),
      ...data2.map((d) => d.position),
    ]);
  }, []);
  return (
    <Container>
      <TwoDimensionalCanvas>
        <TwoDimensionalBounds bounds={bounds}>
          {/* @ts-ignore */}
          <Points data={data} />
          {/* @ts-ignore */}
          <Points data={data2} pointProps={{ color: 'red' }} />
          <axesHelper />
        </TwoDimensionalBounds>
      </TwoDimensionalCanvas>
    </Container>
  );
};

Default.args = {};
