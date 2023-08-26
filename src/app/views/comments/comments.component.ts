import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit {

  disqusId = 'ff7e';

  constructor() { }

  ngOnInit() {
  }

}
