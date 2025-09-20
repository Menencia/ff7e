import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCog, faMusic } from '@fortawesome/free-solid-svg-icons';
import { MusicService } from 'src/app/shared/services/music.service';
import { OptionsModalComponent } from 'src/app/shared/ui/options-modal/options-modal.component';

interface Chapter {
  infos: {
    title: string;
    folder: string;
  };
  parts: Part[];
}

interface Part {
  content: string;
  music: string;
  images: string[];
  highlights: {
    word: string;
    type: string;
  }[];
}

@Component({
  selector: 'app-reader',
  imports: [OptionsModalComponent, FontAwesomeModule],
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
  constructor(
    private http: HttpClient,
    private musicService: MusicService,
  ) {}

  ngOnInit() {
    this.http
      .get<Chapter>('/assets/data/reader/chapter-0.json')
      .subscribe((data) => {
        this.data = data;

        this.startReading();
      });
  }

  startReading() {
    if (this.data) {
      this.read(this.data.parts[0]);
    }
  }

  private read(part: Part) {
    this.currentPart = part;
    if (part.images) {
      this.images = part.images;
    }
    this.content = part.content;
    for (const highlight of part.highlights) {
      this.content = this.content.replace(
        new RegExp(`\\b(${highlight.word})\\b`, 'i'),
        `<span class="font-bold text-blue-600">$1</span>`,
      );
    }
    this.musicService.loadMusic();
  }

  next() {
    if (this.currentPart && this.data) {
      const oldPartIndex = this.data?.parts.indexOf(this.currentPart);

      if (
        typeof oldPartIndex !== 'undefined' &&
        oldPartIndex + 1 < this.data.parts.length
      ) {
        this.read(this.data.parts[oldPartIndex + 1]);
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
}
