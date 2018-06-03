import { Component, OnInit } from '@angular/core';
import {  Http } from '@angular/http';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html'
})
export class LinksComponent implements OnInit {

  links;

  constructor(public http: Http) { }

  ngOnInit() {
    this.http.get('assets/data/links.json').subscribe(data => {
      console.log(data);
      this.links = data;
    });
  }

}
