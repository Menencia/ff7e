import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
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
  imports: [SectionTitleComponent, FontAwesomeModule],
})
export class LinksComponent implements OnInit {
  links: Link[] = [];

  faRefresh = faRefresh;

  constructor(public http: HttpClient) {}

  ngOnInit() {
    this.http.get<Link[]>('/assets/data/links.json').subscribe((links) => {
      this.links = links;
    });
  }
}
