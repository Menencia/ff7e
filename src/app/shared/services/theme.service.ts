import { DOCUMENT, Inject, Injectable } from '@angular/core';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

@Injectable({ providedIn: 'root' })
export default class ThemeService {
  theme = Theme.Light;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  /** This method should be called once in app.component */
  setupTheme() {
    const theme = localStorage.getItem('theme') as Theme;
    this.theme = theme || Theme.Light;
    this.applyTheme();
  }

  /** Toggles between light & dark themes */
  toggleDark() {
    this.theme = this.theme === Theme.Light ? Theme.Dark : Theme.Light;
    this.applyTheme();
  }

  /** Applies specific theme */
  private applyTheme() {
    localStorage.setItem('theme', this.theme);
    if (this.theme === Theme.Dark) {
      this.document.querySelector('html')?.classList.add('dark');
    } else {
      this.document.querySelector('html')?.classList.remove('dark');
    }
  }
}
