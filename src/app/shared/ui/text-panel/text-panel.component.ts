import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime, map, share } from 'rxjs/operators';

@Component({
  selector: 'app-text-panel',
  template: `<div class="overflow-y-auto h-full px-10" #panel>
    <div class="crimson-text-regular text-black dark:text-white" [innerHTML]="content"></div>
  </div>`,
  styles: [
    `.crimson-text-regular {
      font-family: "Crimson Text", serif;
      font-weight: 400;
      font-style: normal;
      font-size: 22px;
      line-height: 40px;
    }`,
  ],
})
export default class TextPanelComponent implements AfterViewInit, OnDestroy {
  @Input() content = '';

  @Input() set defaultScroll(value: number) {
    if (value) {
      this.defaultScroll$.next(value);
    }
  }

  @Output() updateProgress = new EventEmitter<number>();

  @Output() saveProgress = new EventEmitter<number>();

  @ViewChild('panel') panel?: ElementRef;

  private subs = new Subscription();
  private defaultScroll$ = new Subject<number>();

  ngAfterViewInit(): void {
    const div = this.panel?.nativeElement;

    // Create a shared scroll observable
    const scroll$ = fromEvent(div, 'scroll').pipe(
      map(() => ({
        top: div.scrollTop,
        height: div.scrollHeight,
        client: div.clientHeight,
      })),
      share(),
    );

    // 👀 Real-time: do something on every scroll event
    this.subs.add(
      scroll$.subscribe(({ top, height, client }) => {
        this.updateProgress.emit(Math.ceil((top / (height - client)) * 100));
      }),
    );

    // ⏱ Debounced: do something 2s after scrolling stops
    this.subs.add(
      scroll$.pipe(debounceTime(2000)).subscribe(({ top }) => {
        this.saveProgress.emit(top);
      }),
    );

    // React to input changes
    this.subs.add(
      this.defaultScroll$.subscribe((top) => {
        setTimeout(() => {
          div.scrollTop = top;
        }, 0);
      }),
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
