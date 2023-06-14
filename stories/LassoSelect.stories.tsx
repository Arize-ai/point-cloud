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
  PointBaseProps,
  ThreeDimensionalPoint,
  TwoDimensionalPoint,
} from '../src';
import { Container, ControlPanel, ToolName } from './components';
import _data from './data/point-cloud-3d.json';
import _twoDData from './data/point-cloud-2d.json';

const data = _data as unknown as Array<PointBaseProps>;
const twoDData = _twoDData as unknown as Array<PointBaseProps>;

const meta: Meta = {
  title: 'LassoSelect',
  component: LassoSelect,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

function ThreeDPointCloudWithSelect(props) {
  const selectedTool = props.selectedTool;
  const bounds = React.useMemo(() => {
    return getThreeDimensionalBounds([
      ...data.map((d) => d.position as ThreeDimensionalPoint),
    ]);
  }, []);

  return (
    <ThreeDimensionalCanvas camera={{ zoom: 1, up: [0, 0, 1] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 10]} />
      <LassoSelect
        points={data}
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
          />
          <Cluster data={data} />
        </ThreeDimensionalBounds>
      </LassoSelect>
    </ThreeDimensionalCanvas>
  );
}

function TwoDPointCloudWithSelect(props) {
  const { selectedTool, selectedPoints } = props;
  const bounds = React.useMemo(() => {
    return getTwoDimensionalBounds([
      ...twoDData.map((d) => d.position as TwoDimensionalPoint),
    ]);
  }, []);

  return (
    <TwoDimensionalCanvas camera={{ zoom: 30, up: [0, 0, 1] }}>
      <TwoDimensionalBounds bounds={bounds}>
        <TwoDimensionalControls enabled={selectedTool === 'move'} />
        <LassoSelect
          points={twoDData}
          onChange={(selection) => {
            props.onChange(selection);
          }}
          enabled={selectedTool === 'select'}
        />
        <axesHelper />
        <Points
          data={twoDData}
          pointProps={{
            color: (p) => {
              if (selectedPoints.includes(p.metaData.uuid)) {
                return '#40E0D0';
              } else if (props.selectedPoints.length) {
                return '#216c64';
              }
              return '#40E0D0';
            },
          }}
        />
      </TwoDimensionalBounds>
    </TwoDimensionalCanvas>
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

export const MultipleCanvases = () => {
  const [selected, setSelected] = useState([]);
  const [tool, setTool] = useState<ToolName>('move');
  return (
    <div>
      <Container
        showToolbar
        selectedTool={tool}
        onToolChange={setTool}
        width={500}
        height={200}
      >
        <ThreeDPointCloudWithSelect
          onChange={(sel) => {
            debugger;
            setSelected(sel.map((s) => s.metaData.uuid));
          }}
          selectedPoints={selected}
          selectedTool={tool}
        />
      </Container>
      <Container
        showToolbar
        selectedTool={tool}
        onToolChange={setTool}
        width={500}
        height={200}
      >
        <ThreeDPointCloudWithSelect
          onChange={(sel) => {
            debugger;
            setSelected(sel.map((s) => s.metaData.uuid));
          }}
          selectedPoints={selected}
          selectedTool={tool}
        />
      </Container>
    </div>
  );
};

export const TwoDimensional = () => {
  const [selected, setSelected] = useState([]);
  const [tool, setTool] = useState<ToolName>('move');
  return (
    <div>
      <Container
        showToolbar
        selectedTool={tool}
        onToolChange={setTool}
        width={800}
        height={800}
      >
        <TwoDPointCloudWithSelect
          onChange={(sel) => {
            setSelected(sel.map((s) => s.metaData.uuid));
          }}
          selectedPoints={selected}
          selectedTool={tool}
        />
      </Container>
    </div>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});
