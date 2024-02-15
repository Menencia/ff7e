import { DOCUMENT } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  ElementRef,
  Renderer2,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';

@Component({
  selector: 'app-disqus',
  template: '<div id="disqus_thread"></div>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisqusComponent implements OnChanges {

  @Input() shortname = '';

  constructor(
    private renderer: Renderer2,
    private el: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnChanges(): void {
    if (this.shortname) {
      this.addDisqusScript();
    }
  }

  /** Add DISQUS script */
  addDisqusScript(): void {
    if (this.document.defaultView) {
      const self = this;
      (this.document.defaultView as any).disqus_config = function () {
        this.page.identifier = self.shortname;
      };
    }
    const disqusScript = this.renderer.createElement('script');
    disqusScript.src = `//${ this.shortname }.disqus.com/embed.js`;
    disqusScript.async = true;
    disqusScript.type = 'text/javascript';
    this.renderer.setAttribute(disqusScript, 'data-timestamp', new Date().getTime().toString());
    this.renderer.appendChild(this.el.nativeElement, disqusScript);
  }
}
