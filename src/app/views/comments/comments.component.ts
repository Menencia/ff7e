import { Component, OnInit } from '@angular/core';
import { DisqusComponent } from 'src/app/shared/ui/disqus/disqus.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  imports: [DisqusComponent]
})
export class CommentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
