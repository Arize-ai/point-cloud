import { isPointInsidePolygon } from '../src/utils/twoDimensionalUtils';

describe('isPointInsidePolygon', () => {
  it('Should detect points within a polygon', () => {
    expect(
      isPointInsidePolygon(
        [0, 1],
        [
          [0, 0],
          [1, 1],
          [0, 3],
        ]
      )
    ).toBeTruthy();
    expect(
      isPointInsidePolygon(
        [0.5, 1],
        [
          [0, 0],
          [1, 1],
          [0, 3],
        ]
      )
    ).toBeTruthy();
    expect(
      isPointInsidePolygon(
        [0, 2.8],
        [
          [0, 0],
          [1, 1],
          [0, 3],
        ]
      )
    ).toBeTruthy();
  });
  it('Should detect points outside the polygon', () => {
    expect(
      isPointInsidePolygon(
        [-1, 0],
        [
          [0, 0],
          [1, 1],
          [0, 3],
        ]
      )
    ).toBeFalsy();
    expect(
      isPointInsidePolygon(
        [0.5, -1],
        [
          [0, 0],
          [1, 1],
          [0, 3],
        ]
      )
    ).toBeFalsy();
    expect(
      isPointInsidePolygon(
        [0, 3.1],
        [
          [0, 0],
          [1, 1],
          [0, 3],
        ]
      )
    ).toBeFalsy();
  });
});
