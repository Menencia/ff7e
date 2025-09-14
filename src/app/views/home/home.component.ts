import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBook,
  faCloudArrowDown,
  faQuestionCircle,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { Book, Chapter } from 'src/app/shared/models/chapter';
import {
  Link,
  ListLinksComponent,
} from 'src/app/shared/ui/button/list-links.component';
import { DefaultLayoutComponent } from 'src/app/shared/ui/default-layout/default-layout.component';

let apiLoaded = false;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [
    RouterModule,
    YouTubePlayerModule,
    FontAwesomeModule,
    ListLinksComponent,
    DefaultLayoutComponent,
  ],
})
export class HomeComponent implements OnInit {
  pdf = '0B-rTqD9hKNHPWkI0WUlxMk1QdFU';
  epub = '0B-rTqD9hKNHPWnNpQ0w4MktTUG8';
  kepub = '0B-rTqD9hKNHPbGFJeUs5MVlqZ3c';
  mobi = '0B-rTqD9hKNHPZkhzdEFFYWttdFU';

  teaser = '3NI6BUgH-P4';

  featured: Chapter[] = [];
  next: Chapter[] = [];

  faBook = faBook;
  faStar = faStar;
  faCloudArrowDown = faCloudArrowDown;
  faQuestionCircle = faQuestionCircle;

  links: Link[];

  constructor(private http: HttpClient) {
    this.links = [
      {
        type: 'internal',
        url: '/chapitres',
        action: 'Lire',
        icon: faBook,
        text: 'Lire en ligne',
        subtext: 'via Reedsy',
      },
      {
        type: 'download',
        url: '/assets/downloads/Final-Fantasy-VII-Experience-2.0.2.pdf',
        action: 'Télécharger',
        icon: faCloudArrowDown,
        text: 'Version PDF',
        subtext: 'Lire hors-ligne',
      },
      {
        type: 'download',
        url: '/assets/downloads/Final-Fantasy-VII-Experience-2.0.2.epub',
        action: 'Télécharger',
        icon: faCloudArrowDown,
        text: 'Version EPUB',
        subtext: 'Kindle & Kobo',
      },
      {
        type: 'direct_link',
        url: 'https://editor.reedsy.com/s/IUYE14a/c/ZfdHjgtvY_knmswB/anecdotes-de-redaction',
        action: 'Lire',
        icon: faStar,
        text: 'Anecdotes de rédaction',
      },
    ];
  }

  ngOnInit() {
    if (!apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }

    this.http.get<Book[]>('assets/data/chapters.json').subscribe((data) => {
      const chapters: Chapter[] = [];
      for (const book of data) {
        for (const chapter of book.chapters) {
          chapters.push(chapter);
        }
      }
      this.featured = chapters.filter((e) => e.featured);
      this.next = chapters.filter((e) => e.next);
    });
  }

  downloadFile(ext: string) {
    const name = 'Final-Fantasy-VII-Expérience-2.0.2';
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(`assets/downloads/${name}.${ext}`, {
      headers: headers,
      responseType: 'blob',
    });
  }
}
