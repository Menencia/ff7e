import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

export interface Chapter {
  id?: number;
  number: number;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private dbService: NgxIndexedDBService) { }

  public getChapter(number: number): Observable<Chapter> {
    return this.dbService.getByIndex<Chapter>('chapters', 'number', number);
  }

  public setChapter(number: number, content: string): void {
    this.dbService.add<Chapter>('chapters', { number, content })
      .subscribe(e => console.log(`[db] Chapter ${number} stored!`));
  }
}