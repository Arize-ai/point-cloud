import { getThreeDimensionalBounds } from '../src/utils/threeDimensionalUtils';

describe('getThreeDimensionalBounds', () => {
  it('Should get the extent of points', () => {
    const bounds = getThreeDimensionalBounds([
      [0, 0, 0],
      [1, 1, 1],
      [0, 3, -1],
    ]);
    expect(bounds).toEqual({
      maxX: 1,
      maxY: 3,
      minX: 0,
      minY: 0,
      minZ: -1,
      maxZ: 1,
    });
  });
});
