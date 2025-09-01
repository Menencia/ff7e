import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  imports: [SectionTitleComponent],
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
