import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({ providedIn: 'root' })
export class MusicService {
  sound?: Howl;
  name?: string;
  active = false;

  loadMusic(name: string) {
    this.sound = new Howl({
      src: [`assets/music/${name}`],
    });
    this.name = name;
  }

  hasLoaded(name: string) {
    return this.name === name;
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
    if (this.sound?.playing()) {
      this.sound?.pause();
      this.active = false;
    }
  }

  stop() {
    this.sound?.stop();
    this.active = false;
  }
}
