import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DefaultLayoutComponent } from 'src/app/shared/ui/default-layout/default-layout.component';
import { SectionTitleComponent } from 'src/app/shared/ui/section-title/section-title.component';

interface ContributorsJson {
  staffActive: {
    name: string;
    avatar: string;
    role: string;
  }[];
  contributors: string[];
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
  imports: [SectionTitleComponent, DefaultLayoutComponent],
})
export class TeamComponent implements OnInit {
  contributors: ContributorsJson = {
    staffActive: [],
    contributors: [],
  };

  constructor(public http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<ContributorsJson>('assets/data/contributors.json')
      .subscribe((data) => {
        this.contributors = data;
      });
  }
}
