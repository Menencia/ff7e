import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
})
export class ChaptersComponent implements OnInit {

  chapters;

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.http.get('assets/data/chapters.json').subscribe((data: any) => {
      const chapters = [];
      for (const book of data) {
        for (const chapter of book.chapters) {
          chapters.push(chapter);
        }
      }
      this.chapters = chapters;
    });
  }

}
