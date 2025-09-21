import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { SaveService } from 'src/app/shared/services/save.service';

@Component({
  selector: 'app-reader-options',
  imports: [FontAwesomeModule],
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class ReaderOptionsComponent {
  faClose = faClose;

  constructor(
    private saveService: SaveService,
    private router: Router,
  ) {}

  closeOptions() {
    const save = this.saveService.getSave();
    if (save?.url) {
      this.router.navigateByUrl(`/reader/${save.url}`);
    }
    // todo navigate <reader home>
  }
}
