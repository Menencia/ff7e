import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html'
})
export class TeamComponent implements OnInit {

  contributors;

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.http.get('assets/data/contributors.json').subscribe((data: any) => {
      this.contributors = data;
    });
  }

}
