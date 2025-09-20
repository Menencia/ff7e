import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCog, faMusic } from '@fortawesome/free-solid-svg-icons';
import {
  Chapter,
  Highlight,
  Part,
  ReaderState,
} from 'src/app/shared/models/reader';
import { MusicService } from 'src/app/shared/services/music.service';
import { SaveService } from 'src/app/shared/services/save.service';

@Component({
  selector: 'app-reader',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './reader.component.html',
})
export class ReaderComponent implements OnInit {
  data?: Chapter;
  currentPart?: Part;
  images: string[] = [];
  content = '';
  previousButton = false;
  nextButton = true;
  showOptions = false;
  faCog = faCog;
  faMusic = faMusic;
  glossary: Highlight[] = [];
  url = '';

  constructor(
    private http: HttpClient,
    private musicService: MusicService,
    private saveService: SaveService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.url = this.route.snapshot.paramMap.get('chapter') ?? '';
    this.http
      .get<Chapter>(`assets/data/reader/${this.url}.json`)
      .subscribe((data) => {
        this.data = data;

        this.startReading();
      });
  }

  startReading() {
    if (this.data) {
      let index = 0;

      const save = this.saveService.getSave();
      if (save && save.url === this.url) {
        index = save.index;
      }

      this.read(index);
    }
  }

  private read(index: number, readPreviousParts = true) {
    // replay previous parts
    if (readPreviousParts) {
      if (index > 0) {
        for (let i = 0; i < index; i++) {
          this.read(i, false);
        }
      }
      this.saveProgress({ url: this.url, index });
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
      this.musicService.loadMusic(part.music);
    }
    if (part.stopMusic) {
      this.musicService.pause();
    }
  }

  next() {
    if (this.currentPart && this.data) {
      const oldPartIndex = this.data?.parts.indexOf(this.currentPart);

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

  saveProgress(readerState: ReaderState) {
    this.saveService.setSave(readerState);
  }
}
