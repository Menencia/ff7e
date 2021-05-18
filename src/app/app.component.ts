import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  quotes;
  quote;
  theme: Theme;

  constructor(public http: HttpClient, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.http.get('assets/data/quotes.json').subscribe((data: any) => {
      this.quotes = data;
      this.changeQuote();
    });

    // default theme
    const theme = localStorage.getItem('theme') as Theme;
    this.theme = theme ? theme: Theme.Light;
    this.applyTheme();
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
      this.document.querySelector('html').classList.add('dark')
    } else {
      this.document.querySelector('html').classList.remove('dark')
    }
  }

}
