import { Component, OnInit } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { StoreService } from 'src/app/shared/services/store';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {

  public content = '';

  constructor(
    private http: HttpClient,
    private store: StoreService) {}

  ngOnInit() {
    this.store.getChapter(0).subscribe(chapter => {
      if (!!chapter) {
        console.log('get')
        this.content = this.formatContent(chapter.content);
      } else {
        console.log('load')
        this.loadChapter(0);
      }
    });
  }

  public loadChapter(number: number): void {
    const key = 'AIzaSyA5nfdCODe1LJX5fbwOmwpbBwN-SEzul9I';
    const chapterId = '14l3Qc4Te3cMgPWfZM2qFOd7mjx_fS8yCYHqnYMNgFcA';
    const url = `https://content.googleapis.com/drive/v3/files/${chapterId}/export`;
    this.http.get(url, { params: { mimeType: 'text/plain', key }, responseType: 'text' })
      .subscribe((data: string) => {
        this.store.setChapter(0, data);
        this.content = this.formatContent(data);
      });
  }

  public formatContent(data: string): string {
    const lines = data.split('\r\n');
    lines.shift(); // remove chapter
    lines.shift(); // remove title
    const cuts = [6];
    const parts = [];
    const part = [];
    lines.slice(i, i+1)
    lines.forEach((line, lineNo) => {
      if (cuts.includes(lineNo)) {

      }
      part.push(line);

    });
    return '<p>' + lines.join('</p><p>') + '</p>';
  }
}
