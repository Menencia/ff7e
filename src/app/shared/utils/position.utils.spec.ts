import { comparePositions } from './position.utils';

describe('Position Utils', () => {
  it('should compare positions when left = right', () => {
    expect(
      comparePositions({ chapter: 1, position: 1 }, '=', {
        chapter: 1,
        position: 1,
      }),
    ).toBe(true);
  });

  it('should compare positions when left < right', () => {
    expect(
      comparePositions({ chapter: 1, position: 1 }, '<', {
        chapter: 1,
        position: 2,
      }),
    ).toBe(true);
    expect(
      comparePositions({ chapter: 1, position: 1 }, '<', {
        chapter: 2,
        position: 2,
      }),
    ).toBe(true);
  });

  it('should compare positions when left > right', () => {
    expect(
      comparePositions({ chapter: 1, position: 2 }, '>', {
        chapter: 1,
        position: 1,
      }),
    ).toBe(true);
    expect(
      comparePositions({ chapter: 2, position: 1 }, '>', {
        chapter: 1,
        position: 1,
      }),
    ).toBe(true);
  });
});
