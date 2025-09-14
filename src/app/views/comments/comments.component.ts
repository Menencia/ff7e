import { Component } from '@angular/core';
import { DefaultLayoutComponent } from 'src/app/shared/ui/default-layout/default-layout.component';
import { DisqusComponent } from 'src/app/shared/ui/disqus/disqus.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  imports: [DisqusComponent, DefaultLayoutComponent],
})
export class CommentsComponent {}
