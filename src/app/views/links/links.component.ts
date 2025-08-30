import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SectionTitleComponent } from 'src/app/shared/ui/section-title/section-title.component';

interface Link {
  title: string;
  desc: string;
  url: string;
  lang: string;
  action?: string;
}

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  imports: [SectionTitleComponent]
})
export class LinksComponent implements OnInit {

  links: Link[] = [];

  constructor(public http: HttpClient) {}

  ngOnInit() {
    this.http.get<Link[]>('/assets/data/links.json').subscribe(links => {
      this.links = links;
    });
  }

}
