import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { ReaderLayoutComponent } from 'src/app/shared/ui/reader-layout/reader-layout.component';
import { ProgressComponent } from '../progress/progress.component';

interface Glossary {
  characters: string[];
  locations: string[];
}

@Component({
  selector: 'app-glossary',
  imports: [ReaderLayoutComponent, RouterLink, ProgressComponent],
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss'],
})
export class GlossaryComponent implements OnInit {
  characters: string[] = [];
  locations: string[] = [];

  faBook = faBook;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Glossary>('assets/glossary/_main.json').subscribe((data) => {
      this.characters = data.characters;
      this.locations = data.locations;
    });
  }
}
