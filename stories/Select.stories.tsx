import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import {
  TwoDimensionalCanvas,
  TwoDimensionalControls,
  Select,
  SelectProps,
  Points,
} from '../src';
import { Container } from './components';
import data from './data/point-cloud-2d.json';

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
  return (
    <TwoDimensionalCanvas initialCameraZoom={30}>
      <TwoDimensionalControls />
      <Select box multiple {...props}>
        <Points
          /* @ts-ignore */
          data={data}
          pointProps={{ color: 'aqua' }}
          selectedPointProps={{ color: 'DarkOrchid', scale: 2 }}
        />
      </Select>
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

Default.args = {};
