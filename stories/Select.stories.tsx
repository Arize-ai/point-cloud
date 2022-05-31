import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import {
  TwoDimensionalCanvas,
  TwoDimensionalControls,
  TwoDimensionalBounds,
  getTwoDimensionalBounds,
  Points,
} from '../src';
import { Container } from './components';
import data from './data/point-cloud-2d.json';
import data2 from './data/point-cloud-2d-alt.json';

const meta: Meta = {
  title: 'Select',
  component: Points,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

function PointCloudWithSelect(props) {
  const bounds = React.useMemo(() => {
    // @ts-ignore
    return getTwoDimensionalBounds([
      ...data.map((d) => d.position),
      ...data2.map((d) => d.position),
    ]);
  }, []);

  return (
    <TwoDimensionalCanvas camera={{ zoom: 30, up: [0, 0, 1] }}>
      <TwoDimensionalBounds bounds={bounds}>
        <TwoDimensionalControls />
        <pointLight position={[50, 50, 50]} />

        <Points
          /* @ts-ignore */
          data={data}
          pointProps={{ color: '#40E0D0' }}
          selectedPointProps={{ color: 'DarkOrchid', scale: 2 }}
          onPointClicked={(point) => {
            props.onChange(point);
          }}
          isPointSelected={(point) => {
            if (props.selectedPoints.length) {
              debugger;
            }
            return props.selectedPoints.includes(point.metaData.uuid);
          }}
        />
      </TwoDimensionalBounds>
    </TwoDimensionalCanvas>
  );
}

const Template: Story = (props) => {
  const [selected, setSelected] = useState([]);
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Container>
        <PointCloudWithSelect
          {...props}
          onChange={(sel) => {
            setSelected([sel.metaData.uuid]);
          }}
          selectedPoints={selected}
        />
      </Container>
      <aside>
        <header>Selected Items</header>
        <ul>
          {selected.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});
