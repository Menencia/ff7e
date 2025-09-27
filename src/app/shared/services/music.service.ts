import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({ providedIn: 'root' })
export class MusicService {
  sound?: Howl;
  name?: string;
  volume = 1;
  active = false;

  loadMusic(name: string) {
    this.sound = new Howl({
      src: [`assets/music/${name}`],
      volume: this.volume,
    });
    this.name = name;
  }

  hasLoaded(name: string) {
    return this.name === name;
  }

  toggle() {
    if (!this.sound) throw new Error('Music not loaded');
    if (this.sound.playing()) {
      this.sound.pause();
      this.active = false;
    } else {
      this.sound.play();
      this.active = true;
    }
  }

  setActive(state: boolean) {
    if (!this.sound) throw new Error('Music not loaded');
    if (!state) {
      this.sound.pause();
      this.active = false;
    } else {
      this.sound.play();
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

  setVolume(vol: number) {
    if (!this.sound) throw new Error('Music not loaded');
    this.sound.volume(vol);
    this.volume = vol;
  }
}
