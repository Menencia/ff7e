import { DOCUMENT, Inject, Injectable } from '@angular/core';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

@Injectable({ providedIn: 'root' })
export default class ThemeService {
  theme: Theme;

  constructor(@Inject(DOCUMENT) private document: Document) {
    // default theme
    const theme = localStorage.getItem('theme') as Theme;
    this.theme = theme || Theme.Light;
    this.applyTheme();
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
