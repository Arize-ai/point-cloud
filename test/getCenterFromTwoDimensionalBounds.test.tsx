import {
  getTwoDimensionalBounds,
  getCenterFromTwoDimensionalBounds,
} from '../src/utils';

describe('getCenterFromTwoDimensionalBounds', () => {
  it('Should help compute the center of bounds', () => {
    const center = getCenterFromTwoDimensionalBounds(
      getTwoDimensionalBounds([
        [0, 0],
        [1, 1],
        [0, 3],
      ])
    );
    expect(center).toEqual([0.5, 1.5]);
  });
});
