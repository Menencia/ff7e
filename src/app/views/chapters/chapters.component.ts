import { Component, OnInit } from '@angular/core';
import { Chapter } from 'src/app/shared/models/chapter';
import { ChaptersService } from 'src/app/shared/services/chapters.service';
import { DefaultLayoutComponent } from 'src/app/shared/ui/default-layout/default-layout.component';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss'],
  imports: [DefaultLayoutComponent],
})
export class ChaptersComponent implements OnInit {
  chapters: Chapter[] = [];

  constructor(private chaptersService: ChaptersService) {}

  ngOnInit() {
    this.chaptersService.chapters$.subscribe((chapters) => {
      this.chapters = chapters;
    });
  }
}
