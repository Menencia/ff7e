import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faBook,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { Chapter, Highlight, Part } from 'src/app/shared/models/reader';
import { MusicService } from 'src/app/shared/services/music.service';
import { SaveService } from 'src/app/shared/services/save.service';
import { Theme } from 'src/app/shared/services/theme.service';
import TextPanelComponent from 'src/app/shared/ui/text-panel/text-panel.component';
import ThemeButtonComponent from 'src/app/shared/ui/theme-button/theme-button.component';

@Component({
  selector: 'app-reader',
  imports: [
    FontAwesomeModule,
    RouterLink,
    ScrollPanelModule,
    TextPanelComponent,
    ThemeButtonComponent,
  ],
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
  autoPlay = false;
  position = 0;
  theme?: Theme;

  // icons
  faCog = faCog;
  faBook = faBook;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  @ViewChild('test2') test2?: ElementRef;

  constructor(
    private http: HttpClient,
    private musicService: MusicService,
    private saveService: SaveService,
    private route: ActivatedRoute,
  ) {}

  @HostListener('document:visibilitychange', ['$event'])
  appVisibility() {
    if (document.hidden && this.musicService.active) {
      this.autoPlay = true;
      this.musicService.pause();
    } else if (!document.hidden && this.autoPlay) {
      this.autoPlay = false;
      this.musicService.setActive(true);
    }
  }

  ngOnInit() {
    const chapter = this.route.snapshot.paramMap.get('chapter');
    if (!chapter) throw new Error('No chapter to read');
    this.url = +chapter;
    this.http
      .get(`assets/data/reader/chapter-${chapter}.txt`, {
        responseType: 'text',
      })
      .subscribe((data) => {
        this.content = this.parse(data);
      });
  }

  parse(data: string) {
    let content = data
      .split(/\r?\n/)
      .map((e) => `<p>${e}</p>`)
      .join('');

    const highlights: Highlight[] = [{ word: 'nibelheim', type: 'location' }];
    for (const highlight of highlights) {
      content = content.replace(
        new RegExp(`\\b(${highlight.word})\\b`, 'i'),
        (_match, p1: string) =>
          `<a href="reader/glossary/${p1.toLowerCase()}" class="font-bold text-blue-600">${p1}</a>`,
      );
    }

    return content;
  }

  updateProgress(event: number) {
    this.position = event;
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

  previous(event: PointerEvent) {
    event.preventDefault();
    if (this.currentPart && this.data) {
      const oldPartIndex = this.data.parts.indexOf(this.currentPart);

      if (typeof oldPartIndex !== 'undefined' && oldPartIndex - 1 >= 0) {
        this.read(oldPartIndex - 1);
      }
    }
  }

  next(event: PointerEvent) {
    event.preventDefault();
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
