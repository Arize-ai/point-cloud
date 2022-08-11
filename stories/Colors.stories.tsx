import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  ThreeDimensionalCanvas,
  ThreeDimensionalControls,
  ThreeDimensionalBounds,
  getThreeDimensionalBounds,
  Points,
  ColorSchemes,
} from '../src';
import { Container } from './components';
import data from './data/point-cloud-3d.json';
import data2 from './data/point-cloud-3d-alt.json';

const meta: Meta = {
  title: 'Colors',
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

const data3 = data.map((d) => ({
  ...d,
  position: [d.position[0], d.position[1] + 1, d.position[2] + 2],
}));

export const Divergent = () => {
  const bounds = React.useMemo(() => {
    // @ts-ignore
    return getThreeDimensionalBounds([
      ...data.map((d) => d.position),
      ...data3.map((d) => d.position),
    ]);
  }, []);
  return (
    <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.keys(ColorSchemes.Discrete2).map((scheme, index) => (
        <ul key={index} style={{ padding: 5 }}>
          <span>{scheme}</span>
          <Container showToolbar={false} width={400} height={300}>
            <ThreeDimensionalCanvas>
              <ThreeDimensionalControls enableZoom={false} />
              <axesHelper />
              <pointLight position={[10, 10, 10]} />
              <pointLight position={[10, -10, 10]} />
              <ThreeDimensionalBounds bounds={bounds}>
                {/* @ts-ignore */}
                <Points
                  data={data}
                  pointProps={{ color: ColorSchemes.Discrete2[scheme][0] }}
                />
                {/* @ts-ignore */}
                <Points
                  data={data3}
                  pointProps={{ color: ColorSchemes.Discrete2[scheme][1] }}
                />
                <axesHelper />
              </ThreeDimensionalBounds>
            </ThreeDimensionalCanvas>
          </Container>
        </ul>
      ))}
    </ul>
  );
};
