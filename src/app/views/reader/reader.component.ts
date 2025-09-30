import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faBook,
  faCog,
  faList,
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
  defaultScroll = 0;

  // icons
  faCog = faCog;
  faBook = faBook;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faList = faList;

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

        const progress = this.saveService.getCurrentProgress();
        if (progress && progress?.chapter === this.url) {
          this.defaultScroll = progress.position;
        }
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

  saveProgress(event: number) {
    if (this.url === undefined) throw new Error('No chapter specified');
    this.saveService.setCurrentProgress({ chapter: this.url, position: event });
  }
}
