import React from 'react';
import * as ReactDOM from 'react-dom';
import { TwoDimensionalCanvas } from '../src';

describe('TwoDimensionalCanvas', () => {
  xit('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TwoDimensionalCanvas />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
