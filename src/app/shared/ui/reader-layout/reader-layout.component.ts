import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SaveService } from '../../services/save.service';

@Component({
  imports: [FontAwesomeModule, RouterLink],
  selector: 'app-reader-layout',
  templateUrl: './reader-layout.component.html',
  styleUrls: ['./reader-layout.component.scss'],
})
export class ReaderLayoutComponent {
  faClose = faClose;
  @Input() icon?: IconDefinition;
  @Input() parent?: { url: string; label: string };
  @Input() title = '';

  constructor(
    private router: Router,
    private saveService: SaveService,
  ) {}

  closeOptions() {
    const progress = this.saveService.getCurrentProgress();
    this.router.navigateByUrl(`/reader/${progress.chapter}`);
  }
}
