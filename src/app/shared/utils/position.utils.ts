import { Progress } from '../models/reader';

export function comparePositions(
  left: Progress,
  operator: '<' | '>' | '=',
  right: Progress,
) {
  if (operator === '=') {
    return left.chapter === right.chapter && left.position === right.position;
  }
  if (operator === '>') {
    if (left.chapter === right.chapter) {
      return left.position > right.position;
    }
    return left.chapter > right.chapter;
  }
  if (operator === '<') {
    if (left.chapter === right.chapter) {
      return left.position < right.position;
    }
    return left.chapter < right.chapter;
  }
  throw new Error(`Positions unknown operator: ${operator}`);
}
