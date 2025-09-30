import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import ThemeService from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private themeService: ThemeService) {
    this.themeService.setupTheme();
  }
}
