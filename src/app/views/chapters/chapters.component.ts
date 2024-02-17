import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book, Chapter } from 'src/app/shared/models/chapter';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss'],
  imports: [CommonModule]
})
export class ChaptersComponent implements OnInit {

  chapters: Chapter[] = [];

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.http.get<Book[]>('assets/data/chapters.json').subscribe(data => {
      const chapters: Chapter[] = [];
      for (const book of data) {
        for (const chapter of book.chapters) {
          chapters.push(chapter);
        }
      }
      this.chapters = chapters;
    });
  }

}
