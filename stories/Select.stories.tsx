import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import {
  TwoDimensionalCanvas,
  TwoDimensionalControls,
  Select,
  SelectProps,
  Points,
  TwoDimensionalBounds,
  getTwoDimensionalBounds,
} from '../src';
import { Container } from './components';
import data from './data/point-cloud-2d.json';
import data2 from './data/point-cloud-2d-alt.json';

const meta: Meta = {
  title: 'Select',
  component: Select,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

function PointCloudWithSelect(props: SelectProps) {
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
        <pointLight position={[10, 10, 10]} />
        <Select box multiple {...props}>
          <Points
            /* @ts-ignore */
            data={data}
            pointProps={{ color: 'aqua' }}
            selectedPointProps={{ color: 'DarkOrchid', scale: 2 }}
          />
          <Points
            /* @ts-ignore */
            data={data2}
            pointProps={{ color: 'MediumPurple' }}
            selectedPointProps={{ color: 'DarkOrchid', scale: 2 }}
          />
        </Select>
      </TwoDimensionalBounds>
    </TwoDimensionalCanvas>
  );
}

const Template: Story<SelectProps> = (props) => {
  const [selected, setSelected] = useState([]);
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Container>
        <PointCloudWithSelect
          {...props}
          onChange={(sel) => {
            setSelected(
              sel
                // @ts-ignore
                .map((s) => s?.metaData)
                .filter((m) => !!m)
                .map((m) => m.uuid)
            );
          }}
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
