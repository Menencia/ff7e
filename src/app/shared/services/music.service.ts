import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({ providedIn: 'root' })
export class MusicService {
  sound?: Howl;
  active = false;

  loadMusic(music: string) {
    this.sound = new Howl({
      src: [`assets/music/${music}`],
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

  pause() {
    this.sound?.pause();
    this.active = false;
  }
}
