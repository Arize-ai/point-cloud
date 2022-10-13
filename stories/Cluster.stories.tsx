import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import {
  getThreeDimensionalBounds,
  Points,
  ThreeDimensionalCanvas,
  ThreeDimensionalBounds,
  ThreeDimensionalControls,
  Axes,
  LassoSelect,
  TwoDimensionalControls,
  getTwoDimensionalBounds,
  TwoDimensionalCanvas,
  TwoDimensionalBounds,
  Cluster,
} from '../src';
import { Container, ControlPanel, ToolName } from './components';
import data from './data/point-cloud-3d.json';
import twoDData from './data/point-cloud-2d.json';

const meta: Meta = {
  title: 'Cluster',
  component: Cluster,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

function ThreeDPointCloudWithSelect(props) {
  const selectedTool = props.selectedTool;
  const bounds = React.useMemo(() => {
    // @ts-ignore
    return getThreeDimensionalBounds([
      ...data.map((d) => d.position),
      // ...data2.map((d) => d.position),
    ]);
  }, []);

  return (
    <ThreeDimensionalCanvas camera={{ zoom: 1, up: [0, 0, 1] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 10]} />
      <LassoSelect
        /* @ts-ignore */
        points={[...data]}
        onChange={(selection) => {
          props.onChange(selection);
        }}
        enabled={selectedTool === 'select'}
      >
        <ThreeDimensionalControls enableRotate={selectedTool === 'move'} />
        <ThreeDimensionalBounds bounds={bounds}>
          <Axes size={bounds.maxX - bounds.minX} />
          <Points
            /* @ts-ignore */
            data={data}
            pointProps={{
              color: (p) => {
                if (props.selectedPoints.includes(p.metaData.uuid)) {
                  return '#40E0D0';
                } else if (props.selectedPoints.length) {
                  return '#216c64';
                }
                return '#40E0D0';
              },
            }}
            onPointClicked={(p) => {
              props.onChange([p]);
            }}
          />
          <Cluster
            /* @ts-ignore */
            data={data}
          />
        </ThreeDimensionalBounds>
      </LassoSelect>
    </ThreeDimensionalCanvas>
  );
}

const Template: Story = (props) => {
  const [selected, setSelected] = useState([]);
  const [tool, setTool] = useState<ToolName>('move');
  return (
    <div style={{ position: 'relative' }}>
      <Container showToolbar selectedTool={tool} onToolChange={setTool}>
        <ThreeDPointCloudWithSelect
          {...props}
          onChange={(sel) => {
            setSelected(sel.map((s) => s.metaData.uuid));
          }}
          selectedPoints={selected}
          selectedTool={tool}
        />
      </Container>
      <ControlPanel>
        <header>Selected Items</header>
        <ul>
          {selected.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </ControlPanel>
    </div>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});
