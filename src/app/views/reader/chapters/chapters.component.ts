import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Chapter } from 'src/app/shared/models/chapter';
import { Progress } from 'src/app/shared/models/reader';
import { ChaptersService } from 'src/app/shared/services/chapters.service';
import { SaveService } from 'src/app/shared/services/save.service';
import OptionComponent from 'src/app/shared/ui/option/option.component';
import { ReaderLayoutComponent } from 'src/app/shared/ui/reader-layout/reader-layout.component';

@Component({
  selector: 'app-reader-chapters',
  imports: [ReaderLayoutComponent, OptionComponent, RouterLink],
  templateUrl: './chapters.component.html',
})
export class ReaderChaptersComponent implements OnInit {
  chapters: Chapter[] = [];
  progress?: Progress;

  faBars = faBars;

  constructor(
    private chaptersService: ChaptersService,
    private saveService: SaveService,
  ) {}

  ngOnInit() {
    this.chaptersService.chapters$.subscribe((chapters) => {
      this.chapters = chapters.filter((e) => e.reader);
    });
    this.progress = this.saveService.getMaxProgress();
  }
}
