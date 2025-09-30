import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chapter } from 'src/app/shared/models/chapter';
import { ChaptersService } from 'src/app/shared/services/chapters.service';
import OptionComponent from 'src/app/shared/ui/option/option.component';
import { ReaderLayoutComponent } from 'src/app/shared/ui/reader-layout/reader-layout.component';

@Component({
  selector: 'app-reader-chapters',
  imports: [ReaderLayoutComponent, OptionComponent, RouterLink],
  templateUrl: './chapters.component.html',
})
export class ReaderChaptersComponent {
  chapters: Chapter[] = [];

  constructor(private chaptersService: ChaptersService) {
    this.chaptersService.chapters$.subscribe((chapters) => {
      this.chapters = chapters.filter((e) => e.reader);
    });
  }
}
