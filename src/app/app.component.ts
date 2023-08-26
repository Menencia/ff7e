import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

interface Quote {
  chapter: number;
  content: string;
  character: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  quotes: Quote[] = [];
  quote: Quote | undefined;
  theme: Theme;

  constructor(
    public http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {
    // default theme
    const theme = localStorage.getItem('theme') as Theme;
    this.theme = theme || Theme.Light;
    this.applyTheme();
  }

  ngOnInit() {
    this.http.get<Quote[]>('assets/data/quotes.json').subscribe(data => {
      this.quotes = data;
      this.changeQuote();
    });
  }

  changeQuote() {
    this.quote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
  }

  toggleDark() {
    this.theme = this.theme === Theme.Light ? Theme.Dark : Theme.Light;
    this.applyTheme();
  }

  applyTheme() {
    localStorage.setItem('theme', this.theme);
    if (this.theme === Theme.Dark) {
      this.document.querySelector('html')?.classList.add('dark')
    } else {
      this.document.querySelector('html')?.classList.remove('dark')
    }
  }

}
