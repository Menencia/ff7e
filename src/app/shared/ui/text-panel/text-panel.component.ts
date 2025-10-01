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
  template: `<div class="overflow-y-auto h-full px-5" #panel>
    <div class="crimson-text-regular text-black dark:text-white" [innerHTML]="content"></div>
  </div>`,
  styles: [
    `.crimson-text-regular {
      font-family: "Crimson Text", serif;
      font-weight: 400;
      font-style: normal;
      font-size: 22px;
      line-height: 40px;
    }
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      background: var(--p-gray-700);
    }
    ::-webkit-scrollbar-thumb {
      background: var(--p-gray-500);
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--p-gray-400);
    }
    `,
  ],
})
export default class TextPanelComponent implements AfterViewInit, OnDestroy {
  @Input() content = '';

  @Input() set scrollTop(value: number) {
    this.scrollTop$.next(value);
  }

  @Output() scrollTopChange = new EventEmitter<number>();

  @Output() updateProgress = new EventEmitter<number>();

  @Output() saveProgress = new EventEmitter<number>();

  @ViewChild('panel') panel?: ElementRef;

  private progress = 0;
  private scrollTop$ = new Subject<number>();
  private subs = new Subscription();

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
        this.progress = Math.ceil((top / (height - client)) * 100);
        this.updateProgress.emit(this.progress);
        this.scrollTopChange.emit(top);
      }),
    );

    // ⏱ Debounced: do something 2s after scrolling stops
    this.subs.add(
      scroll$.pipe(debounceTime(1000)).subscribe(({ top }) => {
        this.saveProgress.emit(top);
      }),
    );

    // React to input changes
    this.subs.add(
      this.scrollTop$.subscribe((top) => {
        setTimeout(() => {
          div.scrollTop = top;
        }, 0);
      }),
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  isBottom() {
    return this.progress >= 100;
  }

  forward() {
    const div = this.panel?.nativeElement;
    div.scrollTop += div.clientHeight;
  }
}
