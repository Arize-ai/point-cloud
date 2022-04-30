import { getTwoDimensionalBounds } from '../src';

describe('getTwoDimensionalBounds', () => {
  it('Should get the extent of points', () => {
    const bounds = getTwoDimensionalBounds([
      [0, 0],
      [1, 1],
    ]);
    expect(bounds).toMatchInlineSnapshot();
  });
});
