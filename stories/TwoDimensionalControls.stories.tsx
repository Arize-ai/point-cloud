import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {
  TwoDimensionalCanvas,
  TwoDimensionalControls,
  TwoDimensionalControlsProps,
  Points,
  getTwoDimensionalBounds,
  TwoDimensionalBounds,
  TwoDimensionalPoint,
  PointBaseProps,
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

const Template: StoryFn<TwoDimensionalControlsProps> = (
  props: TwoDimensionalControlsProps
) => {
  const bounds = React.useMemo(() => {
    return getTwoDimensionalBounds([
      ...data.map((d) => d.position as TwoDimensionalPoint),
      ...data2.map((d) => d.position as TwoDimensionalPoint),
    ]);
  }, []);
  return (
    <Container showToolbar={false}>
      <TwoDimensionalCanvas camera={{ zoom: 30, up: [0, 0, 1] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <TwoDimensionalBounds bounds={bounds}>
          <TwoDimensionalControls {...props} />
          <Points
            data={data as PointBaseProps[]}
            pointProps={{ color: 'aqua' }}
          />
          <Points
            data={data2 as PointBaseProps[]}
            pointProps={{ color: 'MediumPurple' }}
          />
          <axesHelper />
        </TwoDimensionalBounds>
      </TwoDimensionalCanvas>
      <axesHelper />
    </Container>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

export const WithBounds: StoryFn<TwoDimensionalControlsProps> = () => {
  const bounds = React.useMemo(() => {
    // @ts-ignore
    return getTwoDimensionalBounds([
      ...data.map((d) => d.position),
      ...data2.map((d) => d.position),
    ]);
  }, []);
  return (
    <Container showToolbar={false}>
      <TwoDimensionalCanvas camera={{ up: [0, 0, 1] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <TwoDimensionalBounds bounds={bounds}>
          <TwoDimensionalControls />
          <Points
            data={data as PointBaseProps[]}
            pointProps={{ color: 'aqua' }}
          />
          <Points
            data={data2 as PointBaseProps[]}
            pointProps={{ color: 'MediumPurple' }}
          />
          <axesHelper />
        </TwoDimensionalBounds>
      </TwoDimensionalCanvas>
      <axesHelper />
    </Container>
  );
};

export const ZoomDisabled: StoryFn<TwoDimensionalControlsProps> = () => {
  const bounds = React.useMemo(() => {
    // @ts-ignore
    return getTwoDimensionalBounds([
      ...data.map((d) => d.position),
      ...data2.map((d) => d.position),
    ]);
  }, []);
  return (
    <Container showToolbar={false}>
      <TwoDimensionalCanvas camera={{ up: [0, 0, 1] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
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
