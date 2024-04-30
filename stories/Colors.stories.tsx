import React from 'react';
import { Meta } from '@storybook/react';
import {
  ThreeDimensionalCanvas,
  ThreeDimensionalControls,
  ThreeDimensionalBounds,
  getThreeDimensionalBounds,
  Points,
  ColorSchemes,
  PointBaseProps,
  ThreeDimensionalPoint,
} from '../src';
import { Container } from './components';
import data from './data/point-cloud-3d.json';

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
    return getThreeDimensionalBounds([
      ...(data.map((d) => d.position) as ThreeDimensionalPoint[]),
      ...(data3.map((d) => d.position) as ThreeDimensionalPoint[]),
    ]);
  }, []);
  return (
    <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.keys(ColorSchemes.Discrete2).map((scheme, index) => (
        <ul key={index} style={{ padding: 5 }}>
          <span>{scheme}</span>
          <Container showToolbar={false} width={400} height={400}>
            <ThreeDimensionalCanvas>
              <ThreeDimensionalControls enableZoom={true} autoRotate />
              <axesHelper />
              <pointLight position={[10, 10, 10]} />
              <pointLight position={[10, -10, 10]} />
              <ThreeDimensionalBounds bounds={bounds}>
                <Points
                  data={data as PointBaseProps[]}
                  pointProps={{
                    color:
                      ColorSchemes.Discrete2[
                        scheme as keyof typeof ColorSchemes.Discrete2
                      ][0],
                  }}
                />
                {/* @ts-ignore */}
                <Points
                  data={data3 as PointBaseProps[]}
                  pointProps={{
                    color:
                      ColorSchemes.Discrete2[
                        scheme as keyof typeof ColorSchemes.Discrete2
                      ][1],
                  }}
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
