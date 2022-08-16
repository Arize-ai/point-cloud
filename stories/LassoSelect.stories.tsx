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
} from '../src';
import { Container, ControlPanel, ToolName } from './components';
import data from './data/point-cloud-3d.json';
import twoDData from './data/point-cloud-2d.json';

// const data = [
//   { metaData: { uuid: 1 }, position: [1, 1, 0] },
//   { metaData: { uuid: 2 }, position: [-1, 1, 0] },
// ];

// const twoDData = [
//   { metaData: { uuid: 1 }, position: [1, 1] },
//   { metaData: { uuid: 1 }, position: [-1, 1] },
// ];

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
          />
        </ThreeDimensionalBounds>
      </LassoSelect>
    </ThreeDimensionalCanvas>
  );
}

function TwoDPointCloudWithSelect(props) {
  const { selectedTool, selectedPoints } = props;
  const bounds = React.useMemo(() => {
    // @ts-ignore
    return getTwoDimensionalBounds([...twoDData.map((d) => d.position)]);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <TwoDimensionalCanvas camera={{ zoom: 1, up: [0, 0, 1] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 10]} />
        <TwoDimensionalControls />
        <LassoSelect
          /* @ts-ignore */
          points={twoDData}
          onChange={(selection) => {
            props.onChange(selection);
          }}
          enabled={selectedTool === 'select'}
        >
          <axesHelper />
          <TwoDimensionalBounds bounds={bounds}>
            <TwoDimensionalControls />
            <Points
              /* @ts-ignore */
              data={twoDData}
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
          </TwoDimensionalBounds>
        </LassoSelect>
      </TwoDimensionalCanvas>
    </div>
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
