import { Progress } from '../models/reader';

export function comparePositions(
  left: Progress,
  operator: '<' | '>' | '=',
  right: Progress,
) {
  if (operator === '=') {
    return left.chapter === right.chapter && left.part === right.part;
  }
  if (operator === '>') {
    if (left.chapter === right.chapter) {
      return left.part > right.part;
    }
    return left.chapter > right.chapter;
  }
  if (operator === '<') {
    if (left.chapter === right.chapter) {
      return left.part < right.part;
    }
    return left.chapter < right.chapter;
  }
  throw new Error(`Positions unknown operator: ${operator}`);
}
