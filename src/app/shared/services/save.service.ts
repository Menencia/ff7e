import { Injectable } from '@angular/core';
import { Progress } from '../models/reader';
import { comparePositions } from '../utils/position.utils';

const CURRENT_PROGRESS = 'current-progress';
const MAX_PROGRESS = 'max-progress';

@Injectable({ providedIn: 'root' })
export class SaveService {
  getCurrentProgress() {
    const save = localStorage.getItem(CURRENT_PROGRESS);
    if (save) {
      return JSON.parse(save) as Progress;
    }
    return undefined;
  }

  getMaxProgress() {
    const save = localStorage.getItem(MAX_PROGRESS);
    if (save) {
      return JSON.parse(save) as Progress;
    }
    return undefined;
  }

  setCurrentProgress(progress: Progress) {
    localStorage.setItem(CURRENT_PROGRESS, JSON.stringify(progress));

    const maxProgress = this.getMaxProgress();
    if (!maxProgress || comparePositions(progress, '>', maxProgress)) {
      localStorage.setItem(MAX_PROGRESS, JSON.stringify(progress));
    }
  }
}
