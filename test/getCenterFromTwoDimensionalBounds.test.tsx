import {
  getTwoDimensionalBounds,
  getCenterFromTwoDimensionalBounds,
} from '../src';

describe('getCenterFromTwoDimensionalBounds', () => {
  it('Should help compute the center of bounds', () => {
    const center = getCenterFromTwoDimensionalBounds(
      getTwoDimensionalBounds([
        [0, 0],
        [1, 1],
        [0, 3],
      ])
    );
    expect(center).toMatchInlineSnapshot([0.5, 1.5]);
  });
});
