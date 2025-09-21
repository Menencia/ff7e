import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { SaveService } from '../../services/save.service';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-reader-layout',
  templateUrl: './reader-layout.component.html',
  styleUrls: ['./reader-layout.component.scss'],
})
export class ReaderLayoutComponent {
  faClose = faClose;
  @Input() title = '';

  constructor(
    private router: Router,
    private saveService: SaveService,
  ) {}

  closeOptions() {
    const save = this.saveService.getSave();
    if (save) {
      this.router.navigateByUrl(`/reader/${save.url}`);
    }
  }
}
