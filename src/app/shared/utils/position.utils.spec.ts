import { comparePositions } from './position.utils';

describe('Position Utils', () => {
  it('should compare positions when left = right', () => {
    expect(
      comparePositions({ chapter: 1, part: 1 }, '=', { chapter: 1, part: 1 }),
    ).toBe(true);
  });

  it('should compare positions when left < right', () => {
    expect(
      comparePositions({ chapter: 1, part: 1 }, '<', { chapter: 1, part: 2 }),
    ).toBe(true);
    expect(
      comparePositions({ chapter: 1, part: 1 }, '<', { chapter: 2, part: 2 }),
    ).toBe(true);
  });

  it('should compare positions when left > right', () => {
    expect(
      comparePositions({ chapter: 1, part: 2 }, '>', { chapter: 1, part: 1 }),
    ).toBe(true);
    expect(
      comparePositions({ chapter: 2, part: 1 }, '>', { chapter: 1, part: 1 }),
    ).toBe(true);
  });
});
