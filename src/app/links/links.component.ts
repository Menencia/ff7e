import { Component, OnInit } from '@angular/core';
import {  HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html'
})
export class LinksComponent implements OnInit {

  links;

  constructor(public http: HttpClient) {}

  ngOnInit() {
    this.http.get('/assets/data/links.json').subscribe(links => {
      this.links = links;
    });
  }

}
