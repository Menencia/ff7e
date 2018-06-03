import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  quote;

  constructor(public http: HttpClient) {}

  ngOnInit() {
    this.http.get('assets/data/quotes.json').subscribe((data: any) => {
      this.quote = data[Math.floor(Math.random() * data.length)];
    });
  }

}
