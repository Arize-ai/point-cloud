import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {
  TwoDimensionalCanvas,
  TwoDimensionalCanvasProps,
  Points,
  getTwoDimensionalBounds,
  TwoDimensionalBounds,
  TwoDimensionalPoint,
  PointBaseProps,
  TwoDimensionalControls,
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

const Template: StoryFn<TwoDimensionalCanvasProps> = (args) => (
  <Container showToolbar={false}>
    <TwoDimensionalCanvas camera={{ zoom: 30, up: [0, 0, 1] }} {...args}>
      <TwoDimensionalControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
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
    <Container showToolbar={false}>
      <TwoDimensionalCanvas camera={{ zoom: 30, up: [0, 0, 1] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <TwoDimensionalBounds bounds={bounds}>
          <TwoDimensionalControls />
          {/* @ts-ignore */}
          <Points data={data} pointProps={{ color: 'green' }} />
          {/* @ts-ignore */}
          <Points data={data2} pointProps={{ color: 'red' }} />
          <axesHelper />
        </TwoDimensionalBounds>
      </TwoDimensionalCanvas>
    </Container>
  );
};

export const Rerender = () => {
  const [primaryData, setPrimaryData] = React.useState<PointBaseProps[]>([]);
  const [secondaryData, setSecondaryData] = React.useState<PointBaseProps[]>(
    []
  );
  const bounds = React.useMemo(() => {
    return getTwoDimensionalBounds([
      ...(primaryData.map((d) => d.position) as TwoDimensionalPoint[]),
      ...(secondaryData.map((d) => d.position) as TwoDimensionalPoint[]),
    ]);
  }, [primaryData, secondaryData]);
  return (
    <Container showToolbar={false}>
      <button
        onClick={() => {
          setPrimaryData(data as PointBaseProps[]);
          setSecondaryData(data2 as PointBaseProps[]);
        }}
      >
        Load Data
      </button>
      <TwoDimensionalCanvas camera={{ zoom: 30, up: [0, 0, 1] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <TwoDimensionalBounds bounds={bounds}>
          <TwoDimensionalControls />
          <Points
            data={primaryData}
            pointProps={{
              color: 'green',
            }}
          />
          <Points data={secondaryData} pointProps={{ color: 'red' }} />
          <axesHelper />
        </TwoDimensionalBounds>
      </TwoDimensionalCanvas>
    </Container>
  );
};

Default.args = {};
