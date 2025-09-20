import { Injectable } from '@angular/core';
import { ReaderState } from '../models/reader';

const LOCALSTORAGE_STATE_KEY = 'reader.state';

@Injectable({ providedIn: 'root' })
export class SaveService {
  getSave() {
    const save = localStorage.getItem(LOCALSTORAGE_STATE_KEY);
    if (save) {
      return JSON.parse(save) as ReaderState;
    }
    return undefined;
  }

  setSave(data: ReaderState) {
    localStorage.setItem(LOCALSTORAGE_STATE_KEY, JSON.stringify(data));
  }
}
