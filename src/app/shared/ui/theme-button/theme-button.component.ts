import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import ThemeService, { Theme } from '../../services/theme.service';

@Component({
  selector: 'app-theme-button',
  imports: [FontAwesomeModule],
  template: `
    <div class="px-5 py-3 text-xl hover:bg-gray-300 rounded-b-full dark:hover:bg-gray-700 cursor-pointer" (click)="toggleDark()">
      @if (theme === 'light') {
        <fa-icon [icon]="faSun" />
      }
      @if (theme === 'dark') {
        <fa-icon [icon]="faMoon" />
      }
    </div>`,
})
export default class ThemeButtonComponent implements OnInit {
  theme = Theme.Light;

  faSun = faSun;
  faMoon = faMoon;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.theme = this.themeService.theme;
  }

  toggleDark() {
    this.themeService.toggleDark();
    this.theme = this.themeService.theme;
  }
}
