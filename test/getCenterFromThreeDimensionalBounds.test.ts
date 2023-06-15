import {
  getThreeDimensionalBounds,
  getCenterFromThreeDimensionalBounds,
} from '../src/utils';

describe('getCenterFromThreeDimensionalBounds', () => {
  it('Should help compute the center of bounds', () => {
    const center = getCenterFromThreeDimensionalBounds(
      getThreeDimensionalBounds([
        [0, 0, 0],
        [1, 1, -1],
        [0, 3, 1],
      ])
    );
    expect(center).toEqual([0.5, 1.5, 0]);
  });
});
