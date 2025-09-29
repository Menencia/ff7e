import { Component, Input, OnInit } from '@angular/core';
import { Progress } from 'src/app/shared/models/reader';
import { SaveService } from 'src/app/shared/services/save.service';

@Component({
  selector: 'app-progress',
  imports: [],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {
  @Input() position = '';
  @Input() displaySavePosition = false;

  savePosition = '';

  constructor(private saveService: SaveService) {}

  ngOnInit() {
    const maxProgress = this.saveService.getMaxProgress();
    if (maxProgress) {
      this.savePosition = `${this.display(maxProgress)}`;
    }
  }

  private display(progress: Progress) {
    const chapter =
      progress.chapter === 0 ? 'Prologue' : `Chapitre ${progress.chapter}`;

    return `${chapter} (#${progress.position})`;
  }
}
