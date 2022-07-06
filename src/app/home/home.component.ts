import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  pdf = '0B-rTqD9hKNHPWkI0WUlxMk1QdFU';
  epub = '0B-rTqD9hKNHPWnNpQ0w4MktTUG8';
  kepub = '0B-rTqD9hKNHPbGFJeUs5MVlqZ3c';
  mobi = '0B-rTqD9hKNHPZkhzdEFFYWttdFU';

  teaser = '3NI6BUgH-P4';

  featured;
  next;

  constructor(public http: HttpClient) { }

  ngOnInit() {
    // This code loads the IFrame Player API code asynchronously, according to the instructions at
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    this.http.get('assets/data/chapters.json').subscribe((data: any) => {
      const chapters = [];
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
    const name = 'Final-Fantasy-VII-Expérience-2.0.1';
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(`assets/downloads/${name}.${ext}`, { headers: headers, responseType: 'blob' });
  }

  savePlayer(ev) {}
  onStateChange(ev) {}

}
