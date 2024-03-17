import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book, Chapter } from 'src/app/shared/models/chapter';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

let apiLoaded = false;

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RouterModule, YouTubePlayerModule]
})
export class HomeComponent implements OnInit {

  pdf = '0B-rTqD9hKNHPWkI0WUlxMk1QdFU';
  epub = '0B-rTqD9hKNHPWnNpQ0w4MktTUG8';
  kepub = '0B-rTqD9hKNHPbGFJeUs5MVlqZ3c';
  mobi = '0B-rTqD9hKNHPZkhzdEFFYWttdFU';

  teaser = '3NI6BUgH-P4';

  featured: Chapter[] = [];
  next: Chapter[] = []

  constructor(public http: HttpClient) { }

  ngOnInit() {
    if (!apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }

    this.http.get<Book[]>('assets/data/chapters.json').subscribe(data => {
      const chapters: Chapter[] = [];
      for (const book of data) {
        for (const chapter of book.chapters) {
          chapters.push(chapter);
        }
      }
      this.featured = chapters.filter(e => e.featured);
      this.next = chapters.filter(e => e.next);
    });
  }

  downloadFile(ext: string) {
    const name = 'Final-Fantasy-VII-Expérience-2.0.2';
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(`assets/downloads/${name}.${ext}`, { headers: headers, responseType: 'blob' });
  }
}
