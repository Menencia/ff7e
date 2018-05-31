import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
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

  savePlayer(ev) {}
  onStateChange(ev) {}

}
