import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-section-title',
  template: `<h2 class="font-bold m-0 inline-block text-xl"><ng-content></ng-content></h2>`,
  styles: [
    `h2 { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionTitleComponent {}
