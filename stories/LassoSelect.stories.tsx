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
} from '../src';
import { Container, ToolName } from './components';
import data from './data/point-cloud-3d.json';

const meta: Meta = {
  title: 'LassoSelect',
  component: LassoSelect,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

function PointCloudWithSelect(props) {
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
      <TwoDimensionalControls enablePan={false} />
      <LassoSelect
        /* @ts-ignore */
        points={[...data]}
        onChange={(selection) => {
          props.onChange(selection);
        }}
        enabled={selectedTool === 'select'}
      >
        <ThreeDimensionalBounds bounds={bounds}>
          <ThreeDimensionalControls enabled={selectedTool === 'move'} />
          <Axes size={bounds.maxX - bounds.minX} />
          <Points
            /* @ts-ignore */
            data={data}
            pointProps={{ color: '#40E0D0' }}
            selectedPointProps={{ color: 'orange' }}
            isPointSelected={(p) =>
              props.selectedPoints.includes(p.metaData.uuid)
            }
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
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Container showToolbar selectedTool={tool} onToolChange={setTool}>
        <PointCloudWithSelect
          {...props}
          onChange={(sel) => {
            setSelected(sel.map((s) => s.metaData.uuid));
          }}
          selectedPoints={selected}
          selectedTool={tool}
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
