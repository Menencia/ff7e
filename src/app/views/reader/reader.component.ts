import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook, faCog, faMusic } from '@fortawesome/free-solid-svg-icons';
import { Chapter, Highlight, Part } from 'src/app/shared/models/reader';
import { MusicService } from 'src/app/shared/services/music.service';
import { SaveService } from 'src/app/shared/services/save.service';

@Component({
  selector: 'app-reader',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './reader.component.html',
})
export class ReaderComponent implements OnInit {
  url?: number;
  data?: Chapter;
  currentPart?: Part;
  content = '';
  images: string[] = [];
  music?: string;
  glossary: Highlight[] = [];

  // icons
  faCog = faCog;
  faMusic = faMusic;
  faBook = faBook;

  constructor(
    private http: HttpClient,
    private musicService: MusicService,
    private saveService: SaveService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const chapter = this.route.snapshot.paramMap.get('chapter');
    if (!chapter) throw new Error('No chapter to read');
    this.url = +chapter;
    this.http
      .get<Chapter>(`assets/data/reader/chapter-${chapter}.json`)
      .subscribe((data) => {
        this.data = data;

        this.startReading();
      });
  }

  startReading() {
    let part = 0;

    const progress = this.saveService.getCurrentProgress();
    if (progress && progress?.chapter === this.url) {
      part = progress.part;
    }

    this.read(part);
  }

  private read(index: number) {
    // load data from previous parts
    if (index > 0) {
      this.images = this.getPreviousImages(index);
      this.music = this.getPreviousMusic(index);
    }
    if (this.url !== undefined) {
      this.saveService.setCurrentProgress({ chapter: this.url, part: index });
    }

    const part = this.data?.parts[index];
    if (!part) {
      throw new Error('Part not found in data');
    }
    this.currentPart = part;
    if (part.images) {
      this.images = part.images;
    }
    this.content = part.content;
    for (const highlight of part.highlights || []) {
      this.content = this.content.replace(
        new RegExp(`\\b(${highlight.word})\\b`, 'i'),
        `<span class="font-bold text-blue-600">$1</span>`,
      );
      this.glossary.push(highlight);
    }
    if (part.music) {
      this.music = part.music;
    }

    // loading music
    if (this.music) {
      if (!this.musicService.hasLoaded(this.music)) {
        this.musicService.stop();
        this.musicService.loadMusic(this.music);
      }
    }
  }

  getPreviousImages(index: number): string[] {
    if (this.data && index >= 0) {
      const { images } = this.data.parts[index];
      if (images) {
        return images;
      }
      return this.getPreviousImages(index - 1);
    }
    return [];
  }

  getPreviousMusic(index: number): string | undefined {
    if (this.data && index >= 0) {
      const { music } = this.data.parts[index];
      if (music) {
        return music;
      }
      return this.getPreviousMusic(index - 1);
    }
    return undefined;
  }

  previous() {
    if (this.currentPart && this.data) {
      const oldPartIndex = this.data.parts.indexOf(this.currentPart);

      if (typeof oldPartIndex !== 'undefined' && oldPartIndex - 1 >= 0) {
        this.read(oldPartIndex - 1);
      }
    }
  }

  next() {
    if (this.currentPart && this.data) {
      const oldPartIndex = this.data.parts.indexOf(this.currentPart);

      if (
        typeof oldPartIndex !== 'undefined' &&
        oldPartIndex + 1 < this.data.parts.length
      ) {
        this.read(oldPartIndex + 1);
      }
    }
  }

  getImageSrc(image: string) {
    return `assets/reader/${this.data?.infos.folder}/${image}`;
  }

  toggleMusic() {
    this.musicService.toggle();
  }

  isMusicActive() {
    return this.musicService.active;
  }

  previousButton() {
    if (this.data) {
      const firstPart = this.data.parts.at(0);
      return firstPart !== this.currentPart;
    }
    return false;
  }

  nextButton() {
    if (this.data) {
      const lastPart = this.data.parts.at(-1);
      return lastPart !== this.currentPart;
    }
    return false;
  }
}
