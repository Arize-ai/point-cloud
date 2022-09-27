import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  ThreeDimensionalCanvas,
  ThreeDimensionalControls,
  ThreeDimensionalBounds,
  getThreeDimensionalBounds,
  Points,
  Cluster,
} from '../src';
import { Container } from './components';
import data from './data/point-cloud-3d.json';
import data2 from './data/point-cloud-3d-alt.json';

const meta: Meta = {
  title: 'Cluster',
  component: Cluster,
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

const Template = () => {
  const bounds = React.useMemo(() => {
    // @ts-ignore
    return getThreeDimensionalBounds([
      ...data.map((d) => d.position),
      ...data2.map((d) => d.position),
    ]);
  }, []);
  return (
    <Container>
      <ThreeDimensionalCanvas>
        <ambientLight />
        <ThreeDimensionalControls />
        <axesHelper />

        <ThreeDimensionalBounds bounds={bounds}>
          <Points
            // @ts-ignore
            data={data2}
            pointShape="cube"
            pointProps={{ color: 'purple' }}
          />
          <Cluster
            // @ts-ignore
            data={data2}
            pointShape="sphere"
            color={'green'}
          />
          {/* @ts-ignore */}
          <Points data={data} pointProps={{ color: '#7BFFFF' }} />
          <axesHelper />
        </ThreeDimensionalBounds>
      </ThreeDimensionalCanvas>
    </Container>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
