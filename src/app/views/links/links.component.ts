import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import {
  Link,
  ListLinksComponent,
} from 'src/app/shared/ui/button/list-links.component';
import { DefaultLayoutComponent } from 'src/app/shared/ui/default-layout/default-layout.component';
import { SectionTitleComponent } from 'src/app/shared/ui/section-title/section-title.component';

interface DataLink {
  title: string;
  desc: string;
  url: string;
  lang?: string;
  action?: string;
}

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  imports: [
    SectionTitleComponent,
    FontAwesomeModule,
    ListLinksComponent,
    DefaultLayoutComponent,
  ],
})
export class LinksComponent implements OnInit {
  links: Link[] = [];

  faRefresh = faRefresh;

  constructor(public http: HttpClient) {}

  ngOnInit() {
    this.http.get<DataLink[]>('/assets/data/links.json').subscribe((links) => {
      this.links = links.map((link) => {
        return {
          type: 'direct_link',
          action: link.action ?? 'Voir',
          text: link.title,
          subtext: link.desc,
          url: link.url,
          label: link.lang ? 'En anglais' : undefined,
        };
      });
    });
  }
}
