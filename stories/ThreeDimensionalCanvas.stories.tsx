import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  ThreeDimensionalCanvas,
  ThreeDimensionalCanvasProps,
  ThreeDimensionalControls,
  ThreeDimensionalBounds,
  getThreeDimensionalBounds,
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
      <Points data={data} pointProps={{ color: '#7BFFFF' }} />
      {/* @ts-ignore */}
      <Points data={data2} pointProps={{ color: '#BF9FFF' }} />
      <axesHelper />
    </ThreeDimensionalCanvas>
  </Container>
);

export const WithBounds = () => {
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
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[10, -10, 10]} />
        <ThreeDimensionalBounds bounds={bounds}>
          <Points
            // @ts-ignore
            data={data2}
            pointShape="cube"
            pointProps={{ color: 'purple' }}
          />
          {/* @ts-ignore */}
          <Points data={data} pointProps={{ color: '#7BFFFF' }} />
          <axesHelper />
        </ThreeDimensionalBounds>
      </ThreeDimensionalCanvas>
    </Container>
  );
};

const data3 = data.map((d) => ({
  ...d,
  position: [d.position[0], d.position[1], d.position[2] + 2],
}));

export const OverlappingColors = () => {
  const bounds = React.useMemo(() => {
    // @ts-ignore
    return getThreeDimensionalBounds([
      ...data.map((d) => d.position),
      ...data3.map((d) => d.position),
    ]);
  }, []);
  return (
    <Container>
      <ThreeDimensionalCanvas>
        <ThreeDimensionalControls />
        <axesHelper />
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[10, -10, 10]} />
        <ThreeDimensionalBounds bounds={bounds}>
          {/* @ts-ignore */}
          <Points data={data} pointProps={{ color: '#7BFFFF' }} />
          {/* @ts-ignore */}
          <Points data={data3} pointProps={{ color: '#BF9FFF' }} />
          <axesHelper />
        </ThreeDimensionalBounds>
      </ThreeDimensionalCanvas>
    </Container>
  );
};

export const AutoRotateOnInit = () => {
  const [autoRotate, setAutoRotate] = React.useState<boolean>(true);
  const bounds = React.useMemo(() => {
    // @ts-ignore
    return getThreeDimensionalBounds([
      ...data.map((d) => d.position),
      ...data3.map((d) => d.position),
    ]);
  }, []);
  return (
    <Container>
      <ThreeDimensionalCanvas>
        <ThreeDimensionalControls
          autoRotate={autoRotate}
          onEnd={(e) => {
            console.log(e?.type);
            setAutoRotate(false);
          }}
        />
        <axesHelper />
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[10, -10, 10]} />
        <ThreeDimensionalBounds bounds={bounds}>
          {/* @ts-ignore */}
          <Points data={data} pointProps={{ color: '#7BFFFF' }} />
          {/* @ts-ignore */}
          <Points data={data3} pointProps={{ color: '#BF9FFF' }} />
          <axesHelper />
        </ThreeDimensionalBounds>
      </ThreeDimensionalCanvas>
    </Container>
  );
};

export const OrthographicCamera = () => {
  const bounds = React.useMemo(() => {
    // @ts-ignore
    return getThreeDimensionalBounds([
      ...data.map((d) => d.position),
      ...data2.map((d) => d.position),
    ]);
  }, []);
  return (
    <Container>
      <ThreeDimensionalCanvas orthographic>
        <ambientLight />
        <ThreeDimensionalControls />
        <axesHelper />
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[10, -10, 10]} />
        <ThreeDimensionalBounds bounds={bounds}>
          <Points
            // @ts-ignore
            data={data2}
            pointShape="cube"
            pointProps={{ color: '#BF9FFF' }}
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
