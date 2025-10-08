import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Book, Chapter } from '../models/chapter';

@Injectable({ providedIn: 'root' })
export class ChaptersService {
  chapters$ = new ReplaySubject<Chapter[]>(1);

  constructor(private http: HttpClient) {
    this.http.get<Book[]>('assets/data/chapters.json').subscribe((data) => {
      const chapters: Chapter[] = [];
      for (const book of data) {
        for (const chapter of book.chapters) {
          chapters.push(chapter);
        }
      }
      this.chapters$.next(chapters);
      this.chapters$.complete();
    });
  }
}
