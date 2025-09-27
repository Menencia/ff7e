import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SaveService } from '../../services/save.service';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-reader-layout',
  templateUrl: './reader-layout.component.html',
  styleUrls: ['./reader-layout.component.scss'],
})
export class ReaderLayoutComponent {
  faClose = faClose;
  @Input() icon?: IconDefinition;
  @Input() title = '';
  @Input() url?: string;

  constructor(
    private router: Router,
    private saveService: SaveService,
  ) {}

  closeOptions() {
    const progress = this.saveService.getCurrentProgress();
    if (progress) {
      this.router.navigateByUrl(this.url ?? `/reader/${progress.chapter}`);
    }
  }
}
