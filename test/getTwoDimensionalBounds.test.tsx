import { getTwoDimensionalBounds } from '../src';

describe('getTwoDimensionalBounds', () => {
  it('Should get the extent of points', () => {
    const bounds = getTwoDimensionalBounds([
      [0, 0],
      [1, 1],
      [0, 3],
    ]);
    expect(bounds).toEqual({
      maxX: 1,
      maxY: 3,
      minX: 0,
      minY: 0,
    });
  });
});
