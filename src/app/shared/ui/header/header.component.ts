import { HttpClient } from '@angular/common/http';
import { Component, DOCUMENT, Inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

interface Quote {
  chapter: number;
  content: string;
  character: string;
}

interface Link {
  url: string;
  label: string;
}

@Component({
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  quotes: Quote[] = [];
  quote: Quote | undefined;
  theme: Theme;
  links: Link[];

  faSun = faSun;
  faMoon = faMoon;

  constructor(
    public http: HttpClient,
    public router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.links = [
      { url: '/presentation', label: 'Présentation' },
      { url: '/chapitres', label: 'Chapitres' },
      { url: '/historique', label: 'Historique' },
      { url: '/equipe', label: 'Équipe' },
      { url: '/liens', label: 'Liens' },
      { url: '/commentaires', label: 'Commentaires' },
    ];
    // default theme
    const theme = localStorage.getItem('theme') as Theme;
    this.theme = theme || Theme.Light;
    this.applyTheme();
  }

  ngOnInit() {
    this.http.get<Quote[]>('assets/data/quotes.json').subscribe((data) => {
      this.quotes = data;
      this.changeQuote();
    });
  }

  changeQuote() {
    this.quote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    setTimeout(() => {
      this.quote = undefined;
      setTimeout(() => {
        this.changeQuote();
      }, 500);
    }, 15000);
  }

  toggleDark() {
    this.theme = this.theme === Theme.Light ? Theme.Dark : Theme.Light;
    this.applyTheme();
  }

  applyTheme() {
    localStorage.setItem('theme', this.theme);
    if (this.theme === Theme.Dark) {
      this.document.querySelector('html')?.classList.add('dark');
    } else {
      this.document.querySelector('html')?.classList.remove('dark');
    }
  }
}
