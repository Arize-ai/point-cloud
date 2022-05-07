import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  TwoDimensionalCanvas,
  TwoDimensionalControls,
  TwoDimensionalControlsProps,
  Points,
  getTwoDimensionalBounds,
  TwoDimensionalBounds,
} from '../src';
import { Container } from './components';
import data from './data/point-cloud-2d.json';
import data2 from './data/point-cloud-2d-alt.json';

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

const Template: Story<TwoDimensionalControlsProps> = (props) => {
  const bounds = React.useMemo(() => {
    // @ts-ignore
    return getTwoDimensionalBounds([
      ...data.map((d) => d.position),
      ...data2.map((d) => d.position),
    ]);
  }, []);
  return (
    <Container>
      <TwoDimensionalCanvas camera={{ zoom: 30, up: [0, 0, 1] }}>
        <TwoDimensionalControls {...props} />
        {/* @ts-ignore */}
        <Points data={data} pointProps={{ color: 'aqua' }} />
        {/* @ts-ignore */}
        <Points data={data2} pointProps={{ color: 'MediumPurple' }} />
        <axesHelper />
      </TwoDimensionalCanvas>
      <axesHelper />
    </Container>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

export const WithBounds: Story<TwoDimensionalControlsProps> = () => {
  const bounds = React.useMemo(() => {
    // @ts-ignore
    return getTwoDimensionalBounds([
      ...data.map((d) => d.position),
      ...data2.map((d) => d.position),
    ]);
  }, []);
  return (
    <Container>
      <TwoDimensionalCanvas camera={{ up: [0, 0, 1] }}>
        <TwoDimensionalBounds bounds={bounds}>
          <TwoDimensionalControls />
          {/* @ts-ignore */}
          <Points data={data} pointProps={{ color: 'aqua' }} />
          {/* @ts-ignore */}
          <Points data={data2} pointProps={{ color: 'MediumPurple' }} />
          <axesHelper />
        </TwoDimensionalBounds>
      </TwoDimensionalCanvas>
      <axesHelper />
    </Container>
  );
};

export const ZoomDisabled: Story<TwoDimensionalControlsProps> = () => {
  const bounds = React.useMemo(() => {
    // @ts-ignore
    return getTwoDimensionalBounds([
      ...data.map((d) => d.position),
      ...data2.map((d) => d.position),
    ]);
  }, []);
  return (
    <Container>
      <TwoDimensionalCanvas camera={{ up: [0, 0, 1] }}>
        <TwoDimensionalBounds bounds={bounds}>
          <TwoDimensionalControls enableZoom={false} />
          {/* @ts-ignore */}
          <Points data={data} pointProps={{ color: 'aqua' }} />
          {/* @ts-ignore */}
          <Points data={data2} pointProps={{ color: 'MediumPurple' }} />
          <axesHelper />
        </TwoDimensionalBounds>
      </TwoDimensionalCanvas>
      <axesHelper />
    </Container>
  );
};
