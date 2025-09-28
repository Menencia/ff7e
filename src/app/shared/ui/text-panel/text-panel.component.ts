import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-text-panel',
  template: `<div class="overflow-y-auto h-full px-10" #panel>
    <div class="crimson-text-regular" [innerHTML]="content"></div>
  </div>`,
  styles: [
    `.crimson-text-regular {
      font-family: "Crimson Text", serif;
      font-weight: 400;
      font-style: normal;
      font-size: 22px;
      line-height: 40px;
      color: #1d2730;
    }`,
  ],
})
export default class TextPanelComponent {
  @Input() content = '';

  @Output() updateProgress = new EventEmitter<number>();

  @ViewChild('panel') panel?: ElementRef;

  ngAfterViewInit(): void {
    // Example: listen to scrolling
    this.panel?.nativeElement.addEventListener('scroll', () => {
      const el = this.panel?.nativeElement;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight;
      const clientHeight = el.clientHeight;

      this.updateProgress.emit(
        Math.ceil((scrollTop / (scrollHeight - clientHeight)) * 100),
      );
    });
  }
}
