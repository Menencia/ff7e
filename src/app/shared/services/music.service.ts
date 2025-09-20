import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({ providedIn: 'root' })
export class MusicService {
  sound?: Howl;
  active = false;

  loadMusic() {
    this.sound = new Howl({
      src: ['assets/music/105-tifa-s-theme.mp3'],
    });
  }

  toggle() {
    if (this.sound?.playing()) {
      this.sound?.pause();
      this.active = false;
    } else {
      this.sound?.play();
      this.active = true;
    }
  }
}
